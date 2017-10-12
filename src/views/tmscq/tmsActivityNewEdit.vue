<template>
  <div>
    <!-- <div class="tmsAddDiv">
                                  <el-button type="success" size="small" @click="addModule()">添加模块</el-button>
                              </div> -->

    <div class="sub-navbar">
      <template>
        <el-button style="margin-left: 10px;" type="success" @click="submitForm()">发布
        </el-button>
        <el-button type="warning" @click="addModule()">添加详情模板</el-button>
      </template>
    </div>

    <div class="tmsDiv">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="标题描述" prop="content">
            <el-input v-model="ruleForm.content"></el-input>
          </el-form-item>

          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="startDate">
                <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">——</el-col>
            <el-col :span="11">
              <el-form-item prop="endDate">
                <el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="封面图片">
            <UploadImage v-model="ruleForm.imageUrl" @uploaded="imageUploaded"></UploadImage>
          </el-form-item>
        </el-form>
      </div>

      <div class="tmsDetailDiv" v-for="(item, index) in ruleForm.detailForm" :key="item + ''">
        <ul>
          <li>
            <a style="color :#337ab7">添加详情</a>
          </li>

          <li>
            <a style="color :#337ab7" @click="deleteMoudle(index)">删除模块</a>
          </li>
        </ul>
        <el-form :model="item" ref="ruleForm.detailForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="详情标题">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="详情内容">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="item.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <UploadAll :parentSourceUrl.sync='item.imageUrl' v-model="item.imageUrl"></UploadAll>
          </el-form-item>
          <el-form-item label="视频">
            <UploadAll :parentSourceUrl.sync='item.videoUrl' v-model="item.videoUrl"></UploadAll>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div>
                                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                              </div> -->
    </div>
  </div>
</template>


<script>
import UploadAll from '@/views/common/uploadAll'
import { fetchLegendActivityList, getLegendActivityInfo, addLegendActivityInfo, updateLegendActivityInfo, deleteLegendActivityInfo } from '@/api/legend'
import UploadImage from '@/views/common/uploadImage'

export default {
  components: { UploadAll, UploadImage },

  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        startTime: '',
        endTime: '',
        content: '',
        imageUrl: '',
        detailForm: []
      },
      blankDetailForm: {
        name: '',
        content: '',
        imageUrl: '',
        videoUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    const id = this.$route.params.id
    getLegendActivityInfo(id).then(response => {
      debugger
      this.ruleForm = Object.assign(this.ruleForm, response)
    })

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },
  methods: {
    submitForm(formName) {
      debugger
      updateLegendActivityInfo(this.ruleForm).then(response => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        }),
          this.$router.go(-1)
      })
    },
    resetForm(formName) {
      // this.$router.go({ name: 'tmsActivity'});
      this.$router.go(0)

    },
    addModule() {
      debugger
      let newForm = Object.assign({}, this.blankDetailForm)

      this.ruleForm.detailForm.push(newForm)
    },
    deleteMoudle(index) {
      debugger
      this.ruleForm.detailForm.splice(index, 1)
    },
    imageUploaded (image) {
      debugger
      this.ruleForm.imageUrl = image.url
    }
  }
}
</script>

<style>
.tmsDiv {
  width: 60%;
  margin: 40px;
  text-align: left
}

.tmsAddDiv {
  margin-top: 10px;
  text-align: right
}

.tmsDetailDiv {
  border: 1px dashed #d9d9d9;
  margin-top: 5px
}

.tmsDetailDiv form {
  margin: 10px
}

.sub-navbar {
  margin-top: 10px;
  text-align: right;
}
</style>