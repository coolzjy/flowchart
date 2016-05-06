<style lang="less">
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
  .btn {
    display: inline-block;
    text-align: center;
    padding: 0 15px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #ddd;
    border-radius: 2px;
    cursor: pointer;
    transition: all .1s;
    -webkit-user-select: none;

    &:hover {
      background-color: #eee;
    }
    &:active {
      position: relative;
      top: 2px;
    }
  }
  .btn-danger {
    background-color: #FB6E6E;
    color: #fff;
    border-color: #FB6E6E;

    &:hover {
      background-color: #DC5454;
    }
  }
</style>

<template>
  <topbar></topbar>
  <router-view></router-view>
</template>

<script>
import Topbar from 'components/Topbar'
import store from 'src/store'
import actions from 'src/store/actions'
export default {
  store,
  vuex: {
    actions
  },
  components: {
    Topbar
  },
  ready () {
    this.$firebase.child('projects').on('value', snapshot => {
      this.updateProjectList(snapshot.val())
    })
  }
}
</script>
