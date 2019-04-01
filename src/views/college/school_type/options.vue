<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="160px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <!-- <el-form-item label="学院代理等级">
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
      </el-form-item> -->

      <el-form-item>
        <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button>
        <el-button v-if="bEdit" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, getInfo } from '@/api/college'
export default {
  name: 'StypeEdit',
  data() {
    return {
      path: 'category',
      bEdit: false,
      formRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      listLoading: false,
      form: {
        name: '',
        id: 0
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    if (this.bEdit) {
      this.getInfos(this.$route.params.id)
    }
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        this.listLoading = false
      })
    },
    onSubmit() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.$message(response.data.message)
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/school_type/index')
        sessionStorage.setItem('refresh', JSON.stringify(1))
        this.listLoading = false
      })
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

