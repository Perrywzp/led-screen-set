/*
 * @Author: wangzhipei
 * @Date: 2018-12-07 10:48:52
 * @Desc: led屏配置， 配置参数模块
 * -----
 * @Last Modified By: wangzhipei
 * @Last Modified: 2018-12-07 10:48:52
 */

<template>
  <table class="led-params" border="1">
    <tr>
      <td width="90" align="center">文字大小</td>
      <td>
        <el-select v-model="value.fontSize">
          <el-option v-for="item in options.fontSizes" :value="item.value" :key="item.value" :label="item.name">{{item.name}}</el-option>
        </el-select>
      </td>
    </tr>
    <tr>
      <td align="center">文字颜色</td>
      <td>
        <ul class="btn-radio">
          <li v-for="item in options.fontColors" :key="item.value"
            :class="{active: item.value === value.fontColor}"
            @click="value.fontColor=item.value">
          <span>{{item.name}}</span></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">显示方式</td>
      <td>
        <ul class="btn-radio">
          <li v-for="item in options.showModes" :key="item.value"
            :class="{active: item.value === value.showMode}"
            @click="value.showMode=item.value">
          <span>{{item.name}}</span></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">对其方式</td>
      <td>
        <ul class="btn-radio">
          <li v-for="item in options.horAligns" :key="item.value"
            :class="{active: item.value === value.horAlign}"
            @click="value.horAlign=item.value">
          <span>{{item.name}}</span></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center">是否加粗</td>
      <td>
         <el-radio class="radio" v-model="value.fontWeight" v-for="(item, index) in options.fontWeights" :label="item.value" :key="index">{{item.name}}</el-radio>
      </td>
    </tr>
    <tr>
      <td align="center">显示类型</td>
      <td>
        <el-select v-model="displayTypeIndex">
          <el-option  v-for="(item, index) in keywords" :value="index" :key="index" :label="item.name" @change="showKeywords">{{item.name}}</el-option>
        </el-select>
        </td>
    </tr>
    <tr>
      <td align="center">显示内容</td>
      <td>
        <el-dropdown trigger="click" :hide-on-click="false" ref="dropdown" @command="hdKeywordClick">
          <el-tooltip
            :content="tips"
            :disabled="!tips"
            placement="left">
            <textarea
              class="el-textarea__inner"
              ref="textarea"
              :rows="2"
              placeholder="请输入内容"
              @keydown="hdKeyDown"
              @click="showKeywords"
              @input="hdInput"
              :value="parseValue"
              ></textarea>
          </el-tooltip>
          <el-dropdown-menu slot="dropdown" class="led-params-keywords">
            <el-dropdown-item v-for="(item, index) in keywords[displayTypeIndex].childrens" :key="index" :command="item"
            :disabled="disabledSelect || matchIds.includes(item.id) || matchIds.includes(item.id)">
            {{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
         </el-dropdown>
      </td>
    </tr>
  </table>
</template>
<script>
import mixin from './mixin'
export default {
  name: 'led-params',
  mixins: [mixin],
  props: {
    value: {
      type: Object,
      default () {
        return {
          fontColor: '#ff0000',
          fontSize: 16,
          showMode: 0,
          fontWeight: 'normal',
          horAlign: 'left'
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
            id: '11211',
            childrens: [
              {name: '关键字3', id: 'key3333'},
              {name: '关键字4', id: 'key4444'}
            ]
          }
        ]
      }
    },
    // 占位符
    placeholder: {
      type: Array,
      default () {
        return ['[', ']']
      }
    },
    // 控制能够选多少个关键字
    multipleLimit: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      displayTypeIndex: 0,
      tips: '1～64个字符；不能包含 [ ] ^ $ 这些特殊字符。',
      options: {
        fontSizes: [
          {name: '16px', value: 16},
          {name: '24px', value: 24},
          {name: '36px', value: 36}
        ],
        fontColors: [
          {name: '红色', value: '#ff0000'},
          {name: '黄色', value: '#ffff00'},
          {name: '绿色', value: '#00ff00'}
        ],
        showModes: [
          {name: '静止', value: 1},
          {name: '向上滚动', value: 4},
          {name: '向下滚动', value: 5},
          {name: '向左滚动', value: 2},
          {name: '向右滚动', value: 3}
        ],
        horAligns: [
          {name: '居左', value: 0, icon: ''},
          {name: '居中', value: 1, icon: ''},
          {name: '居右', value: 2, icon: ''}
        ],
        fontWeights: [
          {name: '是', value: 'bold'},
          {name: '否', value: 'normal'}
        ]
      },
      selectKeywords: [] // 对textarea正在匹配提取出来的值，这里提取的name
    }
  },
  computed: {
    parseValue: {
      set (val) {
        let {placeholder, flatKeywords} = this
        let [startFlag, endFlag] = placeholder
        let text = val || ''
        let matchs = this.selectKeywords = this.getMatchs(text)
        matchs.forEach(match => {
          const reg = new RegExp(`\\${startFlag}${match}\\${endFlag}`, 'g')
          let id = this.getValue(match, flatKeywords, 'name', 'id')
          text = text.replace(reg, `${startFlag}${id}${endFlag}`)
        })
        this.value.text = text
      },
      get () {
        let {placeholder, flatKeywords} = this
        let [startFlag, endFlag] = placeholder
        let text = this.value.text || ''
        this.getMatchs(text).forEach(match => {
          let reg = new RegExp(`\\${startFlag}${match}\\${endFlag}`, 'g')
          let name = this.getValue(match, flatKeywords, 'id', 'name')
          text = text.replace(reg, `${startFlag}${name}${endFlag}`)
        })
        return text
      }
    },
    /**
     * 控制已经选中的选项，禁止重复选， 或者限制选中
     */
    disabledSelect () {
      if (this.multipleLimit === 0) return false
      else {
        return this.matchIds.length >= this.multipleLimit
      }
    },
    /**
     * 及时获取匹配到的id
     */
    matchIds () {
      return this.getMatchs(this.value.text || '')
    }
  },
  methods: {
    showKeywords () {
      // this.$refs.dropdown.visible = true
    },
    /**
     * 查找当前光标在占位符的什么位置，前/中/后
     * @param textarea 文本域实例
     * @param placeholder {array} 占位符，默认 '[]'
     */
    getCursorFromPlaceholder (textarea, placeholder) {
      let [startFlag, endFlag] = placeholder
      let curIndex = this.getCursorCurIndex(textarea)
      let text = textarea.value
      let reg = new RegExp(`\\${startFlag}[^\\${startFlag}\\${endFlag}]*(?=${endFlag})`, 'g')
      let matchs = text.match(reg)
      if (!matchs) return {}
      let match = {}
      for (let i = 0; i < matchs.length; i++) {
        let item = matchs[i]
        let start = text.indexOf(item)
        let end = start + item.length + 1
        let content = item.replace('[', '')
        let type = ''
        match = {start, end, content, type}
        if (curIndex === start - 1) {
          match.type = 'before'
          break
        }
        if (curIndex >= start && curIndex < end) {
          match.type = 'between'
          break
        }
        if (curIndex === end) {
          match.type = 'after'
          break
        }
      }
      return match
    },
    /**
     * 获取当前光标所在位置
     * @param textarea 文本域实例
     */
    getCursorCurIndex (textarea) {
      return textarea.selectionStart
    },
    /**
     * 在光标放入内容
     */
    insertAtCursor (textarea, name) {
      let curIndex = this.getCursorCurIndex(textarea)
      let text = textarea.value
      let {placeholder, getCursorFromPlaceholder, setCursorPosition, comboPlaceholder} = this
      let newText = comboPlaceholder(name)
      let {type} = getCursorFromPlaceholder(textarea, placeholder)
      if (type === 'between') {
        this.parseValue = text + newText
      } else {
        this.parseValue = text.slice(0, curIndex) + newText + text.slice(curIndex)
      }
      this.$nextTick(() => {
        setCursorPosition(textarea, curIndex + newText.length)
      })
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

    /**
     * 将光标移到末尾
     */
    cursorMoveToEnd (textarea) {
      textarea.selectionStart = textarea.value.length
    },
    /**
     * 设置光标位置
     */
    setCursorPosition (textarea, newCursorPosition) {
      textarea.selectionStart = newCursorPosition
    },
    comboPlaceholder (val) {
      let [startFlag, endFlag] = this.placeholder
      return startFlag + val + endFlag
    },
    /**
     * 响应点击事件
     */
    hdKeywordClick (item) {
      this.insertAtCursor(this.$refs.textarea, item.name)
    },

    /**
     * 删除一组占位符
     */
    removePlaceholder (content, start) {
      let {getValue, flatKeywords, placeholder, setCursorPosition} = this
      let [startFlag, endFlag] = placeholder
      let id = getValue(content, flatKeywords, 'name', 'id')
      let reg = new RegExp(`\\${startFlag}${id}\\${endFlag}`, 'g')
      this.value.text = this.value.text.replace(reg, '')
      this.$nextTick(() => {
        setCursorPosition(this.$refs.textarea, start)
      })
    },
    /**
     * 输入框值改变
     */
    hdInput (e) {
      this.parseValue = e.target.value.replace('\n', '')
    },
    /**
     * 处理按键事件
     */
    hdKeyDown (e) {
      let {placeholder, getCursorFromPlaceholder, removePlaceholder, cursorMoveToEnd} = this
      let {textarea} = this.$refs
      let keyCode = e.keyCode
      let key = e.key
      let {start, type, content} = getCursorFromPlaceholder(textarea, placeholder)
      if (type === 'between') {
        if (keyCode === 8 || keyCode === 46) {
          // 删除按键将删除当前光标所处位置的模板
          removePlaceholder(content, start)
          e.preventDefault()
        } else if (keyCode > 36 && keyCode < 41) {
          // 上下左右箭头不做任何处理
          return
        } else if (keyCode === 13 || keyCode === 32 || (keyCode >= 48 && keyCode <= 111) || keyCode >= 186) {
          // 在模板中间输入内容时，自动将鼠标移至末尾
          cursorMoveToEnd(textarea)
          e.preventDefault()
          return
        }
        // 其他按键阻止默认行为
        e.preventDefault()
      } else if (type === 'after' && keyCode === 8) {
        // 鼠标位于模板后面，且当前按下回退键将删除光标前的模板
        removePlaceholder(content, start)
        e.preventDefault()
      } else if (type === 'before' && keyCode === 46) {
        // 鼠标位于模板前面，且当前按下delete键将删除光标后的模板
        removePlaceholder(content, start)
        e.preventDefault()
      } else if (key === '[' || key === ']' || key === '^' || key === '$' || key === 'Enter') {
        e.preventDefault()
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .led-params {
    width: 100%;
    height: 100%;
    border-spacing:0;
    border-collapse:collapse;
    tr, td {
      border: 1px solid #ccc;
    }
    td {
      padding: 5px 7px;
      .el-dropdown{
        width: 100%;
      }
      textarea {
        border: none !important;
      }
      .btn-radio {
        display: block;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          cursor: pointer;
          float: left;
          width: 75px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #ccc;
          margin-right: -1px;
          &.active span{
            margin-top: -1px;
            border: 1px solid #1E7FFF;
            color: #1E7FFF;
          }
          span {
            display: block;
          }
        }
      }
    }
    tr td:first-child {
      background: #eee;
      padding: 5px 13px;
    }
  }
</style>
<style lang="less">
table.led-params {
  textarea {
    border: none !important;
    padding: 0;
    // resize: none;
    width: 100%;
    user-select: none;
  }
}
.el-dropdown-menu.led-params-keywords {
  width: 420px;
  padding: 5px 12px 0 12px;
  overflow: hidden;
  box-sizing: border-box;
  li {
    float: left;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0 8px;
    height: 28px;
    line-height: 28px;
    margin: 0 12px 5px 0;
  }
}
</style>
