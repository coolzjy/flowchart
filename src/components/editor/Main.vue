<template>
  <div class="control-panel">
    <p class="title">管理模块</p>
    <ul class="add-block">
      <li v-for="item in blockCategory">
        <p class="category-name">模块组 {{ $index + 1 }}</p>
        <p class="category-dimension">
          <span>宽</span>
          <span v-if="editingCategory !== item">{{ item.width }}</span>
          <input type="text" v-model="editWidth" v-if="editingCategory === item">
          <span>高</span>
          <span v-if="editingCategory !== item">{{ item.height }}</span>
          <input type="text" v-model="editHeight" v-if="editingCategory === item">
        </p>
        <div class="button" v-if="editingCategory !== item">
          <button @click="generateBlock(item)">添加模块</button>
          <button @click="editCategory(item)">编辑尺寸</button>
        </div>
        <div class="button" v-if="editingCategory === item">
          <button @click="editingCategory = null">取消</button>
          <button @click="confirmCategory(item)">确定</button>
        </div>
      </li>
    </ul>
    <button @click="addCategory" class="single-button">新增模块组</button>

    <p class="title">调整画布</p>
    <ul class="edit-canvas">
      <li>
        <span>宽</span>
        <span v-if="!editingCanvas">{{canvasStyle.width}}</span>
        <input type="text" v-model="editCanvasWidth" v-if="editingCanvas">
      </li>
      <li>
        <span>高</span>
        <span v-if="!editingCanvas">{{canvasStyle.height}}</span>
        <input type="text" v-model="editCanvasHeight" v-if="editingCanvas">
      </li>
      <li>
        <span>背景色</span>
        <span v-if="!editingCanvas">{{canvasStyle.background}}</span>
        <input type="color" v-model="editCanvasBackground" v-if="editingCanvas">
      </li>
    </ul>
    <button @click="editCanvas" v-if="!editingCanvas" class="single-button">调整画布</button>
    <button @click="confirmCanvas" v-if="editingCanvas" class="single-button">确定</button>

    <p class="title">编辑线条</p>
    <ul class="edit-line">
      <li>
        <span>线宽</span>
        <span v-if="!editingLine">{{lineStyle.width}}</span>
        <input type="text" v-model="editLineWidth" v-if="editingLine">
      </li>
      <li>
        <span>颜色</span>
        <span v-if="!editingLine">{{lineStyle.color}}</span>
        <input type="text" v-model="editLineColor" v-if="editingLine">
      </li>
    </ul>
    <button @click="editLine" v-if="!editingLine" class="single-button">编辑线条</button>
    <button @click="confirmLine" v-if="editingLine" class="single-button">确定</button>
  </div>

  <div class="work-panel" v-el:main @dragover.stop.prevent @drop.prevent="drop">
    <div class="canvas" v-bind:style="canvasStyleObject">
      <div
        class="block"
        v-for="block in blocks"
        :style="{ left: block.x, top: block.y, width: block.width, height: block.height }"
        :class="{ 'active': activeIndex === $index, 'hover': hoverIndex === $index }"
        transition="block-enter"
        draggable="true"
        v-clickoutside="resetActive()"
        @mouseenter="enterBlock($index)"
        @mouseleave="leaveBlock()"
        @click.stop="selectBlock($index)"
        @dragstart.stop="dragStart($event, $index)"
        @dragover.stop.prevent>
        <div class="start-dot" :class="{ 'active': startDot === $index }" @click.stop="setStartDot($index)" v-if="!dragging"></div>
        <div class="end-dot" :class="{ 'ready': startDot !== null && startDot !== $index }" @click.stop="setEndDot($index)"></div>
      </div>
    </div>
  </div>
</template>

<style>
  .control-panel {
    position: fixed;
    z-index: 10;
    width: 200px;
    height: 100%;
    float: left;
    background-color: #fafafa;
    border-right: solid 1px #ddd;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
    text-align: center;
    overflow: auto;
  }

  .control-panel .title {
    text-align: left;
    padding-left: 5px;
    font-size: 16px;
    font-weight: 900;
    border-top: solid 1px #fcf9eb;
    border-bottom: solid 1px #ccc;
    line-height: 32px;
    color: #fff;
    text-shadow: 2px 2px 2px #bbb;
    background-color: rgba(255, 208, 66, 0.5);
  }

  .control-panel ul {
    list-style: none;
  }

  .control-panel .add-block {
    text-align: center;
  }

  .control-panel .add-block li {
    padding: 8px 5px;
    transition: .3s;
  }

  .control-panel .add-block li:hover {
    background-color: rgba(255, 253, 97, 0.22);
  }

  .control-panel .category-name {
    line-height: 1.5;
    color: #999;
    text-align: left;
  }

  .control-panel .category-dimension {
    height: 30px;
    line-height: 30px;
  }

  .control-panel input {
    width: 50px;
  }

  .control-panel button {
    height: 25px;
    border-radius: 4px;
    background-color: #fff;
    border: none;
    box-shadow: 0 2px 2px #ccc, 0 0 3px #ccc;
    padding: 0 10px;
    color: #666;
    transition: .2s;
  }

  .control-panel button:hover {
    background-color: #fff6b6;
  }

  .control-panel button:focus {
    outline: none;
  }

  .control-panel .button button:first-child {
    margin-right: 12px;
  }

  .control-panel .single-button {
    width: 85%;
    margin: 10px 0;
  }

  .control-panel .edit-canvas li,
  .control-panel .edit-line li {
    height: 28px;
    line-height: 28px;
  }

  .work-panel {
    margin-left: 200px;
    position: relative;
    background-color: #fffcef;
    min-height: 100%;
  }

  .canvas {
    border: dashed 2px #ccc;
    position: relative;
    transition: .3s;
  }

  .block {
    box-sizing: border-box;
    position: absolute;
    top: 20px;
    background-color: #fff;
    border: solid 1px #ccc;
  }

  .block .start-dot,
  .block .end-dot {
    cursor: pointer;
    height: 20px;
    width: 20px;
    transition: .2s;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scale(0);
    border-radius: 50%;
  }

  .block .start-dot {
    bottom: -11px;
  }

  .block .end-dot {
    top: -11px;
  }

  .block.hover .start-dot,
  .block .start-dot.active {
    bottom: -11px;
    transform: translateX(-50%) scale(1);
    border: solid 1px #ffd042;
    box-shadow: 0 0 2px 2px #ffd042;
  }

  .block.hover .start-dot {
    background-color: #fff;
  }

  .block .start-dot.active {
    background-color: #bfff42;
  }

  .block .end-dot.ready {
    background-color: #fff;
    transform: translateX(-50%) scale(1);
    border: solid 1px #ffd042;
    box-shadow: 0 0 2px 2px #ffd042;
  }

  .block.active {
    border: solid 1px #ffd042;
    box-shadow: 0 0 2px 2px #ffd042;
  }

  .block-enter-transition {
    transition: transform .5s, opacity .2s, border .2s, box-shadow .2s, height .2s, width .2s;
  }

  .block-enter-enter {
    transform: translateX(-200px);
    opacity: 0;
  }

  .block-enter-leave {
    opacity: 0;
  }
</style>

<script type="text/ecmascript-6">
  import store from '../../store'
  import actions from '../../store/actions'

  export default {
    store,
    data() {
      return {
        blocks: [],
        lines: store.state.lines,
        blockCategory: [{ height: 100, width: 150 }],
        editingCategory: null,
        editWidth: 0,
        editHeight: 0,
        draggingBlockIndex: null,
        initPosition: {},
        gridSize: store.state.canvas.grid.style.size,
        canvasStyle: store.state.canvas.style,
        lineStyle: store.state.canvas.line,
        canvasLeft: '20px',
        canvasTop: '20px',
        editingCanvas: false,
        editCanvasWidth: 0,
        editCanvasHeight: 0,
        editCanvasBackground: 'fff',
        editingLine: false,
        editLineWidth: 0,
        editLineColor: '000',
        dragging: false,
        activeIndex: null,
        hoverIndex: null,
        startDot: null,
        endDot: null
      }
    },

    computed: {
      canvasStyleObject() {
        return {
          'width': this.canvasStyle.width + 'px',
          'height': this.canvasStyle.height + 'px',
          'background-color': this.canvasStyle.background,
          'left': this.canvasLeft,
          'top': this.canvasTop
        }
      }
    },

    methods: {
      generateBlock(category) {
        this.blocks.push({
          x: '20px',
          y: '20px',
          width: category.width + 'px',
          height: category.height + 'px',
          category
        })
      },

      dragStart(event, index) {
        this.selectBlock(index)
        this.startDot = null
        this.dragging = true
        this.hoverIndex = null
        this.initPosition = { x: event.clientX, y: event.clientY }
        this.draggingBlockIndex= index
        event.dataTransfer.effectAllowed = 'move'
        // 显示 grid

      },

      drop(event) {
        this.dragging = false
        let dragVector = { x: event.clientX - this.initPosition.x, y: event.clientY - this.initPosition.y }
        let stickTo = {
          x: dragVector.x / this.gridSize - Math.floor(dragVector.x / this.gridSize) < 0.5 ? 'floor' : 'ceil',
          y: dragVector.y / this.gridSize - Math.floor(dragVector.y / this.gridSize) < 0.5 ? 'floor' : 'ceil'
        }
        let draggingBlock = this.blocks[this.draggingBlockIndex]
        draggingBlock.x = parseInt(draggingBlock.x, 10) + Math[stickTo.x](dragVector.x / this.gridSize) * this.gridSize + 'px'
        draggingBlock.y = parseInt(draggingBlock.y, 10) + Math[stickTo.y](dragVector.y / this.gridSize) * this.gridSize + 'px'
        this.redrawDisturbedLines(this.blocks[this.draggingBlockIndex])
        this.draggingBlockIndex = null
        // 关闭 grid

      },

      enterBlock(index) {
        if (!this.dragging && this.startDot === null) {
          this.hoverIndex = index
        }
      },

      leaveBlock() {
        this.hoverIndex = null
      },

      selectBlock(index) {
        this.activeIndex = index
      },

      resetActive() {
        this.activeIndex = null
        this.startDot = null
        this.hoverIndex = null
      },

      deleteBlock(event) {
        if (event.which === 8 && this.activeIndex !== null) {
          event.preventDefault()
          this.deleteLines(this.blocks[this.activeIndex])
          this.blocks.splice(this.activeIndex, 1)
          this.resetActive()
        }
      },

      deleteLines(block) {
        actions.filterLines(store, block)
      },

      addCategory() {
        this.blockCategory.push({
          height: 100,
          width: 150
        })
      },

      editCategory(category) {
        this.editingCategory = category
        this.editWidth = category.width
        this.editHeight = category.height
      },

      confirmCategory(category) {
        category.width = this.editWidth
        category.height = this.editHeight
        this.editingCategory = null
        this.resetChangedCategoryBlocks(category)
      },

      editCanvas() {
        this.editCanvasWidth = this.canvasStyle.width
        this.editCanvasHeight = this.canvasStyle.height
        this.editCanvasBackground = this.canvasStyle.background
        this.editingCanvas = true
      },

      confirmCanvas() {
        actions.changeCanvasStyle(store, {
          width: this.editCanvasWidth,
          height: this.editCanvasHeight,
          background: this.editCanvasBackground
        })
        this.editingCanvas = false
        this.locateCanvas()
      },

      editLine() {
        this.editLineWidth = this.lineStyle.width
        this.editLineColor = this.lineStyle.color
        this.editingLine = true
      },

      confirmLine() {
        actions.changeLineStyle(store, {
          width: this.editLineWidth,
          color: this.editLineColor
        })
        this.editingLine = false
      },

      resetChangedCategoryBlocks(category) {
        this.blocks.forEach((block) => {
          if (block.category === category) {
            block.width = category.width + 'px'
            block.height = category.height + 'px'
            this.redrawDisturbedLines(block)
          }
        })
      },

      redrawDisturbedLines(block) {
        this.lines.forEach((line) => {
          if (line.start.block === block || line.end.block === block) {
            actions.resetLine(store, line, this.setLine(line.start.block, line.end.block))
          }
        })
      },

      locateCanvas() {
        let [mainHeight, mainWidth] = [this.$els.main.getBoundingClientRect().height, this.$els.main.getBoundingClientRect().width]
        if (mainWidth > parseInt(this.canvasStyle.width, 10)) {
          this.canvasLeft = Math.max(0.5 * (mainWidth - parseInt(this.canvasStyle.width, 10)), 20) + 'px'
        } else {
          this.canvasLeft = '20px'
        }
        if (mainHeight > parseInt(this.canvasStyle.height, 10)) {
          this.canvasTop = Math.max(0.5 * (mainHeight - parseInt(this.canvasStyle.height, 10)), 20) + 'px'
        } else {
          this.canvasTop = '20px'
        }
      },

      setStartDot(index) {
        this.startDot = index
      },

      setEndDot(index) {
        if (this.startDot !== null && this.startDot !== index) {
          this.endDot = index
          this.getLineCoordinates()
        }
      },

      setLine(startBlock, endBlock) {
        return {
          start: {
            block: startBlock,
            x: parseInt(startBlock.x, 10) + 0.5 * parseInt(startBlock.width, 10),
            y: parseInt(startBlock.y, 10) + parseInt(startBlock.height, 10)
          },
          end: {
            block: endBlock,
            x: parseInt(endBlock.x, 10) + 0.5 * parseInt(endBlock.width, 10),
            y: parseInt(endBlock.y, 10)
          }
        }
      },

      getLineCoordinates() {
        let [startBlock, endBlock] = [this.blocks[this.startDot], this.blocks[this.endDot]]
        let line = this.setLine(startBlock, endBlock)
        actions.addLine(store, line)
        this.startDot = null
        this.endDot = null
      }
    },

    ready() {
      document.addEventListener('keydown', this.deleteBlock)
      this.locateCanvas()
    },

    beforeDestroy() {
      document.removeEventListener('keydown', this.deleteBlock)
    }
  }
</script>
