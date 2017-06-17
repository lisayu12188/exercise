<template>
    <!--<header id="header">-->
      <!--<top></top>-->
    <!--</header>-->
    <!-- 轮播图 -->
  <div class="prod-detail">
    <div class="swiper-container" id="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
      </div>
      <div class="swiper-pagination swiper-pagination-black"></div>
    </div>
    <div class="desc">
      <h2>经典永续经典19支朱砂</h2>
      <span class="price"> 价格：<b>¥1999</b> </span>
      <div class="color-box">
        <span class="label">颜色：</span>
        <ul class="color-img">
          <li v-for="color in colors"><img :src="color.src" alt="" width="44px"></li>
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
          <span>初心</span>
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
          <li v-for="img in intros"><img v-lazy="img.src" alt=""></li>
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
import top from '../Top.vue';
import myfooter from '../Footer.vue';
import recomend from '../Recomend.vue';

import m1 from '../../../static/img/product/m1.png';
import m2 from '../../../static/img/product/m2.png';
import m3 from '../../../static/img/product/m3.png';
import m4 from '../../../static/img/product/m4.png';
import c1 from '../../../static/img/product/c1.png';
import c2 from '../../../static/img/product/c2.png';
import c3 from '../../../static/img/product/c3.png';
import c4 from '../../../static/img/product/c4.png';
import c5 from '../../../static/img/product/c5.png';
import d1 from '../../../static/img/product/d1.jpg';
import d2 from '../../../static/img/product/d2.jpg';
import d3 from '../../../static/img/product/d3.jpg';
import d4 from '../../../static/img/product/d4.jpg';
import d5 from '../../../static/img/product/d5.jpg';


export default {
  name: 'prod-detail',
  data () {
    return {
      listImg: [
        {url: m1},
        {url: m2},
        {url: m3},
        {url: m4},
      ],
      colors: [
        {src:c1},
        {src:c2},
        {src:c3},
        {src:c4},
        {src:c5},
      ],
      intros: [
        {src:d1},
        {src:d2},
        {src:d3},
        {src:d4},
        {src:d5},
      ]

    }
  },
  components: {
//    top,
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*#header {*/
    /*position: fixed;*/
    /*width: 100%;*/
    /*z-index:99;*/
    /*top:0*/
  /*}*/
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
