<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.title"
        placeholder="课程名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.school_id"
        placeholder="选择学院"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter()"
      >
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>

      <el-select
        v-model="listQuery.type"
        style="width: 140px"
        class="filter-item"
        placeholder="选择课程类型"
        @change="handleFilter()"
      >
        <el-option
          v-for="item in courseKind"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.status"
        style="width: 140px"
        class="filter-item"
        placeholder="选择是否发布"
        @change="handleFilter()"
      >
        <el-option
          v-for="item in courseStatus"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <div class="addSchoolType">
      <router-link :to="'/college/series_edit/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit">添加发布课程</el-button>
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
      <el-table-column :label="'课程名称'" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'课程数量'" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'价格'" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'关联学院'" sortable="custom" align="center">
        <template slot-scope="scope">
          <div class="userList">{{ scope.row.cat_name }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="'课程类型'" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ courseKind[scope.row.type].label }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'评价(总数/已回)'" sortable="custom" align="center">
        <template slot-scope="scope">
          <router-link :to="'/college/series_dis/dislist/'+scope.row.id">
            <span>{{ scope.row.y_num +'/'+ scope.row.z_num }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column :label="'发布'" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            @change="tabStatus(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/college/series_edit/options/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <!-- <el-button type="danger" size="small" icon="el-icon-delete"  @click="del(scope.row.id)">删除</el-button> -->
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
import { getLists, del, setStatus } from '@/api/college'
export default {
  name: 'SeriesList',
  components: { Pagination },
  data() {
    return {
      path: 'combination',
      schoolList: [],
      courseStatus: [
        { label: '不限', key: '' },
        { label: '未发布', key: 0 },
        { label: '已发布', key: 1 }
      ],
      listQuery: {
        status: '',
        school_id: '',
        type: '',
        page: 1,
        limit: 10
      },
      courseKind: [
        { label: '全部', key: '' },
        { label: '公开课', key: 1 },
        { label: '单课', key: 2 },
        { label: '套课', key: 3 }
      ],
      total: 5,
      downloadLoading: false,
      listLoading: false,
      tableKey: 0,
      list: [],
      listTemp: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    tabStatus(row) {
      setStatus(this.path, { id: row.id, status: row.status ? 1 : 0 }).then(response => {
      })
    },
    del(id) {
      this.listLoading = true
      del(this.path, { id }).then(response => {
        this.listLoading = false
        this.getList()
        // location.reload()
      })
    },
    cancelEdit(row) {
      // row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    addcourse(index) {
      console.log(index)
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
        this.list = response.data.datas.data
        this.schoolList = response.data.datas.school
        if (this.schoolList !== null) {
          this.list.forEach((a, i, s) => {
            const catobj = this.schoolList.filter(obj => obj.id === a.school_id)
            a.cat_name = catobj.length === 0 ? '未关联' : catobj[0].title
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
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

