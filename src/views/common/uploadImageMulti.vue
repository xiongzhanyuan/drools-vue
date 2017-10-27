<template>
  <div>
    <el-upload :file-list="this.value" ref="upload" action="http://up-z1.qiniu.com" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload" :on-success="handleSuccess" :data="data">
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from '@/api/base'

import md5 from 'md5'

export default {
  name: 'UploadImageMulti',
  props: {
    value: {type: Array}
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      data: { token: '', key: '' },
      image: {}

    };
  },
  methods: {
    handleRemove(file, fileList) {
      debugger
      console.log(file, fileList);
      this.$emit('removed', file.url)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
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
    handleSuccess(response, file) {
      const domain = 'http://oq50tshbr.bkt.clouddn.com/'
      let img = new Image()
      img.src = domain + response.key
      img.onload = () => {
        this.image = { 'url': img.src, 'width': img.width, 'height': img.height }
        this.uploaded(this.image)
      }
    },
    uploaded(image) {
      this.$emit('uploaded', image.url)
    },
    clear() {
      this.$refs.upload.clearFiles();
    }
  }
}
</script>
