<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        v-if="ulParamsMark"
        ref="upload"
        :multiple="true"
        :data="ossKey"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :action="ossParams.host"
        class="editor-slide-upload"
        list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { getOSSparams } from '@/api/college'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      ossKey: {},
      ossParams: {},
      ulParamsMark: false,
      dialogVisible: false,
      listObj: {},
      fileList: [],
      img_list: [],
      listLoading: false
    }
  },
  mounted() {
    this.listLoading = true
    getOSSparams({ type: 'dev_test_dcaredata' }).then(response => {
      this.ossParams = response.data.datas
      this.ossKey = JSON.parse(JSON.stringify(this.ossParams))
      this.ulParamsMark = true
      this.listLoading = false
    })
  },
  methods: {
    checkAllSuccess() {
      // return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
      let allUploaded = true
      let fileUrl = []
      this.listObj.forEach((item, i, a) => {
        if (item.status === 'success') {
          fileUrl.push(this.ossParams.host + '/' + this.ossParams.key + 'data' + item.uid + '.' + item.name.split('.')[1])
        } else {
          allUploaded = false
          fileUrl = []
        }
      })
      this.img_list = fileUrl
      if (allUploaded) {
        return true
      } else return false
    },
    handleSubmit() {
      // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', this.img_list)
      this.listObj = []
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file, list) {
      this.$refs.upload.submit()
      this.listObj = list
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     this.listObj[objKeyArr[i]].url = this.ossParams.key + 'data' + file.uid + '.' + file.name.split('.')[1]
      //     this.listObj[objKeyArr[i]].hasSuccess = true
      //     return
      //   }
      // }
    },
    handleRemove(file, fileList) {
      this.listObj = []
      fileList.forEach((item, i, a) => {
        this.listObj.push(this.ossparas.key + 'data' + item.uid + '.' + item.name.split('.')[1])
      })
    },
    beforeUpload(file) {
      const name = this.ossParams.key + 'data' + file.uid + '.' + file.name.split('.')[1]
      this.ossKey.key = name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
