<template>
  <div class="app-container">
    <!-- <div class="addSchoolType">
      <router-link :to="'/version/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加新版本</el-button>
      </router-link>
    </div> -->
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
      <el-table-column :label="'用户名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'头像'" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="imgpic" @click="handlePictureCardPreview(scope.row.avatar, true)">
        </template>
      </el-table-column>
      <el-table-column :label="'留言内容'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span class="liuyan">{{ scope.row.contents }}</span>
          <!-- <div v-if="scope.row.reply" class="reply">{{ '小唐僧回复：' + scope.row.reply }}</div> -->
        </template>
      </el-table-column>
      <el-table-column :label="'回复内容'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reply }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'留言时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" icon="el-icon-edit" @click="showDTL(scope.row)">查看</el-button> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handlePictureCardPreview(scope.row, false)">查看</el-button>
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
      <img v-if="imgMark" :src="dialogImageUrl" width="100%" >
      <el-form v-if="!imgMark" ref="form" label-width="150px">
        <el-form-item label="留言内容:" prop="title">
          <el-input v-model="dialogImageUrl.contents" type="textarea"/>
        </el-form-item>
        <el-form-item label="回复:" prop="title">
          <el-input v-model="dialogImageUrl.reply" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showDTL(dialogImageUrl)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getLists, add } from '@/api/college'
export default {
  name: 'VersionList',
  components: { Pagination },
  data() {
    return {
      path: 'guestBook',
      dialogImageUrl: '',
      imgMark: true,
      dialogVisible: false,
      bookKinds: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 5,
      ownloadLoading: false,
      listLoading: false,
      tableKey: 0,
      list: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    showDTL(obj) {
      this.listLoading = true
      add(this.path, { id: obj.id, reply: obj.reply }).then(response => {
        this.listLoading = false
        this.getList()
      })
    },
    addSchoolType() {},
    handleDownload() {},
    handleFilter() {},
    handleCreate() {},
    handlePictureCardPreview(file, mark) {
      this.dialogImageUrl = file
      this.dialogVisible = true
      if (mark) {
        this.imgMark = true
      } else {
        this.imgMark = false
      }
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
.reply{
  color: blue;
  text-align: left;
}
.liuyan{
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

