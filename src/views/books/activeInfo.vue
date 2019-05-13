<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="260px">
      <!-- <el-form-item label="活动奖品:" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="活动主办单位:" prop="author">
        <el-input v-model="form.author"/>
      </el-form-item>
      <el-form-item label="抽奖规则:" prop="rule">
        <el-input v-model="form.rule"/>
      </el-form-item>
      <el-form-item label="活动说明:" prop="infos">
        <el-input v-model="form.infos"/>
      </el-form-item> -->
      <el-form-item label="活动说明:">
        <tinymce :height="300" v-model="contents"/>
      </el-form-item>
    </el-form>
    <el-form ref="form3" label-width="260px" style="margin-top:30px">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getInfoContent, editInfoContent } from '@/api/college'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ActiveInfo',
  components: { Tinymce },
  data() {
    return {
      path: 'lottery',
      // formMark: true,
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      contents: '',
      form: {
        title: '',
        author: '',
        rule: '',
        infos: ''
      },
      formRules: {
        title: [{ required: true, message: '活动奖品', trigger: 'blur' }],
        author: [{ required: true, message: '活动主办单位', trigger: 'blur' }],
        rule: [{ required: true, message: '抽奖规则', trigger: 'blur' }],
        infos: [{ required: true, message: '活动说明', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getInfos()
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfoContent(this.path, { id }).then(response => {
        this.contents = response.data.datas.contents
        this.listLoading = false
      })
    },
    onSubmit() {
      if (this.contents.length) {
        this.listLoading = true
        editInfoContent(this.path, { contents: this.contents }).then(response => {
          this.$message(response.data.message)
          this.listLoading = false
        })
      } else {
        return false
      }
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

</style>

