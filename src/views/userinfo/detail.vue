<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="用户名 :">
        <el-input v-model="form.token"></el-input>
      </el-form-item>
      <el-form-item label="用户真实姓名 :">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱 :">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="用户角色 :">
        <el-checkbox-group v-model="form.role">
          <el-checkbox label="管理员" name="role"></el-checkbox>
          <el-checkbox label="开发人员" name="role"></el-checkbox>
          <el-checkbox label="测试人员" name="role"></el-checkbox>
          <el-checkbox label="运维" name="role"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用户权限 :">
        <el-checkbox-group v-model="form.permission">
          <el-checkbox label="项目1" name="permission"></el-checkbox>
          <el-checkbox label="项目2" name="permission"></el-checkbox>
          <el-checkbox label="项目3" name="permission"></el-checkbox>
          <el-checkbox label="项目4" name="permission"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="addApi">修改用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInfo } from '@/api/login'
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
				desc: '',
			},
			listLoading: true,
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		fetchData() {
      this.listLoading = true
			getInfo(this.$route.query.token).then(response => {
				this.form = response.data
				this.listLoading = false
			})
		},
		onSubmit() {
			this.$message('sucess!')
		},
		addApi() {
      var project_id = this.$route.params.project_id
			this.$router.replace({ name: 'api', params: { project_id: project_id }});
		},
	},
}
</script>

<style scoped>
.line {
	text-align: center;
}
</style>

