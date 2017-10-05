<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.userName">
      </el-input>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>

    <el-table class="user-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{list.indexOf(scope.row) + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="头像">
        <template scope="scope">
          <img class="user-avatar" :src="scope.row.avatar+'?imageView2/1/w/40/h/40'">
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="用户名">
        <template scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="真实姓名">
        <template scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="部门">
        <template scope="scope">
          <span>{{scope.row.department}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="角色">
        <template scope="scope">
          <el-tag>{{scope.row.roleName}}</el-tag>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form class="small-space" :model="temp" :rules="rules2" ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="头像">
          <UploadImage v-model="temp.avatar" @uploaded="imageUploaded"></UploadImage>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="temp.userName"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="temp.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="temp.checkPass" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="temp.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
          
        </el-form-item>

        <el-form-item label="真实姓名">
          <el-input v-model="temp.realName"></el-input>
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="temp.idCard"></el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-input v-model="temp.department"></el-input>
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
  .user-table{width: 100%; margin-top: 20px}
</style>


<script>
import { getUserList, updateUserInfo, addUserInfo, deleteUserInfo } from '@/api/user'
import store from '@/store'
import UploadImage from '@/views/common/uploadImage'

export default {
  components: { UploadImage },
  name: 'userList',
  data() {
    var validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          if (this.temp.checkPass !== '') {
            this.$refs.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.temp.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        userName: null, 
        realName: null, 
        page: {
          pageNo: 1,
          pageSize: 10
        },
        importance: undefined,
        title: undefined,
        type: undefined,
      },
      temp: {
        id: undefined,
        userName: '',
        password: '',
        checkPass: '',
        realName: '',
        sex: 1,
        avatar: '',
        idCard: '',
        department: '',
        status: 'published'
      },
      tableKey: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules2: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(response => {
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
    imageUploaded (image) {
      this.temp.avatar = image.url
    },
    create() {
      addUserInfo(this.temp).then(response => {
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

      updateUserInfo(this.temp).then(response => {
        this.resetForm('temp')
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        store.dispatch('GetInfo')
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        userName: '',
        password: '',
        checkPass: '',
        realName: '',
        sex: 1,
        avatar: '',
        idCard: '',
        department: '',
        status: 'published'
      }
    },
    messageBox(row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserInfo({"id": row.id, "flagDelete": 1}).then(response => {
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
      },
      test(var1, var2) {
        var b = true;
        var str = var2.split("*");
        str.forEach((v,i) => {
            if (v !== "" && var1.search(v) != var2.search(v)) {
                b = false;
                alert(b);
            }
        })
      }
  }
}
</script>
