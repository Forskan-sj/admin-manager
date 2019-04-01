<template>
  <div class="app-container">
    <div class="addSchoolType">
      <router-link :to="'/college/school_type/options/'+'0'">
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
      <el-table-column :label="'学院名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.need_id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/college/school_type/options/'+scope.row.id">
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
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: '',
        page: 1,
        limit: 10
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
    for (let i = 0; i < this.total; i++) {
      const testData = {
        need_id: 888,
        user_name: '小唐僧',
        user_image:
          'https://cdnneed.quansuwangluo.com/college/h5_static/image/v2/user/default.jpg',
        user_address: '潘多拉',
        user_sex: 0,
        user_phone: 15212345678,
        user_charactor: '随机',
        school_class: '沐熙全速',
        enter_level: 'max',
        current_level: 'max_1',
        test_time: '1970-01-01 00:00',
        join_time: '1970-01-01 00:00',
        id: 1
      }
      testData.need_id = 10001 + i
      testData.user_name = '小唐僧' + i
      this.listTemp.push(testData)
    }
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
      this.list = this.listTemp.slice(
        index.limit * (index.page - 1),
        index.limit * index.page
      )
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

