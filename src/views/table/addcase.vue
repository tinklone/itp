<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item prop="caseName" label="用例名称:">
        <input class="" v-model="form.caseName" autofocus autocomplete="off" placeholder="case name" size="30">
      </el-form-item>
      <div>
      <el-select class="wid" size="mini" v-model="form.agreement">
        <el-option label="http" value="1" selected></el-option>
        <el-option label="https" value="2"></el-option>
      </el-select>
      <span>&nbsp;://&nbsp;&nbsp;</span>
      <el-input v-model='form.domainName' size='mini' class='inputWid' placeholder='域名:端口'></el-input>  
      <el-input v-model='form.portName' size='mini' class='inputWid' placeholder='接口地址'></el-input>  
      <el-select class="wid" size="mini" v-model="form.requestCls">
        <el-option label="get" value="1" selected></el-option>
        <el-option label="post" value="2"></el-option>
      </el-select>
    <el-button @click="dialogFormVisible1 = true" type="primary" size="mini" round style="margin-left:1px;" icon="el-icon-circle-plus-outline">添加步骤</el-button>
    </div>
      <el-table :data="tableData" class="tb-edit" style="width: 80%" highlight-current-row @row-click="handleCurrentChange">
        <el-table-column label="步骤" width="180">
          <template slot-scope="scope">
            <!-- <el-input size="small" v-model="scope.row.step" placeholder="步骤数"></el-input> -->
            {{scope.row.stepId}}
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
              {{scope.row.name}}
            <!-- <el-input size="small" v-model="scope.row.name" placeholder="请输入步骤名称"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope"> 
          <el-button type="primary" size="mini" @click='toInfo(scope.row.stepId)' icon="el-icon-search"></el-button>
          <el-button type="primary" size="mini" @click='toInter(scope.row.id)' icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" @click='removes(scope.row.id)' icon="el-icon-delete"></el-button>
          <!-- <el-button type="primary" size="mini" @click='removeRow(scope.row.id)' icon="el-icon-circle-plus-outline"></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    <div class="whiteRow">
      <el-form-item>
        <el-button type="primary" @click="saveCase">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
      </div>
    </el-form>
    
        <el-dialog title="添加步骤" :visible.sync="dialogFormVisible1" width="400px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="步骤名称">
                    <el-input v-model="form.name" class='inputWid'></el-input>
                </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" >立即添加</el-button>
                    <el-button @click="dialogFormVisible = false" >取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import { getInfo,saveapi } from '@/api/project'
import { getInterInfo,editapi } from '@/api/interface'
import { saveStepName,getStepValue,saveCaseInfo } from '@/api/table'
export default {
  components: {
    MDinput
  },
  data() {
    return {
      value: '',
      dialogFormVisible1:false,
      tableData: [
        {
          stepId: '',
          name: '',
        }
      ],
      form: {
        caseName:'',
        agreement:'http',
        domainName:'www.baidu.com',
        portName:'login',
        requestCls:'post',
      },
      listLoading: true
    }
  },
  created() {
      this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getStepValue().then(response => {
        console.log('---dsadas',response)
        var tt = response.data.items
        if (tt){
          this.tableData = tt
        }
        // this.form = response.data
        this.listLoading = false
        })    
    },
  //  removeRow(id){
  //     console.log("--id = ",id)
  //     deleteStep(id).then(response => {
  //       console.log(response.message)
  //       this.$message(response.message);
  //       this.fetchData(this.criteria,this.currentPage,this.pagesize);
  //       // console.log(response.data.items)
  //        var tt = response.data.items
  //       if (tt){
  //         this.tableData = tt.splice(index,1)
  //       }
  //       this.listLoading = false
  //     })
  //   },
    onSubmit() {
      // var tid = this.$route.query.id
       console.log('this.form.name = ',this.form.name)
      saveStepName(this.form.name).then(response => {
        this.$message(response.message);
        this.fetchData();
      })
    },
    saveCase() {
      // var tid = this.$route.query.id
       console.log('this.form = ',this.form)
       console.log('this.table = ',this.tableData)
      saveCaseInfo(this.form,this.tableData).then(response => {
      })
    },
    toInfo(id){
      var project_id = this.$route.params.project_id
      // this.$router.replace({name:'接口信息',params:{'project_id':project_id}})
      this.$router.push({path:'info',params:{'project_id':project_id},query: { 'id': id }})
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget)
    },
    handleAdd(index, row) {
      
      var item = {
        step: 'step',
        name: '',
      }
      this.tableData.push(item)
    },
    handleDelete(index, row) {
      this.tableData.splice(index)
    }, 
    addStep() {
        addStep().then(response =>{
            this.tableData=response.datas
        })
    },
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.tb-edit .el-input {
  display: block;
}
.tb-edit .current-row .el-input {
  display: block;
}
.wid{
    width:80px;
}
.inputWid{
    width:200px;
}
.whiteRow{
    margin-top:1em;
}
</style>

