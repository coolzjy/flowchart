<style lang="less">
  .preview {
    margin: 0 30px 0 360px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0 15px 15px 15px;
  }
  .preview-head {
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #aaa;

    .btn {
      margin-left: 15px;
    }
  }
  .preview-json {
    padding: 15px 0;
  }
</style>

<template>
  <div class="preview" v-if="projectName">
    <div class="preview-head">
      <span>{{ projectName }}</span>
      <div class="btn btn-primary" v-link="{ name: 'editor', params: { name: projectName } }">在线编辑</div>
      <div class="btn btn-danger">发布线上</div>
    </div>
    <div class="preview-canvas">
      <p>预览</p>
      <div v-el:render></div>
    </div>
  </div>
</template>

<script>
  import Render from 'flowchart-render'
  export default {
    components: {
      Render
    },

    props: ['projectName'],

    ready () {
      this.render = new Render()
    },

    watch: {
      projectName (name) {
        if (name) {
          this.render.init(this.$els.render, {
            source: 'firebase',
            name: this.projectName
          })
        }
      }
    }
  }
</script>
