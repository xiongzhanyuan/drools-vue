<template>
  <div class="app-container">
    <span class="demonstration">开始时间</span>
    <el-date-picker v-model="listQuery.startTime" type="datetime" placeholder="选择开始时间">
    </el-date-picker>

    <span class="demonstration">结束时间</span>
    <el-date-picker v-model="listQuery.endTime" type="datetime" placeholder="选择结束时间">
    </el-date-picker>

    <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
    <el-button class="filter-item" @click="handleCreate" type="primary" icon="edit">添加</el-button>

    <el-table ref="multipleTable" class="home-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{list.indexOf(scope.row) + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="图片">
        <template scope="scope">
          <img class="" :src="scope.row.imageUrl+'?imageView2/1/w/40/h/40'">
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="内容">
        <template scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="状态">
        <template scope="scope">
          <el-tag v-if="scope.row.flagDelete === 0" type="success">上线</el-tag>
          <el-tag v-else type="gray">下线</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button size="small" type="success" @click="getInfo(scope.row)">修改
          </el-button>

          <el-button size="small" type="primary" @click="messageBoxUp(scope.row)">上线
          </el-button>

          <el-button size="small" type="danger" @click="messageBox(scope.row)">下线
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo" :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form class="small-space" :model="temp" ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="内容">
          <el-input v-model="temp.content"></el-input>
        </el-form-item>

        <el-form-item label="栏目图片">
          <UploadImageNotPermit v-model="temp.imageUrl" @uploaded="imageUploaded"></UploadImageNotPermit>
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
.home-table {
  width: 100%;
  margin-top: 20px
}
</style>


<script>
import { fetchWonderfulPhotoList, getWonderfulPhotoInfo, addWonderfulPhotoInfo, updateWonderfulPhotoInfo, onLineWonderfulPhotoInfo, offLineWonderfulPhotoInfo } from '@/api/wonderful'
import store from '@/store'
import UploadImageNotPermit from '@/views/common/uploadImageNotPermit'

export default {
  components: { UploadImageNotPermit },
  name: 'wonderfulOrgList',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        startTime: null,
        endTime: null,
        type: 2,
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      temp: {
        id: undefined,
        imageUrl: '',
        content: '',
        type: 2
      },
      tableKey: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const temp = Object.assign({}, this.listQuery)
      if (temp.startTime) {
        temp.startTime = this.listQuery.startTime.getTime()
      }

      if (temp.endTime) {
        temp.endTime = this.listQuery.endTime.getTime()
      }
      fetchWonderfulPhotoList(temp).then(response => {
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
      this.temp = Object.assign(this.temp, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel(formName) {
      this.resetForm(formName)
      this.dialogFormVisible = false
    },
    handleClose() {
      this.resetForm('temp')
      this.dialogFormVisible = false
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    imageUploaded(image) {
      this.temp.imageUrl = image.url
    },
    create() {
      if ('' === this.temp.imageUrl || null === this.temp.imageUrl) {
        this.$message.error('图片不能为空')
        return false
      }
      this.temp.type = 2
      addWonderfulPhotoInfo(this.temp).then(response => {
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
    },
    update() {
      updateWonderfulPhotoInfo(this.temp).then(response => {
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
        imageUrl: '',
        content: ''
      }
    },
    messageBox(row) {
      this.$confirm('是否下线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        offLineWonderfulPhotoInfo({ "id": row.id, "flagDelete": 1 }).then(response => {
          this.$message({
            type: 'success',
            message: '下线成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    messageBoxUp(row) {
      this.$confirm('是否上线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        onLineWonderfulPhotoInfo({ "id": row.id, "flagDelete": 0 }).then(response => {
          this.$message({
            type: 'success',
            message: '上线成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }

  }
}
</script>
