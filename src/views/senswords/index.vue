<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item>
        <el-input v-model="keyWord" style="width: 180px" placeholder="请输入敏感词汇" maxlength="30"/>
        <el-button
          type="success"
          style="margin-left: 10px"
          size="small"
          @click.prevent="addQst"
        >新增</el-button>
      </el-form-item>
      <el-form-item>
        <div class="senstitle">
          敏感词库
        </div>
      </el-form-item>
      <el-form-item>
        <div
          v-for="(item, index) in form.contents"
          :key="index"
          class="sensItem">
          <span v-text="item.word"/>
          <div class="del" @click="delItem(item.id)">+</div>
        </div>
      </el-form-item>
      <div class="forupdate" style="display:none" v-text="forupdate"/>
      <!-- <el-form-item >
        <el-button type="success" @click="addOptions">添加选项</el-button>
      </el-form-item> -->
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
// import DndList from '@/components/DndList'
import { add, getLists, del } from '@/api/college'
export default {
  name: 'SensWords',
  data() {
    return {
      path: 'word',
      keyWord: '',
      forupdate: '',
      listQuery: '',
      bEdit: false,
      form: {
        id: 0,
        contents: [
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
        this.form.contents = response.data.datas
        this.form.id = response.data.datas.id
        this.forupdate = 's'
        this.keyWord = ''
        this.listLoading = false
      })
    },
    delItem(id) {
      this.listLoading = true
      del(this.path, { id }).then(response => {
        this.getInfos()
        this.listLoading = false
        this.$message(response.data.info)
      })
    },
    addOptions() {
      this.form.contents.push({
        v: ''
      })
    },
    addQst() {
      this.listLoading = true
      // const temp = []
      // Object.assign(temp, this.form.contents)
      // temp.forEach((it, i, a) => {
      //   if (it.v === '' || it.v === null) {
      //     a.splice(i, 1)
      //   } else {
      //     return
      //   }
      // })
      add(this.path, { word: this.keyWord }).then(response => {
        this.getInfos()
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

<style scoped lang='scss'>
.line {
  text-align: center;
}
.senstitle{
  // margin-top: 30px;
  width: 260px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: brown;
}
.sensItem{
  border: 1px solid rgba(0,0,0,0.1);
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
  border-radius: 10px;
  float: left;
  // width: 25%;
  margin:10px 20px 0 0;
  .del{
    float: right;
    margin-left: 5px;
    color: rgba(0,0,0,0.4);
    font-size: 20px;
    cursor: pointer;
    font-weight: 100;
    transform: rotateZ(45deg);
  }
  // + .sensItem{
  //   margin-left: 30px;
  // }

}
</style>

