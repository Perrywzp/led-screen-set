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
      <div class="screen-layout" :style="{width: layout.width + 'px', height: layout.height + 'px', lineHeight: layout.height + 'px'}">
        <span v-if="showTip">请在该区域中配置屏幕尺寸</span>
        <screen v-else v-model="value.areas" @selected="selected" :size="simulateScreenSize" class="led-screen"
        :layout="value.size"
        :keywords="keywords"
        :curIndex="curIndex"
        :selectName="selectName"
        :childrens="childrens"
        :selectKey="selectKey"
        :placeholder="placeholder"
        @getScreenAreas="updateScreenAreas"></screen>
      </div>
      <params v-model="curRect" class="led-params" v-show="curIndex >= 0"
        :multipleLimit="multipleLimit"
        :placeholder="placeholder"
        :selectName="selectName"
        :childrens="childrens"
        :selectKey="selectKey"
        :keywords="keywords"
        :newFlag="newFlag"
        @changeNewFlag="hdNewFlag">
      </params>
    </div>
  </div>
</template>
<script>
import toolbar from './toolbar'
import screen from './screen'
import params from './params'
export default {
  name: 'led-screen-set',
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
          size: {width: 0, height: 0},
          areas: []
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
      },
      showTip: false,
      newFlag: false
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
        this.newFlag = true
      }
    })
  },
  watch: {
    curRect () {
      this.value.areas[this.curIndex] = this.curRect
    },
    value () {
      this.showTip = false
      if (this.value.size && this.value.size.width > 0 && this.value.size.height > 0) {
        this.$nextTick(() => {
          this.simulateScreenSize = this.clacSimulateScreenSize()
          if (this.value.areas.length) {
            this.curRect = this.value.areas[0]
            this.curIndex = 0
            this.newFlag = true
          }
        })
      }
    }
  },
  methods: {
    updateScreenAreas (areas) {
      this.value.areas = areas
      this.$emit('input', this.value)
    },
    hdNewFlag () {
      this.newFlag = false
    },
    bindKeyDelete () {
      document.onkeydown = e => {
        if (e.keyCode === 46 && this.curIndex >=0 ) {
          this.hdDel()
        }
      }
    },
    selected ({index, rect}) {
      // 此处的newFlag标识值作用是防止选择区域时因showType对应的select发生change导致显示内容被清空
      if( index >= 0 && this.curIndex >= 0 && rect.showType === this.curRect.showType ) {
        this.newFlag = false
      } else {
        this.newFlag = true
      }
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
        this.$emit('input', this.value)
        this.curIndex = -1
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    clacSimulateScreenSize () {
      let simulateScreenSize = {}
      let { width, height } = this.value.size
      width = Number(width)
      height = Number(height)
      if (width === 0 || height === 0) {
        simulateScreenSize = {width: 0, height: 0}
        this.showTip = true
      }else{
        if (width >= height) {
          simulateScreenSize.width = this.layout.width
          simulateScreenSize.height = (height / width) * simulateScreenSize.width
        } else {
          simulateScreenSize.height = this.layout.height
          simulateScreenSize.width = (width / height) * simulateScreenSize.height
        }
        this.showTip = false
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
  .screen-layout {
    float: left;
    margin-right: 20px;
    background: #f5f5f5;
    position: relative;
    span {
      font-size: 12px;
      color: #666;
    }
    text-align: center;
  }
  .led-screen {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10
  }
  .led-params {
    width: 54%;
    height: 100%;
  }
}
</style>
