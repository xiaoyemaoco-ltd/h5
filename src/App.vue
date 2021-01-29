<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      active: 'home',
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  mounted() {
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
#cont {
  background-color: #2196f3;
}
#nav {
  background-color: unset;
}
</style>
