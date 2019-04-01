<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="批次名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.school_id"
        placeholder="关联学院"
        clearable
        style="width: 150px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in school_list" :key="item.id" :label="item.title" :value="item.id"/>
      </el-select>
      <el-select
        v-model="listQuery.tk_id"
        placeholder="关联套课"
        clearable
        style="width: 150px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in serieslist" :key="item.id" :label="item.title" :value="item.id"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <div class="addSchoolType">
      <router-link :to="'/college/school_index_edit/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加</el-button>
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
      <el-table-column :label="'名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.batch_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'归属学院'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sch_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'报名时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'开课时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'关联课程'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'教室数量'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class_num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'学员数量'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.b_num + '/' + scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/college/school_index_edit/options/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
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
import { getLists } from '@/api/college'
export default {
  name: 'SindexList',
  components: { Pagination },
  data() {
    return {
      serieslist: [],
      school_list: [],
      path: 'batch',
      listQuery: {
        key: '',
        school_id: '',
        tk_id: '',
        page: 1,
        limit: 10
      },
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
        this.serieslist = response.data.datas.tk
        this.school_list = response.data.datas.school
        if (this.serieslist !== null && this.school_list !== null) {
          this.list.forEach((a, i, s) => {
            const catobj = this.serieslist.filter(obj => obj.id === a.tk_id)
            a.cat_name = catobj.length === 0 ? '未关联' : catobj[0].title
            const catobj1 = this.school_list.filter(obj => obj.id === a.school_id)
            a.sch_name = catobj1.length === 0 ? '未关联' : catobj1[0].title
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
</style>

