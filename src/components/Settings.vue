<template>
    <ul id="settings" class="nav navbar-nav navbar-left">
        <li>
            <a id="settings-button" @click="toggleForm">
                <i class="fa fa-gear"></i>
            </a>
        </li>
        <li>
            <ul id="settings-form" v-show="showForm" class="nav navbar-nav animated bounceInRight">
                <li>
                    <p id="merge-check" class="navbar-text" :class="autoMergingClass" @click="toggleAutoMerge">auto merging</p>
                </li>
                <li v-show="showLabel" @mouseenter="toggleSlider">
                    <a>
                        <i class="fa fa-pie-chart"></i>
                        time range
                    </a>
                </li>
                <li v-show="showSlider" @mouseleave="toggleSlider" style="padding-left: 15px;">
                    <input id="time-slider" data-slider-id="time-range-slider" type="text" data-slider-handle="custom"/>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
  data: () => ({
    showForm: false,
    showSlider: false
  }),
  computed: {
    ...Vuex.mapState({
      autoMergingClass: state => (state.autoMerging ? "auto-merge" : "")
    }),
    showLabel: function() {
      return !this.showSlider;
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;

      // $("#ticker").bootstrapTable("prepend", [
      //   {
      //     code: "UWT",
      //     price: 12300,
      //     time: moment(new Date()),
      //     volume: 1200,
      //     direction: "BUY"
      //   }
      // ]);
    },
    toggleSlider() {
      this.showSlider = !this.showSlider;
    },
    ...Vuex.mapMutations({
      toggleAutoMerge: "TOGGLE_AUTO_MERGING"
    })
  },
  mounted: function() {
    $("#time-slider").slider({
      min: 0,
      max: 60,
      value: 30,
      tooltip_position: "bottom"
    });
  }
};
</script>

<style lang="scss" scoped>
@keyframes bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0) skewX(-45deg);
  }

  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0) skewX(5deg);
  }

  75% {
    transform: translate3d(10px, 0, 0) skewX(2deg);
  }

  90% {
    transform: translate3d(-5px, 0, 0) skewX(0deg);
  }

  to {
    transform: none;
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.bounceInRight {
  animation-name: bounceInRight;
}

#settings-form {
  transform-origin: left bottom;
}

#merge-check {
  padding-left: 20px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("/assets/image/box.svg");

  &.auto-merge {
    background-image: url("/assets/image/done.svg");
  }
}

#settings-button {
  cursor: pointer;
}
</style>

<style lang="scss">
#time-range-slider {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100px;

  .slider-track {
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.7),
      inset 0px -1px 1px rgba(0, 0, 0, 0.1);

    .slider-selection {
      box-shadow: inherit;
    }
  }

  .slider-handle.custom::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background: -webkit-linear-gradient(#e3e3e3, #fdfdfd);
    border: 4px solid #f2f2f2;
    border-radius: 100%;
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1),
      inset 1px 1px 1px rgba(0, 0, 0, 0.05), 1px 4px 10px rgba(0, 0, 0, 0.3);
  }
}
</style>

