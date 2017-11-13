<template>
    <div class="modal fade" id="chartModal" tabindex="-1" role="dialog" aria-labelledby="chartModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">{{ ticker.code }}</h4>
                </div>
                <div class="modal-body">
                    <svg :width="width" :height="height" style="display: block; margin: 0 auto;">
                        <g :transform="canvasPos">
                            <g v-for="piece in pieces" :key="piece.direction" class="pie-piece">
                                <path :d="piece.d" _fill="piece.fill" :fill="fillProp(piece.gradientId)" @mouseenter="showDetails(piece)" @mouseleave="clearDetails"></path>
                                <text :transform="piece.textPos" dy="0.35em" text-anchor="middle">{{ piece.label }}</text>
                                <radialGradient :id="piece.gradientId" gradientUnits="userSpaceOnUse" cx="0" cy="0" :r="outerRadius">
                                  <stop v-for="(point,index) in piece.gradientPoint" :offset="point.offset" :stop-color="point.color" :key="index"></stop>
                                </radialGradient>
                            </g>
                            <text text-anchor="middle">
                                <tspan x="0" y="-0.5em" class="direction-label">{{ directionLabel }}</tspan>
                                <tspan x="0" dy="1.2em">{{ volumeLabel }}</tspan>
                            </text>
                        </g>
                    </svg>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    width: 400,
    height: 400,
    ticker: {
      code: ""
    },
    // pieData: [
    //   {
    //     volume: 200,
    //     direction: "BUY"
    //   },
    //   {
    //     volume: 100,
    //     direction: "SELL"
    //   },
    //   {
    //     volume: 200,
    //     direction: "NEUTRAL"
    //   }
    // ],
    pieGenerator: d3
      .pie()
      .sort((a, b) => a.direction.localeCompare(b.direction))
      .value(function(d) {
        return d.volume;
      }),
    pieColor: {
      BUY: "#FF4500",
      SELL: "#7CFC00",
      NEUTRAL: "#C0C0C0"
    },
    directionLabel: "",
    volumeLabel: "",
    innerPercent: 0.46,
    outerPercent: 0.86,
    // "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5]
    gradientRatio: [-0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5]
  }),
  computed: {
    radius: function() {
      return Math.min(this.width, this.height) / 2;
    },
    outerRadius: function() {
      return this.radius * this.outerPercent;
    },
    innerRadius: function() {
      return this.radius * this.innerPercent;
    },
    labelRadius: function() {
      return (this.innerPercent + this.outerPercent) / 2;
    },
    gradientRadius: function() {
      const step =
        (this.outerPercent - this.innerPercent) /
        (this.gradientRatio.length - 1);
      return [...Array(8).keys()].map(
        (value, index) => this.innerPercent * 1.2 + index * step
      );
    },
    canvasPos: function() {
      return `translate(${this.width / 2},${this.height / 2})`;
    },
    pieData: function() {
      if (this.ticker.code.length > 0) {
        const timeNow = moment();
        let timeBeg = moment(this.ticker.time).subtract(
          this.$store.state.timeRange / 2,
          "minutes"
        );
        let timeEnd = moment(this.ticker.time).add(
          this.$store.state.timeRange / 2,
          "minutes"
        );
        if (timeEnd.isAfter(timeNow)) {
          timeEnd = timeNow;
          timeBeg = moment(timeNow).subtract(
            this.$store.state.timeRange,
            "minutes"
          );
        }

        const groups = this.$store.state.ticker.records
          .filter(
            elem =>
              elem.code === this.ticker.code &&
              elem.time.isBetween(timeBeg, timeEnd)
          )
          .reduce((acc, value) => {
            (acc[value.direction] = acc[value.direction] || []).push(value);
            return acc;
          }, {});
        return Object.values(groups).map(group =>
          group.reduce(
            (sum, record) => {
              sum["volume"] = (sum["volume"] || 0) + record["volume"];
              return sum;
            },
            { direction: group[0].direction }
          )
        );
      }
    },
    totalVolume: function() {
      return this.pieData.reduce(
        (sum, category) => (sum += category.volume),
        0
      );
    },
    pathGenerator: function() {
      return d3
        .arc()
        .outerRadius(this.outerRadius)
        .innerRadius(this.innerRadius);
    },
    labelGenerator: function() {
      return d3
        .arc()
        .outerRadius(this.radius * this.labelRadius)
        .innerRadius(this.radius * this.labelRadius);
    },
    pieces: function() {
      if (this.pieData) {
        return this.pieGenerator(this.pieData).map((value, index) => ({
          direction: value.data["direction"],
          volume: value.data["volume"],
          d: this.pathGenerator(value),
          fill: this.pieColor[value.data["direction"]],
          label: `${Math.floor(
            value.data["volume"] / this.totalVolume * 100
          )}%`,
          textPos: `translate(${this.labelGenerator.centroid(value)})`,
          gradientId: `pie-gradient-${index}`,
          gradientPoint: this.gradientRatio.map((ratio, index) => ({
            offset: `${this.gradientRadius[index] * 100}%`,
            color: this.LightenDarkenColor(
              this.pieColor[value.data["direction"]],
              ratio * 100
            )
          }))
        }));
      }
    }
  },
  methods: {
    showDetails: function({ direction, volume }) {
      this.directionLabel = direction;
      this.volumeLabel = volume;
    },
    clearDetails: function() {
      this.directionLabel = "";
      this.volumeLabel = "";
    },
    fillProp: function(id) {
      return `url(#${id})`;
    },
    LightenDarkenColor: function(col, amt) {
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00ff) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000ff) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
  },
  mounted: function() {
    $("#chartModal").on(
      "show.bs.modal",
      function() {
        // this.code = this.$store.state.currentCode;
        this.ticker = this.$store.state.selectedTicker;
      }.bind(this)
    );
    // $("#chartModal").modal("show");
  }
};
</script>

<style lang="scss">
.pie-piece {
  transition: transform 0.6s;

  &:hover {
    transform: scale(1.1);
  }
}

.direction-label {
  font-family: "Sonsie One", "Comic Sans", "Chalkboard";
  font-weight: bold;
  text-shadow: 1px 1px 0px #7cacde;
}
</style>

