<template>
  <div>
    <el-upload ref="uploadVideo" class="avatar-uploader" action="http://up-z1.qiniu.com" type="drag" :on-remove="handleRemove" :before-upload="beforeUpload" :on-success="handleSuccess" :data="data">
      <video class="video-uploader" v-if="video && video.indexOf('video') >= 0" :src="video" controls="controls" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/api/base'

import md5 from 'md5'
export default {
  name: 'UploadVideo',
  props: {
    // value: {type: String},
    value: {type: Array}
  },
  data() {
    return {
      data: { token: '', key: '' },
      video: ''
    }
  },
  computed: {
    // sourceUrl() {
    //   return this.value
    // }
  },
  // created () {
  //   debugger
  //   this.video = this.value && this.value[0] && this.value[0].url || ''
  // },
  created() {

  },
  methods: {
    beforeUpload(file) {
      this.handleRemove
      var type = file.name.toLowerCase().split('.')[1]
      let key;
        key = 'tms/video/' + md5(file.name + new Date().getTime()) + file.name.substr(file.name.lastIndexOf('.'))

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

      this.uploadVideo(domain + response.key)
      this.video = domain + response.key
      this.$refs.uploadVideo.clearFiles();
    },
    uploadVideo(video) {
      debugger
      this.$emit('videoUploaded', video)

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    clear() {
      this.$refs.uploadVideo.clearFiles();
      this.video = ''
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
