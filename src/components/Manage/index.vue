<style scoped>
  .workspace {

  }
</style>

<template>
  <div class="workspace">
    <table>

    </table>
  </div>
</template>

<script>
  import Firebase from 'firebase'
  export default {
    data () {
      return {

      }
    },

    created () {
      this.ff = new Firebase('https://eleme-flowchart.firebaseio.com/')
    }
  }
</script>
