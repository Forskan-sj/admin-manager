<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="讲师照片(推荐尺寸:480 x 480)" prop="avatar">
        <up-load v-if="ulParamsMark && formMark" :index="0" :type="3" :single-pic="bEdit?cdn+form.avatar:form.avatar" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item label="讲师性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="讲师描述" prop="desc">
        <el-input v-model="form.desc"/>
      </el-form-item>
      <el-form-item label="讲师标签(以“;”分割)" prop="tag">
        <el-input v-model="form.tag"/>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button>
        <el-button v-if="bEdit" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, getInfo, getOSSparams } from '@/api/college'
import UpLoad from '@/components/UpLoad'
export default {
  name: 'TeacherEdit',
  components: { UpLoad },
  data() {
    return {
      path: 'teacher',
      bEdit: false,
      ossParams: {},
      ulParamsMark: false,
      formMark: true,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        name: '',
        desc: '',
        tag: '',
        id: 0,
        sex: 2
      },
      formRules: {
        name: [{ required: true, message: '请输入讲师名称', trigger: 'blur' }],
        // tag: [{ required: true, message: '讲师标签', trigger: 'blur' }]
        // desc: [{ required: true, message: '讲师描述', trigger: 'blur' }],
        avatar: [{ required: true, message: '请上传讲师头像', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    if (this.bEdit) {
      this.getInfos(this.$route.params.id)
    }
    this.listLoading = true
    getOSSparams({ type: 'dev_test_dcaredata' }).then(response => {
      this.ossParams = response.data.datas
      this.ulParamsMark = true
      this.listLoading = false
    })
  },
  methods: {
    uploadSucess(param) {
      this.form.avatar = param.res_url
    },
    getInfos(id) {
      this.listLoading = true
      this.formMark = false
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        this.listLoading = false
        this.formMark = true
      })
    },
    onSubmit() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.$message(response.data.message)
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/teacher')
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
img{
  width: 100px;
}
</style>

