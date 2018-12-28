<template>
  <led-set v-model="data" 
    :selectKey="selectKey"
    :selectName="selectName"
    :childrens="childrens"
    :keywords="keywords"
  ></led-set>
</template>
<script>
import ledSet from '@/libs/ledSet/main'
export default {
  name: 'ledPage',
  components: { ledSet },
  data () {
    return {
      selectKey: 'dictCode',
      selectName: 'dictName',
      childrens: 'childrenList',
      keywords: [
        {
          dictName: '类型一',
          dictCode: '11111',
          childrenList: [
            {dictName: '关键字1', dictCode: 'key1111'},
            {dictName: '关键字2', dictCode: 'key2221'}
          ]
        },
        {
          dictName: '类型二',
          dictCode: '22222',
          childrenList: [
            {dictName: '关键字3', dictCode: 'key3333'},
            {dictName: '关键字4', dictCode: 'key4444'}
          ]
        }
      ],
      data: {
        size: { width: 0, height: 0 },
        areas: [{
          x: 300,
          y: 100,
          width: 3000,
          height: 755,
          text: '恭喜发财',
          fontColor: '#ff0000',
          fontSize: 16,
          fontWeight: 'normal',
          horAlign: 1,
          showType: '11111'
        }, {
          x: 300,
          y: 900,
          width: 3500,
          height: 755,
          text: '红包拿来',
          fontColor: '#ffff00',
          fontSize: 24,
          fontWeight: 'normal',
          horAlign: 0,
          showType: '11111'
        }, {
          x: 300,
          y: 1750,
          width: 4000,
          height: 785,
          text: '城阙辅三秦，风烟望五津, 与君离别意，同是宦游人; 海内存知己，天涯若比邻; 无为在歧路，儿女共沾巾',
          fontColor: '#00ff00',
          fontSize: 36,
          fontWeight: 'bold',
          horAlign: 2,
          showType: '22222'
        }]
      }
    }
  },
  mounted() {
    setTimeout(()=> {
      this.data = {
        size: { width: 500, height: 500 },
        areas: [{
          x: 10,
          y: 10,
          width: 280,
          height: 40,
          text: '恭喜发财',
          fontColor: '#ff0000',
          fontSize: 16,
          fontWeight: 'normal',
          horAlign: 1,
          showType: '11111'
        }, {
          x: 10,
          y: 90,
          width: 350,
          height: 50,
          text: '红包拿来',
          fontColor: '#ffff00',
          fontSize: 24,
          fontWeight: 'normal',
          horAlign: 0,
          showType: '11111'
        }, {
          x: 10,
          y: 200,
          width: 400,
          height: 80,
          text: '城阙辅三秦，风烟望五津, 与君离别意，同是宦游人; 海内存知己，天涯若比邻; 无为在歧路，儿女共沾巾',
          fontColor: '#00ff00',
          fontSize: 36,
          fontWeight: 'bold',
          horAlign: 2,
          showType: '22222'
        }]
      }
    }, 5000)
  }
}
</script>
