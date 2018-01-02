<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" placeholder="接口名称/请求地址" size="mini"></el-input>
      <el-button type="primary" icon="search" size="mini" plain="">搜索</el-button>
      <el-button @click='toInter("")' type="primary" style="margin-left:600px;">添加接口</el-button>
    </div>
    <div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border highlight-current-row>
      <el-table-column align="center" label='编号' width="160">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="接口地址" align="center">
        <template slot-scope="scope">
          {{scope.row.api_url}}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求方式" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="测试用例数" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试任务数" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column>
      <el-table-column label="接口状态" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否覆盖" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.api_method}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click='removeRow(scope.row.id)' plain>删除</el-button>
          <!-- <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-button type="primary" size="mini" plain>操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>编辑</el-dropdown-item>
              <el-dropdown-item @click='removeRow($scope.row.id)' divided>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->          
        </template>
        </el-table-column>
        <el-table-column label="操作1" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click='toInter(scope.row.id)' plain>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div> 
  </div>
</template>

<script>
import { getApiList,deleteapi } from '@/api/project'
import { getInterInfo } from '@/api/interface'

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
      location.reload
      this.listLoading = true
      //location.reload();
      getApiList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    toInter(id){
      var project_id = this.$route.params.project_id
      // this.$router.replace({name:'接口信息',params:{'project_id':project_id}})
      this.$router.push({name:'接口信息',params:{'project_id':project_id},query: { 'id': id }})
      // console.log('---id = ',id)
      // getInterInfo(id).then(response => {
      //   console.log('---dsadas',response.data)
      //   this.form = response.data
      //   this.listLoading = false
      // })
    },
    removeRow(id){
      deleteapi(id).then(response => {
        console.log(response.message)
        this.$message(response.message);
        this.fetchData();
      })
    },
    removes(index){
      location.reload
      this.listLoading = true
      console.log('index = ',index)
      getApiList(this.listQuery).then(response => {
        console.log(response.data.items)
        this.list = response.data.items.splice(index,1)
        this.listLoading = false
      })
    }
  }
}
</script>
