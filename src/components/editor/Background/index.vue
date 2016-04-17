
<style>
  .editor-background {
    position: absolute;
  }
</style>

<template>
  <canvas class="editor-background" :width="styleObject.width" :height="styleObject.height" v-el:canvas :style="styleObject"></canvas>
</template>

<script>
  export default {
    vuex: {
      getters: {
        lines: state => state.lines
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
        ctx.lineTo(from.x, (from.y + to.y) / 2)
        ctx.lineTo(to.x, (from.y + to.y) / 2)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      }
    }
  }
</script>
