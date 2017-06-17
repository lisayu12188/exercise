<template>
  <div class="footer-container">
    <div class="lf">客服</div>
    <div class="md">立即购买</div>
    <div class="rt">加入购物车</div>
  </div>
</template>

<script>
import top from './Top.vue'
export default {
  name: 'hello',
//  data () {
//    return {
//
//    }
//  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .footer-container {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #fff;
    height: 100%;
    line-height: 4.5rem;
    font-weight: bold;
    > div {
      text-align: center;
      background: #414141;
      width: 33.33%;
    }
    .lf {
      border-right: 2px solid #ddd;
      background: url("../../static/img/icon_kefu.png") no-repeat #414141 12% 50%;
      background-size: 2.5rem;
    }
    .rt {
      background: #c71f2c;
    }
  }


</style>
