<template>
  <div class="app-container">
    <!-- <div class="addSchoolType">
      <router-link :to="'/books/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加</el-button>
      </router-link>
    </div> -->
    <div class="filter-container" style="padding-bottom: 10px;">
      <el-input
        v-model="listQuery.key"
        placeholder="姓名、联系方式、地址"
        style="width: 300px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.g_id"
        placeholder="奖品名称"
        clearable
        style="width: 150px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in giftList" :key="item.id" :label="item.title" :value="item.id"/>
      </el-select>
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
      <el-table-column :label="'ID'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'收货人名'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'联系方式'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'地址'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品名字'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品图标'" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <img :src="cdn + scope.row.cat_img" class="imgpic" @click="handlePictureCardPreview(cdn + scope.row.cat_img)">
        </template>
      </el-table-column>
      <el-table-column :label="'中奖时间'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
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
    <!-- <el-button class="addGift" size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus(0)">添加奖品</el-button> -->
    <el-dialog :title="eldTitle" :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" >
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getGiftLists } from '@/api/college'
import UpLoad from '@/components/UpLoad'
export default {
  name: 'GifterList',
  components: { Pagination, UpLoad },
  data() {
    return {
      path: 'lottery',
      giftList: [],
      imgMark: false,
      bEdit: false,
      dialogImageUrl: '',
      dialogVisible: false,
      bookKinds: [],
      cdn: 'https://cdncollege.quansuwangluo.com/',
      eldTitle: '',
      listQuery: {
        key: '',
        g_id: '',
        page: 1,
        limit: 10
      },
      formMark: true,
      ossParams: '',
      ulParamsMark: '',
      form: {
        id: 0,
        title: '',
        num: '',
        rate: 0,
        is_true: 1,
        img: null
      },
      formRules: {
        title: [{ required: true, message: '请输入奖品名称', trigger: 'blur' }],
        num: [{ required: true, message: '请输入奖品数量', trigger: 'blur' }],
        rate: [{ required: true, message: '请输入奖品概率', trigger: 'blur' }],
        img: [{ required: true, message: '请上传奖品图标', trigger: 'blur' }]
      },
      total: 5,
      listLoading: false,
      tableKey: 0,
      list: [],
      listTemp: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    // del(id) {
    //   this.listLoading = true
    //   del(this.path, { id }).then(response => {
    //     this.listLoading = false
    //     this.getList()
    //     // location.reload()
    //   })
    // },
    handlePictureCardPreview(file) {
      this.eldTitle = '奖品缩略图'
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    // onSubmit() {
    //   this.listLoading = true
    //   add(this.path, this.form).then(response => {
    //     this.listLoading = false
    //     this.dialogVisible = false
    //     this.getList()
    //     this.$message({
    //       message: response.message,
    //       type: 'success'
    //     })
    //   })
    // },
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
    // handleModifyStatus(row) {
    //   this.bEdit = row !== 0
    //   this.imgMark = false
    //   const temp = {
    //     id: 0,
    //     title: '',
    //     num: '',
    //     rate: 0,
    //     is_true: 1,
    //     img: null
    //   }
    //   this.form = this.bEdit ? row : temp
    //   this.eldTitle = '编辑奖品'
    //   this.dialogVisible = true
    // },
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
      getGiftLists(this.path, this.listQuery).then(response => {
        this.total = response.data.total
        this.list = response.data.datas.users
        this.giftList = response.data.datas.gift
        this.list.forEach((a, i, s) => {
          const catobj = response.data.datas.gift.filter(obj => obj.id === a.g_id)
          a.cat_name = catobj.length === 0 ? '未中奖' : catobj[0].title
          a.cat_img = catobj.length === 0 ? '' : catobj[0].img
        })
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.addGift{
  margin-top: 50px;
}
img{
  width: 100%;
}
</style>

