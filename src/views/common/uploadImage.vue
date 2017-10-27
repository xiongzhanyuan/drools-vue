<template>
  <div class="upload-wrapper">
    <el-upload class="avatar-uploader" action="http://up-z1.qiniu.com" type="drag" :show-file-list="false" :before-upload="beforeUpload" :on-success="handleSuccess" :data="data">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/api/base'

import md5 from 'md5'
export default {
  name: 'UploadImage',
  props: {
    value: String
  },
  data () {
    return {
      data: { token: '', key: '' },
      image: {}
    }
  },
  computed: {
    imageUrl () {
      return this.value
    }
  },
  methods: {
    beforeUpload (file) {
      if(1024000 < file.size){
          alert("图片大小不能超过1M")
          return false
        }
      let key = 'tms/image/' + md5(file.name + new Date().getTime()) + file.name.substr(file.name.lastIndexOf('.'))
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
    handleSuccess (response, file) {
      const domain = 'http://oq50tshbr.bkt.clouddn.com/'
      let img = new Image()
      img.src = domain + response.key
      img.onload = () => {
        this.image = { 'url': img.src, 'width': img.width, 'height': img.height }
        this.uploaded(this.image)
      }
    },
    uploaded (image) {
      this.$emit('uploaded', image)
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

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
