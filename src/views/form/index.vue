
<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col>
      <el-form-item label="序号" prop="uid">
        <el-input v-model="ruleForm.uid" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="商品名" prop="goodsName">
        <el-input v-model="ruleForm.goodsName" style="width: 300px"></el-input>
      </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="ruleForm.number" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="parentType">
        <el-input v-model="ruleForm.parentType" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="ruleForm.brand" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="种类" prop="type">
        <el-input v-model="ruleForm.type" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="包装" prop="packager">
        <el-input v-model="ruleForm.packager" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="容量" prop="size">
        <el-input v-model="ruleForm.size" style="width: 300px"></el-input>
      </el-form-item>
    <!--<el-form-item label="上架时间" required>-->
      <!--<el-col :span="5">-->
        <!--<el-form-item prop="date">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>-->
        <!--</el-form-item>-->
      <!--</el-col>-->
      <!--&lt;!&ndash;<el-col class="line" :span="2">-</el-col>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-col :span="11">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-form-item prop="date2">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
    <!--</el-form-item>-->

      <!--<el-form-item label="状态" prop="status">-->
        <!--<el-select v-model="ruleForm.status" placeholder="请选择状态">-->
          <!--<el-option label="连载中" value="1"></el-option>-->
          <!--<el-option label="已完结" value="2"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->

    <!--<el-form-item label="销售点" prop="space">-->
      <!--<el-checkbox-group v-model="ruleForm.space">-->
        <!--<el-checkbox label="淘宝" name="type"></el-checkbox>-->
        <!--<el-checkbox label="京东" name="type"></el-checkbox>-->
        <!--<el-checkbox label="当当网" name="type"></el-checkbox>-->
        <!--<el-checkbox label="新东方图书网" name="type"></el-checkbox>-->
      <!--</el-checkbox-group>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="书籍类型" prop="type">-->
      <!--<el-radio-group v-model="ruleForm.type">-->
        <!--<el-radio label="网络小说"></el-radio>-->
        <!--<el-radio label="世界名著"></el-radio>-->
        <!--<el-radio label="诗集"></el-radio>-->
      <!--</el-radio-group>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="书籍简介" prop="introduce">-->
      <!--<el-input type="textarea" v-model="ruleForm.introduce"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
      <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
      <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
    <!--</el-form-item>-->
</el-form>
  </div>
</template>
<script>
  import { addTable } from '@/api/table'
  export default {
    data() {
      return {
        ruleForm: {
          uid: '',
          cname: '',
          title: '',
          number: '',
          date: '',
          status: '',
          space: [],
          type: '',
          introduce: ''
        },
        rules: {
          uid: [
            { required: true, message: '请选择序号', trigger: 'blur' }
          ],
          cname: [
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入书名', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ],
          // status: [
          //   { status: 'date', required: true, message: '请选择状态', trigger: 'change' }
          // ],
          space: [
            { required: true, message: '请至少选择一个销售点', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择书籍类型', trigger: 'blur' }
          ],
          inttroduce: [
            { required: true, message: '请填写书籍简介', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            addTable(this.ruleForm)
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>


