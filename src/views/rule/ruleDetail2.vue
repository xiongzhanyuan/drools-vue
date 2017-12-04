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
        <div style="position:fixed; top:0px; left:70%; width:100%; height:100%; background: #2b2b2b; font-size: 20px;color: darkorange;">
            <draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> 
                <transition-group type="transition" :name="'flip-list'">
                  <li class="list-group-item" v-for="element in list" :key="element.order"> 
                    {{element.name}}
                  </li> 
                </transition-group>
            </draggable>
        </div>


        <el-col :md="4" class="tmsDiv">
            

            <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove"> 
              <transition-group name="no" class="list-group" tag="ul">
                <li class="list-group-item" v-for="element in list2" :key="element.order"> 
                  {{element.name}}
                </li> 
              </transition-group>
          </draggable>
            
        </el-col>
    </el-row>
</template>


<script>
import UploadAll from "@/views/common/uploadAll";
import draggable from 'vuedraggable'
import {
  reloadRule, selectUsedList
} from "@/api/rule";
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]

const message2 = [ 'Sortablejs' ]

export default {
  name: 'hello',
  components: {
    draggable
  },
  data() {
    return {
      list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
      list2:message2.map( (name,index) => {return {name, order: index+1, fixed: false}; }),
      editable:true,
      isDragging: false,
      delayedDragging:false,
      conditionOptions: [],
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
    }
  },
  computed: {
    dragOptions () {
      return  {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    listString(){
      debugger
      return JSON.stringify(this.list, null, 2);  
    },
    list2String(){
      debugger
      return JSON.stringify(this.list2, null, 2);  
    }
  },
  methods: {
    onMove ({relatedContext, draggedContext}) {
      debugger
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  created() {
    selectUsedList({
        
      }).then(response => {
        debugger
        this.conditionOptions = response.list
      })
  },
  watch: {
    isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    }
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