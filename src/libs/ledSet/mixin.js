export default {
  computed: {
    flatKeywords () {
      let {childrens} = this
      let flatKeywords = []
      this.keywords.forEach(item => {
        if (item[childrens] && item[childrens].length) {
          flatKeywords = flatKeywords.concat(item[childrens])
        }
      })
      return flatKeywords
    }
  },
  methods: {
    /**
     * 可用于在选中的所有keywords中选出符合目标值的选中项
     */
    getValue (val, selectKeywords, compareKey, getKey) {
      let obj = selectKeywords.find(item => item[compareKey] === val)
      return obj && obj[getKey]
    }
  }
}
