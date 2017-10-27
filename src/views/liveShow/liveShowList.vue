<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.name">
      </el-input>

      <span class="demonstration">开始时间</span>
      <el-date-picker v-model="listQuery.startTime" type="date" placeholder="选择开始时间">
      </el-date-picker>

      <span class="demonstration">结束时间</span>
      <el-date-picker v-model="listQuery.endTime" type="date" placeholder="选择结束时间">
      </el-date-picker>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <router-link :to="'/live/liveShowInsert'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="edit">添加</el-button>

      </router-link>
    </div>

    <el-table class="tms-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>

      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{list.indexOf(scope.row) + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="标题">
        <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="开始时间">
        <template scope="scope">
          <span>{{scope.row.startTime | formatDate}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="结束时间">
        <template scope="scope">
          <span>{{scope.row.endTime | formatDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <router-link :to="'/live/liveShowEdit/' + scope.row.id">
            <el-button size="small" type="success">修改
            </el-button>
          </router-link>
          <el-button si <el-button size="small" type="danger" @click="messageBox(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo" :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<style>
.tms-table {
  width: 100%;
  margin-top: 20px;
}
</style>


<script>
import {
  fetchLiveShowList,
  getLiveShowInfo,
  addLiveShowInfo,
  updateLiveShowInfo,
  deleteLiveShowInfo
} from "@/api/live";
import { formatDate } from "@/utils/date.js";

export default {
  name: "liveShowList",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        name: null,
        startTime: null,
        endTime: null,
        page: {
          pageNo: 1,
          pageSize: 10
        }
      },
      tableKey: 0,
      textMap: {
        update: "编辑",
        create: "创建"
      }
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatDate(time) {
      if (!!time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      const temp = Object.assign({}, this.listQuery);
      if (temp.startTime) {
        temp.startTime = this.listQuery.startTime.getTime();
      }

      if (temp.endTime) {
        temp.endTime = this.listQuery.endTime.getTime();
      }
      fetchLiveShowList(temp).then(response => {
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
    messageBox(row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLiveShowInfo({ id: row.id, flagDelete: 1 }).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    test(var1, var2) {
      var b = true;
      var str = var2.split("*");
      str.forEach((v, i) => {
        if (v !== "" && var1.search(v) != var2.search(v)) {
          b = false;
          alert(b);
        }
      });
    }
  }
};
</script>
