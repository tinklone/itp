<template>
<div class="main-container">
  <el-menu class="navbar" mode="horizontal">
    <span style="valign:middle;"><svg-icon style="width: 8em;height: 3em;" icon-class="logo" scale="200"/></span>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input  style="width: 200px;" class="filter-item" placeholder="标题" value="" size="mini">
      </el-input>
      <el-button type="primary"  icon="search" size="mini" plain>搜索</el-button>
      <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus" size="mini" plain>新增项目</el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序列号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目名称">
        <template slot-scope="scope">
          <a :href="'#/'+ scope.row.id+'/project' " >{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用例个数" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="项目状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
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
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="dialogFormVisible = false" >取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</div>
</template>

<script>
import { getList , save} from "@/api/project";
import { mapGetters } from "vuex";


const calendarTypeOptions = [
      { key: 'CN', display_name: '中国' },
      { key: 'US', display_name: '美国' },
      { key: 'JP', display_name: '日本' },
      { key: 'EU', display_name: '欧元区' }
]

// arr to obj
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  data() {
    return {
      list: null,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      listLoading: true,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions
    };
  },
  computed: {
    ...mapGetters(["avatar"])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    onSubmit() {
      save(this.form.name,this.form.desc).then(response => {
        this.$message('项目添加成功');
        this.fetchData();
      });
      this.dialogFormVisible = false;
    },
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
