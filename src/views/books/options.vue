<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="奖项名称:" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="奖项作者:" prop="title">
        <el-input v-model="form.author"/>
      </el-form-item>
      <el-form-item label="奖项评分:" prop="title">
        <el-input v-model="form.score" placeholder="请输入0-10之间的数字"/>
      </el-form-item>
      <el-form-item label="奖项封面(推荐尺寸:97 x 130)" prop="pic">
        <up-load v-if="ulParamsMark && formMark" :index="-1" :type="3" :single-pic="bEdit?cdn+form.pic:form.pic" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item label="奖项分类:" prop="catid">
        <el-select
          v-model="form.catid"
          style="width: 140px"
          class="filter-item"
        >
          <el-option
            v-for="item in bookkinds"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '推荐理由不能为空', trigger: 'blur'
        }"
        label="推荐理由"
        prop="contents"
      >
        <el-input v-model="form.contents" type="textarea"/>
      </el-form-item>
      <el-form-item label="是否上架:" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-for="(item, index) in form.buy" :key="index" :label="'购买渠道'+(index+1)">
        <div class="divContent">
          <div class="delete" @click="delAd(index)">+</div>
          <div class="title">上传logo(推荐尺寸：50 x 18)</div>
          <div>
            <up-load v-if="ulParamsMark && formMark" :index="index" :type="3" :single-pic="bEdit?cdn+item.img_url:item.img_url" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
          </div>
          <div class="title">渠道名称：</div>
          <el-input v-model="item.title"/>
        </div>
      </el-form-item>
    </el-form>

    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item v-if="form.buy.length<2">
        <el-button type="success" @click="addOptions">添加购买渠道</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad'
import { add, getInfo, getLists, getOSSparams } from '@/api/college'
export default {
  name: 'BookEdit',
  components: { UpLoad },
  data() {
    return {
      path: 'book',
      formMark: true,
      ossParams: '',
      bookkinds: [],
      bEdit: false,
      ulParamsMark: '',
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        buy: [{
          img_url: null,
          title: '',
          index: 0
        }],
        score: '',
        catid: 1,
        contents: '',
        title: '',
        author: '',
        status: 1,
        pic: null
      },
      formRules: {
        title: [{ required: true, message: '请输入奖项名称', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
        score: [{ required: true, message: '请输入评分', trigger: 'blur' }],
        contents: [{ required: true, message: '请输入推荐理由', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传课程封面', trigger: 'blur' }],
        catid: [{ required: true, message: '请选择奖项类型', trigger: 'blur' }]
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
    this.getBookKind()
  },
  methods: {
    getBookKind() {
      this.listLoading = true
      getLists('category', { page: 1, limit: 99999, type: 1 }).then(response => {
        this.bookkinds = response.data.datas
        this.listLoading = false
      })
    },
    delAd(index) {
      this.form.buy.splice(index, 1)
    },
    addOptions() {
      const detail = {
        img_url: null,
        title: '',
        index: this.form.buy.length + 1
      }
      this.form.buy.push(detail)
    },
    uploadSucess(param) {
      if (param.index === -1) {
        this.form.pic = param.res_url
      } else {
        this.form.buy[param.index].img_url = param.res_url
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
      if (isNaN(parseFloat(this.form.score))) {
       this.$message('奖项评分处请输入合法数字格式')
       return
      }
      if (parseFloat(this.form.score) > 10) {
        this.$message('奖项评分不能超过10')
        return
      }
      this.form.score = parseFloat(this.form.score)
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.listLoading = true
          add(this.path, this.form).then(response => {
            this.$message(response.data.info)
            this.listLoading = false
            this.$store.dispatch('delView', this.$route)
            this.$router.replace('/books/index')
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

