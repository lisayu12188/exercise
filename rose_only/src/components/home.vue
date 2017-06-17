<template>
  <div class="hello">
    <!-- 轮播图 -->
    <div class="swiper-container" id="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
    </div>
      <div class="swiper-pagination swiper-pagination-black"></div>
    </div>
    <section id="section">
      <div class="part1">
        <h2 class="title"><img src="../../static/img/t9.jpg" alt=""></h2>
        <ul>
          <li v-for="product in products1">
            <router-link :to="product.route">
            <img  v-lazy="product.src" alt="产品图片">
            </router-link>
          </li>
        </ul>
      </div>
      <div class="part2">
        <h2 class="title"><img src="../../static/img/t10.jpg" alt=""></h2>
        <div>
          <a href="#" v-for="product in products2"><img   v-lazy="product.src" alt="产品图片"></a>
        </div>
      </div>
      <div class="part3">
        <h2 class="title"><img src="../../static/img/t8.jpg" alt=""></h2>
        <div>
          <a href="#" v-for="product in products3"><img   v-lazy="product.src" alt="产品图片"></a>
        </div>
      </div>
      <div class="part4">
        <h2 class="title"><img src="../../static/img/t2.jpg" alt=""></h2>
        <div class="content">
          <a href="#" v-for="product in products4"><img   v-lazy="product.src" alt="产品图片"></a>
        </div>
      </div>
      <div class="part5">
        <h2 class="title"><img  src="../../static/img/t7.jpg" alt=""></h2>
        <div class="content">
          <a href="#"><img   src="../../static/img/store.jpg" alt="专卖店图片"></a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import a from '../../static/img/slider1.jpg';
import b from '../../static/img/slider2.jpg';
import c from '../../static/img/slider3.jpg';
import d from '../../static/img/slider4.jpg';
import e from '../../static/img/slider5.jpg';
import f from '../../static/img/slider6.jpg';
export default {
  name: 'hello',
  data () {
    return {
      listImg: [
        {url: a},
        {url: b},
        {url: c},
        {url: d},
        {url: e},
        {url: f},
      ],
      products1: [
        {src: '../../static/img/g1.jpg',route:'/detail1'},
        {src: '../../static/img/g2.jpg',route:'/detail2'},
        {src: '../../static/img/g3.jpg',route:'/detail3'},
        {src: '../../static/img/g4.jpg',route:'/detail4'},
        {src: '../../static/img/g5.jpg',route:'/detail5'},
      ],
      products2: [
        {src: '../../static/img/g6.jpg'},
        {src: '../../static/img/g7.jpg'},
        {src: '../../static/img/g8.jpg'},
        {src: '../../static/img/g10.jpg'},
        {src: '../../static/img/g11.jpg'},
      ],
      products3: [
        {src: '../../static/img/d2.jpg'},
        {src: '../../static/img/d1.jpg'},
        {src: '../../static/img/d3.jpg'},
        {src: '../../static/img/d5.jpg'},
        {src: '../../static/img/d4.jpg'},
        {src: '../../static/img/d6.jpg'},
        {src: '../../static/img/d7.jpg'},
        {src: '../../static/img/d8.jpg'},
      ],
      products4: [
        {src: '../../static/img/b3.jpg'},
        {src: '../../static/img/b4.jpg'},
        {src: '../../static/img/b5.jpg'},
        {src: '../../static/img/b6.jpg'},
        {src: '../../static/img/b7.jpg'},
        {src: '../../static/img/b8.jpg'},
      ],
    }
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
  methods: {


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #slider {
    &.swiper-container {
      width: 100%;
      height: 29rem;
      margin-top: 4.9rem;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: 45rem;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    .swiper-pagination {
      bottom: 3rem;
      width: 100%;
    }
  }

  #section {
    img {
      width: 100%
    }
    h2 img {
      vertical-align: bottom;
    }
    .part4 .content img {
      width: 50%;
    }
  }






</style>
