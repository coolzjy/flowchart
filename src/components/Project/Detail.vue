<style lang="less">
  .project {
    margin: 30px;
  }
  .project-row {
    display: flex;
    align-items: center;
    > span {
      margin-right: 10px;
    }
    > input {
      width: 200px;
      text-align: center;
    }
    .btn {
      margin: 0 10px;
    }
    .btn-danger {
      background-color: #EC6F6F;
    }
  }
</style>

<template>
  <div class="project">
    <div class="project-row">
      <span>项目名称</span>
      <input type="text" v-model="projectName">
      <div class="btn" @click="save">保存</div>
      <a class="btn" v-link="{ name: 'editor', params: { id: $route.params.id } }">在线编辑</a>
      <div class="btn btn-danger" @click="delete">删除项目</div>
    </div>
    <p>预览</p>
    <div class="preview">
      {{ projectData | json }}
    </div>
  </div>
</template>

<script>
  import { projects } from '../../services/firebase'
  import actions from '../../store/actions'
  export default {
    vuex: {
      getters: {
        currentProject: state => state.project.current
      },
      actions
    },

    data () {
      return {
        projectName: '',
        projectData: {}
      }
    },

    watch: {
      currentProject (name) {
        this.projectName = name
        projects.child(this.currentProject).once('value', snapshot => {
          this.projectData = snapshot.val()
        })
      }
    },

    created () {
      this.setCurrentProject(this.$route.params.id)
      this.projectName = this.currentProject

      projects.child(this.currentProject).once('value', snapshot => {
        this.projectData = snapshot.val()
      })
    },

    methods: {
      save () {
        if (this.currentProject === this.projectName) {
          return
        }
        projects.child(this.currentProject).once('value', snapshot => {
          projects.child(this.projectName).set(snapshot.val())
        })
        projects.child(this.currentProject).remove()
        this.$route.router.go({ name: 'project-detail', params: { id: this.projectName } })
      },
      delete () {
        projects.child(this.currentProject).remove()
        this.$route.router.go({ name: 'project' })
      }
    }
  }
</script>
