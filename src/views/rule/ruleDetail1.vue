<template>
    <el-row>
        <div class="sub-navbar">
            <template>
                <el-button style="margin-left: 10px;" type="success" @click="submitForm()">发布规则
                </el-button>
                <el-button type="warning" @click="addModule()">添加规则模板</el-button>
                <el-button  @click="buildCode()">生成规则代码(开发人员使用)</el-button>
            </template>
        </div>
        <!-- <div style="position:fixed; top:0px; left:70%; width:2px; height:100%; background: #ccc">
        </div> -->

        <div style="position:fixed; top:0px; left:70%; width:100%; height:100%; background: #2b2b2b; font-size: 20px;color: darkorange;">
            <span style="margin-left:15px; line-height:1.8" v-for="rule in ruleCode" :key="rule">
                {{ rule }} <br>
            </span>
        </div>
        <el-col :md="4" class="tmsDiv">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="规则总名称" prop="name">
                        <el-input value="拒件规则"></el-input>
                    </el-form-item>

                    <el-form-item label="描述" prop="content">
                        <el-input value="符合以下规则拒件 提供拒件原因"></el-input>
                    </el-form-item>

                    <el-form-item label="生效时间" required>
                        <el-col :span="11">
                            <el-form-item prop="startTime">
                                <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">——</el-col>
                        <el-col :span="11">
                            <el-form-item prop="endTime">
                                <el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>



            <div class="tmsDetailDiv" v-for="(item, index) in ruleForm.detailForm" :key="item + ''">
                <ul>
                    <li>
                        <a>规则模板：</a>
                    </li>
                </ul>
                <el-form :model="item" ref="ruleForm.detailForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="规则名称">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="条件">
                        <el-select v-model="item.conditionValue" filterable placeholder="请选择">
                        <el-option
                          v-for="item in conditionOptions"
                          :key="item.tdColumn"
                          :label="item.name"
                          :value="item.tdColumn">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="符号">
                        <el-select v-model="item.signValue" filterable placeholder="请选择">
                        <el-option
                          v-for="item in signOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="值">
                        <el-input v-model="item.value"></el-input>
                    </el-form-item>

                    <el-form-item label="结果">
                        <el-input v-model="item.result"></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
            
        </el-col>
    </el-row>
</template>


<script>
import UploadAll from "@/views/common/uploadAll";
import {
  reloadRule, selectUsedList
} from "@/api/rule";

export default {
  data() {
    return {
      
        ruleCode: [],
        conditionOptions: [],
        conditionValue: '',

        signOptions: [{
          value: '>',
          label: '>'
        }, {
          value: '>=',
          label: '>='
        }, {
          value: '<',
          label: '<'
        }, {
          value: '<=',
          label: '<='
        }, {
          value: '==',
          label: '=='
        }, {
          value: '!=',
          label: '!='
        }, {
          value: '!=',
          label: '!='
        }, {
          value: '包含',
          label: 'contains'
        }, {
          value: '不包含',
          label: 'not contains'
        }],
        signValue: '',

      ruleForm: {
        name: "",
        startTime: "",
        endTime: "",
        content: "",
        imageUrl: "",
        detailForm: []
      },
      blankDetailForm: {
        name: "",
        conditionValue: "",
        signValue: "",
        value: "",
        result: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      var rules = "rule \"RULENAME\" when $map: Map(get(\"CONDITION\") SIGN VALUE) checkResult : CheckResult(); then  checkResult.setResultStr(\"RESULT\");checkResult.setPostCodeResult(true); end;";
      this.ruleForm.detailForm.forEach(element => {
        rules = rules.replace("RULENAME", element.name).replace("CONDITION", element.conditionValue).replace("SIGN", element.signValue).replace("VALUE", element.value).replace("RESULT", element.result)
      });

      rules = "package drools.rules import java.util.Map import com.mrd.drools.business.fact.CheckResult " + rules

      debugger
      reloadRule({name: this.ruleForm.name, rule: rules}).then(response => {
        this.$notify({
          title: "成功",
          message: "重载规则成功",
          type: "success",
          duration: 2000
        })
      });
    },
    resetForm(formName) {
      // this.$router.go({ name: 'tmsActivity'});
      this.$router.go(0);
    },
    addModule() {
      debugger;
      let newForm = Object.assign({}, this.blankDetailForm);

      this.ruleForm.detailForm.push(newForm);
    },
    imageUploaded(image) {
      debugger;
      this.ruleForm.imageUrl = image.url;
    },
    buildCode() {
      var rules = '';
      this.ruleForm.detailForm.forEach(element => {
        debugger
        rules = rules + "rule \"RULENAME\"  | when $map: Map(get(\"CONDITION\") SIGN VALUE) | checkResult : CheckResult(); | then  checkResult.setResultStr(\"RESULT\"); | checkResult.setPostCodeResult(true); | end; | ";

        rules = rules.replace("RULENAME", element.name).replace("CONDITION", element.conditionValue).replace("SIGN", element.signValue).replace("VALUE", element.value).replace("RESULT", element.result)
      });

      rules = "package drools.rules | import java.util.Map | import com.mrd.drools.business.fact.CheckResult | " + rules
      
      this.ruleCode = rules.split('|');
      debugger
    }
  },
  created() {
    selectUsedList({
        
      }).then(response => {
        debugger
        this.conditionOptions = response.list
      })
  }
};
</script>

<style>
.tmsDiv {
  width: 60%;
  margin: 40px;
  text-align: left;
}

.tmsAddDiv {
  margin-top: 10px;
  text-align: right;
}

.tmsDetailDiv {
  border: 1px dashed #d9d9d9;
  margin-top: 5px;
}

.tmsDetailDiv form {
  margin: 10px;
}

.sub-navbar {
  margin-top: 10px;
  /* text-align: right; */
  /* position: fixed; */
  right: 300px;
  top: 40px;
}
</style>