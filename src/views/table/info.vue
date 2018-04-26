<template>
  <div class="app-container">
      <div>
          <span class ='fontTitle'>登录态</span> 

    <div class='whiteRow'>
        用户名：
        <el-input class='inputWid' placeholder="" v-model="loginInfo.userName" ></el-input>
        密码：
        <el-input class='inputWid' placeholder="" v-model="loginInfo.passWord" ></el-input>
    </div>
    </div>
    <el-button class='buttonlo' type="primary" @click="onSubmit" >保存</el-button>
  </div>
</template>

<script>
import '../../styles/element-ui.scss';
import { saveStepInfo,saveStepName } from '@/api/table'
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },

  data() {
    return {
      filterText: '',
      loginInfo:{
          userName: '',
          passWord: '',
      }

  }},
  methods: {
    onSubmit(){
        var temp= {}
        console.log(this.userName,this.passWord)
        var stepid = this.$route.query.id
        temp['stepid'] = stepid
        temp['other'] = this.loginInfo
        saveStepInfo(temp).then(response=>{
            this.$message(response.msg)
        })
    }
    }
}
</script>

<style>
    .inputWid{
    width:200px;
}
.fontTitle{
    font-style:normal;
    font-weight:900px;
    font-size: 30px;
    margin-bottom:1em;
    color: blue
}
.whiteRow{
    margin-top:1em;
}
.buttonlo{
    margin-top:1em;
    margin-left: 100px;
}
</style>