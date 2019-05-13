<template>
  <div class="app-container">
    <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加</el-button>

    <div style="height:30px"/>
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
      <el-table-column :label="'级别名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link v-if="scope.row.id !== 1" :to="'/permissionEdit/manageroptions/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">权限</el-button>
          </router-link>
          <!-- <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button> -->
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
    <el-dialog :title="'新增管理员级别'" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="级别名称:" prop="title">
          <el-input v-model.trim="perName"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getLists, del, add } from '@/api/college'
export default {
  name: 'PermissionLists',
  components: { Pagination },
  data() {
    return {
      path: 'group',
      perName: '',
      dialogImageUrl: '',
      dialogVisible: false,
      qy_status: ['待审核', '审核通过', '拒绝'],
      bookKinds: [],
      listQuery: {
        key: '',
        status: '',
        page: 1,
        limit: 10
      },
      form: {
        delivery: true
      },
      total: 5,
      importanceOptions: [],
      calendarTypeOptions: [],
      showReviewer: '',
      sortOptions: [],
      downloadLoading: false,
      listLoading: false,
      tableKey: 0,
      list: [],
      listTemp: []
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    del(id) {
      this.listLoading = true
      del(this.path, { id }).then(response => {
        this.listLoading = false
        this.getList()
      })
    },
    onSubmit() {
      if (!this.perName) return
      this.listLoading = true
      add(this.path, { id: 0, name: this.perName }).then(response => {
        this.listLoading = false
        this.getList()
      })
    },
    onCancel() {

    },
    addSchoolType() {},
    handleDownload() {},
    handleFilter() {
      this.getList()
    },
    handleCreate() {},
    handleModifyStatus() {
      this.dialogVisible = true
    },
    handleUpdate(row) {

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
.addSchoolType {
  margin: 30px 0;
}
</style>

