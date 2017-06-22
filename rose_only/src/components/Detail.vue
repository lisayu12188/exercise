<template>
  <!-- 轮播图 -->
  <div class="prod-detail">
    <div class="swiper-container" id="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="mainImg in mainImgs" >
          <img v-lazy="mainImg">
        </div>
        <!--<div class="swiper-slide" v-for="mainImg in mainImgs" :style="{ backgroundImage: 'url(' + mainImg + ')' }"></div>-->
      </div>
      <div class="swiper-pagination swiper-pagination-black"></div>
    </div>
    <div class="desc">
      <h2>经典永续经典19支 {{pColName}}</h2>
      <span class="price"> 价格：<b>¥1999</b> </span>
      <div class="color-box">
        <span class="label">颜色：</span>
        <ul class="color-img">
          <li v-for="color in colors">
            <router-link :to="`/detail/pid/${color.pid}/cid/${color.co_id}`">
            <img :src="color.co_img" alt="" width="44px">
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="promise"><b>服务承诺：</b>官方正品   免邮配送   同城速递</div>
    <div class="prod-data">
      <h3 class="title">产品参数</h3>
      <ul class="datas">
        <li>
          <b>适用场景：</b>
          <span>表白 求婚</span>
        </li>
        <li>
          <b>适用朵数：</b>
          <span>19支</span>
        </li>
        <li>
          <b>适用对象：</b>
          <span>爱人</span>
        </li>
        <li>
          <b>颜色分类：</b>
          <span>{{pColName}}</span>
        </li>
        <li>
          <b>适用节日：</b>
          <span>情人节 520 七夕</span>
        </li>
        <li>
          <b>产品规格：</b>
          <span>81*21*13cm</span>
        </li>

      </ul>
      <div class="intro">
        <ul>
          <li v-for="introImg in introImgs"><img v-lazy="introImg" alt="详情图片"></li>
          <li><img v-lazy="'/static/img/product/card.jpg'" alt="卡片"></li>
        </ul>
      </div>
    </div>
    <div id="recomend-box">
      <!--热卖推荐-->
    <recomend></recomend>
    </div>
    <footer id="footer">
      <myfooter></myfooter>
    </footer>
  </div>
</template>

<script>
import top from './Top.vue';
import myfooter from './Footer.vue';
import recomend from './Recomend.vue';
export default {
  name: 'prod-detail',
  data () {
    return {
      //detailProducts: '',
      pName: '',
      pColName: '',
      colors: [],
      mainImgs: [],
      introImgs: [],
    }
  },
  components: {
    myfooter,
    recomend,
  },
  mounted () {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop: true,
      speed: 600,
      autoplay: 4000,
      onTouchEnd: function () {
        swiper.startAutoplay()
      }
    });
  },
  // 组件创建完后获取数据，
  created () {
      this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route' : 'fetchData'
  },
  methods: {
    fetchData () {
      var p_id = this.$route.params.pid;//获取路由参数pid,cid
      var c_id = this.$route.params.cid;
      if(this.colors.cid){
        c_id = this.colors.cid
      };
      var url= `http://localhost:8060/detail/pid/${p_id}/cid/${c_id}`;
      this.$http.get(url).then(function(data){
        var detailProducts = data.body[0][0];
        var cimg = detailProducts.c_color_img;
        var cid = detailProducts.cid_all;
        var mainImgs = detailProducts.c_main_img;
        var introImgs = detailProducts.c_intro_img;
//      function toArray(val) {
//        if(val){
//          val = val.split(",");
//          val.forEach(function(v,i){
//            val[i] = '/static/img/product/' + v;
//          })
//          this.val = val;
//          console.log(this.val);
//          return this.val;
//        }
//      };
        cimg = cimg.split(",");
//        var reg = /,/;
//        if(reg.test(cid)){
          cid = cid.split(",");
//        }else {
//          cid = [cid];
//        }

        var colors =[];
        cimg.forEach(function(v,i){
          colors[i] = {co_img: '/static/img/product/' + v, co_id: cid[i],pid: p_id};
        });
        this.colors = colors;
        console.log(this.colors);
        this.pColName = detailProducts.c_color_name;
//      toArray.call(this,mainImgs);
//      this.mainImgs = mainImgs;
//      toArray(introImgs);
//      this.introImgs = introImgs;
//      console.log(this.mainImgs);

        mainImgs = mainImgs.split(",");
        mainImgs.forEach(function(v,i){
          mainImgs[i] = '/static/img/product/' + v;
        })
        this.mainImgs = mainImgs;

        introImgs = introImgs.split(",");
        introImgs.forEach(function(v,i){
          introImgs[i] = '/static/img/product/' + v;
        })
        this.introImgs = introImgs;




      })
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #slider {
    &.swiper-container {
      width: 100%;
      height: 27.2rem;
      margin-top: 5rem;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
    .swiper-pagination {
      top: 24rem;
      width: 100%;
    }
  }
  .desc {
    text-align: center;
    margin: 2rem 0;
    padding: 0 1rem;
    .price {
      display: block;
      margin: 1.5rem 0;
      font-size: 1.6rem;
    }
    .color-box {
      .label {
        padding-top: 2rem;
        white-space: nowrap;
      }
      display: flex;
      justify-content: center;
      .color-img {
        display: flex;
        flex-wrap: wrap;
        li{
          border: 1px solid #ddd;
          padding: .3rem;
          margin-right: 1.2rem;
          margin-bottom: 1.2rem;
        }
        li:hover{
          border: 2px solid  #7e7e7e;
        }
      }
    }
  }

  .promise {
    width: 100%;
    text-align: center;
    background: #eee;
    height: 3rem;
    line-height: 3rem;
    margin-bottom: .6rem;
    margin-top: -0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .prod-data {
    img {
      width: 100%;
    }
    .title {
      background: #ccc;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
    }
    .datas {
      display: flex;
      flex-wrap: wrap;
      background: #f6f6f6;
      padding-top: 1.5rem;
      margin-bottom: 1rem;
      li {
        width: 50%;
        margin-bottom: 1rem;
        padding-left: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      }
    }
  }
  #recomend-box {
    margin-bottom: 4.5rem;
  }
  #footer {
    position: fixed;
    bottom:0;
    z-index: 99;
    width:100%;
    height: 4.5rem;
  }





</style>
