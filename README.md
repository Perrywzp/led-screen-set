## Install
```shell
npm install led-screen-set -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import LedScreenSet from 'led-screen-set'
import 'led-screen-set/led-screen-set.css'

Vue.use(LedScreenSet)

```

## .vue文件使用标签
```
<template>
  <led-set></led-set>
</template>
<script>
export default {
  data () {
    return {
      data: {
        size: { width: 488, height: 448 },
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
  }
}
</script>
```
### v-model 
进行了数据双向绑, 主要结构如下
```
  {
    size: { width: 488, height: 448 },
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
    }]
  }
```

### LedScreenSet Attributes
| 参数         | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| layout       | 配置画布的大小，会根据用户选择好的宽高进行计算，给canvas提供一个展示大小 | Object  | — | {width: 488, height: 248} |
| keywords     | 给led模拟屏提供标签选项数据，即显示类型和显示内容数据, 是一个二维数组 | Array | — | — |
| multipleLimit| 设置用户可以选择标签选项上限 | Number  |    —  |  100 |
| placeholder  | 占位符标识     | Array |  —  | ['[', ']']|
| selectKey    | 用于匹配提供的keywords数据唯一标识id字段 | String |  —  | 'dictCode' |
| selectName   | 用于匹配提供的keywords数据展示name的字段 | String |  —  | 'dictName' |
| selectKey    | 用于匹配提供的keywords数据获取childrens的字段 | String |  —  | 'childrenList' |
## Browser Support
Modern browsers and Internet Explorer 10+.
