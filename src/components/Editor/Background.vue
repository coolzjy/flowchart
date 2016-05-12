<style scoped>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <canvas :width="style.background.width" :height="style.background.height" v-el:canvas></canvas>
</template>

<script>
  export default {
    vuex: {
      getters: {
        style: state => state.project.settings,
        lines: state => state.project.data.lines,
        currentBlockId: state => state.workspace.currentBlockId
      }
    },

    watch: {
      style: {
        deep: true,
        handler: 'refresh'
      },
      lines () {
        this.refresh()
      }
    },

    methods: {
      clear () {
        this.ctx.clearRect(0, 0, this.style.background.width, this.style.background.height)
      },
      refresh () {
        this.clear()
        this.renderGrid()
        this.renderLink()
      },
      renderGrid () {
        var { grid, background } = this.style
        var style = { lineWidth: 1, color: '#eee' }
        // width - y
        for (let i = 0; i <= background.width / grid.size; i++) {
          this.drawLine(
            { x: i * grid.size, y: 0 },
            { x: i * grid.size, y: background.height },
            style
          )
        }

        // height - x
        for (let i = 0; i <= background.height / grid.size; i++) {
          this.drawLine(
            { x: 0, y: i * grid.size },
            { x: background.width, y: i * grid.size },
            style
          )
        }
      },
      renderLink () {
        this.lines.forEach(line => {
          this.drawLine(
            { x: line.x1, y: line.y1 },
            { x: line.x1, y: (line.y1 + line.y2) / 2 },
            this.style.line
          )
          this.drawLine(
            { x: line.x1, y: (line.y1 + line.y2) / 2 },
            { x: line.x2, y: (line.y1 + line.y2) / 2 },
            this.style.line
          )
          this.drawLine(
            { x: line.x2, y: (line.y1 + line.y2) / 2 },
            { x: line.x2, y: line.y2 },
            this.style.line
          )
        })
      },
      drawLine (from, to, style = {}) {
        this.ctx.beginPath()
        this.ctx.moveTo(from.x, from.y)
        this.ctx.lineTo(to.x, to.y)
        this.ctx.strokeStyle = style.color || '#666'
        this.ctx.lineWidth = style.width || 1
        this.ctx.stroke()
      }
    },

    ready () {
      this.ctx = this.$els.canvas.getContext('2d')
      this.refresh()
    }
  }
</script>
