<template>
  <h3>flowchart</h3>
  <p>a live flowchart editor</p>
  <ul>
    <li><a v-link="{ name: 'main' }">new chart</a></li>
    <li><a v-link="{ name: 'render' }">view chart from existing json</a></li>
  </ul>
</template>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }
</style>
