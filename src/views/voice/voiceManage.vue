<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称" v-model="listQuery.name">
      </el-input>

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

      <el-table-column min-width="60px" label="触发条件">
        <template scope="scope">
          <span v-if="1 == scope.row.type">经纬度</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="经度">
        <template scope="scope">
          <span>{{scope.row.lng}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="纬度">
        <template scope="scope">
          <span>{{scope.row.lat}}</span>
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
      <el-form class="small-space" :model="temp" :rules="rules2" ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

        <el-form-item label="触发条件" prop="type">
          <el-select v-if="dialogStatus=='create'" v-model="temp.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-else v-model="temp.type" placeholder="请选择" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="经度" prop="lng">
          <el-input v-model="temp.lng"></el-input>
        </el-form-item>

        <el-form-item label="纬度" prop="lat">
          <el-input v-model="temp.lat"></el-input>
        </el-form-item>

        <el-form-item label="语音内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="temp.content" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="推送话术" prop="pushContent">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="temp.pushContent" placeholder="请输入话术"></el-input>
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
import { fetchVoiceManageList, getVoiceManageInfo, addVoiceManageInfo, updateVoiceManageInfo, deleteVoiceManageInfo } from '@/api/voice'
import store from '@/store'
import UploadAudio from '@/views/common/uploadAudio'
import { formatDate } from '@/utils/date.js';

export default {
  components: { UploadAudio },
  name: 'voiceManage',
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
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      temp: {
        id: undefined,
        name: '',
        type: '',
        lng: '',
        lat: '',
        content: '',
        pushContent: '',
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
        value: 1,
        label: '经纬度'
      }],
      value: 1
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
      fetchVoiceManageList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.totalCount
        this.listLoading = false
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
      getVoiceManageInfo(row.id).then(response => {
        this.temp = Object.assign(this.temp, response)
        this.dialogStatus = 'update'
        debugger
        _this.$refs.uploadAudio.audio = response.audioUrls && response.audioUrls[0] && response.audioUrls[0].url
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel(formName) {
      this.resetForm(formName)
      this.dialogFormVisible = false
      this.$refs.uploadAudio.clear();

    },
    handleClose() {
      this.resetForm('temp')
      this.dialogFormVisible = false
      this.$refs.uploadAudio.clear();
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
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
      addVoiceManageInfo(this.temp).then(response => {
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
      this.$refs.uploadAudio.clear();
    },
    update() {
      updateVoiceManageInfo(this.temp).then(response => {
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
        type: '',
        lng: '',
        lat: '',
        content: '',
        pushContent: '',
        audioUrls: []
      }
    },
    messageBox(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVoiceManageInfo({ "id": row.id, "flagDelete": 1 }).then(response => {
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
