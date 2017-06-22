<template>
  <div class="header">
    <div class="icon-bar">
      <span></span>
      <span></span>
    </div>
    <div class="main-logo">
      <router-link to="/index">
      <img src="/static/img/nav_logo.png" alt="头部logo">
      </router-link>
    </div>
    <div class="user">
      <img src="/static/img/nav_user.png" alt="用户">
      <img src="/static/img/nav_car.png" alt="购物车">
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
//  data () {
//    return {
//     msg: 'Welcome to Your Vue.js App'
//    }
//  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  background: rgba(0,0,0,0.75);
  display: flex;
  justify-content: space-between;
  height: 5rem;
  text-align: center;
  flex:1;
  .icon-bar{
    width: 20%;
  }
  .main-logo{
    width: 60%;
  }
  .user {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin-right: 2rem;
  }
  .main-logo img {
    height: 3rem;
    margin-top: 1rem;
    vertical-align: top;
  }
  .user img {
    height: 2.5rem;
    margin-top: 1rem;
    vertical-align: top;
  }
  .user img:first-child {
    margin-right: 1rem;
  }
  .icon-bar > span:first-child{
    margin-top: 1.8rem;
    margin-bottom: 1rem;

  }
  .icon-bar > span {
    display: block;
    width: 2rem;
    height: 0.2rem;
    background: #fff;
    margin-left: 2rem;
  }
}





</style>
