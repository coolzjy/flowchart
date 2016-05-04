<style lang="less">
  .sidebar {
    width: 300px;
    height: 100%;
    border-right: 1px solid #eee;
  }
  .sidebar-actions {
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .sidebar-list {
    margin: 0;
    width: 100%;
    li {
      padding: 0 15px;
      line-height: 36px;
      border-bottom: 1px solid #eee;
    }
  }
  .sidebar-list-loading {
    text-align: center;
    line-height: 40px;
  }
</style>

<template>
  <div class="sidebar">
    <div class="sidebar-actions">
      <div class="btn" @click="createProject">新建</div>
    </div>
    <ul class="sidebar-list">
      <li v-for="name in projectNames" track-by="$index">
        <a v-link="{ name: 'project-detail', params: { id: name } }" @click="setCurrentProject(name)">{{ name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { root } from '../../services/firebase'
  import actions from '../../store/actions'
  export default {
    vuex: {
      actions
    },

    data () {
      return {
        projectNames: []
      }
    },

    created () {
      root.child('projects').on('value', snapshot => {
        this.projectNames = Object.keys(snapshot.val() || {})
      })
    },

    methods: {
      createProject () {
        var project = root.child('projects').push()
        project.set({
          createdTime: new Date().getTime(),
          author: 'system'
        })
      }
    }
  }
</script>
