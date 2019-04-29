<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="试卷名称" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="标记" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>
      <div class="sections">题目内容</div>
      <el-form v-if="formMark" ref="form" label-width="260px" >
        <div
          v-for="(item,idx) in form.questions"
          :key="idx"
          class="containers">
          <div class="deleteClass" @click="deleteClass(idx)">删除题目</div>
          <legend v-text="item.title == ''?'题目名称':(idx+1)+'、'+item.title"/>
          <el-form-item
            label="题目名称">
            <el-input v-model="item.title"/>
          </el-form-item>
          <!-- <el-form-item
            :prop="'questions.' + idx + '.tab'"
            :rules="{
              required: true, message: '请输入题目标记', trigger: 'blur'
            }"
            label="标记">
            <el-input v-model="item.tab"/>
          </el-form-item> -->
          <el-radio-group
            v-model="item.true_answer"
          >
            <el-form-item
              v-for="(domain, index) in item.answer"
              :label="'选项' + (index + 1)"
              :key="domain.key"
            >
              <el-input v-model="domain.value" style="width: 500px"/>
              <el-radio :label="index+1">答案</el-radio>
              <el-button
                type="danger"
                style="margin-left: 20px"
                size="small"
                icon="el-icon-delete"
                @click.prevent="removeDomain(idx, index)"
              />
            </el-form-item>
          </el-radio-group>
          <el-form-item>
            <el-button type="success" @click="addOptions(idx)">添加选项</el-button>
          </el-form-item>
          <el-form-item
            label="解析（100字内）"
          >
            <el-input v-model="item.desc" type="textarea"/>
          </el-form-item>
        </div>
      </el-form>

      <!-- <el-form-item label="题目" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="标记" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>
      <el-radio-group
        v-model="form.true_answer"
      >
        <el-form-item
          v-for="(domain, index) in form.answer"
          :label="'选项' + (index + 1)"
          :key="domain.key"
          :prop="'answer.' + index + '.value'"
          :rules="{
            required: true, message: '选项内容不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.value" style="width: 500px"/>
          <el-radio :label="index+1">答案</el-radio>
          <el-button
            type="danger"
            style="margin-left: 20px"
            size="small"
            icon="el-icon-delete"
            @click.prevent="removeDomain(domain)"
          />
        </el-form-item>
      </el-radio-group>
      <el-form-item>
        <el-button type="success" @click="addOptions">添加选项</el-button>
      </el-form-item> -->

      <el-form-item>
        <el-button type="success" @click="addQst">添加题目</el-button>
      </el-form-item>
      <!-- <el-form-item label="试卷类型">
        <el-select
          v-model="form.type"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in schools"
            :key="item.key"
            :label="item.school_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="选择学院批次">
        <el-select
          v-model="form.school_id"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter(1)"
        >
          <el-option
            v-for="item in schools"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="form.batch_id"
          style="width: 140px"
          class="filter-item"
          placeholder="请选择批次"
        >
          <el-option
            v-for="item in batchs"
            :key="item.id"
            :label="item.batch_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="试卷时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item> -->
      <!-- <el-form-item label="添加考题">
        <dnd-list :list1="form.questions" :list2="form.rlist" list1-title="已选择" list2-title="测试题库" @dndList="getList"/>
        <el-button type="success" @click="onSubmit">选择</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button>
        <el-button v-if="bEdit" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import { add, getInfo, getLists } from '@/api/college'
export default {
  name: 'ExamEdit',
  components: { DndList },
  data() {
    return {
      path: 'exam',
      listQuery: '',
      schools: [],
      batchs: [],
      formMark: true,
      bEdit: false,
      form: {
        title: '',
        tab: '',
        id: 0,
        desc: '',
        questions: [{
          title: '',
          tab: '',
          id: 0,
          desc: '',
          true_answer: '',
          answer: [
            { value: '', key: 1 },
            { value: '', key: 2 },
            { value: '', key: 3 },
            { value: '', key: 4 }
          ]
        }]
      },
      formRules: {
        title: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
        tab: [
          { required: true, message: '请输入标记内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    // this.getInfos(this.$route.params.id)
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        if (this.bEdit) {
          this.form = response.data.datas
          this.getBatchs(this.form.school_id)
        } else {
          this.form.rlist = response.data.datas.rlist
        }
        this.schools = response.data.datas.school
        this.$message(response.data.info)
        this.listLoading = false
      })
    },
    getList(questions) {
      this.form.questions = questions
    },
    addOptions(index) {
      var temp = {
        value: '',
        key: index * 10
      }
      this.form.questions[index].answer.push(temp)
    },
    addQst() {
      var temp = {
        title: '',
        tab: '',
        id: 0,
        desc: '',
        answer: [
          { value: '', key: 1 },
          { value: '', key: 2 },
          { value: '', key: 3 },
          { value: '', key: 4 }
        ]
      }
      this.form.questions.push(temp)
    },
    deleteClass(index) {
      this.form.questions.splice(index, 1)
    },
    addExam() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.total = response.data.total
        this.list = response.data.datas
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/exam/index')
        sessionStorage.setItem('refresh', JSON.stringify(1))
        this.$message(response.data.info)
      })
    },
    removeDomain(idx, index) {
      this.form.questions[idx].answer.splice(index, 1)
    },
    handleFilter() {
      this.getBatchs(this.form.school_id)
    },
    onSubmit() {
      console.log(this.questions, this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addExam()
        } else {
          console.log('error submit!!')
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

<style scoped>
.line{
  text-align: center;
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
</style>

