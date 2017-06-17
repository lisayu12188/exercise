<template>
  <div id="app">
    <header id="header">
      <top></top>
    </header>
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
import top from './components/Top.vue';
export default {
  name: 'app',
  components: {
    top
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#header {
  position: fixed;
  width: 100%;
  z-index:99;
  top:0
}
</style>
