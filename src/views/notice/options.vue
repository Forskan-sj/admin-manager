<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="消息类型:" prop="type">
        <el-select
          v-model="form.type"
          style="width: 140px"
          class="filter-item"
          placeholder="消息类型"
        >
          <el-option
            v-for="item in noticeType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接收人群:" prop="status">
        <el-radio-group v-model="form.status" @change="getUserList">
          <el-radio :label="1">全部用户</el-radio>
          <el-radio :label="2">企业用户</el-radio>
          <el-radio :label="3">普通用户</el-radio>
          <el-radio :label="4">指定用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.status === 4" label="">
        <dnd-list :list1="form.to_ids_objs" :list2="userList" :kind="2" list1-title="已选择用户" list2-title="用户列表" @dndList="getList"/>
      </el-form-item>
      <!-- <el-form-item label="消息作者:" prop="author">
        <el-input v-model="form.author"/>
      </el-form-item> -->
      <el-form-item label="消息标题:" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="消息简介" prop="desc">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <!-- <el-form-item label="消息封面(推荐尺寸：375 x 224):">
        <up-load v-if="ulParamsMark && formMark" :index="-1" :type="3" :single-pic="bEdit?cdn+form.pic:form.pic" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item> -->
      <el-form-item label="消息模式:">
        <el-radio-group v-model="model">
          <el-radio :label="1">普通消息</el-radio>
          <el-radio :label="0">外链消息</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="model === 1" label="消息内容:" prop="contents">
        <div>
          <tinymce :height="300" v-model="form.contents"/>
        </div>
      </el-form-item>
      <el-form-item v-if="model === 0" label="web_url:" prop="web_url">
        <el-input v-model="form.web_url"/>
      </el-form-item>
      <el-form-item v-if="model === 0" label="android_url:" prop="andriod_url">
        <el-input v-model="form.andriod_url"/>
      </el-form-item>
      <el-form-item v-if="model === 0" label="ios_url:" prop="ios_url">
        <el-input v-model="form.ios_url"/>
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
import DndList from '@/components/DndList'
import UpLoad from '@/components/UpLoad'
import Tinymce from '@/components/Tinymce'
import { add, getInfo, getOSSparams, getLists } from '@/api/college'
export default {
  name: 'NoticeEdit',
  components: { UpLoad, Tinymce, DndList },
  data() {
    return {
      path: 'notice',
      model: 1,
      formMark: true,
      ossParams: '',
      bookkinds: [],
      userList: [],
      noticeType: [{
       id: 1,
       name: '系统消息'
      },
      {
       id: 5,
       name: '上新通知'
      }],
      bEdit: false,
      ulParamsMark: '',
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        status: 1,
        catid: '',
        contents: '',
        title: '',
        type: 1,
        to_ids_objs: [],
        author: '',
        desc: '',
        pic: null
      },
      formRules: {
        title: [{ required: true, message: '请输入消息标题', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
        contents: [{ required: true, message: '请输入消息内容', trigger: 'blur' }],
        // pic: [{ required: true, message: '请上传课程封面', trigger: 'blur' }],
        catid: [{ required: true, message: '请选择消息类型', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写消息简介', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // console.log('sdfs');
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
        this.form.pic = param.res_url
      } else {
        this.form.buy[param.index].img_url = param.res_url
      }
    },
    getUserList() {
      if (this.form.status === 4) {
        this.listLoading = true
        getLists('user', { page: 1, limit: 999999999999999 }).then(response => {
          this.userList = response.data.datas.data
          this.listLoading = false
        })
      }
    },
    getInfos(id) {
      this.listLoading = true
      this.formMark = false
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        if (this.form.web_url !== '' && this.form.web_url !== null) {
          this.model = 0
        }
        this.getUserList()
        this.formMark = true
        this.listLoading = false
      })
    },
    getList(users) {
      console.log(users)
      this.form.to_ids_objs = users
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.listLoading = true

          add(this.path, this.form).then(response => {
            this.$message(response.data.info)
            this.listLoading = false
            this.$store.dispatch('delView', this.$route)
            this.$router.replace('/notice/index')
            sessionStorage.setItem('refresh', JSON.stringify(1))
            // this.$route.name = 'NoticeList'
            // this.$route.fullPath = this.$oute.path = '/notice/index'
            // console.log(this.$route)
            // this.$store.dispatch('updateReView', this.$route, this, this.$route)
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

