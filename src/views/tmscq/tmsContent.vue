<template>
    <div class="tmsDiv">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm.content" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="图片" prop="imageUrl">
                <UploadImageBig v-model="ruleForm.imageUrl" @uploaded="imageUploaded"></UploadImageBig>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import UploadImageBig from '@/views/common/uploadImageBig'

export default {
    components: { UploadImageBig },

    data() {
        return {
            ruleForm: {
                name: '',
                content: '',
                imageUrl: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
    margin:50px
}
</style>
