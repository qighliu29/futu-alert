<template>
  <a>{stateString}</a>
</template>

<script>
const COLORS = {
    RED: -1,
    YELLOW: 0,
    GREEN: 1
};

const StateIndicator = {
  props: ['stateString', 'state'],
};

export default Object.assign({}, COLORS, StateIndicator);
</script>

