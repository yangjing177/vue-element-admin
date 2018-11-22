
<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="序号" prop="uid">
      <el-select v-model="ruleForm.uid" placeholder="请选择序号">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
        <el-option label="6" value="6"></el-option>
        <el-option label="7" value="7"></el-option>
        <el-option label="8" value="8"></el-option>
        <el-option label="9" value="9"></el-option>
        <el-option label="10" value="10"></el-option>
        <el-option label="11" value="11"></el-option>
        <el-option label="12" value="12"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="作者" prop="cname">
        <el-input v-model="ruleForm.cname"></el-input>
      </el-form-item>
      <el-form-item label="书名" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="阅读量" prop="number">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
    <el-form-item label="上架时间" required>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <!--<el-col class="line" :span="2">-</el-col>-->
      <!--<el-col :span="11">-->
        <!--<el-form-item prop="date2">-->
          <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>-->
        <!--</el-form-item>-->
      <!--</el-col>-->
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="ruleForm.status"></el-switch>
    </el-form-item>
    <el-form-item label="销售点" prop="space">
      <el-checkbox-group v-model="ruleForm.space">
        <el-checkbox label="淘宝" name="type"></el-checkbox>
        <el-checkbox label="京东" name="type"></el-checkbox>
        <el-checkbox label="当当网" name="type"></el-checkbox>
        <el-checkbox label="新东方图书网" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="书籍类型" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio label="网络小说"></el-radio>
        <el-radio label="世界名著"></el-radio>
        <el-radio label="诗集"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="书籍简介" prop="introduce">
      <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
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
            { required: true, message: '请输入书名', trigger: 'change' }
          ],
          number: [
            { number: 'date', required: true, message: '请输入阅读量', trigger: 'change' }
          ],
          date: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          // status: [
          //   { status: 'date', required: true, message: '请选择状态', trigger: 'change' }
          // ],
          space: [
            { required: true, message: '请至少选择一个销售点', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择书籍类型', trigger: 'change' }
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


