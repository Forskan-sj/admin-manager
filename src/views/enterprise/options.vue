<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="企业名称:" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="企业行业:" prop="industry">
        <el-input v-model="form.industry"/>
      </el-form-item>
      <el-form-item label="企业地址:" prop="address">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="企业电话:" prop="mobile">
        <el-input v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="企业固话:" prop="telephone">
        <el-input v-model="form.telephone"/>
      </el-form-item>
      <el-form-item label="企业邮箱:" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="企业证书:" prop="license">
        <up-load v-if="ulParamsMark && formMark" :index="-1" :type="3" :single-pic="bEdit?cdn+form.license:form.license" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item label="企业logo:" prop="logo">
        <up-load v-if="ulParamsMark && formMark" :index="-2" :type="3" :single-pic="bEdit?cdn+form.logo:form.logo" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-select
          v-model="form.status"
          style="width: 140px"
          class="filter-item"
        >
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资料状态" prop="is_set">
        <el-select
          v-model="form.is_set"
          style="width: 140px"
          class="filter-item"
        >
          <el-option
            v-for="(item, index) in is_set"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
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
import { add, getInfo, getOSSparams } from '@/api/college'
// import { validateEmail } from '@/utils/validate'
export default {
  name: 'EnterpriseEdit',
  components: { UpLoad, Tinymce },
  data() {
    return {
      path: 'enterprise',
      formMark: true,
      ossParams: '',
      bookkinds: [],
      bEdit: false,
      status: ['待审核', '通过', '拒绝'],
      is_set: ['待审核', '通过', '拒绝'],
      ulParamsMark: '',
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        mobile: '',
        industry: '',
        name: '',
        telephone: '',
        address: '',
        status: 1,
        license: null,
        logo: null
      },
      formRules: {
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
        industry: [{ required: true, message: '请输入企业行业', trigger: 'blur' }],
        license: [{ required: true, message: '请上传企业证书', trigger: 'blur' }],
        logo: [{ required: true, message: '请上传企业logo', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写企业移动电话', trigger: 'blur' }]
        // email: [{ required: true, message: '请填写企业移动邮箱', trigger: 'blur' }, { validator: validateEmail, message: '箱', trigger: 'blur' }]
        // telephone: [{ required: true, message: '请填写企业固话', trigger: 'blur' }]
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
      if (param.index === -1) {
        this.form.license = param.res_url
      } else {
        this.form.logo = param.res_url
      }
    },
    getInfos(id) {
      this.listLoading = true
      this.formMark = false
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        this.formMark = true
        this.listLoading = false
      })
    },
    onSubmit() {
      // this.form.score = parseFloat(this.form.score)
      this.$refs['form'].validate(valid => {
        if (valid) {
          // console.log(this.form);
          this.listLoading = true
          add(this.path, this.form).then(response => {
            this.$message(response.data.info)
            this.listLoading = false
            this.$store.dispatch('delView', this.$route)
            this.$router.replace('/enterprise/index')
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

