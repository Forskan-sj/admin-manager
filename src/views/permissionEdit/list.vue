<template>
  <div class="app-container">

    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="账号"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        style="width: 140px"
        class="filter-item"
        placeholder="级别"
        @change="handleFilter()"
      >
        <el-option
          v-for="item in courseStatus"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <div class="sd" style="height:30px"/>
    </div>
    <div class="addSchoolType">
      <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus(-1)">添加</el-button>
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
      <el-table-column :label="'昵称'" prop="nickname" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'用户名'" prop="username" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'权限级别'" prop="groupname" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.groupname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'上次登录时间'" prop="last_time" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.last_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'上次登录地址'" prop="last_ip" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.last_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template v-if="scope.row.id !== 1" slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleModifyStatus(scope.row)">{{ '查看' }}</el-button>
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
    <el-dialog :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="form.nickname"/>
        </el-form-item>
        <el-form-item label="账号:" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
        <!-- <el-form-item label="确认密码:" prop="num">
          <el-input v-model="form.num" type="password"/>
        </el-form-item> -->
        <el-form-item label="管理员级别:" prop="group_id">
          <el-select
            v-model="form.group_id"
            style="width: 140px"
            class="filter-item"
            placeholder="级别"
            @change="handleFilter()"
          >
            <el-option
              v-for="item in courseStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
import { getLists, add, del } from '@/api/college'
export default {
  name: 'PermissionList',
  components: { Pagination },
  data() {
    return {
      path: 'admin',
      dialogImageUrl: '',
      dialogVisible: false,
      listQuery: {
        key: '',
        status: '',
        page: 1,
        limit: 10
      },
      courseStatus: [
      ],
      form: {
        id: 0,
        username: '',
        password: '',
        group_id: ''
      },
      formRules: {
        nickname: [{ required: true, message: '请输入管理员昵称', trigger: 'blur' }],
        username: [{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        group_id: [{ required: true, message: '请选择级别', trigger: 'blur' }]
      },
      total: 5,
      listLoading: false,
      tableKey: 0,
      list: []
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
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addRule()
        } else {
          return false
        }
      })
    },
    addRule() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.listLoading = false
        this.dialogVisible = false
        this.getList()
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    addSchoolType() {},
    handleDownload() {},
    handleFilter() { this.getList() },
    handleCreate() {},
    handleModifyStatus(obj) {
      this.dialogVisible = true
      if (obj === -1) return
      else {
        this.form = obj
      }
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
        this.list = response.data.datas.user
        this.courseStatus = response.data.datas.group
        this.list.forEach((a, i, s) => {
          const catobj = this.courseStatus.filter(obj => obj.id === a.group_id)
          a.groupname = catobj.length === 0 ? '' : catobj[0].name
        })
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

