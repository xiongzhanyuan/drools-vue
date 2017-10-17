<template>
  <div class="app-container">
    <div class="filter-container" style="text-align:right">
      <el-button class="filter-item" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>

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

      <el-table-column min-width="100px" label="名称">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" label="序号">
        <template scope="scope">
          <span>{{scope.row.sort}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="是否默认">
        <template scope="scope">
          <el-tag v-if="scope.row.isDefault === 0" type="success">默认显示</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="260px">
        <template scope="scope">
          <el-button size="small" type="success" @click="getInfo(scope.row)">修改
          </el-button>

          <el-button size="small" type="danger" @click="messageBoxDelete(scope.row)">删除
          </el-button>

          <el-button size="small" type="primary" @click="messageBoxDefault(scope.row)">设置为默认
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

        <el-form-item label="名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

        <el-form-item label="序号">
          <el-input v-model="temp.sort"></el-input>
        </el-form-item>

        <el-form-item label="地图图片">
          <UploadImage v-model="temp.imageUrl" @uploaded="imageUploaded"></UploadImage>
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
import { getMapeInfo, selectMapList, updateMap, addMap, deleteMap, isDefault } from '@/api/map'
import store from '@/store'
import UploadImage from '@/views/common/uploadImage'

export default {
  components: { UploadImage },
  name: 'mapManageList',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {

        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      temp: {
        id: undefined,
        name: '',
        imageUrl: ''
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
      selectMapList(this.listQuery).then(response => {
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
      addMap(this.temp).then(response => {
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
      updateMap(this.temp).then(response => {
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
        imageUrl: '',
        sort: ''
      }
    },
    messageBoxDefault(row) {
      this.$confirm('是否设置为默认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        isDefault({ "id": row.id}).then(response => {
          this.$message({
            type: 'success',
            message: '设置成功!'
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
    messageBoxDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMap({ "id": row.id}).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
