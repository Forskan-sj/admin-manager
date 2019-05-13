<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="课程名称/课程标识/序列号"
        style="width: 300px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.catid"
        placeholder="归属分类"
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
    <div class="addSchoolType">
      <router-link :to="'/college/course/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加课程</el-button>
      </router-link>
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
      <el-table-column :label="'ID'" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'课程名称'" prop="title" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'课程序列号'" prop="list_order" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.list_order }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'课程标识'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tab }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'归属分类'" prop="catid" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_name }}</span>
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
      <el-table-column :label="'发布时间'" prop="updated_at" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width" width="400">
        <template slot-scope="scope">
          <router-link :to="'/college/course/praxis/'+scope.row.id">
            <el-button class="button" type="primary" size="small" icon="el-icon-edit">批改 {{ scope.row.praxis_yes + '/' + scope.row.praxis_all }}
              <div v-if="scope.row.praxis_no > 0" class="redDot"/>
            </el-button>
          </router-link>
          <router-link :to="'/college/course/discuss/'+scope.row.id">
            <el-button class="button" type="success" size="small">评论 {{ scope.row.eva_yes + '/' + scope.row.eva_all }}
              <div v-if="scope.row.eva_no > 0" class="redDot"/>
            </el-button>
          </router-link>
          <router-link :to="'/college/course/options/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getLists, del } from '@/api/college'
export default {
  name: 'CourseList',
  components: { Pagination },
  data() {
    return {
      path: 'course',
      courseStatus: [
        { label: '未发布', key: 0 },
        { label: '已发布', key: 1 }
      ],
      listQuery: {
        key: '',
        sort: '',
        asc: true,
        catid: '',
        type: '',
        page: 1,
        limit: 10
      },
      courseKind: [
        { label: '音频', key: 0 },
        { label: '视频', key: 1 }
      ],
      total: 5,
      downloadLoading: false,
      listLoading: false,
      tableKey: 0,
      list: [],
      schoolList: [],
      listTemp: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    del(id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        del(this.path, { id }).then(response => {
          this.listLoading = false
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
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
    sortChange(name) {
      this.listQuery.sort = name.prop
      this.listQuery.asc = name.order !== 'descending'
      this.getList()
    },
    getList(index) {
      index = index || {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listQuery.page = index.page
      this.listLoading = true
      getLists(this.path, this.listQuery).then(response => {
        this.total = response.data.total
        this.list = response.data.datas.course
        this.schoolList = response.data.datas.category
        if (this.schoolList !== null) {
          this.list.forEach((a, i, s) => {
            const catobj = this.schoolList.filter(obj => obj.id === a.catid)
            a.cat_name = catobj.length === 0 ? '' : catobj[0].name
          })
        }
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
img {
  width: 100%;
}
.addSchoolType {
  margin: 30px 0;
}
.userList{
  cursor: pointer;
  color: blue;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.button{
  position: relative;
}
.redDot{
  position: absolute;
  top: 3px;
  right: 3px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: red;
}
</style>

