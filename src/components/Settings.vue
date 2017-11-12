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
                <li id="range-slider" v-show="showSlider" @mouseleave="toggleSlider">
                    <input type="range" min="0" max="60" step="1" v-model="timeRange" class="navbar-text">
                    <span class="navbar-text">{{ timeRange }}</span>
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
    },
    timeRange: {
      get() {
        return this.$store.state.timeRange;
      },
      set(value) {
        this.$store.commit({
          type: "SET_TIME_RANGE",
          range: value
        });
      }
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

#range-slider {
  input {
    width: 100px;
    height: 21px;
  }

  span {
    position: relative;
    width: 40px;
    margin-left: 0;
    text-align: center;
    border-radius: 3px;
    background-color: #fff;
    color: invert(#fff);

    &::after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      border-top: 5px solid transparent;
      border-right: 5px solid #fff;
      border-bottom: 5px solid transparent;
      top: 6px;
      left: -5px;
    }
  }
}
</style>

