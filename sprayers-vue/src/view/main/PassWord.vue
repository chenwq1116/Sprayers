<template>
    <div>
        <h1>！！暗号 ！！</h1>
        <el-input v-model="signal" placeholder="" :input="countMD5()"></el-input>
    </div>
</template>
<script>
export default {
    data() {
        return {
            signal: ''
        }
    },
  methods:{
    countMD5(){
        let md5 = this.$md5(this.signal);
        if(md5 == process.env.VUE_APP_MD5){
            sessionStorage.setItem('md5',md5);
            this.$router.push('/home');
        }
    }
  }
}
</script>