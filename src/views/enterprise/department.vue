<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="260px">
      <el-form-item
        v-for="(item, index) in form.contents"
        :label="'部门名称' + (index + 1)"
        :key="index"
      >
        <el-input v-model="item.v" style="width: 500px" placeholder="请输入部门名称，无则置空" maxlength="10"/>
        <!-- <el-button
          type="danger"
          style="margin-left: 20px"
          size="small"
          icon="el-icon-delete"
          @click.prevent="removeDomain(index)"
        /> -->
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="success" @click="addOptions">添加新项</el-button> -->
      </el-form-item>
      <div class="forupdate" style="display:none" v-text="forupdate"/>
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
  name: 'Department',
  // components: { DndList },
  data() {
    return {
      path: 'depart',
      forupdate: '',
      listQuery: '',
      bEdit: false,
      form: {
        id: 0,
        contents: [
          { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }
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
      const temp = this.form.contents.filter(d => d.v.trim())
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

