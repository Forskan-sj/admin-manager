<template>
  <div class="app-container">
    <el-form v-if="formMark" ref="form" :model="form" :rules="formRules" label-width="260px" >
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="课程标识" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>
      <el-form-item label="课程序列号">
        <el-input v-model="form.list_order"/>
      </el-form-item>
      <el-form-item label="归属分类" prop="catid">
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
      <!-- <el-form-item label="选择类型">
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
        label="课程封面(推荐尺寸:474 x 354)"
        prop="ppt">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.pic:form.pic" :index="-1" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <el-form-item
        label="播放背景图(推荐尺寸:750 x 422 )"
        prop="poster">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.poster:form.poster" :index="-2" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <!-- <el-form-item label="价格" prop="price" >
        <el-input v-model="form.price" style="width:300px;margin-right:10px"/>元
      </el-form-item> -->
      <el-form-item label="讲师" prop="teacher_id">
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
      <el-form-item label="课程类型" prop="is_video">
        <el-select
          v-model="form.is_video"
          :disabled="bEdit"
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
      </el-form-item>
      <el-form-item label="是否发布">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐/首页">
        <el-radio-group v-model="form.is_recommend">
          <el-radio :label="2">推荐（内容页）</el-radio>
          <el-radio :label="1">推荐（首页）</el-radio>
          <el-radio :label="0">不推荐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上架时间" prop="start_time">
        <el-date-picker
          v-model="form.start_time"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '课程简介不能为空', trigger: 'blur'
        }"
        label="课程简介"
        prop="desc"
      >
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item label="添加简答题" prop="question">
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
          <!-- <el-button type="success" @click="upLoad(1)">上传</el-button> -->
          <up-load v-if="ulParamsMark && formMark" :single-pic="list.mediatemp" :index="index" :type="form.is_video" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
        </el-form-item>
        <el-form-item
          label="课程时长">
          <el-input v-model="list.time"/>
        </el-form-item>
        <!-- <el-form-item
          label="添加PPT(推荐尺寸: 960 x 720)">
          <up-load v-if="ulParamsMark && formMark" :filelists="list.imgstemp" :index="index" :type="2" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
        </el-form-item> -->
        <el-form-item label="添加测题" prop="question_id">
          <span v-if="list.qstTitle !== ''" class="testText">{{ list.question_id }}、{{ list.qstTitle }}</span>
          <el-button type="success" @click="showQstList(index)">{{ list.qstTitle == '' ? '选择' : '修改' }}</el-button>
        </el-form-item>
        <el-form-item label="课程精华:" prop="contents">
          <div>
            <tinymce :height="300" v-model="list.contents"/>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item>
        <el-button type="success" @click="addOptions">添加章节</el-button>
      </el-form-item>
      <el-form-item>
        <!-- <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button> -->
        <el-button type="primary" @click="onSubmit(1)">保存</el-button>
        <el-button type="primary" @click="onSubmit(2)">保存为新课程</el-button>
      </el-form-item>
    </el-form>
    <div v-if="showQuesSel" class="showQL">
      <div class="back" @click="closeQL"/>
      <div class="content">
        <ques-sel :qst-list="qstListBind" :qst_id="qst_id" :index="qsIndex" @choose="choose"/>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import DndList from '@/components/DndList'
import UpLoad from '@/components/UpLoad'
import QuesSel from '@/components/QuesSel'
import { add, getInfo, getLists, getOSSparams } from '@/api/college'
export default {
  name: 'CourseEdit',
  components: { DndList, UpLoad, QuesSel, Tinymce },
  data() {
    return {
      formMark: false,
      showQuesSel: false,
      qstListObj: [],
      qstListAbj: [],
      qstListBind: [],
      abjTitle: '',
      qsIndex: -1,
      qst_id: '',
      path: 'course',
      ossParams: {},
      ulParamsMark: false,
      listLoading: false,
      listQuery: '',
      cdn: 'https://cdncollege.quansuwangluo.com/',
      teacherList: [],
      schoolList: [
        { title: '基础课程', id: 1 },
        { title: '进阶课程', id: 2 },
        { title: '高阶课程', id: 3 }
      ],
      courseKind: [
        { label: '公开课', key: 1 },
        { label: '单课', key: 2 }
      ],
      sectionKindList: [
        { label: '音频mp3', key: 0 },
        { label: '视频mp4', key: 1 }
      ],
      bEdit: false,
      form: {
        sections: [
          {
            id: 0,
            title: '',
            contents: '',
            imgs: [],
            media: '',
            time: '',
            is_recommend: 0,
            qstTitle: '',
            question_id: -1
          }
        ],
        title: '',
        teacher_id: 1,
        list_order: 0,
        tab: '',
        id: 0,
        pic: null,
        poster: null,
        catid: 1,
        start_time: '',
        // type: 1,
        // price: '',
        question_id: -1,
        is_video: 1,
        status: 0,
        desc: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        tab: [{ required: true, message: '请输入标识', trigger: 'blur' }],
        start_time: [{ required: true, message: '请选择上架时间', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'

    this.getInfos(this.$route.params.id)

    this.listLoading = true
    this.getQuestionsList([1, 2])
    this.getQuestionsList([3])
    getOSSparams({ type: 'dev_test_dcaredata' }).then(response => {
      this.ossParams = response.data.datas
      this.ulParamsMark = true
      this.listLoading = false
    })
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      this.formMark = false
      getInfo(this.path, { id }).then(response => {
        this.formMark = true
        if (this.bEdit) {
          this.form = response.data.datas.course
          // console.log(this.form)
          this.abjTitle = this.form.qstTitle
          this.form.sections.forEach((item, i, a) => {
            item.mediatemp = item.media === null ? null : this.cdn + item.media
            item.imgstemp = this.formatImg(item.imgs)
          })
        }
        this.teacherList = response.data.datas.teacher
        this.schoolList = response.data.datas.category

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
    showQstList(param) {
      this.qstListBind = param === -1 ? this.qstListAbj : this.qstListObj
      this.qst_id = param === -1 ? this.form.question_id : this.form.sections[param].question
      this.qsIndex = param
      this.showQuesSel = true
    },
    closeQL() {
      this.showQuesSel = false
    },
    choose(param) {
      this.showQuesSel = false
      if (param.index === -1) {
        this.abjTitle = param.chooseItem.title || ''
        this.form.question_id = param.chooseItem.id
      } else {
        this.form.sections[param.index].qstTitle = param.chooseItem.title || ''
        this.form.sections[param.index].question_id = param.chooseItem.id
      }
    },
    getQuestionsList(param) {
      this.listLoading = true
      getLists('question', { page: 1, limit: 99999, type: param }).then(response => {
        if (param.length === 1) {
          this.qstListAbj = response.data.datas
        } else {
          this.qstListObj = response.data.datas
        }
        this.listLoading = false
      })
    },
    uploadSucess(param) {
      if (param.res_url !== null) {
        if (param.type === 2) {
          this.form.sections[param.index].imgs = param.res_url
        }
        if (param.type === 0 || param.type === 1) {
          this.form.sections[param.index].media = param.res_url
        }
        if (param.type === 3) {
          if (param.index === -1) {
            this.form.pic = param.res_url
          }
          if (param.index === -2) {
            this.form.poster = param.res_url
          }
        }
      }
      if (param.mediaDuration !== -1) {
        this.form.sections[param.index].time = param.mediaDuration
      }
      // console.log(param)
    },
    deleteClass(index) {
      this.form.sections.splice(index, 1)
      // if(this.courses.length < this.setClaseCount){
      //     $('.addnew').show();
      // }
    },
    removeDomain(item) {
      var index = this.form.queoptions.indexOf(item)
      if (index !== -1) {
        this.form.queoptions.splice(index, 1)
      }
    },
    addOptions() {
      console.log(this.ossParams)
      this.form.sections.push({
        id: 0,
        title: '',
        imgs: [],
        media: '',
        mediatemp: null,
        imgstemp: [],
        time: '',
        qstTitle: '',
        question_id: -1,
        question: ''
      })
    },
    handleFilter(index) {
      if (this.form.kind === 0) this.form.rightAns = 0
      if (this.form.kind === 1) this.form.rightAns = [0, 1]
    },
    addCourse() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.listLoading = false
        this.$message(response.data.message)
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/course')
        sessionStorage.setItem('refresh', JSON.stringify(1))
      })
    },
    onSubmit(mark) {
      console.log(this.form)
      this.$refs['form'].validate(valid => {
        // debugger
        if (valid) {
          var boolbs = false
          this.form.sections.forEach((it, idx, a) => {
            if (!it.time || !it.media) {
              this.$message({
                message: '第' + (idx + 1) + '章未传音频、视频',
                type: 'error'
              })
              boolbs = true
              return
            }
          })
          if (!boolbs) {
            this.form.id = mark === 2 ? 0 : this.form.id
            this.addCourse()
          }
        } else {
          return false
        }
      })
      this.$message('submit!')
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
</style>

