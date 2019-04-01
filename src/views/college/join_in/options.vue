<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="学院名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="学院代理等级">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="品牌合作分公司" value="1" name="type"/>
          <el-checkbox label="分公司董事" value="2" name="type"/>
          <el-checkbox label="分公司营销总监" value="3" name="type"/>
          <el-checkbox label="一级授权代理" value="4" name="type"/>
          <el-checkbox label="二级授权代理" value="5" name="type"/>
          <el-checkbox label="三级授权代理" value="6" name="type"/>
          <el-checkbox label="特约授权代理" value="7" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否升学考核">
        <el-switch v-model="form.delivery"/>

      </el-form-item>
      <el-form-item v-if="form.delivery" label="请选择考核试题">
        <el-select v-model="form.region" placeholder="请选择考核试题">
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>

      </el-form-item>
      <el-form-item v-if="form.delivery" label="考核积分">
        <el-input v-model="form.score"/>
      </el-form-item>
      <el-form-item v-if="form.delivery" label="考核达标最低分数">
        <el-input v-model="form.min"/>
      </el-form-item>

      <el-form-item>
        <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button>
        <el-button v-if="bEdit" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bEdit: false,
      form: {
        name: '',
        region: '',
        score: '',
        min: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      console.log(this.form)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

