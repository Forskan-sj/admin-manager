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
      <!-- <el-select
        v-model="listQuery.status"
        placeholder="批改状态"
        clearable
        style="width: 150px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select> -->
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
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button> -->
    </div>
    <!-- <div class="qstInfo">
      <div class="courseName" v-text="'课程名称：' + praxisInfo.title"/>
      <div class="qstTitle" v-text="'课程题目：' + praxisInfo.question"/>
    </div> -->
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
      <el-table-column :label="'头像'" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="imgpic">
        </template>
      </el-table-column>
      <el-table-column :label="'评价内容'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <div class="discontent">
            <div class="disC">
              {{ scope.row.contents }}
            </div>
            <div v-if="!scope.row.reply" class="reply">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="showDTL(scope.row)">回复</el-button>
            </div>
          </div>
          <div v-if="scope.row.reply" class="replycontent">
            {{ scope.row.teacher + '回复：' + scope.row.reply }}
          </div>
        </template>

      </el-table-column>
      <el-table-column :label="'提交时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
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
      <!-- <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="showDTL(scope.row)">查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getEvaluate, addEvaluate } from '@/api/college'
export default {
  name: 'Coursediscusss',
  components: { Pagination },
  data() {
    return {
      path: 'course',
      tcName: 'admin',
      score: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      listQuery: {
        key: '',
        status: '',
        course_id: 0,
        page: 1,
        limit: 10
      },
      total: 5,
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
    addEva(obj) {
      this.listLoading = true
      addEvaluate(this.path, obj).then(response => {
        this.total = response.data.total
        this.list = response.data.datas.praxis
        this.praxisInfo = response.data.datas
        this.listLoading = false
        this.getList()
      })
    },
    showDTL(obj) {
      this.$prompt('请输入回复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value) {
          this.addEva({ eva_id: obj.eva_id, teacher: this.tcName, reply: value })
        }
      }).catch(() => {
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    onSubmit() {
      this.$message('submit!')
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {},
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
      getEvaluate(this.path, this.listQuery).then(response => {
        this.total = response.data.total
        this.list = response.data.datas
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.imgpic {
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
}
.discontent{
  text-align: left;
  display: flex;
  justify-content: space-between;
  .reply{
    margin-left: 10px;
  }
}
.replycontent{
  margin: 20px 0 0 0;
  // background: rgba(0,0,0,0.5);
  color: blue;
  text-align: left;
}
</style>

