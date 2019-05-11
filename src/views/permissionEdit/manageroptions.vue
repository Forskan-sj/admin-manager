<template>
  <div class="app-container">
    <div style="height:30px"/>
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
      <!-- <el-table-column :label="'ID'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column type="selection" align="center" width="40"/>
      <el-table-column :label="'企业行业'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meta ? scope.row.meta.title : scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'功能模块'" prop="title" sortable="custom" align="center">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.meta ? scope.row.meta.title : scope.row.name }}</span>
        </template> -->

        <template slot-scope="scope" class="tabspan">
          <el-table
            :data="scope.row.children"
            :show-header="false"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="!scope.row.hidden" type="selection" align="center" width="140"/>
            <el-table-column v-if="!scope.row.hidden" fixed prop="meta.title" label="meta.title" align="center" sortable width="270"/>
            <!-- <el-table-column prop="name" label="权限名称" align="center" width="320"/> -->
            <!-- <el-table-column
              prop="title"
              label="权限规则"
              align="center"
              class-name="small-padding fixed-width"
            ></el-table-column>

            <el-table-column align="center" :label="'状态'" width="120">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  @change="tabStatus(scope.row.status,scope.row.id)"
                />
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" align="center" width="300">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  @click="addGroups('2',scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="delt(scope.row.id,scope.$index,tableData)"
                >删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="'企业行业'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.industry }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'审核状态'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ qy_status[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'提交审核时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/enterprise/options/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
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
import { getLists, del } from '@/api/college'
import { asyncRouterMap } from '@/router'
export default {
  name: 'PermissionManagers',
  components: { Pagination },
  data() {
    return {
      path: 'enterprise',
      dialogImageUrl: '',
      dialogVisible: false,
      qy_status: ['待审核', '审核通过', '拒绝'],
      bookKinds: [],
      listQuery: {
        key: '',
        status: '',
        page: 1,
        limit: 10
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
    // this.getBookKind()
    this.list = asyncRouterMap
    console.log(asyncRouterMap);
  },
  methods: {
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
    handleSelectionChange(row) {
      console.log(row);
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

