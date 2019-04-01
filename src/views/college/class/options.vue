<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="班级名称">
        <el-input v-model="form.class_name" readonly=""/>
      </el-form-item>
      <el-form-item label="设置辅导员">
        <el-checkbox-group v-model="form.manager" class="adminList">
          <el-checkbox v-for="item in form.managers" :label="item.id" :key="item.id" :value="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

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
  name: 'ClassEdit',
  data() {
    return {
      bEdit: false,
      path: 'classes',
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
    this.getInfos(this.$route.params.id)
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      this.formMark = false
      getInfo(this.path, { id }).then(response => {
        this.formMark = true
        if (this.bEdit) {
          this.form = response.data.datas
        }
        this.listLoading = false
      })
    },
    onSubmit() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.$message(response.data.info)
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/class/index')
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
.adminList{
  border: 1px solid gray;
  padding: 10px;
}
</style>

