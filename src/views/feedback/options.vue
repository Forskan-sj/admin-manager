<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="用户昵称:">
        <el-input v-model="form.user_nickname" readonly=""/>
      </el-form-item>
      <el-form-item label="联系方式:" >
        <el-input v-model="form.phone" readonly=""/>
      </el-form-item>
      <el-form-item label="反馈内容:">
        <el-input v-model="form.contents" readonly=""/>
      </el-form-item>
      <el-form-item label="反馈截图:">
        <img v-for="(item, index) in form.image" :key="index" :src="item" @click="handlePictureCardPreview(item)">
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '回复反馈不能为空', trigger: 'blur'
        }"
        label="回复反馈"
        prop="return_content"
      >
        <el-input v-model="form.return_content" :readonly="form.status === 2" type="textarea"/>
      </el-form-item>
    </el-form>

    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item>
        <el-button v-if="form.status === 1" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" >
    </el-dialog>
  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad'
import Tinymce from '@/components/Tinymce'
import { add, getInfo } from '@/api/college'
export default {
  name: 'EnterpriseEdit',
  components: { UpLoad, Tinymce },
  data() {
    return {
      path: 'feedback',
      bEdit: false,
      dialogImageUrl: '',
      dialogVisible: false,
      listLoading: false,
      form: {
      },
      formRules: {
        return_content: [{ required: true, message: '请输入回复内容', trigger: 'blur' }]
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        this.listLoading = false
      })
    },
    onSubmit() {
      this.listLoading = true
      console.log(this.form)
      add(this.path, { return_content: this.form.return_content, id: this.form.id }).then(response => {
        this.$message(response.data.info)
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/helpfeed/feedback/index')
        sessionStorage.setItem('refresh', JSON.stringify(1))
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

img{
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
  border: 1px solid gray;
}
.title{
  clear: both;
  font-size: 18px;
}

</style>

