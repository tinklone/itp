<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="ques" style="width: 200px;" placeholder="接口名称/请求地址" size="mini"></el-input>
      <el-button @click='search' type="primary" icon="search" size="mini" plain="">搜索</el-button>
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
      <el-table-column label="用例数量" width="160" align="center">
        <template slot-scope="scope">
          <span>10</span>
        </template>
      </el-table-column>
      <el-table-column label="是否覆盖" width="160" align="center">
        <template slot-scope="scope">
          <span>是</span>
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
      </el-table-column> -->
      <el-table-column label="接口类型" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="接口说明" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click='removeRow(scope.row.id)' plain>删除</el-button>
          <el-button type="primary" size="mini" @click='toInter(scope.row.id)' plain>编辑</el-button>
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
    </el-table>
  </div> 
  <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import { getApiList,deleteapi } from '@/api/project'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listAf: [],
      ques:null,
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
    },
    search(){
      location.reload
      this.listLoading = true
      //location.reload();
      var myArray=new Array()
      getApiList(this.listQuery).then(response => {
        console.log('xxx',response.data.items)
        myArray = response.data.items
        //this.listLoading = false
        
        console.log('2myArray = ',myArray)
        if (this.ques){
          this.listAf = []
          for (var i in myArray){
            console.log('i = ',myArray[i])
            console.log('this.ques = ',this.ques)
            console.log('myArray[i] = ',myArray[i]['api_url'],myArray[i]['api_name'])
      // if (this.ques == myArray[i]['api_url'] || this.ques == myArray[i]['api_name'])
            if (myArray[i]['api_url'].indexOf(this.ques)>-1 || myArray[i]['api_name'].indexOf(this.ques)>-1 )
            this.listAf.push(myArray[i])
          }
        this.list = this.listAf
        }
        else{
          this.list = myArray
        }
       
      console.log('this.listAf = ',this.listAf)
      
      this.listLoading = false
      })
    },
  }
}
</script>
