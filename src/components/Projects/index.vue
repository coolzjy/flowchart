<style lang="less">
  .page-projects {
    position: relative;
    padding-top: 30px;

    .projects-list {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 2px;

      .projects-actions {
        padding: 15px;
        border-bottom: 1px solid #ddd;
      }
      .preloader {
        text-align: center;
        padding: 15px;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        border-bottom: 1px solid #ddd;
        transition: all .1s;

        &:hover {
          background-color: #f8f8f8;
          .actions {
            visibility: visible;
          }
        }
        &.active {
          border-left: 4px solid #0DE4EF;
        }
        .name {
          display: inline-block;
          cursor: pointer;
        }
        .actions {
          visibility: hidden;
          float: right;
        }
      }
    }
  }
</style>

<template>
  <div class="page-projects">
    <div class="projects-list">
      <div class="projects-actions">
        <div class="btn" @click="createProject">新建</div>
      </div>
      <ul v-if="projectList.length">
        <li v-for="name in projectList" :class="{ active: name === currentProjectName }">
          <div class="name" @click="chooseProject(name)">{{ name }}</div>
          <div class="actions">
            <div class="btn" @click="renameProject(name)">重命名</div>
            <div class="btn btn-danger" @click="deleteProject(name)">删除</div>
          </div>
        </li>
      </ul>
      <div class="preloader" v-else>loading...</div>
    </div>
    <preview :project-name="currentProjectName"></preview>
  </div>
</template>

<script>
  import Preview from './Preview'
  import actions from 'src/store/actions'

  export default {
    components: {
      Preview
    },

    vuex: {
      actions,
      getters: {
        projectList: state => state.workspace.projectList,
        currentProjectName: state => state.workspace.currentProjectName,
        settings: state => state.project.settings
      }
    },

    methods: {
      chooseProject (name) {
        this.setCurrentProjectName(name)
      },
      deleteProject (name) {
        // todo : replace native
        if (window.confirm(`你确定要删除 [ ${name} ] 吗?`)) {
          this.$firebase.child('projects/' + name).remove()
          if (this.projectList.length) {
            this.chooseProject(this.projectList[0])
          }
        }
      },
      createProject () {
        // todo : replace native
        var name = window.prompt('请输入新项目的名称:')
        if (this.projectList.indexOf(name) > -1) {
          window.alert('名称重复！')
        } else {
          this.$firebase.child('projects/' + name).set(this.getEmptyProject())
        }
      },
      getEmptyProject () {
        return {
          createTime: new Date().toLocaleString(),
          author: 'SYSTEM',
          data: {
            settings: this.settings
          }
        }
      },
      renameProject (oldName) {
        var newName = window.prompt('请输入新的名称:')
        if (!newName) {
          return
        }
        if (this.projectList.indexOf(newName) > -1) {
          window.alert('名称重复！')
        } else {
          this.$firebase.child('projects/' + oldName).once('value', snapshot => {
            this.$firebase.child('projects/' + newName).set(snapshot.val())
          })
          this.$firebase.child('projects/' + oldName).remove()
          this.chooseProject(newName)
        }
      }
    },

    ready () {
      this.setCurrentProjectName('')
    }
  }
</script>
