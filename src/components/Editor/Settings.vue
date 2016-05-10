<style lang="less">
  .settings {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 300px;

    .actions {
      display: flex;
      padding: 15px;
      .btn {
        flex: 1;
        margin: 0 5px;
      }
    }

    .panel {
      border-bottom: 1px solid #ddd;
    }
    .panel-head {
      border-bottom: 2px solid #eee;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      background-color: #eee;
    }
    .panel-title {
      display: inline-block;
    }
    .panel-body {
      .row-input {
        padding: 5px 15px;
        border-bottom: 1px solid #f8f8f8;
        input {
          width: 60px;
          margin: 0 10px;
          text-align: center;
        }
      }
      .row-ul {
        padding: 5px 15px;
        border-bottom: 1px solid #f8f8f8;
        .btn {
          margin-left: 15px;
        }
        li {
          margin: 5px;
        }
      }
    }
  }
  .settings-section {
    border: 1px solid #ddd;
    border-radius: 2px;
    margin-bottom: 30px;
  }
</style>

<template>
  <div class="settings">
    <div class="settings-section" v-if="currentBlockId">
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">当前方块</div>
        </div>
        <div class="panel-body">
          <div class="row-input">
            <label>方块标识<input type="number" number :value="currentBlockId" readonly></label>
          </div>
          <div class="row-input">
            <label>方块名称<input type="text" v-model="currentBlock.name"></label>
          </div>
          <div class="row-input">
            <label>水平刻度<input type="number" number v-model="currentBlock.x"></label>
          </div>
          <div class="row-input">
            <label>垂直刻度<input type="number" number v-model="currentBlock.y"></label>
          </div>
          <div class="row-ul" v-if="currentBlock.links && currentBlock.links.length">
            <label>当前连线</label>
            <ul>
              <li v-for="link in currentBlock.links">
                <span>{{ link }}</span>
                <div class="btn btn-danger" @click="removeLink(link)">删除</div>
              </li>
            </ul>
          </div>
          <div class="actions">
            <div class="btn btn-danger" @click="deleteBlock">删除方块</div>
          </div>
        </div>
      </div>
    </div>
    <div class="settings-section">
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">背景样式</div>
        </div>
        <div class="panel-body">
          <div class="row-input">
            <label>背景颜色<input type="color" v-model="localSettings.background.background"></label>
          </div>
          <div class="row-input">
            <label>背景宽度<input type="number" number v-model="localSettings.background.width"></label>
          </div>
          <div class="row-input">
            <label>背景高度<input type="number" number v-model="localSettings.background.height"></label>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">网格辅助</div>
        </div>
        <div class="panel-body">
          <div class="row-input">
            <label>网格尺寸<input type="number" number v-model="localSettings.grid.size"></label>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">方块样式</div>
        </div>
        <div class="panel-body">
          <div class="row-input">
            <label>方块颜色<input type="color" v-model="localSettings.block.background"></label>
          </div>
          <div class="row-input">
            <label>边框颜色<input type="color" v-model="localSettings.block.borderColor"></label>
          </div>
          <div class="row-input">
            <label>方块宽度<input type="number" number v-model="localSettings.block.width"></label>
          </div>
          <div class="row-input">
            <label>方块高度<input type="number" number v-model="localSettings.block.height"></label>
          </div>
          <div class="actions">
            <div class="btn" @click="addNewBlock">添加方块</div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">线条样式</div>
        </div>
        <div class="panel-body">
          <div class="row-input">
            <label>线条颜色<input type="color" v-model="localSettings.line.color"></label>
          </div>
          <div class="row-input">
            <label>线条宽度<input type="number" number v-model="localSettings.line.width"></label>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">设置</div>
        </div>
        <div class="panel-body">
          <div class="actions">
            <div class="btn btn-danger" @click="reset">重置</div>
            <div class="btn btn-primary" @click="saveSettings">保存</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import actions from 'src/store/actions'
  export default {
    vuex: {
      actions,
      getters: {
        currentBlockId: state => state.workspace.currentBlockId,
        currentProjectName: state => state.workspace.currentProjectName,
        settings: state => state.project.settings,
        data: state => state.project.data
      }
    },

    data () {
      return {
        localSettings: {},
        currentBlock: {}
      }
    },

    watch: {
      settings () {
        this.fetchSettings()
      },
      localSettings () {
        this.updateProjectSettings(this.localSettings)
      },
      currentBlockId () {
        var block = this.data.blocks.find(item => item.id === this.currentBlockId)
        if (block) {
          this.currentBlock = block
        }
      }
    },

    methods: {
      fetchSettings () {
        Object.assign(this.localSettings, this.settings)
      },
      saveSettings () {
        this.$firebase.child('projects/' + this.$route.params.name + '/data').update({
          settings: this.settings,
          data: this.data
        }, error => {
          if (error) {
            window.alert(error)
          } else {
            window.alert('保存成功!')
          }
        })
      },
      reset () {
        this.$dispatch('reset')
      },
      addNewBlock () {
        this.addBlock({
          x: 5,
          y: 5
        })
      },
      deleteBlock () {
        this.removeBlock(this.currentBlockId)
      },
      removeLink (id) {
        this.removeBlockLink(this.currentBlockId, id)
      }
    },

    created () {
      this.fetchSettings()
    }
  }
</script>
