<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="姓名/手机号"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-date-picker
        v-model="listQuery.time"
        type="datetime"
        placeholder="注册时间"
        value-format="yyyy-MM-dd HH:mm:ss" />
      <el-select
        v-model="listQuery.qy_id"
        placeholder="关联企业"
        clearable
        style="width: 150px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in qy_list" :key="item.id" :label="item.title" :value="item.id"/>
      </el-select> -->
      <!-- <el-select
        v-model="listQuery.type"
        placeholder="类型"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button> -->
      <!-- <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button> -->
      <!-- <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >显示购买数量</el-checkbox> -->
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

      <el-table-column :label="'姓名'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'手机号'" >
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'头像'" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="imgpic" @click="handlePictureCardPreview(scope.row.avatar)">
        </template>
      </el-table-column>
      <el-table-column :label="'学号'" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.student_id }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="'关联企业'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_name }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="'购买数量'" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;" >{{ scope.row.need_id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'上次消费时间'" align="center" width="195">
        <template slot-scope="scope">
          <span>{{ scope.row.test_time }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="'注册时间'" class-name="status-col" width="195">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="'操作'" class-name="status-col">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete">冻结</el-button>
        </template>
      </el-table-column> -->
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
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      path: 'user',
      dialogImageUrl: '',
      qy_list: [],
      dialogVisible: false,
      listQuery: {
        key: '',
        time: '',
        qy_id: '',
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
    handleFilter() {
      this.getList()
    },
    handleCreate() {},
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

        // this.qy_list = response.data.datas.enterprise
        // if (this.qy_list !== null) {
        //   this.list.forEach((a, i, s) => {
        //     const catobj = this.qy_list.filter(obj => obj.id === a.qy_id)
        //     a.cat_name = catobj.length === 0 ? '未关联' : catobj[0].title
        //   })
        // }

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
</style>

