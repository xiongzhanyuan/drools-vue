<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称" v-model="listQuery.name">
      </el-input>

      <el-select v-model="listQuery.level" placeholder="级别">
        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>

    <el-table class="scenic-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{list.indexOf(scope.row) + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="名称">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" label="级别">
        <template scope="scope">
          <span v-if="0 == scope.row.level">景区</span>
          <span v-if="1 == scope.row.level">景观区</span>
          <span v-if="2 == scope.row.level">景点</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="隶属景观区">
        <template scope="scope">
          <span>{{scope.row.parentName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="创建时间">
        <template scope="scope">
          <el-tag>{{scope.row.createTime | formatDate}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="success" @click="getInfo(scope.row)">修改
          </el-button>

          <el-button size="small" type="danger" @click="messageBox(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo" :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form class="small-space" :model="temp" :rules="rules2" ref="temp" label-position="left" label-width="90px" style='width: 500px; margin-left:50px;'>

        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

        <el-form-item label="级别" prop="level">
          <el-select v-if="dialogStatus=='create'" v-model="temp.level" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-else v-model="temp.level" placeholder="请选择" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="隶属景观区" prop="parentId">
          <el-select v-if="1 === temp.level || 0 === temp.level" v-model="temp.parentId" placeholder="请选择" disabled>
            <el-option v-for="item in parentOptions" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-else v-model="temp.parentId" placeholder="请选择">
            <el-option v-for="item in parentOptions" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="temp.sort"></el-input>
        </el-form-item>

        <el-form-item label="景观区介绍" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="temp.content" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <UploadImageMulti childImageUrls=temp.imageUrls v-model="temp.imageUrls" ref="imageMulti" @uploaded="imageUploaded" @removed="imageRemoved"></UploadImageMulti>
        </el-form-item>

        <el-form-item label="视频">
          <UploadVideo childVideoUrls=temp.videoUrls v-model="temp.videoUrls" ref="uploadVideo" @videoUploaded="videoUploaded" @videoRemoved="videoRemoved"></UploadVideo>
        </el-form-item>

        <el-form-item label="语音">
          <UploadAudio childAudioUrls=temp.audioUrls v-model="temp.audioUrls" ref="uploadAudio" @audioUploaded="audioUploaded" @audioRemoved="audioRemoved"></UploadAudio>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('temp')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
.scenic-table {
  width: 100%;
  margin-top: 20px
}
</style>


<script>
import { getScenicList, updateScenicInfo, addScenicInfo, deleteScenicInfo, getScenicInfo } from '@/api/scenic'
import store from '@/store'
import UploadImage from '@/views/common/uploadImage'
import UploadImageMulti from '@/views/common/uploadImageMulti'
import UploadVideo from '@/views/common/uploadVideo'
import UploadAudio from '@/views/common/uploadAudio'
import { formatDate } from '@/utils/date.js';

export default {
  components: { UploadImage, UploadImageMulti, UploadVideo, UploadAudio },
  name: 'scenicList',
  data() {
    var validateName = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('名称不能为空'))
      } else {
        callback()
      }
    };
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        name: null,
        level: null,
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      temp: {
        id: undefined,
        name: '',
        level: '',
        parentId: '',
        content: '',
        sort: '',
        imageUrls: [],
        videoUrls: [],
        audioUrls: []
      },
      tableKey: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules2: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      },
      options: [{
        value: 0,
        label: '景区'
      }, {
        value: 1,
        label: '景观区'
      }, {
        value: 2,
        label: '景点'
      }],
      value: 0,
      parentOptions: [],
      searchOptions: [{
        value: '',
        label: '全部'
      },{
        value: 0,
        label: '景区'
      }, {
        value: 1,
        label: '景观区'
      }, {
        value: 2,
        label: '景点'
      }],
    }
  },
  created() {
    this.getList()
  },
  filters: {
    formatDate(time) {
      if (!!time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      getScenicList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.totalCount
        this.listLoading = false
      })
      this.getParentOptions();
    },
    getParentOptions() {
      getScenicList({
        level: 1,
        page: {
          pageNo: 1,
          pageSize: 10000
        }
      }).then(response => {
        this.parentOptions = response.list
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page.pageNo = val
      this.getList()
    },
    getInfo(row) {
      var _this = this
      this.dialogFormVisible = true
      getScenicInfo(row.id).then(response => {
        this.temp = Object.assign(this.temp, response)
        this.dialogStatus = 'update'
        debugger
        _this.$refs.uploadVideo.video = response.videoUrls && response.videoUrls[0] && response.videoUrls[0].url
        _this.$refs.uploadAudio.audio = response.audioUrls && response.audioUrls[0] && response.audioUrls[0].url
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel(formName) {
      this.resetForm(formName)
      this.dialogFormVisible = false
      this.$refs.imageMulti.clear();
      this.$refs.uploadVideo.clear();
      this.$refs.uploadAudio.clear();

    },
    handleClose() {
      this.resetForm('temp')
      this.dialogFormVisible = false
      this.$refs.imageMulti.clear();
      this.$refs.uploadVideo.clear();
      this.$refs.uploadAudio.clear();
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    imageUploaded(image) {
      debugger
      this.temp.imageUrls.push({ id: '', url: image })
    },
    imageRemoved(image) {
      debugger
      this.temp.imageUrls = this.temp.imageUrls.filter(e => e.url != image)
    },
    videoUploaded(video) {
      //只能上传一个视频
      this.temp.videoUrls = []
      this.temp.videoUrls.push({ id: '', url: video })
    },
    videoRemoved(video) {
      this.temp.videoUrls = this.temp.videoUrls.filter(e => e.url != video)
    },

    audioUploaded(audio) {
      //只能上传一个音频
      this.temp.audioUrls = []
      this.temp.audioUrls.push({ id: '', url: audio })
    },
    audioRemoved(audio) {
      this.temp.audioUrls = this.temp.audioUrls.filter(e => e.url != audio)
    },

    create() {
      if (0 !== this.temp.level && !this.temp.level) {
        debugger
        this.$message.error('级别不能为空')
        return
      }
      if (this.temp.level == 2 && "" == this.temp.parentId) {
        this.$message.error('景点的隶属景观区不能为空')
        return
      }
      debugger
      addScenicInfo(this.temp).then(response => {
        this.resetForm('temp')
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success',
          duration: 2000
        })
      })
      this.$refs.imageMulti.clear();
      this.$refs.uploadVideo.clear();
      this.$refs.uploadAudio.clear();
    },
    update() {

      updateScenicInfo(this.temp).then(response => {
        this.resetForm('temp')
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        level: '',
        parentId: '',
        content: '',
        imageUrls: [],
        videoUrls: [],
        audioUrls: []
      }
    },
    messageBox(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteScenicInfo({ "id": row.id, "flagDelete": 1 }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
