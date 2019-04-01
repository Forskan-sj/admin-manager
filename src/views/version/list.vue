<template>
  <div class="app-container">
    <div class="addSchoolType">
      <router-link :to="'/version/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加新版本</el-button>
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
      <el-table-column :label="'ID'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'版本名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.version_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'版本号'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.version_num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'更新内容'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.update_content }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'类别'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type === 1? '安卓':'IOS' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'bugly'" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.bugly === 1? '是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'是否强制更新'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_update === 1? '是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'发布时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/version/options/'+scope.row.id">
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
  name: 'VersionList',
  components: { Pagination },
  data() {
    return {
      path: 'Version',
      bookKinds: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 5,
      ownloadLoading: false,
      listLoading: false,
      tableKey: 0,
      list: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {

  },
  methods: {
    del(id) {
      this.listLoading = true
      del(this.path, { id }).then(response => {
        this.listLoading = false
        this.getList()
        // location.reload()
      })
    },
    addSchoolType() {},
    handleDownload() {},
    handleFilter() {},
    handleCreate() {},
    handleModifyStatus(row, status) {
      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // })
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
        this.list = response.data.datas
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
.addSchoolType {
  margin: 30px 0;
}
</style>

