<template>
  <led-set v-model="data"></led-set>
</template>
<script>
// import ledSet from '@/libs/ledSet/main'
export default {
  name: 'ledPage',
  // ,components: { ledSet }
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
