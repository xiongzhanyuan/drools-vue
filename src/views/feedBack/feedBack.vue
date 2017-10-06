<template>
    <div class="app-container">
        <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="export2Excel">导出excel</el-button>

        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键字" v-model="listQuery.content">
            </el-input>

            <el-select v-model="listQuery.type" placeholder="类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span class="demonstration">开始时间</span>
            <el-date-picker v-model="listQuery.startTime" type="datetime" placeholder="选择开始时间">
            </el-date-picker>

            <span class="demonstration">结束时间</span>
            <el-date-picker v-model="listQuery.endTime" type="datetime" placeholder="选择结束时间">
            </el-date-picker>

            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
        </div>

        <el-table class="feed-table" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>

            <el-table-column align="center" label="序号" width="65">
                <template scope="scope">
                    <span>{{list.indexOf(scope.row) + 1}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="用户昵称">
                <template scope="scope">
                    <span>{{scope.row.nickName}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="60px" label="类型">
                <template scope="scope">
                    <span v-if="1 == scope.row.type">意见</span>
                    <span v-if="2 == scope.row.type">投诉</span>
                    <span v-if="3 == scope.row.type">好评</span>
                </template>
            </el-table-column>

            <el-table-column min-width="150px" :show-overflow-tooltip=true label="内容" >
                <template scope="scope">
                    <span>{{scope.row.content}}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="150px" label="反馈时间">
                <template scope="scope">
                    <el-tag>{{scope.row.createTime | formatDate}}</el-tag>
                </template>
            </el-table-column>

            <!-- <el-table-column align="center" label="操作" width="150">
                                            <template scope="scope">
                                                <el-button size="small" type="success" @click="getInfo(scope.row)">查看
                                                </el-button>
                                            </template>
                                        </el-table-column> -->

        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page.pageNo" :page-sizes="[10,20,30,50]" :page-size="listQuery.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<style>
.feed-table {
    width: 100%;
    margin-top: 20px
}
</style>


<script>
import { getFeedBackList, getFeedBackInfo } from '@/api/feedBack'
import { formatDate } from '@/utils/date.js';

export default {
    name: 'feedList',
    data() {
        return {
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                content: null,
                type: null,
                startTime: null,
                endTime: null,
                page: {
                    pageNo: 1,
                    pageSize: 10
                }
            },
            tableKey: 0,
            options: [{
                value: 1,
                label: '意见'
            }, {
                value: 2,
                label: '投诉'
            }, {
                value: 3,
                label: '好评'
            }],
            value: ''
        }
    },
    created() {
        this.getList()
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh : mm : ss');
        }
    },
    methods: {
        getList() {
            this.listLoading = true
            const temp = Object.assign({}, this.listQuery)
            if (temp.startTime) {
                temp.startTime = this.listQuery.startTime.getTime()
            }

            if (temp.endTime) {
                temp.endTime = this.listQuery.endTime.getTime()
            }
            getFeedBackList(temp).then(response => {
                this.list = response.list
                this.total = response.totalCount
                this.listLoading = false
            })
        },
        handleFilter() {
            this.getList()
        },
        handleSizeChange(val) {
            this.listQuery.page.pageSize = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page.pageNo = val
            this.getList()
        },
        export2Excel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../vendor/Export2Excel');
                const tHeader = ['序号', '用户昵称', '类型', '内容', '反馈时间'];
                const filterVal = ['id', 'nickName', 'typeName', 'content', 'createTimeStr'];
                const list = this.list
                debugger
                list.forEach(item => {
                    if (1 === item.type) {
                        item.typeName = '意见'
                    } else if (2 === item.type) {
                        item.typeName = '投诉'
                    } else if (3 === item.type) {
                        item.typeName = '好评'
                    }
                    var date = new Date(item.createTime);
                    item.createTimeStr = formatDate(date, 'yyyy-MM-dd hh : mm : ss');
                })
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '列表excel');
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }
}
</script>
