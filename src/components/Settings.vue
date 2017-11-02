<template>
    <ul id="settings" class="nav navbar-nav navbar-left">
        <li>
            <a id="settings-button" @click="toggleForm">
                <i class="fa fa-gear"></i>
            </a>
        </li>
        <li>
            <form id="settings-form" v-show="showForm" class="navbar-form navbar-left animated bounceInRight" role="settings">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Server address (port)">
                </div>
                <button type="submit" class="btn btn-default">Set</button>
            </form>
        </li>
    </ul>
</template>

<script>
export default {
  data: () => ({
    showForm: false
  }),
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    //   $("#ticker").bootstrapTable("prepend", [
    //     {
    //       code: "UWT",
    //       price: 12300,
    //       time: new Date(),
    //       volume: 1200,
    //       direction: "BUY"
    //     }
    //   ]);
    }
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

#settings-button {
  cursor: pointer;
}
</style>
