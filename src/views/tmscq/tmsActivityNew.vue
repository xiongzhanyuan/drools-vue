<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <div class="sub-navbar">
        <template>
          <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
          </el-button>
          <el-button v-loading="loading" type="warning" @click="addModule()">添加详情模板</el-button>
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

        <!-- <div class="editor-container">
              <tinymce :height=400 ref="editor" v-model="postForm.content"></tinymce>
            </div> -->
      </div>
      <div class="tmsDetailDiv" v-for="(item, index) in postForm.detailForm" :key="item + ''">
        <span></span>
        <el-form :model="item" ref="postForm.detailForm" label-width="100px">
          <el-form-item label="详情标题" prop="name">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="详情内容" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="item.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="imageUrl">
            <UploadAll :parentSourceUrl.sync='item.imageUrl' v-model="item.imageUrl"></UploadAll>
          </el-form-item>
          <el-form-item label="视频" prop="videoUrl">
            <UploadAll :parentSourceUrl.sync='item.videoUrl' v-model="item.videoUrl"></UploadAll>
          </el-form-item>
        </el-form>
      </div>
    </el-form>

  </div>
</template>

<script>
// import Tinymce from '@/components/Tinymce'
import UploadAll from "@/views/common/uploadAll";
import MDinput from "@/components/MDinput";
import Sticky from "@/components/Sticky"; // 粘性header组件
import {
  fetchLegendActivityList,
  getLegendActivityInfo,
  addLegendActivityInfo,
  updateLegendActivityInfo,
  deleteLegendActivityInfo
} from "@/api/legend";

export default {
  name: "addTmsActivity",
  components: { UploadAll, MDinput, Sticky },
  data() {
    const validateRequire = (rule, value, callback) => {
      debugger;
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        return false;
      } else {
        callback();
      }
    };

    return {
      postForm: {
        name: "",
        startDate: "",
        endDate: "",
        content: "",
        detailForm: []
      },
      blankDetailForm: {
        name: "",
        content: "",
        imageUrl: "",
        videoUrl: ""
      },
      loading: false,
      rules: {
        title: [{ validator: validateRequire }]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    addModule() {
      this.postForm.detailForm.push(this.blankDetailForm);
    },
    fetchData() {
      fetchArticle()
        .then(response => {
          this.postForm = response.data;
        })
        .catch(err => {
          this.fetchSuccess = false;
          console.log(err);
        });
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          addLegendActivityInfo(this.postForm).then(response => {
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
              duration: 2000
            }),
              this.$router.go(-1);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
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
    text-align: right;
    position: fixed;
    right: 30px;
    top: 40px;
  }
}
</style>

