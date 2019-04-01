<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="文章标题:" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="文章内容:" prop="contents">
        <div>
          <tinymce :height="300" v-model="form.contents"/>
        </div>
      </el-form-item>
      <el-form-item label="是否上架:" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="editor-content" v-html="content"/> -->
  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad'
import Tinymce from '@/components/Tinymce'
import { add, getInfo } from '@/api/college'
export default {
  name: 'HelpEdit',
  components: { UpLoad, Tinymce },
  data() {
    return {
      path: 'faq',
      bEdit: false,
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        catid: '',
        contents: '',
        title: '',
        author: '',
        status: 1,
        pic: null
      },
      formRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
        contents: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        // pic: [{ required: true, message: '请上传课程封面', trigger: 'blur' }],
        catid: [{ required: true, message: '请选择文章类型', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写文章简介', trigger: 'blur' }]

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
      this.form.score = parseFloat(this.form.score)
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.listLoading = true
          add(this.path, this.form).then(response => {
            this.$message(response.data.info)
            this.listLoading = false
            this.$store.dispatch('delView', this.$route)
            this.$router.replace('/helpfeed/feedbacks/index')
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
.editor-content{
  margin-top: 20px;
}
</style>

