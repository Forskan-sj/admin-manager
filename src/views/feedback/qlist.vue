<template>
  <div class="app-container">
    <div class="addSchoolType">
      <router-link :to="'/helpfeed/feedbacks/options/'+'0'">
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
      <el-table-column :label="'文章标题'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'是否已开启'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            @change="tabStatus(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/helpfeed/feedbacks/options/'+scope.row.id">
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
import { getLists, del, setStatus } from '@/api/college'
export default {
  name: 'HelpList',
  components: { Pagination },
  data() {
    return {
      path: 'faq',
      dialogImageUrl: '',
      dialogVisible: false,
      bookKinds: [],
      listQuery: {
        page: 1,
        limit: 10,
        catid: ''
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
    this.getBookKind()
  },
  methods: {
    tabStatus(row) {
      setStatus(this.path, { id: row.id, status: row.status ? 1 : 0 }).then(response => {
      })
    },
    getBookKind() {
      this.listLoading = true
      getLists('category', { page: 1, limit: 99999, type: 2 }).then(response => {
        this.bookKinds = response.data.datas
        this.listLoading = false
        this.getList()
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
        if (this.bookKinds !== null) {
          this.list.forEach((a, i, s) => {
            const catobj = this.bookKinds.filter(obj => obj.id === a.catid)
            a.cat_name = catobj.length === 0 ? '未分类' : catobj[0].name
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

