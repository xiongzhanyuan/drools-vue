<template>
  <div class="app-container">
    <span class="demonstration">开始时间</span>
    <el-date-picker v-model="listQuery.startTime" type="datetime" placeholder="选择开始时间">
    </el-date-picker>

    <span class="demonstration">结束时间</span>
    <el-date-picker v-model="listQuery.endTime" type="datetime" placeholder="选择结束时间">
    </el-date-picker>

    <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>

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
          <el-tag v-if="scope.row.flagDelete === 0" type="success">通过审核</el-tag>
          <el-tag v-else type="gray">未通过审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button size="small" type="success" @click="getInfo(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo" :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="审核" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form class="small-space" :model="temp" ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="审批内容">
          <el-input v-model="temp.approve"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('temp')">取 消</el-button>
        <el-button type="primary" @click="update(0)">通 过</el-button>
        <el-button type="danger" @click="update(1)">拒 绝</el-button>
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
import UploadImage from '@/views/common/uploadImage'

export default {
  components: { UploadImage },
  name: 'wonderfulOrgList',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        startTime: null,
        endTime: null,
        type: 1,
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      temp: {
        id: undefined,
        approve: '',
      },
      tableKey: 0,
      dialogFormVisible: false
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
      debugger
      this.temp = Object.assign(this.temp, row)
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
    update(flagDelete) {
      this.temp.flagDelete = flagDelete
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
        approve: ''
      }
    }
  }
}
</script>
