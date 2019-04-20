<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <!-- <el-input
        v-model="listQuery.key"
        placeholder="课程名称/课程标识"
        style="width: 300px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
      <el-select
        v-model="listQuery.status"
        placeholder="批改状态"
        clearable
        style="width: 150px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <!-- <el-select
        v-model="listQuery.type"
        style="width: 140px"
        class="filter-item"
        placeholder="课程类型"
        @change="handleFilter(0)"
      >
        <el-option
          v-for="item in courseKind"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!-- <div class="addSchoolType">
      <router-link :to="'/college/course_edit/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加课程</el-button>
      </router-link>
    </div> -->
    <div class="qstInfo">
      <div class="courseName" v-text="'课程名称：' + praxisInfo.title"/>
      <div class="qstTitle" v-text="'课程题目：' + praxisInfo.question"/>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border=""
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="'学员名字'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'批改状态'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ schoolList[scope.row.status -1].name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'提交时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="'关联套课'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.catid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'课程类型'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.catid }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="'测试题'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <div class="userList">{{ scope.row.question_id }}</div>
        </template>
      </el-table-column> -->
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="showDTL(scope.row)">查看</el-button>
          <!-- <el-button type="danger" size="small" icon="el-icon-delete">驳回</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <!-- <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" :title="praxisInfo.question" class="detaiDlg" @dragDialog="handleDrag"> -->
    <div v-if="dialogTableVisible" class="praxisDinfo" @click="dialogTableVisible = false">
      <div class="contentss" @click.stop>
        <div class="userInfo">
          <img :src="curData.avatar">
          <div class="descsss" v-text="curData.nickname + '的作业'"/>
        </div>
        <div class="answer" v-text="curData.answer"/>
        <div class="imgList">
          <img v-for="(item, index) in curData.img_url" :key="index" :src="cdn + item" @click="handlePictureCardPreview(cdn + item)">
        </div>

        <div class="optionss">
          <div class="score">
            <el-radio-group v-model="score">
              <el-radio :label="2">2</el-radio>
              <el-radio :label="4">4</el-radio>
              <el-radio :label="6">6</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" size="small" @click="sub(0)">通过</el-button>
          <el-button type="danger" size="small" @click="sub(1)">驳回</el-button>
        </div>
      </div>
    </div>
    <!-- </el-dialog> -->
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" >
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getLists, add } from '@/api/college'
export default {
  name: 'CoursePraxiss',
  components: { Pagination },
  data() {
    return {
      path: 'praxis',
      score: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      // cdn: 'https://cdncollege.quansuwangluo.com/',
      cdn: 'https://cdncollege.quansuwangluo.com/college_exercise/',
      curData: {
        avatar: '',
        nickname: '',
        img_url: [],
        mark: '',
        score: -1,
        answer: ''
      },
      dialogTableVisible: false,
      listQuery: {
        key: '',
        status: '',
        course_id: 0,
        page: 1,
        limit: 10
      },
      total: 5,
      praxisInfo: {
        question: '',
        title: ''
      },
      downloadLoading: false,
      listLoading: false,
      tableKey: 0,
      list: [],
      schoolList: [
        { name: '未批改', id: 1 },
        { name: '已通过', id: 2 },
        { name: '驳回', id: 3 }
      ]
    }
  },
  created() {
    // this.bEdit = this.$route.params.id !== '0'
    this.listQuery.course_id = parseInt(this.$route.params.id)
    this.getList()
  },
  mounted() {},
  methods: {
    sub(mark) {
      if (mark) {
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value) {
            this.editPraxis({ pid: this.curData.pid, score: 0, mark: value })
          }
        }).catch(() => {
        })
      } else {
        if (!this.score) {
          this.$message({
            message: '请选择分数!',
            type: 'warning'
          })
        } else {
          this.editPraxis({ pid: this.curData.pid, score: this.score })
        }
      }
    },
    editPraxis(obj) {
      this.listLoading = true
      this.dialogTableVisible = false
      add(this.path, obj).then(response => {
        this.total = response.data.total
        this.list = response.data.datas.praxis
        this.praxisInfo = response.data.datas
        this.listLoading = false
        this.closeDTL()
      })
    },
    closeDTL() {
      this.getList()
    },
    showDTL(obj) {
      this.dialogTableVisible = true
      this.curData = obj
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    addSchoolType() {},
    handleDownload() {},
    handleFilter() {
      this.getList()
    },
    handleCreate() {},
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      // row.status = status
    },
    handleUpdate(row) {
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
      // this.$router.push('/college/school_type/options')
    },
    sortChange() {},
    getList(index) {
      index = index || {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listQuery.page = index.page
      this.listLoading = true
      getLists(this.path, this.listQuery).then(response => {
        this.total = response.data.total
        this.list = response.data.datas.praxis
        this.praxisInfo = response.data.datas
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qstInfo{
  margin: 20px 0;
  >div{
    // color: grey;
    line-height: 30px;
  }
}
.userInfo{
  display: flex;
  height: 50px;
  >*{
    align-self: center;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: center;
  }
  .descsss{
    margin-left: 20px;
  }
}
.answer{
  margin: 30px;
}
.imgList{
  margin: 0 30px;
  img{
    border: 1px solid gray;
    width: 150px;
    margin-right: 10px;
  }
}
.optionss{
  margin: 30px;
  .score{
    margin: 30px -0;
  }
}
.praxisDinfo{
  z-index: 100;
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .contentss{
    margin:5% 10%;
    width: 80%;
    height: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
    background: white;
    padding: 50px;
  }
}
// .detaiDlg{
//   width: 80%;
//   height: 80%;
//   overflow: scroll;
// }
</style>

