<template>
    <div class="dashboard-editor-container">
        <el-row>
			<el-col :span="6">
				<el-card class="box-card">
					<div slot="header" class="box-card-header">
						<pan-thumb class="panThumb" :image="avatar"> 你的权限:
							<span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
						</pan-thumb>
					</div>
					<span class="display_name">登录成功：{{name}}</span>
                    <el-button type="info" class="reset_password" @click="resetPassword">修改密码</el-button>
				</el-card>
			</el-col>
		</el-row>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form class="small-space" :model="temp" ref="temp" :rules="rules2" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

                <el-form-item label="旧密码">
                <el-input type="password" v-model="temp.oldPassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="temp.password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="temp.checkPass" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button @click="updatePassword">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import panThumb from '@/components/PanThumb'
import { resetPassword } from '@/api/user'
import { getToken } from '@/utils/auth'


export default {
  name: 'dashboard',
  components: { panThumb },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  data() {
      var validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          if (this.temp.checkPass !== '') {
            this.$refs.temp.validateField('checkPass');
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
        temp: {
            oldPassword: '',
            password: '',
            checkPass: '',
        },
        dialogFormVisible: false,   
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
  methods: {
    resetPassword() {
        this.dialogFormVisible = true
    },
    cancel() {
        this.resetForm('temp')
        this.dialogFormVisible = false
    },
    updatePassword() {
        let id = getToken()
        this.temp.id = id
        debugger
        resetPassword(this.temp).then(response => {
            this.resetForm('temp')
            this.dialogFormVisible = false
            alert("密码修改成功，请重新登录")
            this.logout()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    margin: 30px;
    .btn-group {
        margin-bottom: 60px;
    }
    .box-card-header {
        position: relative;
        height: 160px;
    }
    .panThumb {
        z-index: 100;
        height: 150px;
        width: 150px;
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .display_name{
        font-size: 30px;
        display: block;
    }
    .info-item{
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        &:last-of-type{
            margin-left: 15px;
        }
    }
    .reset_password{
        margin-top: 20px;
    }
}
</style>
