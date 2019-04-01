<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="用户名/手机号/学号"

        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-input
        v-model="listQuery.title"
        placeholder="账号"

        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="学号"

        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
      <!-- <el-select
        v-model="listQuery.importance"
        placeholder="重要性"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select
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
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >显示购买数量</el-checkbox>
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
      <el-table-column :label="'ID'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'头像'" width="50">
        <template v-if="scope.row.avatar !== null" slot-scope="scope">
          <img :src="scope.row.avatar.substring(0,4) === 'http'?scope.row.avatar : cdn+scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column :label="'用户名'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'手机号'" >
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'学号'" >
        <template slot-scope="scope">
          <span>{{ scope.row.student_id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'关联企业'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_address }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'学分'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.credit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'当前学业阶段'" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_address }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'上次消费时间'" align="center" width="195">
        <template slot-scope="scope">
          <span>{{ scope.row.lastlogin }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="'购买数量'" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;" >{{ scope.row.is_over }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="'注册时间'" class-name="status-col" width="195">
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUsers } from '@/api/college'
export default {
  name: 'ClassMates',
  components: { Pagination },
  data() {
    return {
      cdn: 'https://cdncollege.quansuwangluo.com/',
      path: 'classes',
      listQuery: {
        key: '',
        page: 1,
        limit: 10
      },
      total: 200,
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
      getUsers(this.path, this.listQuery).then(response => {
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
}
</style>

