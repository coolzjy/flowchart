<template>
  <router-view></router-view>
</template>

<script>
  import store from './store'
  export default {
    store,
    ready () {
      console.log('hello flowchart')
    }
  }
</script>
