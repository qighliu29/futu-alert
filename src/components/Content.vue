<template>
  <div id="content" class="container">
      <table id="ticker" width="100%" data-toggle="table" data-sort-name="time" data-sort-order="desc">
            <thead>
                <tr>
                    <th data-width="20%" data-field="code">code</th>
                    <th data-width="40%" data-field="time">time</th>
                    <th data-width="10%" data-field="price">price</th>
                    <th data-width="20%" data-field="volume">volume</th>
                    <th data-width="10%" data-field="direction">direction</th>
                </tr>
            </thead>
            <tbody></tbody>
      </table>
  </div>
</template>

<script>
export default {
  created: function() {
    this.$store.watch(
      state => state.autoMerging,
      function(auto) {
        if (auto) {
          $("#ticker").bootstrapTable("load", [
            ...this.$store.getters.mergedRecords
          ]);
        } else {
          $("#ticker").bootstrapTable("load", [
            ...this.$store.state.ticker.records
          ]);
        }
      }.bind(this)
    );

    this.$store.commit({
      type: "ADD_TICKER_LISTENER",
      listener: function() {
        if (this.$store.state.autoMerging) {
          $("#ticker").bootstrapTable("load", [
            ...this.$store.state.ticker.mergedRecords
          ]);
        } else {
          $("#ticker").bootstrapTable("load", [
            ...this.$store.state.ticker.records
          ]);
        }
      }.bind(this)
    });
  },
  mounted: function() {
    $("#ticker").data("rowStyle", function(row, index) {
      if (index == 0) {
        return { classes: "pink-fade-out" };
      } else {
        if (row["direction"] === "BUY") {
          return { classes: "bg-danger" };
        } else if (row["direction"] === "SELL") {
          return { classes: "bg-success" };
        } else {
          return { classes: "" };
        }
      }
    });
    $("th[data-field='time']").data("formatter", function(value, row, index) {
      return value.format("HH:mm:ss");
    });
  }
};
</script>

<style lang="scss">
@keyframes fade-out {
  100% {
    background-color: transparent;
  }
}

.pink-fade-out {
  background-color: pink;
  animation: fade-out 1s linear 1 normal forwards;
}
</style>

