<template>
    <div class="modal fade" id="serverModal" tabindex="-1" role="dialog" aria-labelledby="serverModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Server Config</h4>
                </div>
                <div class="modal-body">
                    <form class="form-inline">
                      <div class="form-group">
                        <label for="serverAddr">Server Address</label>
                        <input type="text" class="form-control" id="serverAddr" ref="input" :placeholder="address" style="margin-left: 5px;">
                      </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="setServerAddress">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: Vuex.mapState({
    address: state => state.wsServer.address
  }),
  methods: {
    setServerAddress: function() {
      this.$store.commit({
        type: "SET_WS_SERVER",
        server: this.$refs.input.value
      });
      this.$refs.input.value = "";
      $("#serverModal").modal("toggle");
    }
  },
  mounted: function() {
    $("#serverModal").modal("show");
  }
};
</script>

<style lang="scss">
#serverModal {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

