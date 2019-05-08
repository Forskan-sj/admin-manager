<template>
  <div class="app-container">
    <el-form v-if="formMark" ref="form" :model="form" :rules="formRules" label-width="260px" >
      <el-form-item label="勋章描述" prop="desc">
        <el-input v-model="form.desc"/>
      </el-form-item>
      <el-form-item label="所属专训" prop="title">
        <el-select
          v-model="form.title"
          style="width: 140px"
          class="filter-item"
        >
          <el-option
            v-for="item in courseList"
            :key="item.id"
            :label="item.title"
            :value="item.title"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="勋章图片"
        prop="img1">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.img1:form.img1" :index="-1" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item
        label="勋章灰图"
        prop="img2">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.img2:form.img2" :index="-3" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad'
import { add, getInfo, getOSSparams } from '@/api/college'
export default {
  name: 'MedalEdit',
  components: { UpLoad },
  data() {
    return {
      formMark: false,
      path: 'medal',
      ossParams: {},
      ulParamsMark: false,
      listLoading: false,
      listQuery: '',
      courseList: [],
      cdn: 'https://cdncollege.quansuwangluo.com/',
      bEdit: false,
      qrcodeList: [],
      form: {
        id: 0,
        desc: '',
        title: '',
        img1: null,
        img2: null
      },
      formRules: {
        title: [{ required: true, message: '请选择所属专训', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入勋章描述', trigger: 'blur' }],
        img1: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        img2: [{ required: true, message: '请上传灰图', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    this.formMark = false
    this.getInfos(this.$route.params.id)
    getOSSparams({ type: 'dev_test_dcaredata' }).then(response => {
      this.ossParams = response.data.datas
      this.ulParamsMark = true
      this.listLoading = false
    })
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        this.formMark = true
        if (this.bEdit) {
          this.form = response.data.datas.info
        }
        this.courseList = response.data.datas.special
        this.listLoading = false
      })
    },
    uploadSucess(param) {
      // console.log(param)
      if (param.res_url !== null) {
        if (param.type === 3) {
          if (param.index === -1) {
            this.form.img1 = param.res_url
          }
          if (param.index === -3) {
            this.form.img2 = param.res_url
          }
        }
      }
    },
    addCourse() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.listLoading = false
        this.$message(response.data.message)
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/medal/index')
        sessionStorage.setItem('refresh', JSON.stringify(1))
      })
    },
    onSubmit(mark) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addCourse()
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

<style lang="scss" scoped>
.line {
  text-align: center;
}
.courseLists{
  border: 1px solid gray;
  padding: 0 30px;
}
.sections{
  margin-top: 30px;
  width: 260px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: brown;
}
legend{
  color: #428BCA;
  width: 100%;
  margin: 20px 0;
  font-size: 16px;
  line-height: inherit;
  border-bottom: 1px solid #e5e5e5;
}
.deleteClass{
  position: absolute;
  cursor: pointer;
  line-height: 35px;
  background-color: #FF5B5B!important;
  border-color: #6FB3E0;
  vertical-align: inherit;
  color: white;
  text-align: center;
  width: 80px !important;
  z-index: 1;
  top: 35px;
}
.containers{
  position: relative;
}
.showQL{
  position: fixed;
  z-index: 2;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-radius: 15px;
  .back{
    background: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
  }
  .content{
    position: relative;
    z-index: 102;
    background: white;
    height: 100%;
  }
}
.testText {
    color: #FF5B5B;
    margin-left: 1.634% !important;
    line-height: 40px;
    border-radius: 20px;
    border: 2px solid #07CDCD;
    padding: 3px 14px;
}
.divCourse{
  border: 1px solid gray;
  max-height: 250px;
  overflow-y: scroll;
}
</style>

