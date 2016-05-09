<style lang="less">
  .flowchart-block {
    position: absolute;
    z-index: 999;
    border: 1px solid #333;
    -webkit-user-select: none;

    .name {
      text-align: center;
      padding-top: 30%;
    }

    .link-begin, .link-end {
      display: none;
      cursor: pointer;
      z-index: 9999;
      background-color: #fff;
      position: absolute;
      left: 50%;
      margin-left: -10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #333;
    }

    .link-begin {
      bottom: -11px;
    }

    .link-end {
      top: -11px;
    }

    &:hover {
      .link-begin {
        display: block;
      }
    }

    &.active {
      cursor: move;
    }

    &.link-active {
      .link-begin {
        display: block !important;
        &:after {
          position: absolute;
          content: '';
          top: 5px;
          left: 5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #000;
        }
      }
      .link-end {
        display: none !important;
      }
    }
  }

  .linking {
    .flowchart-block {
      .link-begin {
        display: none;
      }
      .link-end {
        display: block;
      }
    }
  }
</style>

<template>
  <div class="flowchart-block" :class="blockClass" :style="blockStyle" @click.stop="onClick" @mousedown="onMouseDown">
    <div class="name" v-if="model.name" v-text="model.name"></div>
    <div class="link-begin" :style="pointStyle" @click.stop="link"></div>
    <div class="link-end" :style="pointStyle" @click.stop="link"></div>
  </div>
</template>

<script>
  import actions from 'src/store/actions'
  export default {
    vuex: {
      actions,
      getters: {
        settings: state => state.project.settings,
        currentBlockId: state => state.workspace.currentBlockId,
        currentPointId: state => state.workspace.currentPointId
      }
    },

    props: ['model'],

    computed: {
      blockStyle () {
        var { width, height, background, borderColor } = this.settings.block
        width += 'px'
        height += 'px'
        var left = this.model.x * this.settings.grid.size + 'px'
        var top = this.model.y * this.settings.grid.size + 'px'
        var boxShadow = this.model.id === this.currentBlockId ? '1px 1px 5px ' + borderColor : null
        return { width, height, background, borderColor, left, top, boxShadow }
      },
      pointStyle () {
        var { borderColor } = this.blockStyle
        return { borderColor }
      },
      blockClass () {
        return {
          'active': this.model.id === this.currentBlockId,
          'link-active': this.model.id === this.currentPointId
        }
      }
    },

    methods: {
      onMouseDown ({ offsetX, offsetY }) {
        this.setMouseOffsetBlock({ x: offsetX, y: offsetY })
      },
      onClick () {
        this.setCurrentBlockId(this.model.id)
      },
      link () {
        if (this.currentPointId && this.currentPointId !== this.model.id) {
          this.addLink(this.currentPointId, this.model.id)
          this.setCurrentPointId()
        } else {
          this.setCurrentPointId(this.model.id)
        }
      }
    }
  }
</script>
