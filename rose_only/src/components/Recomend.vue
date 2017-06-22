<template>
  <div class="recomend">
    <h3>热卖推荐</h3>
    <div class="prod-box">
      <dl v-for="item in recomends">
        <dt>
          <router-link :to="`/detail/pid/${item.pid}/cid/${item.cid}`">
            <img v-lazy="`/static/img/product/${item.r_main_img}`" :alt="[item.category,item.series]">
          </router-link>
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
export default {
  name: 'recomend',
  data () {
    return {
      recomends:'',
//      pid: '' ,
    }
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
      console.log(p_id,c_id);

      var url= `http://localhost:8060/detail/pid/${p_id}/cid/${c_id}`;
      this.$http.get(url).then(function(data) {
        console.dir(data.body[1]);
        this.recomends = data.body[1];

      })
    },
//    getPid () {
//
//    }
  }

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
