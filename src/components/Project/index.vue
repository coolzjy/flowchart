<template>
  <Sidebar></Sidebar>
  <div class="page-content">
    <router-view></router-view>
  </div>
</template>

<script>
  import Sidebar from 'Sidebar'
  export default {
    components: {
      Sidebar
    }
  }
</script>
