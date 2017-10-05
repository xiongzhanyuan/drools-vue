<template>
  <div>
    <el-upload ref="upload" class="avatar-uploader" action="http://up-z1.qiniu.com" type="drag" :on-remove="handleRemove" :before-upload="beforeUpload" :on-success="handleSuccess" :data="data">
      <video class="video-uploader" v-if="sourceUrl.indexOf('video') >= 0" :src="sourceUrl" controls="controls" />
      <img v-if="sourceUrl.indexOf('image') >= 0" :src="sourceUrl" class="avatar">
      <i v-if="sourceUrl.indexOf('image') < 0 && sourceUrl.indexOf('video') < 0" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/api/base'

import md5 from 'md5'
export default {
  name: 'UploadVideo',
  props: {
    value: String,
    parentSourceUrl: String
  },
  data() {
    return {
      data: { token: '', key: '' },
    }
  },
  computed: {
    sourceUrl() {
      debugger
      return this.value
    }
  },
  methods: {
    beforeUpload(file) {
      debugger
      this.handleRemove
      var type = file.name.toLowerCase().split('.')[1]
      let key;
      if (type === "png" || type === "jpeg" || type === "jpg") {
        key = 'tms/image/' + md5(file.name + new Date().getTime()) + file.name.substr(file.name.lastIndexOf('.'))
      } else if (type === "mp4") {
        key = 'tms/video/' + md5(file.name + new Date().getTime()) + file.name.substr(file.name.lastIndexOf('.'))
      } else {
        alert("只支持png、jpeg、jpg、mp4")
        return false
      }

      return new Promise((resolve, reject) => {
        getToken().then(response => {
          this.data.token = response.data
          this.data.key = key
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    handleSuccess(response, file, fileList) {
      var type = file.name.toLowerCase().split('.')[1];
      const domain = 'http://oq50tshbr.bkt.clouddn.com/'

      this.uploaded(domain + response.key)
      this.$refs.upload.clearFiles();
    },
    uploaded(sourceUrl) {
      debugger
      // this.$emit('uploaded', sourceUrl)
      this.$emit('update:parentSourceUrl', sourceUrl)

    },
    handleRemove(file, fileList) {
      debugger
      console.log(file, fileList);
    },
    clearUploadedImage() {
      debugger
      this.$refs.upload.clearFiles();
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.video-uploader {
  width: 320px;
  height: 240px
}

.avatar {
  width: 320px;
  height: 260px;
  display: block;
}
</style>
