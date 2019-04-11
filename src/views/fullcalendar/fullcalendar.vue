<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item >
          <el-input placeholder="姓名" v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column prop="id" label="序号" width="65">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="password" min-width="150px" label="密码">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"  width="65">
      </el-table-column>
      <el-table-column prop="adress" label="地址" width="110px">
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="120" >
      </el-table-column>
      <el-table-column prop="updateDate" label="修改时间">
      </el-table-column>
      <el-table-column prop="isDelete" label="是否删除">
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
                   background
                   :page-size="8"
                   @size-change="handleSizeChange"
                   :total="total"
                   @current-change="handleCurrentChange"
                   style="text-align:center;">
    </el-pagination>
    



    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      width="30%">
      <span>确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
  import { getList1 } from '@/api/table'
  export default {
    data() {
      return {
        tableList: [],
        listLoading: true,
        isShowEditVisible: false,
        deleteVisible: false,
        temp: {
          uid: '',
          cname: '',
          date: '',
          status: ''
        },
        total: 0,
        page: 1,
        pageSize: 8,
        status: [
          {
            statusId: 1,
            label: '连载中'
          }, {
            statusId: 0,
            label: '完结'
          }
        ],
        value: '',
        searchName: '',
        filterTableDataEnd: []
      }
    },
    created() {
      this.fetchData()
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: 'danger'
        }
        return statusMap[status]
      }
    },
    methods: {
      fetchData() {
        debugger
        this.listLoading = true
        getList1(this.listQuery).then(response => {
          const limit = 8
          const pageList = response.data.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          console.log(pageList)
          this.total = response.data.length
          this.tableList = pageList
          this.listLoading = false
        })
      },
      doFilter() {
        if (this.searchName === '') {
          debugger
          this.fetchData()
          // this.$message.warning('查询条件不能为空！')
          return
        }
        debugger
        console.log(this.searchName)
        // 每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableList.forEach((value, index) => {
          if (value.cname) {
            if (value.cname.indexOf(this.searchName) >= 0) {
              this.filterTableDataEnd.push(value)
              console.log(this.filterTableDataEnd)
            }
          }
        })
        // 页面数据改变重新统计数据数量和当前页
        this.page = 1
        this.total = this.filterTableDataEnd.length
        // 渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
      },
      clickfun(e) {
        console.log(e.target.innerText)
      },
      handleUpdate(row) {
        this.isShowEditVisible = true
        this.temp = Object.assign({}, row)
        console.log(row)
      },
      handleSizeChange(val) {
        debugger
        this.page = val
        console.log(this.page)
        this.fetchData()
      },
      handleCurrentChange(val) {
        debugger
        this.page = val
        console.log(this.page)
        this.fetchData()
      },
      currentChangePage(list) {
        let from = (this.page - 1) * this.pageSize
        const to = this.page * this.pageSize
        this.tableList = []
        for (; from < to; from++) {
          if (list[from]) {
            this.tableList.push(list[from])
          }
        }
      }
    }
  }
</script>
