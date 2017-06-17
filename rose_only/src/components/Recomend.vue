<template>
  <div class="recomend">
    <h3>热卖推荐</h3>
    <div class="prod-box">
      <dl v-for="item in recomends">
        <dt>
          <a href="">
            <img v-lazy="item.src" alt="">
          </a>
        </dt>
        <dd>
          {{item.category}}-{{item.series}}
          <span>{{item.style}} {{item.length}}</span>
          ￥
          <b>{{item.price}}</b>
        </dd>
      </dl>
    </div>

  </div>
</template>

<script>
  import r1 from '../../static/img/product/r1.png';
  import r2 from '../../static/img/product/r2.png';
  import r3 from '../../static/img/product/r3.png';
  import r4 from '../../static/img/product/r4.png';
  import r5 from '../../static/img/product/r5.png';
  import r6 from '../../static/img/product/r6.png';
  import r7 from '../../static/img/product/r7.png';
  import r8 from '../../static/img/product/r8.png';
export default {
  name: 'recomend',
  data () {
    return {
      recomends:[
        {src: r1,category:'鲜花玫瑰',style:'经典朱砂',series:'基础系列',length:'80cm 长形',price:1520},
        {src: r2,category:'鲜花玫瑰',style:'经典朱砂',series:'经典永续系列',length:'40cm 长形',price:1990},
        {src: r3,category:'鲜花玫瑰',style:'经典朱砂',series:'基础系列系列',length:'80cm 长形',price:2520},
        {src: r4,category:'鲜花玫瑰',style:'经典朱砂',series:'基础系列系列',length:'80cm 长形',price:1520},
        {src: r5,category:'鲜花玫瑰',style:'经典朱砂',series:'基础系列系列',length:'40cm 长形',price:1620},
        {src: r6,category:'鲜花玫瑰',style:'小经典朱砂',series:'基础系列系列',length:'80cm 长形',price:1580},
        {src: r7,category:'鲜花玫瑰',style:'玫瑰',series:'玫瑰经典系列',length:'40cm 长形',price:1820},
        {src: r8,category:'鲜花玫瑰',style:'经典约定',series:'基础系列系列',length:'80cm 长形',price:1920},
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .recomend {
    margin-top: 2rem;
    h3{
     height: 3rem;
     line-height: 3rem;
    }
    img {
      width: 100%;
    }
    text-align: center;
    .prod-box {
      background: #ddd;
      display: flex;
      flex-wrap: wrap;
      padding-left: 2%;
      padding-top: 1rem;
      flex: 1;
      width:100%;
      dl {
        width: 48%;
        background: #fff;
        margin-bottom: 1.5rem;
        margin-right: 2%;
        font-size: 1.3rem;
        dd {
          padding: 1.5rem;
          span {
            display: block;
            margin: .8rem 0;

          }
        }
      }
    }
  }



</style>
