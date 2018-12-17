/*
 * @Author: wangzhipei
 * @Date: 2018-12-04 07:02:59
 * @Desc: led屏配置， 模拟屏幕模块
 * -----
 * @Last Modified By: wangzhipei
 * @Last Modified: 2018-12-04 07:02:59
 */
<template>
  <canvas ref="canvas" :width="size.width" :height="size.height"
    @mousedown="mousedown"
    @mouseout="mouseout"
    @mousemove="mousemove"
    @mouseup="mouseup">
    Your browser doe s not support the canvas element.
  </canvas>
</template>
<script>
import mixin from './mixin'
const fontFamily = 'Arial'
const defaultRectParams = {
  text: '欢迎光临: ',
  fontColor: '#ff0000',
  fontSize: 16,
  fontWeight: 'normal',
  horAlign: 0,
  showMode: 1
}
const horAlignKeys = ['left', 'center', 'right']
export default {
  name: 'led-screen',
  mixins: [mixin],
  props: {
    size: {
      type: Object,
      default () {
        return {
          width: 420,
          height: 420
        }
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          // 矩形框默认值
          rect: {
            borderColor: {
              normal: '#000', // 默认显示色值
              active: '#1E7FFF', // 选中激活时的边框色值
              crossed: '#7700ff', // 被绘制中的矩形框交叉到的矩形边框色值
              forbiden: '#FA3239', // 当绘制时出现交叠，则显示该色值
              drawing: '#1E7FFF' // 正在绘制中的边框色值
            },
            background: 'rgba(0, 0, 0, .5)'
          },
          limitRectArea: 1000,
          maxRects: 4 // 最多允许绘制多少个区域
        }
      }
    },
    keywords: {
      type: Array,
      default () { return [] }
    },
    placeholder: {
      type: Array,
      default () { return [] }
    },
    curIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      ctx: {},
      activeRectIndex: '',
      crossedRectIndexs: [],
      isDrawing: false,
      isDraging: false, // 判定是否在拖拽中
      drawingStart: '', // 主要存储开始绘制时的起始点
      drawingRect: '' // 用于绘制时存储的矩形框数据对象(绘制完需要清除, 赋值''即可)
    }
  },
  watch: {
    value: {
      handler () {
        this.render()
      },
      deep: true
    },
    curIndex () {
      this.activeRectIndex = this.curIndex
      this.render()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.inited()
      this.render()
    })
  },
  methods: {
    transiferToName (text) {
      let {placeholder, flatKeywords} = this
      let [startFlag, endFlag] = placeholder
      this.getMatchs(text || '').forEach(match => {
        let reg = new RegExp(`\\${startFlag}${match}\\${endFlag}`, 'g')
        let name = this.getValue(match, flatKeywords, 'id', 'name')
        text = text.replace(reg, `${startFlag}${name}${endFlag}`)
      })
      return text
    },
    /**
     * 获取匹配模板格式的子串
     */
    getMatchs (val) {
      let [startFlag, endFlag] = this.placeholder
      let reg = new RegExp(`\\${startFlag}[^\\${startFlag}\\${endFlag}]*(?=${endFlag})`, 'g')
      let matchs = val.match(reg)
      if (matchs) {
        return matchs.map(item => {
          return item.replace(startFlag, '')
        })
      } else {
        return []
      }
    },
    inited () {
      let canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
    },
    render () {
      this.ctx.clearRect(0, 0, this.size.width, this.size.height)
      this.value.forEach((rect, index) => {
        this.drawRect(rect, index)
        this.drawText(rect)
      })
    },
    drawRect (rect = {x: 0, y: 0, width: 55, height: 55}, index, status = '') {
      let {x, y, width, height} = rect
      let {borderColor, background} = this.options.rect
      let ctx = this.ctx
      ctx.fillStyle = background
      // 若是当前选中矩形， 则对其做
      if (index === this.activeRectIndex) {
        ctx.strokeStyle = borderColor.active
        ctx.strokeRect(x, y, width, height)
      }
      // 被绘制中的矩形框交叉到已有矩形框需要做突出处理
      // if (this.crossedRectIndexs.includes(index)) {
      //   ctx.strokeStyle = borderColor.crossed
      // }
      // 当是出现交叠情况时，对绘制中矩形框做红边框突出显示
      if (status === 'forbiden') {
        ctx.strokeStyle = borderColor.forbiden
        ctx.strokeRect(x, y, width, height)
      }
      // 当是处于绘制状态时
      if (status === 'drawing') {
        ctx.strokeStyle = borderColor.drawing
        ctx.strokeRect(x, y, width, height)
      }
      ctx.fillRect(x, y, width, height)
    },
    drawText(rect = {
      x: 20,
      y: 220,
      width: 480,
      height: 75,
      text: '城阙辅三秦，风烟望五津, 与君离别意，同是宦游人; 海内存知己，天涯若比邻; 无为在歧路，儿女共沾巾',
      fontColor: '#1de51d',
      fontSize: 20,
      fontWeight: 'bold',
      horAlign: 'right'}) {
      let {text, horAlign, fontSize, fontWeight, fontColor} = rect
      let {x, y, width, height} = rect
      let ctx = this.ctx
      let textX
      let textY = height / 2 + y
      let textMaxWidth = width - 15 * 2
      ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily
      ctx.fillStyle = fontColor
      horAlign = horAlignKeys[horAlign]
      if (horAlign === 'left') {
        textX = x + 15
      }
      if (horAlign === 'center') {
        textX = width / 2 + x
      }
      if (horAlign === 'right') {
        textX = x + width - 15
      }
      ctx.textAlign = horAlign
      ctx.textBaseline = 'middle'
      text = this.transiferToName(text)
      ctx.fillText(text, textX, textY, textMaxWidth)
    },
    mousedown (e) {
      let canvas = this.$refs.canvas
      // 取得当前画布上被单击的点
      let curX = e.pageX - canvas.offsetLeft
      let curY = e.pageY - canvas.offsetTop
      this.activeRectIndex = ''
      // 判定是点在了已有矩形框
      // 若是， 该矩形框需高亮
      for (let i = 0; i < this.value.length; i++) {
        let {x, y, width, height} = this.value[i]
        // 判定点是否在矩形框区域内
        if (curX >= x && curX <= x + width && curY >= y && curY <= y + height) {
          this.activeRectIndex = i
          this.render()
          this.$emit('selected', {index: i, rect: this.value[i]})
          break
        }
      }
      // 如果是在有矩形框上进行绘制，则return，不支持绘制
      if (this.activeRectIndex !== '') {
        // 若不是绘制, 则需清除之前存储过的起始点数据
        this.isDrawing = false
        // 在拖拽中
        this.isDraging = true
        return
      }
      // 做一次将要绘制的矩形框的起始点存储
      this.isDrawing = true
      // 这个时候是为了去除选中， 开始drawing
      this.render()
      this.drawingStart = {x: curX, y: curY}
    },
    // 在鼠标点击后的拖动事件， 进行绘制
    mousemove (e) {
      if (!this.isDrawing) return
      if (this.value.length >= this.options.maxRects) {
        // this.$message({
        //   type: 'info',
        //   message: `最多允许绘制${this.options.maxRects}个区域`
        // })
        return
      }
      let canvas = this.$refs.canvas
      // 取得当前画布上划过的点
      let startX = this.drawingStart && this.drawingStart.x
      let startY = this.drawingStart && this.drawingStart.y
      let curX = e.pageX - canvas.offsetLeft
      let curY = e.pageY - canvas.offsetTop
      let diffX = curX - startX
      let diffY = curY - startY
      let x
      let y
      let width = Math.abs(curX - startX)
      let height = Math.abs(curY - startY)
      let status = 'drawing' // 默认是drawing状态，后面出现交集，则需要切换成forbiden
      // 需要判定哪个点作为起始点的问题， 因为拖拽过程中的点，并非拖动中的点都会在
      // 右下
      if (diffX >= 0 && diffY >= 0) {
        [x, y] = [startX, startY]
      }
      // 右上
      if (diffX >= 0 && diffY < 0) {
        [x, y] = [startX, curY]
      }

      // 左下
      if (diffX < 0 && diffY >= 0) {
        [x, y] = [curX, startY]
      }

      // 左上
      if (diffX < 0 && diffY < 0) {
        [x, y] = [curX, curY]
      }
      // this.drawingRect && this.ctx.clearRect(x - 1, y - 1, width + 2, height + 2)
      this.drawingRect = {x, y, width, height}
      // 起始点是不会出现在有矩形框内的， 所以只需判定另三个点即可, 被否决， 出现了交叉情况便有问题了
      this.crossedRectIndexs = []
      for (let i = 0; i < this.value.length; i++) {
        if (this.boolRectCross(this.drawingRect, this.value[i])) {
          this.crossedRectIndexs.push(i)
          status = 'forbiden'
        }
      }
      this.render()
      this.drawRect(this.drawingRect, '', status)
    },
    mouseout () {
      this.isDrawing = false
      this.drawingRect = ''
      this.drawingStart = ''
      this.crossedRectIndexs = []
      this.activeRectIndex === '' && this.$emit('selected', {index: '', rect: {}})
      this.render()
    },
    mouseup () {
      this.isDrawing = false
      // 停止绘制时存在交集矩形框，需要处理
      if (this.crossedRectIndexs.length) {
        this.drawingRect = ''
        this.drawingStart = ''
        this.crossedRectIndexs = []
        this.$emit('selected', {index: this.activeRectIndex, rect: {}})
        this.render()
        return
      }
      if (this.drawingRect) {
        let {width, height} = this.drawingRect
        // 如果绘制区域面积太小， 则自动放弃
        if (width * height < this.options.limitRectArea) {
          this.drawingStart = ''
          this.drawingRect = ''
          this.$emit('selected', {index: this.activeRectIndex, rect: {}})
          this.render()
          return
        }
        // 新增的矩形就选中
        this.activeRectIndex = this.value.length
        let rect = Object.assign({}, defaultRectParams, this.drawingRect)
        this.value.push(rect)
        this.drawingStart = ''
        this.drawingRect = ''
        this.$emit('selected', {index: this.activeRectIndex, rect})
        this.$emit('input', this.value)
      } else {
        this.activeRectIndex === '' && this.$emit('selected', {index: '', rect: {}})
      }
    },
    // 判定两个矩形是否交叉
    boolRectCross (rect1, rect2) {
      let {max, min} = Math
      let crossX1 = max(rect1.x, rect2.x)
      let crossY1 = max(rect1.y, rect2.y)
      let crossX2 = min(rect1.x + rect1.width, rect2.x + rect2.width)
      let crossY2 = min(rect1.y + rect1.height, rect2.y + rect2.height)
      return !(crossX1 >= crossX2 || crossY1 >= crossY2)
    }
  }
}
</script>
<style lang='less' scoped>
  canvas {
    display: block;
    background: #eee url('./imgs/bg-sp.png') repeat
  }
</style>
