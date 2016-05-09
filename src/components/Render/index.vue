<style lang="less">
  .flowchart-render {
    position: relative;
    border: 1px dashed #ddd;
    overflow: hidden;

    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 99;
    }

    .block {
      position: absolute;
      z-index: 999;
      border: 1px solid #333;

      .name {
        text-align: center;
        padding-top: 30%;
      }
    }
  }
</style>

<template>
  <div class="flowchart-render" v-if="model" :style="backgroundStyle">
    <canvas v-el:canvas :width="backgroundStyle.width" :height="backgroundStyle.height" :style="backgroundStyle"></canvas>
    <div class="block" :style="blockStyle(block)" v-for="block in localData.blocks" track-by="$index">
      <div class="name">{{ block.name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['model'],

    data () {
      return {
        localData: {}
      }
    },

    watch: {
      model (model) {
        if (model && model.data) {
          this.localData = Object.assign(
            { blocks: [], lines: [], custom: [] },
            this.model.data.data || {}
          )
          this.refresh()
        }
      }
    },

    computed: {
      backgroundStyle () {
        var { background, width, height } = this.model.data.settings.background
        width += 'px'
        height += 'px'
        return { background, width, height }
      }
    },

    ready () {
      // todo
    },

    methods: {
      refresh () {
        this.ctx = this.$els.canvas.getContext('2d')
        this.refreshCanvas()
      },
      refreshCanvas () {
        this.ctx.clearRect(0, 0, this.model.data.settings.background.width, this.model.data.settings.background.height)
        this.localData.lines.forEach(line => {
          this.renderLink(line)
        })
      },
      renderLink (link) {
        var { grid, line } = this.model.data.settings
        this.ctx.beginPath()
        this.ctx.moveTo(link.x1, link.y1)
        this.ctx.lineTo(link.x1, link.y2 - grid.size)
        this.ctx.moveTo(link.x1, link.y2 - grid.size)
        this.ctx.lineTo(link.x2, link.y2 - grid.size)
        this.ctx.moveTo(link.x2, link.y2 - grid.size)
        this.ctx.lineTo(link.x2, link.y2)
        this.ctx.strokeStyle = line.color || '#666'
        this.ctx.lineWidth = line.lineWidth || '1'
        this.ctx.stroke()
      },
      blockStyle (block) {
        var { background, borderColor, width, height } = this.model.data.settings.block
        var { x, y } = block
        var { size } = this.model.data.settings.grid
        var left = x * size + 'px'
        var top = y * size + 'px'
        width += 'px'
        height += 'px'
        return {
          background,
          borderColor,
          width,
          height,
          left,
          top
        }
      }
    }
  }
</script>
