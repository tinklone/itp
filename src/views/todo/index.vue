<template>
  <div class="app-container">
    <el-row :gutter="20">
			<el-col :span="9">
				<todo-list></todo-list>
			</el-col>
		</el-row>
  </div>
</template>

<script>

import todoList from '@/components/TodoList'
export default {
  name: 'dashboard-admin',
  components: { todoList},
  data() {
    return {
      }
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
</style>

