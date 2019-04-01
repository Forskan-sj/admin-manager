<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="260px">
      <el-form-item
        v-for="(item, index) in form.contents"
        :label="'课程提示' + (index + 1)"
        :key="index"
      >
        <el-input v-model="item.v" style="width: 500px" placeholder="请输入课程提示内容，字数限制30" maxlength="30"/>
        <el-button
          type="danger"
          style="margin-left: 20px"
          size="small"
          icon="el-icon-delete"
          @click.prevent="removeDomain(index)"
        />
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="success" @click="addOptions">添加新项</el-button> -->
      </el-form-item>
      <div class="forupdate" style="display:none" v-text="forupdate"/>
      <el-form-item >
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
// import DndList from '@/components/DndList'
import { add, getLists } from '@/api/college'
export default {
  name: 'TipsesList',
  data() {
    return {
      path: 'tips',
      forupdate: '',
      listQuery: '',
      bEdit: false,
      form: {
        id: 0,
        contents: [
          { v: '' }, { v: '' }, { v: '' }
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
      getLists(this.path, { id }).then(response => {
        // this.form = response.data.datas
        Object.assign(this.form.contents, response.data.datas.contents)
        this.form.id = response.data.datas.id
        this.forupdate = 's'
        console.log(this.form)
        this.$message(response.data.info)
        this.listLoading = false
      })
    },
    removeDomain(item) {
      if (item !== -1) {
        this.form.contents.splice(item, 1)
      }
    },
    addOptions() {
      this.form.contents.push({
        v: ''
      })
    },
    addQst() {
      this.listLoading = true
      const temp = []
      Object.assign(temp, this.form.contents)
      temp.forEach((it, i, a) => {
        if (it.v === '' || it.v === null) {
          a.splice(i, 1)
        } else {
          return
        }
      })
      add(this.path, { id: this.form.id, contents: temp }).then(response => {
        this.total = response.data.total
        this.list = response.data.datas
        this.listLoading = false
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
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

