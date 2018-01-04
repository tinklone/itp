<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border highlight-current-row>
      <el-table-column align="center" label='编号' width="160">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="接口地址">
        <template slot-scope="scope">
          {{scope.row.api_url}}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" width="300" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求方式" width="300" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="onUpdate(scope.row.id)">修改</el-button>
          <!-- <a :href="'#/'+ scope.row.id" >修改</a> -->
          <el-button type="primary" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getApiList,deleteApi } from '@/api/project'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true

      var apiid = this.$route.query.id
      console.log('id is:'+this.$route.query.id)
      getApiList(this.listQuery).then(response => {
        this.list = response.data.items
        console.log('get data')
        this.listLoading = false
      })
    },
    onDelete(id) {
      this.listLoading = true
      deleteApi(id).then(response => {
        this.$message('success')
        this.listLoading = false
        this.fetchData()
      })

    },
    onUpdate(id) {
      var project_id = this.$route.params.project_id
      this.$router.push({name:'接口信息',params:{'project_id':project_id},query: { 'id': id }})
      //this.$router.push({name:'接口详情',params:{'project_id':project_id,'id': id }})      
      //getApiDetail(id)
    },
  }
}
</script>
