<template>
  <div class="app-container">
    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item label="课程类型" >
        <el-select
          :disabled="bEdit"
          v-model="form.type"
          style="width: 140px"
          class="filter-item"
        >
          <el-option
            v-for="item in coursekind"
            :key="item.id"
            :label="item.kind_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="课程标识" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>
      <el-form-item label="课程封面(推荐尺寸:160 x 123)" prop="pic">
        <up-load v-if="ulParamsMark && formMark" :index="0" :type="3" :single-pic="bEdit?cdn+form.pic:form.pic" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item>
      <!-- <el-form-item
        label="课程海报(推荐尺寸:317 x 467 )"
        prop="ppt">
        <up-load v-if="ulParamsMark && formMark" :single-pic="bEdit?cdn+form.poster:form.poster" :index="-2" :type="3" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
      </el-form-item> -->

      <el-form-item label="归属学院" prop="school_id">
        <el-select
          v-model="form.school_id"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter(1)"
        >
          <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.school_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price" >
        <el-input v-model="form.price" style="width:300px;margin-right:10px"/>元
      </el-form-item>
      <el-form-item label="是否发布">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.type == 3"
        :rules="{
          required: true, message: '课程简介不能为空', trigger: 'blur'
        }"
        label="课程简介"
        prop="desc"
      >
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item label="课程详情:" prop="contents">
        <div>
          <tinymce :height="300" v-model="form.contents"/>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.type == 3"
        :rules="{
          required: true, message: '结业语不能为空', trigger: 'blur'
        }"
        label="结业语"
        prop="graduation"
      >
        <el-input v-model="form.graduation" type="textarea"/>
      </el-form-item>
      <el-form-item v-if="form.type !== 3" label="选择课程">
        <el-radio-group v-model="form.course_id" class="divCourse">
          <el-radio style="display:none"/>
          <el-radio
            v-for="item in courseList"
            :key="item.id"
            :label="item.id"
            :value="item.id"
            style="margin:10px "
            @change="chooseCourse(item)"
          > {{ item.title }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-if="form.type == 3" class="sections">课程内容</div>

      <div v-if="form.type == 3" class="sdfsfsd" >
        <div v-for="(litem, index) in form.courses" :key="index" class="containers">
          <div class="deleteClass" @click="delCourseItem(index)">删除阶段</div>
          <legend/>
          <el-form-item
            :rules="{
              required: true, message: '请填写阶段名称', trigger: 'blur'
            }"
            :prop="'courses.' + index + '.title'"
            label="阶段名称">
            <el-input v-model="litem.title" placeholder="请输入阶段名称" style="width:300px"/>
          </el-form-item>
          <el-form-item
            :rules="{
              required: true, message: '请选择课程', trigger: 'blur'
            }"
            :prop="'courses.' + index + '.courseList'"
            label="选择课程">
            <el-checkbox-group v-model="litem.courseList" class="divCourse">
              <el-checkbox style="display:none"/>
              <el-checkbox
                v-for="item in allCourseList[index]"
                :key="item.id"
                :label="item.id"
                :value="item.id"
                @change="mutex(index, item)"
              > {{ item.title }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item v-if="form.type == 3">
        <el-button type="success" @click="addOptions">添加阶段</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import Tinymce from '@/components/Tinymce'
import { add, getInfo, getLists, getOSSparams } from '@/api/college'
import UpLoad from '@/components/UpLoad'
export default {
  name: 'SeriesEdit',
  components: { DndList, UpLoad, Tinymce },
  data() {
    return {
      yearGroup: 4, // 年级数
      path: 'combination',
      formMark: true,
      ulParamsMark: false,
      listQuery: '',
      coursekind: [{
        id: 1,
        kind_name: '公开课'
      },
      {
        id: 2,
        kind_name: '单课'
      },
      {
        id: 3,
        kind_name: '套课'
      }],
      ossParams: {},
      examList: [],
      courseList: [],
      allCourseList: [],
      schoolList: [
        { label: '沐熙学院', key: 0 }
      ],
      bEdit: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        type: 1,
        courses: [{
          title: '',
          courseList: []
        }],
        course_id: 0,
        status: 1,
        title: '',
        tab: '',
        school_id: 1,
        desc: '',
        pic: null,
        price: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        school_id: [{ required: true, message: '请选择归属学院', trigger: 'change' }],
        tab: [{ required: true, message: '请输入课程标识', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传课程封面图片', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'

    this.getSchoolList()
    // this.getExamList()
    if (this.bEdit) {
      this.getInfos(this.$route.params.id)
    } else {
      this.getCourseList(1)
    }
    // this.getCourseList(0)
    getOSSparams({ type: 'dev_test_dcaredata' }).then(response => {
      this.ossParams = response.data.datas
      this.ulParamsMark = true
      this.listLoading = false
    })
  },
  methods: {
    mutex(index, item) { // index: 年级; item:课程 obj,
      // courseList
      // allCourseList
      // console.log(item)
      // 遍历各年级课程库列表，剔除其他年级选中课程
      console.log(index, item)
      if (index !== undefined && item !== undefined) {
        if (this.form.courses[index].courseList.indexOf(item.id) === -1) {
          for (let i = 0; i < this.form.courses.length; i++) {
            if (i !== index) this.allCourseList[i].push(JSON.parse(JSON.stringify(item)))
          }
        }
      }

      // 阶段（大一 ———— 大四）
      this.form.courses.forEach((a, i, all) => {
        // 选中课程
        a.courseList.forEach((ait, idx, arr) => {
          // 剔除其他选中课程
          this.allCourseList.forEach((acit, acidx, acarr) => {
            if (acidx === i) return
            acit.forEach((cit, cidx, carr) => {
              if (cit.id === ait) carr.splice(cidx, 1)
            })
          })
        })
      })
    },
    delCourseItem(index) {
      this.form.courses[index].courseList.forEach((c, ic) => {
        const catobj = this.courseList.filter(obj => obj.id === c)
        if (catobj.length) {
          this.allCourseList.forEach((ac, aci) => {
            if (aci === index) return
            ac.push(catobj[0])
          })
        }
      })

      this.allCourseList.splice(index, 1)
      this.form.courses.splice(index, 1)
      // this.mutex()
    },
    uploadSucess(param) {
      console.log(param)
      if (param.index === 0) {
        this.form.pic = param.res_url
      }
      if (param.index === -2) {
        this.form.poster = param.res_url
      }
    },
    getInfos(id) {
      this.listLoading = true
      this.formMark = false
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        this.getCourseList(1)
        this.$message(response.data.info)
        // this.mutex()
        this.listLoading = false
        this.formMark = true
      })
    },
    getCourseList(mark) {
      this.listLoading = true
      getLists('course', { page: 1, limit: 9999, school_id: this.form.school_id }).then(response => {
        this.courseList = response.data.datas.data
        this.allCourseList = []
        for (let i = 0; i < this.form.courses.length; i++) {
          this.allCourseList.push(JSON.parse(JSON.stringify(this.courseList)))
        }

        this.listLoading = false
        if (mark) {
          this.mutex()
        }
      })
    },
    getExamList() {
      this.listLoading = true
      getLists('exam', { page: 1, limit: 9999 }).then(response => {
        this.examList = response.data.datas
        this.listLoading = false
      })
    },
    getSchoolList() {
      this.listLoading = true
      getLists('school', { page: 1, limit: 9999 }).then(response => {
        this.schoolList = response.data.datas
        this.listLoading = false
      })
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
      var temp = {
        name: '',
        courseList: []
      }
      this.allCourseList.push(JSON.parse(JSON.stringify(this.courseList)))
      this.form.courses.push(temp)
      this.mutex()
    },
    handleFilter(index) {
      // if (this.form.kind === 0) this.form.rightAns = 0
      if (index === 1) {
        this.getCourseList(1)
      }
    },
    chooseCourse(item) {
      this.form.title = item.title
      this.form.pic = item.pic
      console.log(this.form)
    },
    onSubmit() {
      console.log(this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          add(this.path, this.form).then(response => {
            this.$message(response.data.info)
            this.$store.dispatch('delView', this.$route)
            this.$router.replace('/college/series_course/index')
            sessionStorage.setItem('refresh', JSON.stringify(1))
            this.listLoading = false
          })
        } else {
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
  z-index: 100;
  top: 18px;
}
.containers{
  position: relative;
}
.divCourse{
  border: 1px solid gray;
  max-height: 150px;
  overflow-y: scroll;
}
</style>

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
