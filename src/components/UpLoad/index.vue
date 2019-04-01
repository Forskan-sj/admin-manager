<template>
  <div class="dndList">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="float:left" @click="handlePictureCardPreview(1)">
    <video
      v-if="showV"
      :id="'video-active' + index"
      class="video-active"
      width="320"
      height="200"
      controls="controls" >
      <source :src="vsource" type="video/mp4">
    </video>
    <el-upload
      ref="upload"
      :show-file-list="type == 2"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :data="ossKey"
      :multiple="type==2"
      :accept="fileType[type]"
      :action="ossparas.host"
      :file-list="filelists"
      :list-type="type == 2?'picture-card':''"
      class="avatar-uploader"
    >
      <i v-if="type == 2" class="el-icon-plus"/>
      <el-button v-if="type !== 2" :style="type == 3 && (singlePic != null || imageUrl) ? alignSelf : ''" size="small" type="success" v-text="btnText"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="" >
    </el-dialog>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'

export default {
  name: 'UpLoad',
  // components: { draggable },
  props: {
    //  索引位置，适用于同一页面多个上传组件，冒泡事件中回传index
    index: {
      required: true,
      type: Number
    },
    //  格式类型：0：mp3， 1：mp4， 2：jpg/png 冒泡事件中回传type
    //  image/jpeg、image/png、video/mp4、audio/mp3
    type: {
      required: true,
      type: Number
    },
    filelists: {
      required: false,
      type: Array,
      default() {
        return []
      }
    },
    singlePic: {
      required: false,
      type: String,
      default: null
    },
    ossparas: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      btnText: '点击上传',
      dialogImageUrl: '',
      alignSelf: {
        margin: '83px 0 0 30px'
      },
      dialogVisible: false,
      fileStorage: [],
      ossKey: {},
      mediaDuration: -1,
      resLoaded: false,
      showV: false,
      vsource: '',
      imageUrl: '',
      fileType: ['audio/mp3', 'video/mp4', 'image/jpeg,image/png', 'image/jpeg,image/png']
    }
  },
  computed: {

  },
  updated: function() {
    if (this.resLoaded) {
      this.resLoaded = false
      var video1 = document.getElementById('video-active' + this.index)
      var _self = this
      video1.onloadedmetadata = function() {
        _self.$emit('uploadSucess', { mediaDuration: video1.duration, index: _self.index, type: _self.type, res_url: null })
      }
    }
  },
  mounted: function() {
    this.ossKey = JSON.parse(JSON.stringify(this.ossparas))
    if (this.type === 3 && this.singlePic != null) {
      this.imageUrl = this.singlePic
      this.btnText = '替换'
    }
    if ((this.type === 1 || this.type === 0) && this.singlePic !== null) {
      this.vsource = this.singlePic
      this.showV = true
      this.resLoaded = true
      this.btnText = '替换'
    }
    // console.log(this.ossKey)
  },
  methods: {
    handleRemove(file, fileList) {
      const fileUrl = []
      fileList.forEach((item, i, a) => {
        fileUrl.push(this.ossparas.key + 'data' + item.uid + '.' + item.name.split('.')[item.name.split('.').length - 1])
      })
      this.$emit('uploadSucess', { mediaDuration: this.mediaDuration, index: this.index, type: this.type, res_url: fileUrl })
    },
    handleAvatarSuccess(res, file, list) {
      // console.log(file, list)
      // console.log('object')
      this.$refs.upload.submit()
      // file.url = this.vsource
      this.fileStorage = list
      if (this.type !== 2) {
        this.btnText = '替换'
        this.fileStorage = [file]

        const url_res = this.ossparas.key + 'data' + file.uid + '.' + file.name.split('.')[file.name.split('.').length - 1]
        this.$emit('uploadSucess', { mediaDuration: this.mediaDuration, index: this.index, type: this.type, res_url: url_res })
      }
      if (this.type === 3) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = this.ossparas.host + '/' + this.ossparas.key + 'data' + file.uid + '.' + file.name.split('.')[file.name.split('.').length - 1]
      }
      if (this.type !== 2 && this.type !== 3) {
        this.showV = true
        this.resLoaded = true
      }
      if (this.type === 2) {
        let allUploaded = true
        let fileUrl = []
        list.forEach((item, i, a) => {
          if (item.status === 'success') {
            fileUrl.push(this.ossparas.key + 'data' + item.uid + '.' + item.name.split('.')[item.name.split('.').length - 1])
          } else {
            allUploaded = false
            fileUrl = []
          }
        })
        if (allUploaded) {
          this.$emit('uploadSucess', { mediaDuration: this.mediaDuration, index: this.index, type: this.type, res_url: fileUrl })
        }
      }
    },
    beforeAvatarUpload(file) {
      if (this.type !== 2) {
        this.showV = false
      }
      // console.log(this.ossKey)
      const name = this.ossparas.key + 'data' + file.uid + '.' + file.name.split('.')[file.name.split('.').length - 1]
      this.ossKey.key = name
      // console.log(this.ossKey, name)
      this.vsource = this.ossparas.host + '/' + this.ossKey.key
    },
    handlePictureCardPreview(file) {
      if (file === 1) this.dialogImageUrl = this.imageUrl
      else this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#imgDiv img{
  width: 100px;
  height: 100px;
  float: left;
}
img{
  cursor: pointer;
}
// .avatarImg{
//   float: left;
// }
</style>
<style>
.el-dialog__wrapper{
  display: flex;
}
.el-dialog{
  margin-top: 0 !important;
  width: 30% !important;
  align-self: center;
}
.el-dialog__headerbtn{
  transform: scale(2);
}
</style>
