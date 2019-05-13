<template>
  <div class="app-container">
    <!-- <div class="addSchoolType">
      <router-link :to="'/books/options/'+'0'">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus">添加</el-button>
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
      <el-table-column :label="'奖品名称'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品数量'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品概率'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品图标'" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <img :src="cdn + scope.row.img" class="imgpic" @click="handlePictureCardPreview(cdn + scope.row.img)">
        </template>
      </el-table-column>
      <el-table-column :label="'是否有奖'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <!-- <el-switch
            v-model="scope.row.is_true"
            active-color="#13ce66"/> -->
          {{ scope.row.is_true ? '有' : '无' }}
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <router-link :to="'/books/options/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleModifyStatus(scope.row)">编辑</el-button>
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
    <el-button class="addGift" size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus(0)">添加奖品</el-button>
    <el-dialog :title="eldTitle" :visible.sync="dialogVisible">
      <img v-if="imgMark" :src="dialogImageUrl" width="100%" >
      <el-form v-if="!imgMark" ref="form" :model="form" :rules="formRules" label-width="150px">
        <el-form-item label="奖品名称:" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="奖品数量:" prop="title">
          <el-input v-model="form.num" type="number"/>
        </el-form-item>
        <el-form-item label="奖品概率:" prop="title">
          <el-input v-model="form.rate" type="number"/>
        </el-form-item>
        <el-form-item label="是否有奖:" prop="status">
          <el-radio-group v-model="form.is_true">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖品图标(80 x 80 *.png)" prop="pic">
          <up-load v-if="ulParamsMark && formMark" :index="-1" :type="3" :single-pic="bEdit ? cdn + form.img : form.img" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getLists, del, getOSSparams, add } from '@/api/college'
import UpLoad from '@/components/UpLoad'
export default {
  name: 'BookList',
  components: { Pagination, UpLoad },
  data() {
    return {
      path: 'lottery',
      imgMark: false,
      bEdit: false,
      dialogImageUrl: '',
      dialogVisible: false,
      bookKinds: [],
      cdn: 'https://cdncollege.quansuwangluo.com/',
      eldTitle: '',
      listQuery: {
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
    this.listLoading = true
    getOSSparams({ type: 'dev_test_dcaredata' }).then(response => {
      this.ossParams = response.data.datas
      this.ulParamsMark = true
      this.listLoading = false
    })
  },
  methods: {
    uploadSucess(param) {
      if (param.index === -1) {
        this.form.img = param.res_url
      }
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
      this.eldTitle = '奖品缩略图'
      this.imgMark = true
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    onSubmit() {
      this.listLoading = true
      add(this.path, this.form).then(response => {
        this.listLoading = false
        this.dialogVisible = false
        this.getList()
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
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
    handleModifyStatus(row) {
      this.bEdit = row !== 0
      this.imgMark = false
      const temp = {
        id: 0,
        title: '',
        num: '',
        rate: 0,
        is_true: 1,
        img: null
      }
      this.form = this.bEdit ? row : temp
      this.eldTitle = '编辑奖品'
      this.dialogVisible = true
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

