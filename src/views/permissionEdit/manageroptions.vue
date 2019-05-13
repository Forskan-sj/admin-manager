<template>
  <div class="app-container">
    <div style="height:30px"/>
    <el-checkbox-group v-model="seNums" class="divCourse">
      <div v-for="(item, index) in list" :key="item.id" class="testsdf">
        <el-checkbox
          :label="item.id"
          :value="item.id"
          @change="forone(index)"
        > {{ item.meta.title }}</el-checkbox>
        <div v-for="(it, idx) in item.children" :key="it.id" class="test3423sdf">
          <el-checkbox
            :label="it.id"
            :value="it.id"
            @change="fortwo(index, idx)"
          > {{ it.meta.title }}</el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
    <el-button type="primary" class="submitbt" @click="onSubmit">保存</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" >
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getInfo, add } from '@/api/college'
import { asyncRouterMap } from '@/router'
export default {
  name: 'PermissionManagers',
  components: { Pagination },
  data() {
    return {
      path: 'group',
      dialogImageUrl: '',
      dialogVisible: false,
      seNums: [],
      listQuery: {
        key: '',
        status: '',
        page: 1,
        limit: 10
      },
      listLoading: false,
      list: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.list = asyncRouterMap
  },
  methods: {
    forone(index) {
      const temp = this.list[index]
      const inNum = this.seNums.indexOf(temp.id)
      if (inNum === -1) {
        temp.children.forEach((it, idx, a) => {
          if (this.seNums.indexOf(it.id) !== -1) {
            this.seNums.splice(this.seNums.indexOf(it.id), 1)
          }
        })
      } else {
        temp.children.forEach((it, idx, a) => {
          if (this.seNums.indexOf(it.id) === -1) {
            this.seNums.push(it.id)
          }
        })
      }
    },
    fortwo(index, idx) {
      const temp = this.list[index]
      const inNum = this.seNums.indexOf(temp.children[idx].id)
      if (inNum === -1) {
        let bIn = false
        temp.children.forEach((it, idx, a) => {
          if (this.seNums.indexOf(it.id) !== -1) {
            bIn = true
          }
        })
        if (!bIn) this.seNums.splice(this.seNums.indexOf(temp.id), 1)
      } else {
        if (this.seNums.indexOf(temp.id) === -1) {
          this.seNums.push(temp.id)
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    onSubmit() {
      this.addRule()
    },
    addRule() {
      this.listLoading = true
      add(this.path, { id: this.$route.params.id, rule: this.seNums }).then(response => {
        this.listLoading = false
        this.$store.dispatch('delView', this.$route)
        this.$router.replace('/permissionEdit/permissionList')
        sessionStorage.setItem('refresh', JSON.stringify(1))
      })
    },
    getList(index) {
      this.listLoading = true
      getInfo(this.path, { id: this.$route.params.id }).then(response => {
        this.total = response.data.total
        this.seNums = response.data.datas.rule
        this.dialogVisible = false
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.imgpic {
  width: 100%;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
}
img {
  width: 100%;
}
.divCourse{
  width: 400px;
  margin: 50px auto;
}
.submitbt{
  margin-left: 40%;
}
.addSchoolType {
  margin: 30px 0;
}
.test3423sdf{
  margin-left: 100px;
}
.test3423sdf{
  border: 1px solid gray;
  padding: 10px 20px;
}
</style>

