<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"

        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
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
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >显示性别</el-checkbox>
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
      <el-table-column :label="'needId'" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.need_id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'真实姓名'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'头像'" width="50">
        <template slot-scope="scope">
          <img :src="scope.row.user_image" alt="">
        </template>
      </el-table-column>
      <el-table-column :label="'地址'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_address }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="'性别'" width="110px" align="center">
        <template slot-scope="scope">
          <span style="color:red;" v-text="scope.row.user_sex == 0?'男':'女'"></span>
        </template>
      </el-table-column>
      <el-table-column :label="'手机号'" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.user_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'性格'" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.user_charactor }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'学院班级'" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.school_class }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="'报名级别'"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.enter_level }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'当前级别'" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.current_level }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'评测时间'" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.test_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'报名时间'" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.join_time }}</span>
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
  name: 'College',
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
        join_time: '1970-01-01 00:00'
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
    handleDownload() {},
    handleFilter() {},
    handleCreate() {},
    sortChange() {},
    getList(index) {
      index = index || { page: this.listQuery.page, limit: this.listQuery.limit }
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
</style>

