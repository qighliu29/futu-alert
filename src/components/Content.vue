<template>
  <div id="content" class="container">
      <table id="ticker" width="100%" data-toggle="table">
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
    this.$store.commit({
      type: "ADD_TICKER_LISTENER",
      listener: function() {
        const record = this.$store.getters.lastest;
        const row = {
          ...record,
          time: record.time.toLocaleString()
        };
        $("#ticker").bootstrapTable("prepend", [row]);
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

