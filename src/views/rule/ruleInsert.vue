<template>
    <div style="background:#F4E2C9;height:100%;width:100%;"> 
        <div class="sub-navbar">
            <div>
                <el-button style="margin-left: 10px;" type="success" @click="release()">发布规则
                </el-button>
                <el-button type="warning" @click="addModule()">添加规则模板</el-button>
                <el-button  @click="buildCode()">生成规则代码(开发人员使用)</el-button>
            </div>
        </div>
        <el-row>
        <div style="width: 60%; float: left; margin-top: 30px">
            <div class='condition-list' v-for="(item, index) in ruleForm" :key="item + ''">
                <h3>规则 {{index + 1}}</h3>
                <draggable element="ul" v-model="ruleForm[index]" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> 
                    <transition-group :name="'flip-list'" class="rule-class" type="transition" tag="ul">
                        <li class="list-group-item" v-for="element in item" :key="element.name"> 
                            {{element.name}}
                        </li>
                    </transition-group>
                </draggable>
            </div>
        </div>
        
        <div  style="width:30%;display:inline-block; float: right">

            <div class='component-list'>
            <h3>输入值</h3>
            <el-input style="width: 80%; margin: 0 0 20px 20px;" v-model="inputStr" @keyup.enter.native="changeInputStr"></el-input>
            <draggable element="span" v-model="inputValueOptions" :options="dragOptions" :move="onMove"> 
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in inputValueOptions" :key="element.name"> 
                        {{element.name}}
                    </li>
                </transition-group>
            </draggable>
            </div>

            <div class='component-list'>
            <h3 @click="showConditionList()">条件列表</h3>
            <div v-show="conditionShow">
            <draggable element="span" v-model="conditionOptions" :options="dragOptions" :move="onMove"> 
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in conditionOptions" :key="element.name"> 
                        {{element.name}}
                    </li>
                </transition-group>
            </draggable>
            </div>
            </div>

            <div class='component-list'>
            <h3 @click="showSignList()">运算符</h3>
            <div v-show="signShow">
            <draggable element="span" v-model="signOptions" :options="dragOptions" :move="onMove"> 
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in signOptions" :key="element.name"> 
                        {{element.name}}
                    </li>
                </transition-group>
            </draggable>
            </div>
            </div>

            <div class='component-list'>
            <h3 @click="showResultList()">结果</h3>
            <div v-show="resultShow">
            <draggable element="span" v-model="resultOptions" :options="dragOptions" :move="onMove"> 
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in resultOptions" :key="element.name"> 
                        {{element.name}}
                    </li>
                </transition-group>
            </draggable>
            </div>
            </div>
        </div>
        </el-row>


        <el-dialog title="确认" :visible.sync="dialogFormVisible" :before-close="handleClose">
          <el-form class="small-space" :model="temp" ref="temp" label-position="left" label-width="160px" style='width: 400px; margin-left:50px;'>

            <el-form-item label="规则名称">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>

            <el-form-item label="规则编码（英文唯一）">
              <el-input v-model="temp.code"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('temp')">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确定</el-button>
          </div>
        </el-dialog>


    </div>
            
</template>


<script>
import UploadAll from "@/views/common/uploadAll";
import draggable from "vuedraggable";
import { reloadRule, selectConditionList, selectResultList, addRule, updateRule } from "@/api/rule";

export default {
  name: "hello",
  components: {
    draggable
  },
  data() {
    return {
      conditionShow: true,
      signShow: true,
      resultShow: true,
      ruleForm: [],
      ruleList: [],
      inputStr:'',
      inputValueOptions: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      conditionOptions: [],
      resultOptions: [],
      signOptions: [
        {
          type: "sign",
          name: ">",
          data:">"
        },
        {
          type: "sign",
          name: ">=",
          data: ">="
        },
        {
          type: "sign",
          name: "<",
          data: "<"
        },
        {
          type: "sign",
          name: "<=",
          data: "<="
        },
        {
          type: "sign",
          name: "==",
          data: "=="
        },
        {
          type: "sign",
          name: "!=",
          data: "!="
        },
        {
          type: "sign",
          name: "!=",
          data: "!="
        },
        {
          type: "sign",
          name: "||",
          data: "||"
        },
        {
          type: "sign",
          name: "&&",
          data: "&&"
        },
        {
          type: "sign",
          name: "包含",
          data: "contains"
        },
        {
          type: "sign",
          name: "不包含",
          data: "not contains"
        }
      ],
      dialogFormVisible: false,
      temp: {
        name: '',
        code: '',
        rule: '',
        content: ''
      },
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: { name: "descriptio", pull: "clone" },
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    handleClose() {
      this.resetForm('temp')
      this.dialogFormVisible = false
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
    showConditionList() {
      this.conditionShow = !this.conditionShow
    },
    showSignList() {
      this.signShow = !this.signShow
    }, 
    showResultList() {
      this.resultShow = !this.resultShow
    },
    changeInputStr() { 
      debugger
      this.inputValueOptions.push({type: "value", name: this.inputStr, data: this.inputStr})
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    addModule() {
      debugger;
      this.ruleForm.push(this.ruleList);
    },
    buildCode() {
      var rules = '';
      this.ruleForm.forEach((element, index) => {
        debugger
        rules = rules + " rule ruleName" + index;
        rules = rules + " when $map: ";
        var condition = element.slice(0, element.length - 1);
        var result = element.slice(element.length - 1, element.length);
        condition.forEach((conditionElement, conditionIndex) => {
          if (conditionIndex % 3 == 0) {
            rules = rules + " Map(get(" + conditionElement.data + ") "
          } else {
            rules = rules + " " + conditionElement.data
          }
        })
        rules = rules + " checkResult : CheckResult(); "
        rules = rules + " then checkResult.setResultStr(" + result[0].data + "); "
      });

      rules = "package drools.rules import java.util.Map import com.mrd.drools.business.fact.CheckResult " + rules
      
      debugger
    },
    release() {
      this.dialogFormVisible = true
    },
    submitForm() {
      var rules = '';
      this.ruleForm.forEach((element, index) => {
        debugger
        rules = rules + " rule ruleName" + index;
        rules = rules + " agenda-group \"" + this.temp.code +"\" ";
        rules = rules + " when $map: ";
        var condition = element.slice(0, element.length - 1);
        var result = element.slice(element.length - 1, element.length);
        condition.forEach((conditionElement, conditionIndex) => {
          if (conditionElement.type == "condition") {
            rules = rules + " Map(get(\"" + conditionElement.data + "\") "
          } else if (conditionElement.type == "sign"){
            rules = rules + " " + conditionElement.data
          } else if (conditionElement.type == "value") {
            rules = rules + " \"" + conditionElement.data + "\")"
          }
        })
        rules = rules + " checkResult : CheckResult(); "
        rules = rules + " then checkResult.setResultStr(\"" + result[0].data + "\"); "
        rules = rules + " checkResult.getResultList().add(drools.getRule().getName()); "
        rules = rules + " end; "
      });

      rules = "package drools.rules import java.util.Map import com.mrd.drools.business.fact.CheckResult " + rules
      this.temp.rule = rules
      this.temp.content = JSON.stringify(this.ruleForm)
      debugger
      reloadRule(this.temp).then(response => {
        debugger
        this.resetForm('temp')
        this.dialogFormVisible = false
        this.$notify({
          title: "成功",
          message: "重载规则成功",
          type: "success",
          duration: 2000
        })
        this.$router.push({path:'/rules/ruleList'})
      });
    },
  },
  created() {
    selectConditionList({}).then(response => {
      this.conditionOptions = response.list;
      this.conditionOptions.forEach(element => {
        element.type = "condition"
      })
    });
    selectResultList({}).then(response => {
      this.resultOptions = response.list;
      this.resultOptions.forEach(element => {
        element.type = "result"
      })
    });
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
.list-group {
  /* width: 100px; */
  /* padding: 20px 0;
    max-width: 360px;
    margin-top: -8px;
    margin-left: 5px;
    background-color: #fff; */
  // height: auto;
  line-height: 30px;
}
.rule-class {
      // padding: 20px 0;
    // max-width: 360px;
    // background-color: #fff;
    // height: 100px;
    min-height: 100px;
    display: flow-root;
}
.component-list {
  background: #fff;
  list-style: none;
  width: 300px;
  line-height: 1.5;

  h3 {
    padding: 3px 10px;
    color: #fff;
    background: #ff7373;
    position: relative;
    top: -10px;
    left: -10px;
    width: 100px;
  }
  li {
    list-style: none;
    
  }
}

.condition-list {
  background: #fff;
  list-style: none;
  line-height: 1.5;

  h3 {
    padding: 3px 10px;
    color: #fff;
    background: #ff7373;
    position: relative;
    top: -20px;
    left: -10px;
    width: 100px;
  }
  li {
    color: #fff;
    float: left;
    margin: 8px 20px 10px 0;
    padding: 5px 10px;
    min-width: 10px;
    background-color: #5F9EDF;
    text-align: center;
  }
}
</style>