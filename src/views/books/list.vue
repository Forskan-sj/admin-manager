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
          <span>{{ scope.row.cat_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品概率'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'奖品图标'" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.pic" class="imgpic" @click="handlePictureCardPreview(scope.row.pic)">
        </template>
      </el-table-column>
      <el-table-column :label="'是否有奖'" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"/>
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
    <el-button size="mini" type="success" icon="el-icon-edit" @click="handleModifyStatus(0)">添加</el-button>
    <el-dialog :title="eldTitle" :visible.sync="dialogVisible">
      <img v-if="imgMark" :src="dialogImageUrl" width="100%" >
      <el-form v-if="!imgMark" ref="form" :model="form" :rules="formRules" label-width="150px">
        <el-form-item label="奖品名称:" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="奖品数量:" prop="title">
          <el-input v-model="form.author" type="number"/>
        </el-form-item>
        <el-form-item label="奖品概率:" prop="title">
          <el-input v-model="form.score" type="number"/>
        </el-form-item>
        <el-form-item label="是否有奖:" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖品图标(80 x 80 *.png)" prop="pic">
          <up-load v-if="ulParamsMark && formMark" :index="-1" :type="3" :single-pic="bEdit?cdn+form.pic:form.pic" :ossparas="ossParams" @uploadSucess="uploadSucess"/>
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
import { getLists, del, getOSSparams } from '@/api/college'
import UpLoad from '@/components/UpLoad'
export default {
  name: 'BookList',
  components: { Pagination, UpLoad },
  data() {
    return {
      path: 'user',
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
        buy: [{
          img_url: null,
          title: '',
          index: 0
        }],
        score: '',
        catid: 1,
        contents: '',
        title: '',
        author: '',
        status: 1,
        pic: null
      },
      formRules: {
        title: [{ required: true, message: '请输入奖品名称', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
        score: [{ required: true, message: '请输入评分', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传课程封面', trigger: 'blur' }]
      },
      total: 5,
      listLoading: false,
      tableKey: 0,
      list: [],
      listTemp: []
    }
  },
  created() {

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
        this.form.pic = param.res_url
      } else {
        this.form.buy[param.index].img_url = param.res_url
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
    handleModifyStatus(row) {
      this.bEdit = row !== 0
      this.imgMark = false
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
.line {
  text-align: center;
}
.imgpic {
  width: 100%;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
}
.addSchoolType {
  margin: 30px 0;
}
</style>

