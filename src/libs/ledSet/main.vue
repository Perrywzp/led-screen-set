/*
 * @Author: wangzhipei
 * @Date: 2018-12-04 07:02:59
 * @Desc: 用于led屏自定义区域
 * -----
 * @Last Modified By: wangzhipei
 * @Last Modified: 2018-12-04 07:02:59
 */
<template>
  <div class='led-set' >
    <toolbar :size="value.size" @save="hdSave" @del="hdDel" :canDel="curIndex >= 0"></toolbar>
    <div class="led-box">
      <div class="screen-layout" :style="{width: layout.width + 'px', height: layout.height + 'px'}">
        <screen v-model="value.areas" @selected="selected" :size="simulateScreenSize"
        :keywords="keywords"
        :curIndex="curIndex"
        :placeholder="placeholder"></screen>
      </div>
      <params v-model="curRect" class="led-params" v-show="curIndex >= 0"
        :multipleLimit="multipleLimit"
        :placeholder="placeholder"
        :selectName="selectName"
        :childrens="childrens"
        :keywords="keywords">
      </params>
    </div>
  </div>
</template>
<script>
import toolbar from './toolbar'
import screen from './screen'
import params from './params'
export default {
  name: 'led-set',
  components: { toolbar, params, screen },
  props: {
    layout: {
      type: Object,
      default () {
        return {
          width: 420,
          height: 420
        }
      }
    },
    value: {
      type: Object,
      default () {
        return {
          size: {width: 448, height: 288},
          areas: [{
            x: 20,
            y: 20,
            width: 300,
            height: 75,
            text: '恭喜发财',
            fontColor: '#c2484c',
            fontSize: 16,
            fontWeight: 'normal',
            horAlign: 'left'
          }, {
            x: 20,
            y: 120,
            width: 350,
            height: 75,
            text: '红包拿来',
            fontColor: '#e5de1d',
            fontSize: 18,
            fontWeight: 'normal',
            horAlign: 'center'
          }, {
            x: 20,
            y: 220,
            width: 400,
            height: 75,
            text: '城阙辅三秦，风烟望五津, 与君离别意，同是宦游人; 海内存知己，天涯若比邻; 无为在歧路，儿女共沾巾',
            fontColor: '#1de51d',
            fontSize: 20,
            fontWeight: 'bold',
            horAlign: 'right'
          }]
        }
      }
    },
    keywords: {
      type: Array,
      default () {
        return [
          {
            name: '类型一',
            id: '11111',
            childrens: [
              {name: '关键字1', id: 'key1111'},
              {name: '关键字2', id: 'key2221'}
            ]
          },
          {
            name: '类型二',
            id: '11111',
            childrens: [
              {name: '关键字3', id: 'key3333'},
              {name: '关键字4', id: 'key4444'}
            ]
          }
        ]
      }
    },
    multipleLimit: {
      type: Number,
      default: 100
    },
    placeholder: {
      type: Array,
      default () {
        return ['[', ']'] //
      }
    },
    selectKey: {
      type: String,
      default: 'dictCode'
    },
    selectName: {
      type: String,
      default: 'dictName'
    },
    childrens: {
      type: String,
      default: 'childrenList'
    }
  },
  data () {
    return {
      curRect: {},
      curIndex: -1,
      simulateScreenSize: {
        width: 0,
        height: 0
      }
    }
  },
  mounted () {
    this.bindKeyDelete()
    if (this.value.size) {
      this.simulateScreenSize = this.clacSimulateScreenSize()
    }
    this.$nextTick(() => {
      if (this.value.areas.length) {
        this.curRect = this.value.areas[0]
        this.curIndex = 0
      }
    })
  },
  watch: {
    curRect () {
      this.value.areas[this.curIndex] = this.curRect
    }
  },

  methods: {
    bindKeyDelete () {
      document.onkeydown = e => {
        if (e.keyCode === 46 && this.curIndex >=0 ) {
          this.hdDel()
        }
      }
    },
    selected ({index, rect}) {
      this.curRect = rect
      this.curIndex = index
    },
    hdSave (data) {
      this.value.size = data
      this.simulateScreenSize = this.clacSimulateScreenSize()
      // 置空数据
      this.value.areas.splice(0, this.value.areas.length)
      this.curIndex = -1
      this.$emit('input', this.value)
    },
    hdDel () {
      if (this.curIndex < 0) return
      this.$confirm('此操作将永久删除该区域数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'question'
      }).then(() => {
        this.value.areas.splice(this.curIndex, 1)
        this.curIndex = -1
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    clacSimulateScreenSize () {
      let simulateScreenSize = {}
      let { size } = this.value
      if (Number(size.width) >= Number(size.height)) {
        simulateScreenSize.width = this.layout.width
        simulateScreenSize.height = (size.height / size.width) * simulateScreenSize.width
      } else {
        simulateScreenSize.height = this.layout.height
        simulateScreenSize.width = (size.width / size.height) * simulateScreenSize.height
      }
      return simulateScreenSize
    }
  }
}
</script>
<style lang='less' scoped>
.led-set {
  width: 1024px;
  height: 600px;
}
.led-box {
  width: 100%;
  .screen-layout{
    float: left;
    margin-right: 20px;
    background: #f5f5f5;
  }
  .led-params {
    width: 54%;
    height: 100%;
  }
}
</style>
