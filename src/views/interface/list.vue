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
    </el-table>
  </div>
</template>

<script>
import { getApiList } from '@/api/project'

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
      getApiList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
