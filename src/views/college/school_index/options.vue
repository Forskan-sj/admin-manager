<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="160px">
      <el-form-item label="名称" prop="batch_name">
        <el-input v-model="form.batch_name"/>
      </el-form-item>
      <el-form-item label="选择学院、课程" prop="tk_id">
        <el-select v-model="form.school_id" placeholder="请选择归属学院" @change="handleFilter">
          <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="form.tk_id" placeholder="请选择套课">
          <el-option
            v-for="item in seriescourse"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
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
      <el-form-item label="开课时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"/>
      </el-form-item>
      <el-form-item label="报名人数" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" prop="num">
        <el-input v-model="form.num"/>
      </el-form-item>
      <el-form-item prop="class_num" label="班级个数" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )">
        <el-input v-model="form.class_num" :readonly="form.is_open"/>
        <!-- <el-button type="success" @click="buildClass">创建班级</el-button> -->
      </el-form-item>
      <!-- <el-form-item
        v-for="(item, index) in form.class"
        :prop="'class.' + index + '.class_names'"
        :key="index"
        :rules="{
          required: true, message: '选项内容不能为空', trigger: 'blur'
        }"
        label="班级名称">
        <el-input v-model="item.class_names"/>
      </el-form-item> -->
      <!-- <div class="sections">学分设置</div>
      <el-form-item label="升学阶段学分" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" prop="stage_credit">
        <el-input v-model="form.stage_credit"/>
      </el-form-item>
      <el-form-item label="结业学分" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" prop="graduation_credit">
        <el-input v-model="form.graduation_credit"/>
      </el-form-item> -->
      <el-form-item>
        <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button>
        <el-button v-if="bEdit" type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, getInfo } from '@/api/college'
export default {
  name: 'SindexEdit',
  data() {
    return {
      path: 'batch',
      bEdit: false,
      schoolList: [],
      seriescourse: [],
      form: {
        batch_name: '',
        school_id: '',
        is_open: false,
        tk_id: '',
        class_num_old: '',
        num: '',
        class: [],
        class_num: '',
        class_names: '',
        stage_credit: '',
        graduation_credit: '',
        apply_time: [],
        time: []
      },
      formRules: {
        batch_name: [{ required: true, message: '请输入批次名称', trigger: 'blur' }],
        tk_id: [{ required: true, message: '请选择套课', trigger: 'blur' }],
        time: [{ required: true, message: '请选择报名开始、结束时间' }],
        num: [{ required: true, message: '请输入招生学员数量' }],
        class_num: [{ required: true, message: '请选择创建班级数量' }],
        class_names: [{ required: true, message: '请输入班级名称，如：1班|2班' }],
        apply_time: [{ required: true, message: '请选择开课开始、结束时间' }]
        // stage_credit: [{ required: true, message: '请确定升学阶段学分' }],
        // graduation_credit: [{ required: true, message: '请确定结业学分' }]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    this.getInfos(this.$route.params.id)
  },
  updated() {
  },
  methods: {
    handleFilter() {
      this.getCourseList()
    },
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        if (this.bEdit) this.form = response.data.datas.data
        this.schoolList = response.data.datas.school
        this.seriescourse = response.data.datas.tk
        console.log(response)
        this.listLoading = false
      })
    },
    addBatch() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.total = response.data.total
        this.list = response.data.datas
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/school_index/index')
        sessionStorage.setItem('refresh', JSON.stringify(1))
        this.$message(response.data.info)
      })
    },
    onSubmit() {
      console.log(this.questions, this.form)
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addBatch()
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
</style>

