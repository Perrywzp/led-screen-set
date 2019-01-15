/*
 * @Author: wangzhipei
 * @Date: 2018-12-07 10:49:10
 * @Desc: led配置， 工具条模块
 * -----
 * @Last Modified By: wangzhipei
 * @Last Modified: 2018-12-07 10:49:10
 */

<template>
  <div class="led-toolbar">
    <el-popover
      placement="bottom-start"
      width="300"
      v-model="setFormVisible"
      trigger="click">
      <el-form ref="ruleForm" :model="formVal" :rules="rules" label-width="52px" style="width: 260px;margin: 0 auto;">
        <el-form-item label="屏宽" prop="width">
          <el-input type="age" v-model="formVal.width" name="width"><template slot="append">像素</template></el-input>
        </el-form-item>
        <el-form-item label="屏高" prop="height">
          <el-input type="age" v-model="formVal.height" name="height"><template slot="append">像素</template></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right;">
        <el-button type="primary"  @click="confirm">确定</el-button>
        <el-button @click="setFormVisible = false">取消</el-button>
      </div>
      <span slot="reference" ><i :class="options.iconsClass.set"></i>配置屏幕尺寸</span>
    </el-popover>
    <span @click="canDel && del()" :class="{'disabled': !canDel}" ><i :class="options.iconsClass.del"></i>删除</span>
    <em>{{layoutDesc}}</em>

  </div>
</template>
<script>
export default {
  name: 'led-toolbar',
  props: {
    options: {
      type: Object,
      default () {
        return {
          iconsClass: {
            set: 'el-icon-setting',
            del: 'el-icon-delete'
          }
        }
      }
    },
    size: {
      type: Object,
      default () {
        return {
          width: 488,
          height: 248
        }
      }
    },
    canDel: {
      type: Boolean,
      default: false
    },
    sizeMinLimit: {
      type: Array,
      default () {
        return [8, 8]
      }
    },
    sizeMaxLimit: {
      type: Array,
      default () {
        return [80000, 80000]
      }
    }
  },
  watch: {
    size () {
      this.formVal = this.size
    }
  },
  data () {
    let that = this
    let validWidth = (rule, value, callback) => {
      valid(callback)
    }
    let validHeight = (rule, value, callback) => {
      that.$refs.ruleForm.validateField('width')
      valid(callback)
    }
    let valid = (callback) => {
      let reg = /^(0|\+?[1-9][0-9]*)$/
      let {width, height} = this.formVal
      let {sizeMinLimit, sizeMaxLimit} = this
      if (!reg.test(width) || !reg.test(height)) {
        callback(new Error('屏宽高需为正整数'))
      } else if (width < sizeMinLimit[0] || height < sizeMinLimit[1] || width > sizeMaxLimit[0] || height > sizeMaxLimit[1]) {
        callback(new Error(`屏宽高不能小于${sizeMinLimit[0]}、${sizeMinLimit[1]},不能大于${sizeMaxLimit[0]}、${sizeMaxLimit[1]}`))
      } else {
        let rate = width / height
        if (rate >= 1 / 10 && rate <= 10) {
          callback()
        } else {
          callback(new Error('屏宽高比应既要<=10且要>=0.1'))
        }
      }
    }
    return {
      layoutDesc: '',
      setFormVisible: false,
      formVal: {
        width: this.size.width,
        height: this.size.height
      },
      rules: {
        width: [
          {required: true, message: '请输入屏宽', trigger: 'blur'},
          { validator: validWidth, trigger: 'blur' }
        ],
        height: [
          {required: true, message: '请输入屏高', trigger: 'blur'},
          { validator: validHeight, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    confirm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let {width, height} = this.formVal
          this.$emit('save', this.formVal)
          this.layoutDesc = `宽${width}px, 高${height}px`
          this.setFormVisible = false
        } else {
          return false
        }
      })
    },
    del () {
      this.$emit('del')
    }
  }
}
</script>
<style lang="less" scoped>
.led-toolbar {
  height: 36px;
  line-height: 36px;
  text-indent: 3px;
  span {
    cursor: pointer;
    margin-right: 15px;
    i {
      margin-right: 8px;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
  em {
    display: inline-block;
    font-style: normal;
    font-size: 12px;
    width: 195px;
    text-align: right;
    color: #666;
  }
  .set-form {
    width: 200px;
  }
}

</style>
