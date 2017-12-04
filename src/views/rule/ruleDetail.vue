<template>
    <div style="background:#F4E2C9;height:100%;width:100%;"> 
        <div class="sub-navbar">
            <div>
                <el-button style="margin-left: 10px;" type="success" @click="submitForm()">发布规则
                </el-button>
                <el-button type="warning" @click="addModule()">添加规则模板</el-button>
                <el-button  @click="buildCode()">生成规则代码(开发人员使用)</el-button>
            </div>
        </div>
        <el-row>
        <div style="width: 50%; float: left" :md='6'>
            <!-- <h3>规则模板</h3>
            <draggable element="ul" v-model="list2" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> 
                <transition-group class="list-group" type="transition" :name="'flip-list'">
                  <span class="list-group-item" v-for="element in list2" :key="element.id"> 
                    {{element.name}}
                  </span> 
                </transition-group>
            </draggable> -->
            <div >
                <h3>组件列表</h3>
                <draggable element="span" v-model="list2" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false"> 
                    <transition-group :name="'flip-list'" class="list-group" type="transition" tag="ul">
                        <span class="list-group-item" v-for="element in list2" :key="element.id"> 
                            {{element.name}}
                        </span>
                    </transition-group>
                </draggable>
            </div>
            
        </div>

        <div  style="" :md='4'>
            <div class='component-list'>
            <h3>组件列表</h3>
            <draggable element="span" v-model="list" :options="dragOptions" :move="onMove"> 
                <transition-group name="no" class="list-group" tag="ul">
                    <li class="list-group-item" v-for="element in list" :key="element.id"> 
                        {{element.name}}
                    </li>
                </transition-group>
            </draggable>


            </div>
            
        </div>
        </el-row>
    </div>
            
</template>


<script>
import UploadAll from "@/views/common/uploadAll";
import draggable from "vuedraggable";
import { reloadRule, selectUsedList } from "@/api/rule";
// const message = [
//   "vue.draggable",
//   "draggable",
//   "component",
//   "for",
//   "vue.js 2.0",
//   "based",
//   "on",
//   "Sortablejs"
// ];

// const message2 = ["Sortablejs"];

export default {
  name: "hello",
  components: {
    draggable
  },
  data() {
    return {
      list: [],
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
      conditionOptions: [],
      signOptions: [
        {
          value: ">",
          label: ">"
        },
        {
          value: ">=",
          label: ">="
        },
        {
          value: "<",
          label: "<"
        },
        {
          value: "<=",
          label: "<="
        },
        {
          value: "==",
          label: "=="
        },
        {
          value: "!=",
          label: "!="
        },
        {
          value: "!=",
          label: "!="
        },
        {
          value: "包含",
          label: "contains"
        },
        {
          value: "不包含",
          label: "not contains"
        }
      ]
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
    },
    listString() {
      return JSON.stringify(this.list, null, 2);
    },
    list2String() {
      return JSON.stringify(this.list2, null, 2);
    }
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  created() {
    selectUsedList({}).then(response => {
      this.conditionOptions = response.list;
      this.list = response.list;
      //   this.list2 = response.list;
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
  height: 100px;
}
.component-list {
  background: #fff;
  list-style: none;
   
   
   
  h3 {
      padding: 3px 10px;
      color:#fff;
    background: #FF7373;
    position: relative;
    top: -10px;
    left: -10px;
    width: 100px;
  }
  li {
      list-style: none;
  }
}
</style>