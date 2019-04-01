<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="考试名称" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="标记" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>
      <!-- <el-form-item label="考试类型">
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
      <el-form-item label="选择学院批次">
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
      </el-form-item>
      <el-form-item label="考试时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="添加考题">
        <dnd-list :list1="form.questions" :list2="form.rlist" list1-title="已选择" list2-title="测试题库" @dndList="getList"/>
        <!-- <el-button type="success" @click="onSubmit">选择</el-button> -->
      </el-form-item>
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
      bEdit: false,
      form: {
        school_id: '',
        batch_id: '',
        title: '',
        tab: '',
        type: '',
        time: '',
        questions: [],
        rlist: []
      },
      formRules: {
        title: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
        tab: [
          { required: true, message: '请输入标记内容', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择开始、结束时间' }
        ]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    this.getInfos(this.$route.params.id)
  },
  methods: {
    getBatchs() {
      this.listLoading = true
      getLists('batch', { page: 1, limit: 99999, school_id: this.form.school_id }).then(response => {
        this.batchs = response.data.datas.data
        this.listLoading = false
      })
    },
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
        // this.getBatchs(this.bEdit ? this.form.school_id : 1)
        // this.form.time = ["2000-11-10 10:10:00", "2000-11-10 10:10:00"]
        console.log(response)
        this.$message(response.data.info)
        this.listLoading = false
      })
    },
    getList(questions) {
      this.form.questions = questions
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
</style>

