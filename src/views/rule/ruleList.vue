<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称" v-model="listQuery.name">
      </el-input>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <router-link :to="'/rules/ruleInsert'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="edit">添加</el-button>
      </router-link>    
    </div>

    <el-table class="user-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{list.indexOf(scope.row) + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="名称">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" :show-overflow-tooltip=true label="规则内容">
        <template scope="scope">
          <span>{{scope.row.rule}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="code">
        <template scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="状态">
        <template scope="scope">
          <el-tag v-if="scope.row.flagDelete === 0" type="success">上线</el-tag>
          <el-tag v-else type="gray">下线</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <router-link :to="'/rules/ruleDetail/' + scope.row.id">
            <el-button size="small" type="success">修改</el-button>
          </router-link>    

          <el-button size="small" type="primary" @click="onLine(scope.row)">上线
          </el-button>

          <el-button size="small" type="danger" @click="offLine(scope.row)">下线
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo"
        :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<style>
.user-table {
  width: 100%;
  margin-top: 20px;
}
</style>


<script>
import {
  selectRuleList,
  addRule,
  updateRule,
  onLineRule,
  offLineRule
} from "@/api/rule";
import store from "@/store";

export default {
  name: "columnList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        name: null,
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      temp: {
        id: undefined,
        name: "",
        rule: "",
        status: "published"
      },
      tableKey: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      selectRuleList(this.listQuery).then(response => {
        this.list = response.list;
        this.total = response.totalCount;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.page.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page.pageNo = val;
      this.getList();
    },
    onLine(row) {
      this.$confirm("是否上线该规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          onLineRule({ id: row.id, flagDelete: 0 }).then(response => {
            this.$message({
              type: "success",
              message: "上线成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上线"
          });
        });
    },
    offLine(row) {
      this.$confirm("是否下线该规则?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          offLineRule({ id: row.id, flagDelete: 1 }).then(response => {
            this.$message({
              type: "success",
              message: "下线成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下线"
          });
        });
    }
  }
};
</script>
