<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="项目名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="项目类型">
    <el-select v-model="form.region" placeholder="请选择项目类型">
      <el-option label="移动端" value="app"></el-option>
      <el-option label="PC" value="pc"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2" align="center">-</el-col>
    <el-col :span="11">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="项目角色">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="管理员" name="type"></el-checkbox>
      <el-checkbox label="开发人员" name="type"></el-checkbox>
      <el-checkbox label="测试人员" name="type"></el-checkbox>
      <el-checkbox label="运维" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="项目说明">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button @click="dialogFormVisible = false" >取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { getInfo } from "@/api/project";
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getInfo(this.$route.params.project_id).then(response => {
        this.form = response.data;
        this.listLoading = false;
      });
    },
    onSubmit() {
      this.$message('sucess!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

