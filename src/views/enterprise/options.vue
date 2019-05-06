<template>
  <div class="app-container">
    <el-form v-if="formMark" ref="form" :model="form" :rules="formRules" label-width="260px" >
      <el-form-item label="专训名称" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="专训标识" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>

      <!-- <el-form-item label="归属分类" prop="catid">
        <el-select
          v-model="form.catid"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter(1)"
        >
          <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择类型">
        <el-select
          v-model="form.type"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter(2)"
        >
          <el-option
            v-for="item in courseKind"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item
        label="专训封面(推荐尺寸:474 x 354)"
        prop="pic">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.pic:form.pic" :index="-1" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <!-- <el-form-item
        label="二维码"
        prop="qrcode">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.qrcode:form.qrcode" :index="-3" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item> -->
      <el-form-item
        label="二维码(推荐尺寸: 960 x 720)">
        <up-load v-if="ulParamsMark && formMark" :filelists="qrcodeList" :index="1" :type="2" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报名时间" prop="apply_time">
        <el-date-picker
          v-model="form.apply_time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <!-- <el-form-item label="开放时间" prop="start_times">
        <el-date-picker
          v-model="form.start_times"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item> -->
      <el-form-item label="报名人数" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" prop="num">
        <el-input v-model="form.num"/>
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '请选择课程', trigger: 'blur'
        }"
        label="选择课程">
        <el-checkbox-group v-model="form.course_ids" class="divCourse">
          <el-checkbox style="display:none"/>
          <el-checkbox
            v-for="item in form.course"
            :key="item.id"
            :label="item.id"
            :value="item.id"
          > {{ item.title + '(' + catName[item.catid] + ')' }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="专训介绍:" prop="contents">
        <div>
          <tinymce :height="300" v-model="form.contents"/>
        </div>
      </el-form-item>
      <!-- <el-form-item label="报名介绍:" prop="contents2">
        <div>
          <tinymce :height="300" v-model="form.contents2"/>
        </div>
      </el-form-item> -->
      <!-- <el-form-item label="价格" prop="price" >
        <el-input v-model="form.price" style="width:300px;margin-right:10px"/>元
      </el-form-item> -->
      <!-- <el-form-item label="讲师" prop="teacher_id">
        <el-select
          v-model="form.teacher_id"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter(0)"
        >
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专训类型" prop="is_video">
        <el-select
          v-model="form.is_video"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter(0)"
        >
          <el-option
            v-for="item in sectionKindList"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="是否发布">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item
        :rules="{
          required: true, message: '专训简介不能为空', trigger: 'blur'
        }"
        label="专训简介"
        prop="desc"
      >
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item> -->
      <!-- <el-form-item label="添加简答题" prop="question">
        <span v-if="abjTitle !== ''" class="testText">{{ form.question_id }}、{{ abjTitle }}</span>
        <el-button type="success" @click="showQstList(-1)">{{ abjTitle == '' ? '选择' : '修改' }}</el-button>
      </el-form-item>
    </el-form>
    <div class="sections">章节内容</div>
    <el-form v-if="formMark" ref="form2" label-width="260px" >
      <div
        v-for="(list,index) in form.sections"
        :key="index"
        class="containers">
        <div class="deleteClass" @click="deleteClass(index)">删除章节</div>
        <legend v-text="list.title == ''?'章节名称':(index+1)+'、'+list.title"/>
        <el-form-item
          label="章节名称">
          <el-input v-model="list.title"/>
        </el-form-item>
        <el-form-item
          :label="form.is_video == 0?'添加音频*.mp3':'添加视频*.mp4'">
          <el-button type="success" @click="upLoad(1)">上传</el-button>
          <up-load v-if="ulParamsMark && formMark" :single-pic="list.mediatemp" :index="index" :type="form.is_video" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
        </el-form-item>
        <el-form-item
          label="专训时长">
          <el-input v-model="list.time"/>
        </el-form-item>
        <el-form-item
          label="添加PPT(推荐尺寸: 960 x 720)">
          <up-load v-if="ulParamsMark && formMark" :filelists="list.imgstemp" :index="index" :type="2" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
        </el-form-item>
        <el-form-item label="添加测题" prop="question_id">
          <span v-if="list.qstTitle !== ''" class="testText">{{ list.question_id }}、{{ list.qstTitle }}</span>
          <el-button type="success" @click="showQstList(index)">{{ list.qstTitle == '' ? '选择' : '修改' }}</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item>
        <el-button type="success" @click="addOptions">添加章节</el-button>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button> -->
        <el-button type="primary" @click="onSubmit(1)">保存</el-button>
        <el-button type="primary" @click="onSubmit(2)">保存为新专训</el-button>
        <!-- <el-button type="primary" @click="onSubmit(2)">保存为新专训</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <div v-if="showQuesSel" class="showQL">
      <div class="back" @click="closeQL"/>
      <div class="content">
        <ques-sel :qst-list="qstListBind" :qst_id="qst_id" :index="qsIndex" @choose="choose"/>
      </div>
    </div> -->
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import UpLoad from '@/components/UpLoad'
import Tinymce from '@/components/Tinymce'
import QuesSel from '@/components/QuesSel'
import { add, getInfo, getOSSparams } from '@/api/college'
export default {
  name: 'EnterpriseEdit',
  components: { DndList, UpLoad, QuesSel, Tinymce },
  data() {
    return {
      formMark: false,
      path: 'special',
      ossParams: {},
      ulParamsMark: false,
      listLoading: false,
      listQuery: '',
      courseList: [],
      cdn: 'https://cdncollege.quansuwangluo.com/',
      bEdit: false,
      qrcodeList: [],
      catName: ['', '基', '进', '高'],
      form: {
        course_ids: [],
        title: '',
        id: 0,
        num: '',
        status: 0,
        contents: '',
        contents2: '',
        tab: '',
        pic: null,
        // poster: null,
        qrcode: []
      },
      formRules: {
        title: [{ required: true, message: '请输入专训名称', trigger: 'blur' }],
        apply_time: [{ required: true, message: '请选择报名时间', trigger: 'blur' }],
        start_times: [{ required: true, message: '请选择开放时间', trigger: 'blur' }],
        contents: [{ required: true, message: '请输入专训介绍', trigger: 'blur' }],
        contents2: [{ required: true, message: '请输入报名介绍', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        num: [{ required: true, message: '请输入招生学员数量' }], // poster: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        qrcode: [{ required: true, message: '请上传图片', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    if (this.bEdit) {
      this.formMark = false
      this.getInfos(this.$route.params.id)
    } else {
      this.formMark = true
    }
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
          this.form = response.data.datas
          this.qrcodeList = this.formatImg(this.form.qrcode)
        }
        this.listLoading = false
      })
    },
    formatImg(imgs) {
      var tempList = []
      imgs.forEach((item, i, a) => {
        const temp = {
          uid: '',
          url: '',
          name: ''
        }
        temp.name = item.substring(item.length - 6)
        temp.url = this.cdn + item
        temp.uid = item.replace(/[^0-9]/ig, '')
        tempList.push(temp)
      })
      return tempList
    },
    uploadSucess(param) {
      console.log(param)
      if (param.res_url !== null) {
        if (param.type === 2) {
          this.form.qrcode = param.res_url
        }
        if (param.type === 3) {
          if (param.index === -1) {
            this.form.pic = param.res_url
          }
          if (param.index === -2) {
            this.form.poster = param.res_url
          }
          if (param.index === -3) {
            this.form.qrcode = param.res_url
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
        this.$router.replace('/enterprise/index')
        sessionStorage.setItem('refresh', JSON.stringify(1))
      })
    },
    onSubmit(mark) {
      // console.log(this.form)
      // return
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.id = mark === 2 ? 0 : this.form.id
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

