<style>
  html, body {
    height: 100%;
    width: 100%;
  }
  .page {
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 64px;
    display: flex;
    width: 100%;
    height: 100%;
  }
  .page-content {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <Topbar></Topbar>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './store'
  import Topbar from 'Topbar'
  export default {
    store,
    components: {
      Topbar
    }
  }
</script>
