<template>
  <div id="app">
    <main>
      <topbar></topbar>
      <main-content></main-content>
    </main>
    <server-dialog></server-dialog>
    <websocket></websocket>
    <notifier></notifier>
  </div>
</template>

<script>
import Topbar from "./components/Topbar.vue";
import MainContent from "./components/Content.vue";
import ServerDialog from "./components/ServerDialog.vue";

Vue.component("websocket", {
  render() {
    return "";
  },
  data: function() {
    return {
      serverAddress: this.$store.state.wsServer,
      ws: null
    };
  },
  watch: {
    // watch 'serverAddress' so we can create new websocket connection
    // when server address is changed
    "serverAddress.address": function(newValue, oldValue) {
      if (newValue == oldValue) {
        return;
      }
      this.ws.close();
      this.createConnection();
    }
  },
  methods: {
    createConnection: function() {
      this.ws = new WebSocket(`ws://${this.serverAddress.address}/`);

      this.ws.onopen = e => {
        this.$store.commit({
          type: "SET_CONNECT_STATE",
          connected: true
        });
      };

      this.ws.onclose = () => {
        this.$store.commit({
          type: "SET_CONNECT_STATE",
          connected: false
        });
      };

      this.ws.onmessage = e => {
        const dataObj = JSON.parse(e.data);

        console.log(dataObj["time"]["0"]);
        const ticker = {
          code: dataObj["code"]["0"],
          time: moment(dataObj["time"]["0"], "YYYY-MM-DD HH:mm:ss"),
          price: +dataObj["price"]["0"],
          volume: +dataObj["volume"]["0"],
          direction: dataObj["ticker_direction"]["0"].slice(3)
        };

        this.$store.commit({
          type: "ADD_TICKER_DATA",
          record: ticker
        });

        this.$store.dispatch({
          type: "fireTickerUpdate"
        });
      };
    }
  },
  created: function() {
    this.createConnection();
  }
});

Vue.component("notifier", {
  render() {
    return "";
  },
  created: function() {
    this.$store.commit({
      type: "ADD_TICKER_LISTENER",
      listener: function() {
        const record = this.$store.getters.lastest;

        // push notification
        Push.create(`${record.code}`, {
          body: `[${record.direction}] ${record.volume}`,
          timeout: 3000
        });

        // play sound
        new Howl({
          src: ["/assets/audio/jingle-bells-sms.mp3"]
        }).play();
      }.bind(this)
    });
  }
});

export default {
  components: {
    Topbar,
    MainContent,
    ServerDialog
  },
  created: function() {
    // const ws = new WebSocket(`ws://${this.$store.state.wsServer.address}/`);
    // ws.onopen = e => {
    //   this.$store.commit({
    //     type: "SET_CONNECT_STATE",
    //     connected: true
    //   });
    // };
    // ws.onmessage = e => {
    //   const dataObj = JSON.parse(e.data);
    //   const ticker = {
    //     code: dataObj["code"]["0"],
    //     time: Date.parse(dataObj["time"]["0"]),
    //     price: +dataObj["price"]["0"],
    //     volume: +dataObj["volume"]["0"],
    //     direction: dataObj["ticker_direction"]["0"].slice(3)
    //   };
    //   this.$store.commit({
    //     type: "ADD_TICKER_DATA",
    //     record: ticker
    //   });
    //   this.$store.dispatch({
    //     type: "fireTickerUpdate"
    //   });
    // };
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

