## Install
```shell
npm install led-screen-set -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import LedScreenSet from 'led-screen-set'
import 'led-screen-set/dist/led-screen-set.css'

Vue.use(LedScreenSet)

```

## .vue文件使用标签
```
<template>
  <led-screen-set></led-screen-set>
</template>
<script>
export default {
  data () {
    return {
      data: {
        size: { width: 488, height: 448 },
        areas:[{
          x: 20,
          y: 20,
          width: 300,
          height: 75,
          text: '恭喜发财',
          fontColor: '#ff0000',
          fontSize: 16,
          fontWeight: 'normal',
          horAlign: 1
        }, {
          x: 20,
          y: 120,
          width: 350,
          height: 75,
          text: '红包拿来',
          fontColor: '#ffff00',
          fontSize: 24,
          fontWeight: 'normal',
          horAlign: 0
        }, {
          x: 20,
          y: 220,
          width: 400,
          height: 75,
          text: '城阙辅三秦，风烟望五津, 与君离别意，同是宦游人; 海内存知己，天涯若比邻; 无为在歧路，儿女共沾巾',
          fontColor: '#00ff00',
          fontSize: 32,
          fontWeight: 'bold',
          horAlign: 2
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
      fontColor: '#ff0000', // 文字颜色
      fontSize: 16,  // 字体大小
      fontWeight: 'normal',  // normal普通， bold加粗
      horAlign: 1  // 0 左， 1， 中， 2右
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
