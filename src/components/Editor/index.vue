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
    margin: 0;
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
    height: 25px;
    line-height: 25px;
  }

  .control-panel .edit-canvas span,
  .control-panel .edit-line span {
    vertical-align: middle;
  }

  .control-panel .color-block {
    width: 53px;
    height: 23px;
    display: inline-block;
    border: solid 1px #000;
    box-sizing: border-box;
    vertical-align: middle;
  }

  .work-panel {
    margin-left: 200px;
    position: relative;
    background-color: #fffcef;
    min-height: 100%;
    width: 100%;
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

<template>
  <div class="control-panel">
    <p class="title">管理模块</p>
    <ul class="add-block">
      <li v-for="item in blockCategories">
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
        <div v-if="!editingCanvas" :style="{ 'background-color': canvasStyle.background }" class="color-block"></div>
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
        <div v-if="!editingLine" :style="{ 'background-color': lineStyle.color }" class="color-block"></div>
        <input type="color" v-model="editLineColor" v-if="editingLine">
      </li>
    </ul>
    <button @click="editLine" v-if="!editingLine" class="single-button">编辑线条</button>
    <button @click="confirmLine" v-if="editingLine" class="single-button">确定</button>

    <p class="title">项目</p>
    <button @click="saveProject" class="single-button">保存</button>
  </div>

  <div class="work-panel" v-el:main @dragover.stop.prevent @drop.prevent="drop">
    <background :style-object="canvasStyleObject"></background>
    <div class="canvas" v-bind:style="canvasStyleObject">
      <div
        class="block"
        v-for="block in blocks"
        :style="{ left: block.x, top: block.y, width: block.width, height: block.height }"
        :class="{ 'active': activeId === block.id, 'hover': hoverId === block.id }"
        transition="block-enter"
        draggable="true"
        v-clickoutside="resetActive()"
        @mouseenter="enterBlock(block.id)"
        @mouseleave="leaveBlock()"
        @click.stop="selectBlock(block.id)"
        @dragstart.stop="dragStart($event, block.id)"
        @dragover.stop.prevent>
        <div class="start-dot" :class="{ 'active': startDot === $index }" @click.stop="setStartDot(block.id)" v-if="!dragging"></div>
        <div class="end-dot" :class="{ 'ready': startDot !== null && startDot !== block.id }" @click.stop="setEndDot(block.id)"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import actions from '../../store/actions'
  import { saveProject, projects } from '../../services/firebase'
  import Background from './Background'
  export default {
    components: {
      Background
    },
    vuex: {
      getters: {
        lines: state => state.lines,
        blocks: state => state.blocks,
        blockCategories: state => state.blockCategories,
        gridSize: state => state.canvas.grid.style.size,
        canvasStyle: state => state.canvas.style,
        lineStyle: state => state.canvas.line,
        currentProject: state => state.project.current,
        raw: state => {
          return {
            lines: state.lines,
            blocks: state.blocks,
            blockCategories: state.blockCategories,
            canvas: state.canvas
          }
        }
      },
      actions
    },
    data() {
      return {
        blockId: 0,
        categoryId: 0,
        editingCategory: null,
        editWidth: 0,
        editHeight: 0,
        draggingBlockId: null,
        initPosition: {},
        canvasLeft: '20px',
        canvasTop: '20px',
        editingCanvas: false,
        editCanvasWidth: 0,
        editCanvasHeight: 0,
        editCanvasBackground: '#ffffff',
        editingLine: false,
        editLineWidth: 0,
        editLineColor: '#000000',
        dragging: false,
        activeId: null,
        hoverId: null,
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
        this.addBlock({
          id: this.blockId++,
          x: '20px',
          y: '20px',
          width: category.width + 'px',
          height: category.height + 'px',
          category: category.id
        })
      },

      dragStart(event, id) {
        this.selectBlock(id)
        this.startDot = null
        this.dragging = true
        this.hoverId = null
        this.initPosition = { x: event.clientX, y: event.clientY }
        this.draggingBlockId = id
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
        let draggingBlock = this.blocks.filter(item => item.id === this.draggingBlockId)[0]
        this.dropBlock(draggingBlock, stickTo, dragVector)
        this.redrawDisturbedLines(draggingBlock)
        this.draggingBlockId = null
        // 关闭 grid

      },

      enterBlock(id) {
        if (!this.dragging && this.startDot === null) {
          this.hoverId = id
        }
      },

      leaveBlock() {
        this.hoverId = null
      },

      selectBlock(id) {
        this.activeId = id
      },

      resetActive() {
        this.activeId = null
        this.startDot = null
        this.hoverId = null
      },

      onDeleteBlock(event) {
        if (event.which === 8 && this.activeId !== null) {
          event.preventDefault()
          this.deleteLines(this.activeId)
          this.deleteBlock(this.activeId)
          this.resetActive()
        }
      },

      deleteLines(id) {
        this.filterLines(id)
      },

      addCategory() {
        this.addBlockCategory({
          id: this.categoryId++,
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
//        category.width = this.editWidth
//        category.height = this.editHeight
        this.changeCategory(category, {
          width: this.editWidth,
          height: this.editHeight
        })
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
        this.changeCanvasStyle({
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
        this.changeLineStyle({
          width: this.editLineWidth,
          color: this.editLineColor
        })
        this.editingLine = false
      },

      resetChangedCategoryBlocks(category) {
        this.blocks.forEach((block) => {
          if (block.category === category.id) {
            this.resizeBlock(block, category)
            this.redrawDisturbedLines(block)
          }
        })
      },

      redrawDisturbedLines(block) {
        this.lines.forEach((line) => {
          if (line.start.block === block.id || line.end.block === block.id) {
            this.resetLine(line, this.setLine(line.start.block, line.end.block))
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

      setStartDot(id) {
        this.startDot = id
      },

      setEndDot(id) {
        if (this.startDot !== null && this.startDot !== id) {
          this.endDot = id
          this.getLineCoordinates()
        }
      },

      setLine(startBlockId, endBlockId) {
        let startBlock = this.blocks.filter(block => block.id === startBlockId)[0]
        let endBlock = this.blocks.filter(block => block.id === endBlockId)[0]
        return {
          start: {
            block: startBlockId,
            x: parseInt(startBlock.x, 10) + 0.5 * parseInt(startBlock.width, 10),
            y: parseInt(startBlock.y, 10) + parseInt(startBlock.height, 10)
          },
          end: {
            block: endBlockId,
            x: parseInt(endBlock.x, 10) + 0.5 * parseInt(endBlock.width, 10),
            y: parseInt(endBlock.y, 10)
          }
        }
      },

      getLineCoordinates() {
        let line = this.setLine(this.startDot, this.endDot)
        this.addLine(line)
        this.startDot = null
        this.endDot = null
      },

      saveProject () {
        saveProject(this.currentProject, this.raw)
      }
    },

    created () {
      this.setCurrentProject(this.$route.params.id)
    },

    ready() {
      document.addEventListener('keydown', this.onDeleteBlock)
      this.locateCanvas()

      projects.child(this.currentProject).once('value', snapshot => {
//        let lines = snapshot.val().lines
//        let blocks = snapshot.val().blocks
//        console.log(snapshot.val())
//        console.log(lines[0].start.block, blocks[0], lines[0].start.block === blocks[0])
        this.loadProject(snapshot.val())
      })
    },

    beforeDestroy() {
      document.removeEventListener('keydown', this.onDeleteBlock)
    }
  }
</script>
