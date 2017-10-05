<template>
  <div class="app-container">
    <div class="filter-container" style="text-align:right">
      <el-button class="filter-item" @click="handleCreate" type="primary" icon="edit">添加</el-button>
      <el-button class="filter-item" @click="multiDown" type="danger" icon="delete">批量下线</el-button>

    </div>

    <el-table ref="multipleTable" @select="selectOne" @select-all="selectAll" class="home-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{list.indexOf(scope.row) + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="栏目图片">
        <template scope="scope">
          <img class="" :src="scope.row.imageUrl+'?imageView2/1/w/40/h/40'">
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="模块名称">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
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

        <el-form-item label="模块名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="temp.content"></el-input>
        </el-form-item>

        <el-form-item label="栏目图片">
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
import { getHomeInfo, getHomeList, updateHome, addHome, deleteHome, multiDownHome } from '@/api/home'
import store from '@/store'
import UploadImage from '@/views/common/uploadImage'

export default {
  components: { UploadImage },
  name: 'homePageList',
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
        imageUrl: '',
        content: ''
      },
      tableKey: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getHomeList(this.listQuery).then(response => {
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
      addHome(this.temp).then(response => {
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

      updateHome(this.temp).then(response => {
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
        content: ''
      }
    },
    messageBox(row) {
      this.$confirm('是否下线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHome({ "id": row.id, "flagDelete": 7 }).then(response => {
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
        deleteHome({ "id": row.id, "flagDelete": 0 }).then(response => {
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
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // handleSelectionChange(val) {
    //   debugger
    //   this.multipleSelection = val;
    // },
    selectOne(selection, row) {
      this.multipleSelection = []
      if (selection) {
        selection.forEach(s => {
          this.multipleSelection.push(s.id)
        });
      }

    },
    selectAll(selection) {
      this.multipleSelection = []
      if (selection) {
        selection.forEach(s => {
          this.multipleSelection.push(s.id)
        });
      }
    },
    multiDown() {
      this.$confirm('是否批量下线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        debugger
        multiDownHome({"list": this.multipleSelection}).then(response => {
          this.$message({
            type: 'success',
            message: '批量下线成功!'
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

  }
}
</script>
