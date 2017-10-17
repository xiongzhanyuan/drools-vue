<template>
    <div class="tmsDiv">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="主题" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入主题"></el-input>
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.content" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="咨询电话" prop="consultPhone">
                <el-input v-model="ruleForm.consultPhone" placeholder="请输入咨询电话"></el-input>
            </el-form-item>

            <el-form-item label="投诉电话" prop="complaintPhone">
                <el-input v-model="ruleForm.complaintPhone" placeholder="请输入投诉电话"></el-input>
            </el-form-item>

            <el-form-item label="图片" prop="imageUrl">
                <UploadImageBig v-model="ruleForm.imageUrl" @uploaded="imageUploaded"></UploadImageBig>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import UploadImageBig from '@/views/common/uploadImageBig'
import { updateNoticeInfo, addNoticeInfo, getNoticeInfo } from '@/api/notice'


export default {
    components: { UploadImageBig },

    data() {
        return {
            ruleForm: {
                id: '',
                name: '',
                content: '',
                imageUrl: '',
                complaintPhone: '',
                consultPhone: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入主题名称', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ],
                imageUrl: [
                    { required: true, message: '请上传图片', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        getNoticeInfo().then(response => {
            this.ruleForm = Object.assign(this.ruleForm, response)
        })
    },
    methods: {
        submitForm() {
            debugger
            if ('' === this.ruleForm.id) {
                addNoticeInfo(this.ruleForm).then(response => {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success',
                        duration: 2000
                    })
                })
            } else {
                updateNoticeInfo(this.ruleForm).then(response => {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success',
                        duration: 2000
                    })
                })
            }

        },
        resetForm(formName) {
            debugger
            this.$refs[formName].resetFields();
        },
        imageUploaded(image) {
            debugger
            this.ruleForm.imageUrl = image.url
        }
    }
}
</script>

<style>
.tmsDiv {
    width: 600px;
    margin: 50px
}
</style>
