<style lang="less">
  nav {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #2DB2C7;
    margin: 0;
    .nav-wrapper {
      padding: 0 10px;
    }
    .v-link-active {
      background-color: rgba(0,0,0,0.1);
    }
    .brand-logo {
      background: none;
    }
  }
</style>

<template>
  <nav>
    <div class="nav-wrapper">
      <a v-link="{ name: 'home' }" class="brand-logo">Flowchart</a>
      <ul class="right hide-on-med-and-down">
        <li><a v-link="{ name: 'project' }">项目总览</a></li>
        <li><a v-link="{ name: 'manage' }">管理</a></li>
        <li><a v-link="{ name: 'render' }">Placeholder</a></li>
      </ul>
    </div>
  </nav>
</template>
