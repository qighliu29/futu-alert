<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <settings></settings>
            <ul id="connect-state" class="nav navbar-nav navbar-right">
                <li>
                    <state-indicator :state="stateCode" :state-string="stateString"></state-indicator>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import StateIndicator from "./State.vue";
import Settings from "./Settings.vue";
const { mapState } = Vuex.createNamespacedHelpers("wsServer");
export default {
  computed: {
    ...Vuex.mapState({
      stateCode: state => (state.wsServer.connectState ? 1 : -1),
      stateString: state =>
        state.wsServer.connectState ? "connected" : "disconnected"
    })
  },
  components: {
    StateIndicator,
    Settings
  }
};
</script>

