<template>
  <a id="state-label" :class="stateClass">{{stateString}}</a>
</template>

<script>
const COLORS = {
  RED: -1,
  YELLOW: 0,
  GREEN: 1
};
const StateIndicator = {
  props: ["stateString", "state"],
  computed: {
    stateClass: function() {
      if (this.state * 1 > 0) {
        return "green-blink";
      } else {
        return "red";
      }
    }
  }
};

export default Object.assign({}, COLORS, StateIndicator);
</script>

<style lang="scss" scoped>
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
a {
  font-size: 20px;
  text-transform: uppercase;

  &::before {
    display: inline-block;
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 5px;
  }
  &.red {
    &::before {
      background-color: red;
    }
  }
  &.green-blink {
    &::before {
      background-color: greenyellow;
      opacity: 1;
      animation: blinker 1s linear infinite;
    }
  }
}

#state-label {
  &:hover,
  &:focus {
    color: #ffffff;
  }
}
</style>


