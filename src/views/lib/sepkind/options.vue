<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="160px">
      <el-form-item label="类型名称:" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="选择分类:" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="2">文章</el-radio>
          <el-radio :label="1">书籍</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否启用:" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型描述:" prop="desc">
        <el-input v-model="form.desc"/>
      </el-form-item>
    </el-form>

    <el-form ref="form3" label-width="160px" style="margin-top:30px">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad'
import { add, getInfo } from '@/api/college'
export default {
  name: 'SepkindEdit',
  components: { UpLoad },
  data() {
    return {
      path: 'category',
      bEdit: false,
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/',
      form: {
        type: 1,
        name: '',
        desc: '',
        status: 1
      },
      formRules: {
        name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入类型描述', trigger: 'blur' }]
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
        this.listLoading = false
      })
    },
    onSubmit() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.$message(response.data.info)
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/lib/sepkind/index')
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

