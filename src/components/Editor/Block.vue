<style lang="less">
  .flowchart-block {
    position: absolute;
    z-index: 999;
    border: 1px solid #333;
    cursor: move;

    .name {
      text-align: center;
      padding-top: 30%;
    }
  }
</style>

<template>
  <div class="flowchart-block" :style="style" @click.stop="onClick" @mousedown="onMouseDown">
    <div class="name" v-if="model.name" v-text="model.name"></div>
  </div>
</template>

<script>
  import actions from 'src/store/actions'
  export default {
    vuex: {
      actions,
      getters: {
        settings: state => state.project.settings
      }
    },

    props: ['model'],

    computed: {
      style () {
        var { width, height, background, borderColor } = this.settings.block
        width += 'px'
        height += 'px'
        var left = this.model.x * this.settings.grid.size + 'px'
        var top = this.model.y * this.settings.grid.size + 'px'
        return { width, height, background, borderColor, left, top }
      }
    },

    methods: {
      onMouseDown () {
      },
      onClick () {
        this.setCurrentBlockId(this.model.id)
      }
    }
  }
</script>
