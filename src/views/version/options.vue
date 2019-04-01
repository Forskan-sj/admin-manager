<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="版本名称:" prop="version_name">
        <el-input v-model="form.version_name"/>
      </el-form-item>
      <el-form-item label="版本号:" prop="version_num">
        <el-input v-model="form.version_num"/>
      </el-form-item>
      <el-form-item width="300px" label="安装包大小:" prop="size">
        <el-input v-model="form.size" style="width:100px;margin-right:1px"/>M
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '更新内容不能为空', trigger: 'blur'
        }"
        label="更新内容"
        prop="update_content"
      >
        <el-input v-model="form.update_content" type="textarea"/>
      </el-form-item>
      <el-form-item label="类别:" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">android</el-radio>
          <el-radio :label="2">IOS</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否强制更新:" prop="is_update">
        <el-radio-group v-model="form.is_update">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="bugly:" prop="bugly">
        <el-radio-group v-model="form.bugly">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad'
import { add, getInfo } from '@/api/college'
export default {
  name: 'VersionEdit',
  components: { UpLoad },
  data() {
    return {
      path: 'Version',
      bookkinds: [],
      bEdit: false,
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        type: 1,
        bugly: '',
        is_update: 1,
        update_content: '',
        version_name: '',
        version_num: ''
      },
      formRules: {
        version_name: [{ required: true, message: '请输入版本名称', trigger: 'blur' }],
        version_num: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
        size: [{ required: true, message: '请输入安装包大小', trigger: 'blur' }],
        update_content: [{ required: true, message: '请输入更新内容', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    if (this.bEdit) {
      this.getInfos(this.$route.params.id)
    }
    this.listLoading = true
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.listLoading = true
          add(this.path, this.form).then(response => {
            this.$message(response.data.info)
            this.listLoading = false
            this.$store.dispatch('delView', this.$route)
            this.$router.replace('/version/index')
            sessionStorage.setItem('refresh', JSON.stringify(1))
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
.divContent{
  background:#f3f7f9;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}
.delete{
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  font-size: 40px;
  line-height: 30px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  border: 1px solid gray;
  border-radius: 50%;
  transform: rotate(45deg);
  cursor: pointer;
}
.title{
  clear: both;
  font-size: 18px;
}
</style>

