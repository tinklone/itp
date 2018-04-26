<template>
  <div class="app-container">
    <div class="filter-container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item @click="showPage" index="1">接口测试</el-menu-item>
        <el-menu-item @click="showPage" index="2">其他测试</el-menu-item>
      </el-menu>
      <div id="showPortId" style="display: block;">
      <div>
      <!-- <el-input v-model="ques" style="width: 200px;" placeholder="所有接口" size="mini"></el-input> -->
      <el-select size="mini" v-model="portName" placeholder="所有接口">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select size="mini" v-model="caseCls" placeholder="所属类型">
        <el-option v-for="item in caseList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="ques" style="width: 200px;" placeholder="用例名称/创建人" size="mini"></el-input>
      <el-button @click='searchTo' type="primary" icon="el-icon-search" size="mini" plain="" >搜索</el-button>
      <el-button @click='toCase("")' type="primary" size="mini" round style="margin-left:200px;" icon="el-icon-circle-plus-outline">添加用例</el-button>
      <el-button type="primary" @click="deletenames" size="mini" style="color:white；margin-left:200px;"  round >批量删除</el-button>
    </div>
    <div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border highlight-current-row
      :default-sort = "{prop: 'id', order: 'ascending'}"
      @selection-change="handleSelectionChange"   
      @row-click="handleclick"
      :row-class-name = "tableRowClassName"
      >
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column align="center" label='编号' >
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">
          {{scope.row.caseName}}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.portName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="步骤数" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.stepNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务数" align="center">
        <template slot-scope="scope">
          <span>10</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.user}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">  
          <el-button-group>        
          <el-button type="primary" size="mini" @click='toInter(scope.row.id)' icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" @click='removeRow(scope.row.id)' icon="el-icon-delete"></el-button>
          </el-button-group>
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
    <div align="center" class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount" background="true" total-text="共" prev-text="上一页" next-text="下一页">
    </el-pagination>
  </div>
  </div> 
  </div>
  </div>
  </div>
</template>

<script>
import { getApiList,deleteapi } from '@/api/project';
import { getPageList } from '@/api/interface'
import { getCaseValue } from '@/api/table'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      activeIndex:'接口测试',
      portName:'',
      caseCls:'',
      ques:'',
      listAf: [],
      ques:null,
      pagesize: 10,
      highlightId: -1,
      para_type:[],
      //多选数组
      multipleSelection: [],
      options: [
        {
          value: '0',
          label: '接口A'
        },
        {
          value: '1',
          label: '接口B'
        },
        {
          value: '2',
          label: '接口C'
        }],
        caseList: [
        {
          value: '0',
          label: '冒烟'
        },
        {
          value: '1',
          label: '单步骤'
        },
        {
          value: '2',
          label: '多步骤'
        }],
      //搜索条件
      criteria: '',

      //下拉菜单选项
      select: '',

      //默认每页数据量
      pagesize: 10,

      //默认高亮行数据id
      highlightId: -1,

      //当前页码
      currentPage: 1,

      //查询的页码
      start: 1,

      //默认数据总数
      totalCount: 0,
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
      getCaseValue().then(response => {
        console.log('---dsadas',response)
        this.list = response.data.items
        // this.form = response.data
        this.listLoading = false
        })    
    },
    toCase(id){
      var project_id = this.$route.params.project_id
      // this.$router.replace({name:'接口信息',params:{'project_id':project_id}})
      this.$router.push({name:'添加用例',params:{'project_id':project_id},query: { 'id': id }})
      // console.log('---id = ',id)
      // getInterInfo(id).then(response => {
      //   console.log('---dsadas',response.data)
      //   this.form = response.data
      //   this.listLoading = false
      // })
    },
    removeRow(id){
      console.log("--id = ",id)
      var array = []
      array.push(id)
      deleteapi(array).then(response => {
        console.log(response.message)
        this.$message(response.message);
        this.fetchData(this.criteria,this.currentPage,this.pagesize);
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
    //多项删除
    deletenames: function(){
        if(this.multipleSelection.length==0){
          this.$message('请先勾选至少一项')
          return;
        }     
        console.log('this.multipleSelection = ',this.multipleSelection)     
        var array = [];
        this.multipleSelection.forEach((item) => {
          console.log('item.id = ',item.id)
            array.push(item.id);
        })
        deleteapi(array).then(response => {
        console.log(response.message)
        this.$message(response.message);
        this.fetchData(this.criteria,this.currentPage,this.pagesize);
      })
    },
    //多选响应
    handleSelectionChange: function(val) {
        this.multipleSelection = val;
    },
    //点击行响应
    handleclick: function(row, event, column){
        this.highlightId = row.id;
    },
    //改变当前点击的行的class，高亮当前行
    tableRowClassName: function(row, index){
        if(row.id == this.highlightId)
        {
          return 'info-row';
        }
    },
      //每页显示数据量变更
    handleSizeChange: function(val) {
        this.pagesize = val;
        console.log('pagesize = ',this.pagesize)
        this.fetchData(this.ques,this.currentPage,this.pagesize)
    },

    //页码变更
    handleCurrentChange: function(val) {
        this.currentPage = val;
        console.log('currentPage = ',this.currentPage)
        this.fetchData(this.ques,this.currentPage,this.pagesize)
    }, 
    searchTo: function() {
        this.fetchData(this.ques,this.currentPage,this.pagesize)
    }, 
    showPage: function() {
        document.getElementById('showPortId').style.display=''
    }, 
  }
}
</script>
