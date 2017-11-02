<template>
  <div id="app">
    <main>
      <topbar></topbar>
      <main-content></main-content>
    </main>
  </div>
</template>

<script>
import Topbar from "./components/Topbar.vue";
import MainContent from "./components/Content.vue";
export default {
  components: {
    Topbar,
    MainContent
  },
  created: function() {
    const ws = new WebSocket(`ws://${this.$store.state.wsServer.addr}/`);

    ws.onopen = e => {
      this.$store.commit({
        type: "SET_CONNECT_STATE",
        connected: true
      });
    };

    ws.onmessage = e => {
      const dataObj = JSON.parse(e.data);

      const ticker = {
        code: dataObj["code"]["0"],
        time: Date.parse(dataObj["time"]["0"]),
        price: +dataObj["price"]["0"],
        volume: +dataObj["volume"]["0"],
        direction: dataObj["ticker_direction"]["0"].slice(3)
      };

      this.$store.commit({
        type: "ADD_TICKER_DATA",
        record: ticker
      });

      this.$store.dispatch({
        type: 'fireTickerUpdate',
      });
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  main {
    padding-top: 70px;
  }
}
</style>

