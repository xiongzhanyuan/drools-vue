<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <div class="sub-navbar">
        <template>
          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">确定修改
          </el-button>
          <!-- <el-button v-loading="loading" type="warning">预览</el-button> -->
        </template>
      </div>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.name" required :maxlength="100">
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="80px" label="开始时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.startTime" type="date" placeholder="选择开始时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="80px" label="结束时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.endTime" type="date" placeholder="选择结束时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <!-- <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
            <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入摘要" v-model="postForm.subject">
            </el-input>
          </el-form-item> -->

        <div class="editor-container">
          <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchLegendActivityList, getLegendActivityInfo, addLegendActivityInfo, updateLegendActivityInfo, deleteLegendActivityInfo } from '@/api/legend'


export default {
  name: 'addTmsActivity',
  components: { Tinymce, MDinput, Sticky },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        return false
      } else {
        callback()
      }
    }

    return {
      postForm: {
        id: '',
        name: '',
        startTime: '',
        endTime: '',
        content: '',
        id: undefined
      },
      loading: false,
      rules: {
        title: [{ validator: validateRequire }]
      }
    }
  },
  computed: {

  },
  created() {
    const id = this.$route.params.id
    getLegendActivityInfo(id).then(response => {
      this.postForm = Object.assign(this.postForm, response)
    })

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },
  methods: {
    fetchData() {
      fetchArticle().then(response => {
        this.postForm = response.data
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          updateLegendActivityInfo(this.postForm).then(response => {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.title-prompt {
  position: absolute;
  right: 0px;
  font-size: 12px;
  top: 10px;
  color: #ff4949;
}

.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
  .sub-navbar {
    margin-top: 10px;
    margin-right: 30px;
    text-align: right;
  }
}
</style>

