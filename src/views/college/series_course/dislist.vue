<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="评价关键字"

        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
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
      <el-table-column :label="'ID'" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eva_id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'姓名'" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'头像'" width="80">
        <template v-if="scope.row.avatar !== null" slot-scope="scope">
          <img :src="scope.row.avatar.substring(0,4) === 'http'?scope.row.avatar : cdn+scope.row.avatar" @click="handlePictureCardPreview(scope.row.avatar)">
        </template>
      </el-table-column>
      <el-table-column :label="'评价内容'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contents }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'提交时间'" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'精选评论'" width="100" align="center">
        <template slot-scope="scope">
          <div :class="{iconZan:scope.row.is_jx === 1}" class="iconZanGray" @click="setZan(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column :label="'操作/回复内容'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.reply === null" type="primary" size="small" icon="el-icon-edit" @click="reback(scope.row)">回复</el-button>
          <span else>{{ scope.row.reply }}</span>
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
import { add, getLists } from '@/api/college'
export default {
  name: 'DisList',
  components: { Pagination },
  data() {
    return {
      cdn: 'https://cdncollege.quansuwangluo.com/',
      path: 'evaluate',
      dialogImageUrl: '',
      dialogVisible: false,
      listQuery: {
        key: '',
        page: 1,
        limit: 10
      },
      total: 200,
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
    setZan(row) {
      row.is_jx = row.is_jx === 1 ? 0 : 1
      this.sendReply(row)
    },
    reback(row) {
      this.$prompt('请输入回复内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '提示内容不能为空'
      }).then(({ value }) => {
        row.reply = value
        this.sendReply(row)
      }).catch(() => {
      })
    },
    sendReply(jsdata) {
      console.log(jsdata)
      add(this.path, jsdata).then(response => {
        this.$message({
          type: 'success',
          message: '操作成功！！！'
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    handleDownload() {},
    handleFilter() { this.getList() },
    handleCreate() {},
    sortChange() {},
    getList(index) {
      index = index || {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      this.listQuery.page = index.page
      this.listQuery.id = this.$route.params.id
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
img {
  width: 100%;
  cursor: pointer;
}
.iconZan, .iconZanGray{
  width: 30px;
  height: 30px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 5px auto;
  cursor: pointer;
}
.iconZan{
  background-image:url(https://cdncollege.quansuwangluo.com/image/guest/zan.png) !important;
}
.iconZanGray{
  background-image:url(https://cdncollege.quansuwangluo.com/image/guest/zanGray.png);
}
</style>

