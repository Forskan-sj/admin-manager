<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <el-form-item label="题目" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="标记" prop="tab">
        <el-input v-model="form.tab"/>
      </el-form-item>
      <el-form-item label="题目类型">
        <el-select
          v-model="form.type"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-checkbox-group v-if="form.type == 2" v-model="form.true_answer">
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
          <el-checkbox :label="index+1">答案</el-checkbox>
          <el-button
            type="danger"
            style="margin-left: 20px"
            size="small"
            icon="el-icon-delete"
            @click.prevent="removeDomain(domain)"
          />
        </el-form-item>
      </el-checkbox-group>
      <el-radio-group
        v-if="form.type == 1"
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
      <!-- v-if="form.type == 3"
         -->
      <el-form-item
        :rules="{
          required: true, message: '解析不能为空', trigger: 'blur'
        }"
        label="解析（100字内）"
        prop="desc"
      >
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item v-if="form.type !== 3">
        <el-button type="success" @click="addOptions">添加选项</el-button>
      </el-form-item>
      <el-form-item>
        <!-- <el-button v-if="!bEdit" type="primary" @click="onSubmit">添加</el-button> -->

        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import { add, getInfo } from '@/api/college'
export default {
  name: 'QuestionEdit',
  components: { DndList },
  data() {
    return {
      path: 'question',
      listQuery: '',
      sortOptions: [
        { label: '单选题', key: 1 },
        // { label: '多选题', key: 2 },
        { label: '简答题', key: 3 }
      ],
      bEdit: false,
      form: {
        answer: [
          { value: '', key: 1 },
          { value: '', key: 2 },
          { value: '', key: 3 },
          { value: '', key: 4 }
        ],
        title: '',
        tab: '',
        type: 1,
        true_answer: 1,
        id: 0,
        desc: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入题目内容', trigger: 'blur' }],
        tab: [
          { required: true, message: '请输入标记内容', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    if (this.bEdit) {
      this.getInfos(this.$route.params.id)
    }
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        this.form = response.data.datas
        console.log(response)
        this.$message(response.data.info)
        this.listLoading = false
      })
    },
    removeDomain(item) {
      var index = this.form.answer.indexOf(item)
      if (index !== -1) {
        this.form.answer.splice(index, 1)
      }
    },
    addOptions() {
      this.form.answer.push({
        value: '',
        key: this.form.answer.length + 1
      })
    },
    handleFilter() {
      if (this.form.type === 1) this.form.true_answer = 1
      if (this.form.type === 2) this.form.true_answer = [1, 2]
    },
    addQst() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.total = response.data.total
        this.list = response.data.datas
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/college/question')
        sessionStorage.setItem('refresh', JSON.stringify(1))
        this.$message(response.data.info)
      })
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addQst()
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.$message('submit!')
      console.log(this.form)
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
</style>

