<template>
  <div class="app-container">
    <!-- <div class="addSchoolType">
      <router-link :to="'/feedback/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加</el-button>
      </router-link>
    </div> -->
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="反馈内容"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        style="width: 140px"
        class="filter-item"
        placeholder="处理状态"
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
      <div class="sd" style="height:30px"/>
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
      <el-table-column :label="'用户昵称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'联系方式'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'反馈内容'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contents }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'处理状态'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1? '未处理' : '已处理' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'提交时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/helpfeed/feedback/options/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">{{ scope.row.status === 1? '查看并回复' : '查看' }}</el-button>
          </router-link>
          <!-- <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button> -->
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
import { getLists } from '@/api/college'
export default {
  name: 'FeedbackList',
  components: { Pagination },
  data() {
    return {
      path: 'feedback',
      dialogImageUrl: '',
      dialogVisible: false,
      bookKinds: [],
      listQuery: {
        key: '',
        status: '',
        page: 1,
        limit: 10
      },
      courseStatus: [
        { label: '不限', key: '' },
        { label: '未处理', key: 1 },
        { label: '已处理', key: 2 }
      ],
      form: {
        delivery: true
      },
      total: 5,
      downloadLoading: false,
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
    handleFilter() { this.getList() },
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
        // this.list.forEach((a, i, s) => {
        //   const catobj = this.bookKinds.filter(obj => obj.id === a.catid)
        //   a.cat_name = catobj.length === 0 ? '未分类' : catobj[0].name
        // })
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

