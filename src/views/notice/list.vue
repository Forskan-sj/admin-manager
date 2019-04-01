<template>
  <div class="app-container">
    <el-input
      v-model="listQuery.key"
      placeholder="关键字搜索"
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="handleFilter"
    />
    <el-select
      v-model="listQuery.type"
      style="width: 140px"
      class="filter-item"
      placeholder="消息类型"
      @change="handleFilter()"
    >
      <el-option
        v-for="(item, index) in noticeType"
        :key="index"
        :label="item"
        :value="index"
      />
    </el-select>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    <div class="addSchoolType">
      <router-link :to="'/notice/options/'+'0'">
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
      <el-table-column :label="'ID'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'消息标题'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'消息类型'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ noticeType[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column :label="'是否已开启'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"/>
        </template>
      </el-table-column> -->
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/notice/options/'+scope.row.id">
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
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" >
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getLists, del } from '@/api/college'
export default {
  name: 'NoticeList',
  components: { Pagination },
  data() {
    return {
      path: 'notice',
      dialogImageUrl: '',
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        key: '',
        type: 0
      },
      form: {
        delivery: true
      },
      total: 5,
      noticeType: ['不限', '系统消息', '教室公告', '企业管理', '教务通知', '上新通知'],
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
        // location.reload()
      })
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
      index = index || this.listQuery
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
img {
  width: 100%;
}
.addSchoolType {
  margin: 30px 0;
}
</style>

