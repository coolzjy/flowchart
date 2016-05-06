<template>
  <div class="flowchart-render" v-if="model">
    <div class="background"></div>
    <canvas></canvas>
    <div class="blocks"></div>
  </div>
</template>

<script>
  export default {
    props: ['model'],

    watch: {
      model (model) {
        if (model) {
          this.refresh()
        }
      }
    },

    methods: {
      refresh () {
        console.log('refresh', this.model)
      }
    }
  }
</script>
