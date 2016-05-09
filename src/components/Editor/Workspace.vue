<style lang="less">
  .page-editor {
    .workspace {
      position: relative;
    }
  }
</style>

<template>
  <div class="workspace" :class="workspaceClass" :style="workspaceStyle" @click="onBackgroudClick" @mousemove="onMouseMove" @mouseup="onMouseUp">
    <Background></Background>
    <Block v-for="block in blocks" :model="block"></Block>
  </div>
</template>

<script>
  import Block from './Block'
  import Background from './Background'
  import actions from 'src/store/actions'
  export default {
    vuex: {
      actions,
      getters: {
        data: state => state.project.data,
        settings: state => state.project.settings,
        isBlockMoving: state => state.workspace.isBlockMoving,
        mouseOffsetBlock: state => state.workspace.mouseOffsetBlock,
        currentPointId: state => state.workspace.currentPointId
      }
    },

    components: {
      Block,
      Background
    },

    data () {
      return {
        blocks: []
      }
    },

    watch: {
      data () {
        this.refreshBlocks(this.data.blocks)
      }
    },

    computed: {
      workspaceStyle () {
        var { width, height, background } = this.settings.background
        width += 'px'
        height += 'px'
        return { width, height, background }
      },
      workspaceClass () {
        return {
          linking: this.currentPointId
        }
      }
    },

    ready () {
      this.refreshBlocks(this.data.blocks)
    },

    methods: {
      refreshBlocks (blocks) {
        this.blocks = blocks
      },
      onBackgroudClick () {
        this.setCurrentBlockId()
        this.setCurrentPointId()
      },
      onMouseMove (event) {
        let { pageX, pageY } = event
        let { grid } = this.settings
        if (this.isBlockMoving) {
          var position = {
            x: parseInt((pageX - 360 - this.mouseOffsetBlock.x) / grid.size),
            y: parseInt((pageY - 90 - this.mouseOffsetBlock.y) / grid.size)
          }
          this.updateBlockPosition(position)
        }
      },
      onMouseUp () {
        this.setBlockMoving(false)
      }
    }
  }
</script>
