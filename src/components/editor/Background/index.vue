
<style>
  .editor-background {
    position: absolute;
  }
</style>

<template>
  <canvas class="editor-background" :width="styleObject.width" :height="styleObject.height" v-el:canvas :style="styleObject"></canvas>
</template>

<script type="text/ecmascript-6">
  export default {
    vuex: {
      getters: {
        lines: state => state.lines,
        grid: state => state.canvas.grid
      }
    },
    props: {
      styleObject: {
        type: Object,
        default: () => {}
      }
    },
    watch: {
      lines: {
        handler: 'refresh',
        deep: true
      }
    },
    ready () {
      this.refresh()
    },
    methods: {
      refresh () {
        var ctx = this.$els.canvas.getContext('2d')
        this.clearCanvas(ctx)
        this.lines.forEach(line => {
          this.drawLine(ctx, line.start, line.end)
        })
      },
      clearCanvas (ctx) {
        ctx.clearRect(0, 0, parseInt(this.styleObject.width), parseInt(this.styleObject.height))
      },
      drawLine (ctx, from, to) {
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(from.x, to.y - this.grid.style.size / 2)
        ctx.lineTo(to.x, to.y - this.grid.style.size / 2)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      }
    }
  }
</script>
