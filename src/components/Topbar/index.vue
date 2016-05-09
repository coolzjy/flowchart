<style>
  .topbar {
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
    border-bottom: 1px solid #ddd;
  }
  .topbar .logo {
    font-size: 24px;
    float: left;
    text-decoration: none;
    color: #333;
  }
  .topbar .navbar {
    float: left;
    margin-left: 50px;
  }
  .topbar .navbar a {
    position: relative;
    display: inline-block;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 0 15px;
    text-decoration: none;
    color: #333;
    transition: all .3s;
  }
  .topbar .navbar a:hover {
    background-color: #f8f8f8;
  }
  .topbar .navbar a.v-link-active::after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    content: '';
    background-color: #0DE4EF;
  }
</style>

<template>
  <nav class="topbar">
    <a href="/#" class="logo">Flowchart</a>
    <div class="navbar">
      <a v-link="{ name: 'projects' }">项目列表</a>
    </div>
  </nav>
</template>
