<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="订单状态" v-model="searchName"></el-input>
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
      <el-table-column prop="orderNumber" label="订单号">
      </el-table-column>
      <el-table-column prop="itemCount" label="商品数量">
      </el-table-column>
      <el-table-column prop="userName" label="用户" >
      </el-table-column>
      <el-table-column label="是否需要奶箱" >
        <template slot-scope="scope">
          <span v-if="scope.row.box==0">需要</span>
          <span v-if="scope.row.box==1">不需要</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="订单总金额" >
      </el-table-column>
      <el-table-column label="订单状态" >
        <template slot-scope="scope">
          <!--<el-tag size="small" v-if="scope.row.orderStatus == 30">连载中</el-tag>-->
          <span v-if="scope.row.orderStatus==10">配送中</span>
          <span v-if="scope.row.orderStatus==20">已完成</span>
          <span v-if="scope.row.orderStatus==30">审核中</span>
          <span v-if="scope.row.orderStatus==40">审核未通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="下单时间">
      </el-table-column>
      <el-table-column prop="operation" label="操作 ">
        <template slot-scope="scope" >
          <el-button size="small" type="primary"  @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteUpdate(scope.row)">删除</el-button>
        </template>
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


    <!-- 新增编辑院校 -->
    <el-dialog title="编辑"
               :visible.sync="isShowEditVisible"
               :modal-append-to-body="false">
      <el-form label-width="160px" :model="temp" ref="dataForm" :inline="true" >
        <el-form-item label="订单号" prop="goodsName">
          <el-input v-model="temp.orderNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户" prop="brand">
          <el-input v-model="temp.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总金额" prop="type">
          <el-input v-model="temp.totalPrice" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="packager">
          <!--<el-input v-model="temp.orderStatus"></el-input>-->
          <el-select v-model="temp.orderStatus" placeholder="订单状态状态">
          <el-option v-for="item in status"
          :label="item.label"
          :value="item.statusId"
          :key="item.statusId"
          ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取消</el-button>
        <el-button type="primary" :loading="listLoading" @click="updateData" class="title1">确定</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      :modal-append-to-body="false"
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
  import { getOrderList, updateOrderInfo, deleteOrderInfo } from '@/api/table'
  export default {
    data() {
      return {
        tableList: [],
        listLoading: true,
        isShowEditVisible: false,
        deleteVisible: false,
        temp: {
          id: '',
          orderNumber: '',
          itemCount: '',
          userId: '',
          userName: '',
          box: '',
          totalPrice: '',
          orderStatus: '',
          createDate: '',
          updateDate: '',
          isDeleted: ''
        },
        total: 0,
        page: 1,
        pageSize: 10,
        status: [
          {
            statusId: 10,
            label: '配送中'
          }, {
            statusId: 20,
            label: '已完成'
          }, {
            statusId: 30,
            label: '审核中'
          }, {
            statusId: 40,
            label: '审核未通过'
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
        this.listLoading = true
        getOrderList(this.listQuery).then(response => {
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
          this.fetchData()
          // this.$message.warning('查询条件不能为空！')
          return
        }
        console.log(this.searchName)
        // 每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableList.forEach((value, index) => {
          if (value.orderStatus) {
            if (value.orderStatus.indexOf(this.searchName) >= 0) {
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
      deleteUpdate(row) {
        console.log(row)
        this.deleteVisible = true
        this.temp = Object.assign({}, row)
        // console.log(row)
      },
      submitDelete() {
        const tempData = Object.assign({}, this.temp)
        console.log(tempData)
        // console.log(this.tableList)
        deleteOrderInfo(tempData).then(() => {
          for (const v of this.tableList) {
            if (v.id === this.temp.id) {
              const index = this.tableList.indexOf(v)
              this.tableList.splice(index, 1)
              break
            }
          }
          this.deleteVisible = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        console.log(row)
        row.status = status
      },
      updateData() {
        // Object.assign复制数据
        const tempData = Object.assign({}, this.temp)
        console.log(tempData)
        updateOrderInfo(tempData).then(() => {
          for (const v of this.tableList) {
            if (v.id === this.temp.id) {
              const index = this.tableList.indexOf(v)
              this.tableList.splice(index, 1, this.temp)
              break
            }
          }
          this.isShowEditVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      handleSizeChange(val) {
        this.page = val
        console.log(this.page)
        this.fetchData()
      },
      handleCurrentChange(val) {
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
