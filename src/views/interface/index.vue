<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item prop="api_url" label="接口地址">
        <input class="new-input" v-model="form.api_url" autofocus autocomplete="off" placeholder="api url" size="100">
      </el-form-item>
      <el-form-item prop="api_name" label="接口名称">
        <input class="new-input" v-model="form.api_name" autofocus autocomplete="off" placeholder="api name" size="100">
      </el-form-item>
      <el-form-item label="请求方式">
        <el-select v-model="form.api_method" placeholder="请选择项目类型">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
        </el-select>
      </el-form-item>
      <el-table :data="tableData" class="tb-edit" style="width: 50%" highlight-current-row @row-click="handleCurrentChange">
        <el-table-column label="参数名" width="180">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.parameter_key" placeholder="请输入key"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="参数值" width="180">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.parameter_value" placeholder="请输入value"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="参数类型" width="180">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.parameter_type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <i class="el-icon-circle-plus" @click="handleAdd()"></i>
            <i class="el-icon-circle-close" @click="handleDelete(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="接口类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="增加" name="type"></el-checkbox>
          <el-checkbox label="修改" name="type"></el-checkbox>
          <el-checkbox label="删除" name="type"></el-checkbox>
          <el-checkbox label="查询" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="接口说明">
        <el-input type="textarea" v-model="form.desc" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import { getInfo,saveapi } from '@/api/project'
import { getInterInfo,editapi } from '@/api/interface'
export default {
  components: {
    MDinput
  },
  data() {
    return {
      tableData: [
        {
          parameter_key: '',
          parameter_value: '',
          parameter_type: ''
        }
      ],
      options: [
        {
          value: '0',
          label: 'int'
        },
        {
          value: '1',
          label: 'string'
        },
        {
          value: '2',
          label: 'bool'
        },
        {
          value: '3',
          label: 'email'
        },
        {
          value: '4',
          label: 'name'
        }
      ],
      value: '',
      form: {
        api_url: '',
        api_name: '',
        api_method: '',
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
      this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      var tt = this.$route.query.id
      console.log('tt = ',tt)
      if (tt){
      getInterInfo(tt).then(response => {
        console.log('---dsadas',response.data)
        this.form = response.data
        this.listLoading = false
        })    
    }},
    // fetchData() {
    //   this.listLoading = true
    // },
    onSubmit() {
      var tid = this.$route.query.id
       console.log('tid = ',tid)
      if (!tid){
      saveapi(this.form,this.tableData).then(response => {
        this.$message(response.message);
        this.fetchData();
      })}
      else{
        editapi(tid,this.form,this.tableData).then(response => {
        this.$message(response.message);
        this.fetchData();
      })}
      
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
        date: '',
        name: '',
        address: ''
      }
      this.tableData.push(item)
    },
    handleDelete(index, row) {
      this.tableData.splice(index)
    }
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
</style>

