<style lang="less">
  .page-editor {
    .workspace {
      position: relative;
    }
  }
</style>

<template>
  <div class="workspace" :style="workspaceStyle" @click="onBackgroudClick">
    <Block v-for="block in blocks" :model="block"></Block>
  </div>
</template>

<script>
  import Block from './Block'
  import actions from 'src/store/actions'
  export default {
    vuex: {
      actions,
      getters: {
        data: state => state.project.data,
        settings: state => state.project.settings
      }
    },

    components: {
      Block
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
      }
    }
  }
</script>
