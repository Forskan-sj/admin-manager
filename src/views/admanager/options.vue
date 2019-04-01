<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="160px">
      <el-form-item label="广告名称:" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="时间范围:">
        <el-date-picker
          v-model="form.times"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"/>
        <el-checkbox
          v-model="form.is_sys"
          class="filter-item"
          style="margin-left:15px;"
        >永不过期</el-checkbox>
      </el-form-item>
      <el-form-item label="是否滚动:" prop="is_auto">
        <el-radio-group v-model="form.is_auto">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否上架:" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="(item, index) in form.contents" :key="item.index">
        <div class="divContent">
          <div class="delete" @click="delAd(index)">+</div>
          <div class="title">上传图片(推荐尺寸:375x188)：</div>
          <div>
            <up-load v-if="ulParamsMark && formMark" :index="index" :type="3" :single-pic="bEdit?cdn+item.img_url:item.img_url" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
          </div>
          <div class="title">主标题：</div>
          <el-input v-model="item.title"/>
          <div class="title">排序：</div>
          <el-input v-model="item.index"/>
          <div class="title">描述：</div>
          <el-input v-model="item.des"/>
          <div class="title">URL：</div>
          <el-input v-model="item.url"/>
          <div class="title">android_url：</div>
          <el-input v-model="item.android_url"/>
          <div class="title">ios_url：</div>
          <el-input v-model="item.ios_url"/>
        </div>

      </el-form-item>
    </el-form>

    <el-form ref="form3" label-width="160px" style="margin-top:30px">
      <el-form-item>
        <el-button type="success" @click="addOptions">添加广告</el-button>
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
  name: 'ComplexTableEdit',
  components: { UpLoad },
  data() {
    return {
      path: 'ads',
      formMark: true,
      ossParams: '',
      bEdit: false,
      ulParamsMark: '',
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        contents: [{
          img_url: null,
          title: '',
          index: 1,
          des: '',
          url: '',
          android_url: '',
          ios_url: ''
        }],
        is_sys: 0,
        title: '',
        times: '',
        status: 1,
        is_auto: 1
      },
      formRules: {
        title: [{ required: true, message: '请输入广告名称', trigger: 'blur' }]
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
    delAd(index) {
      this.form.contents.splice(index, 1)
      // console.log('object');
    },
    addOptions() {
      const detail = {
          img_url: null,
          title: '',
          index: this.form.contents.length + 1,
          des: '',
          url: '',
          android_url: '',
          ios_url: ''
        }
      this.form.contents.push(detail)
    },
    uploadSucess(param) {
      this.form.contents[param.index].img_url = param.res_url
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
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.$message(response.data.info)
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/admanager/index')
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
  font-weight: 600;
}
</style>

