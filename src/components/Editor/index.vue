<style lang="less">
  .page-editor {
    position: absolute;

    .workspace-container {
      position: absolute;
      top: 30px;
      left: 360px;
      border: 1px dashed #ddd;
      overflow: hidden;
    }
  }
</style>

<template>
  <div class="page-editor" v-if="dataInit">
    <Settings></Settings>
    <div class="workspace-container">
      <Workspace></Workspace>
    </div>
  </div>
</template>

<script>
  import Workspace from './Workspace'
  import Settings from './Settings'
  import actions from 'src/store/actions'
  export default {
    vuex: {
      actions
    },

    components: {
      Settings,
      Workspace
    },

    data () {
      return {
        id: this.$route.params.name,
        dataInit: false
      }
    },

    ready () {
      this.$firebase.child('projects/' + this.id).on('value', snapshot => {
        var { data } = snapshot.val()
        this.dataInit = true
        if (data) {
          this.updateProjectSettings(data.settings)
          this.updateProjectData(data.data)
        }
      })
    }
  }
</script>
