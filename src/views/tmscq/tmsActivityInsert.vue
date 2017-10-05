<template>
    <div>
        <div class="tmsAddDiv">
            <el-button type="success" size="small">添加模块</el-button>
        </div>

        <div class="tmsDiv">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item label="标题描述" prop="content">
                        <el-input v-model="ruleForm.content"></el-input>
                    </el-form-item>

                    <el-form-item label="活动时间" required>
                        <el-col :span="11">
                            <el-form-item prop="startDate">
                                <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.startDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">——</el-col>
                        <el-col :span="11">
                            <el-form-item prop="endDate">
                                <el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>

            <div class="tmsDetailDiv" v-for="(item, index) in ruleForm.detailForm" :key="item + ''">
                <el-form :model="item" ref="ruleForm.detailForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="详情标题" prop="name">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="详情内容" prop="content">
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="item.content" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="图片/视频" prop="sourceUrl">
                        <UploadAll :parentSourceUrl.sync='item.sourceUrl' v-model="item.sourceUrl"></UploadAll>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
        </div>
    </div>
</template>


<script>
import UploadAll from '@/views/common/uploadAll'

export default {
    components: { UploadAll },

    data() {
        return {
            ruleForm: {
                name: '标题',
                startDate: '',
                endDate: '',
                content: '标题内容',
                detailForm: [{"name": "详情标题", "content": "详情内容", "sourceUrl": "http://oq50tshbr.bkt.clouddn.com/tms/image/2d6c00621bdd24f6c4f4018ab4dfd8a4.png"},
                {"name": "详情标题2", "content": "详情内容2", "sourceUrl": "http://oq50tshbr.bkt.clouddn.com/tms/image/2d6c00621bdd24f6c4f4018ab4dfd8a4.png"}]
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                startDate: [
                    { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                endDate: [
                    { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ],
                sourceUrl: [
                    { required: true, message: '请上传资源', trigger: 'blur' }
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
            // this.$router.go({ name: 'tmsActivity'});
            this.$router.go(0)

        },
        // imageUploaded(sourceUrl) {
        //     debugger
        //     this.ruleForm.sourceUrl = sourceUrl
        // }
    }
}
</script>

<style>
.tmsDiv {
    width: 600px;
    margin: 40px;
    text-align: left
}

.tmsAddDiv {
    margin-top: 10px;
    text-align: right
}
.tmsDetailDiv {
    border: 1px dashed #d9d9d9;
    margin-top: 5px
}
.tmsDetailDiv form {
    margin: 10px
}
</style>