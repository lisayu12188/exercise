<template>
  <div id="container">
    <ul class="title">
      <li></li>
    </ul>
    <div id="main">
      <ul>
        <li>
          <b>{{}}</b>
          <div v-show="false">
            from
        </div>
        </li>
        <li class="exchangePic"><img  src="../assets/exchange.png" width="70px" alt=""></li>
        <li>
          <b>{{}}</b>
          <div v-show="false">
            to
         </div>
        </li>
      </ul>
      <ul>
        <li >
          <span >去程</span>
          <br/>
          <div>
            {{}} <small>{{}}</small>
          </div>
        </li>
        <li>
          <span>返程</span>
          <br/>
          <div>
            {{}} <small>{{}}</small>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <b>经济舱</b>
        </li>
        <li class="rdBox">
          <div>
            <input type="radio" value="" name="rdChild" id="child">
            <label for="child">
              <span>携带儿童</span>
              <small>2-12岁</small
              ></label>
          </div>
          <div>
            <input type="radio" value="" name="rdChild" id="baby">
            <label for="baby">
              <span>携带婴儿</span>
              <small>14天-2岁</small>
            </label>
          </div>
        </li>
      </ul>
      <div v-if="true">
        <calender ></calender>
      </div>
      <a class="search"> 搜 索 </a>
    </div>
    <div>
      {{}}
     <a style="color: yellow" > 返回 </a>
    </div>
    <div  ></div>
  </div>
</template>

<script>
import Calender from './Calender.vue'
export default {
  name: 'hello',
//  data () {
//    return {
//      typeItems: [
//        {type: '单程', isCurrent: 1},
//        {type: '往返', isCurrent: 0},
//      ],
//      currentStart: '北京',
//      currentDest: '上海',
//      goORback: '',
//
//
//      btn: 'btn',
//      isActive: 0,
//      isShowing: 1,
//      alert: '',
//      info: '',
//      myAnimate: 1,
//      isAnimate: '',
//      activeHeight: 0,
//      myJourney: '',
//
//
//    }
//  },
//  methods: {
//    selGoingDate: function () {
//        this.showCalender = true;
//    }
//
//  },
  components: {
    Calender
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  #container{
    width: 100%;
    padding-bottom: 50px;
  }
  #container .title{
    width: 146px;
    border: 1px solid #ddd;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    color: white;
    border-radius: 3px;
  }
  #container .title li{
    padding:5px 20px;

  }
  #container .title .current {
    color:black;
    background: #ddd;
  }
  #main{
    width:97%;
    background: #ddd;
    padding: 20px;
    margin: 1.5%;
    border-radius: 3px;
    border: 1px solid transparent;

  }
  #main > ul {
    margin:  0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  #main > ul > li {
    border-bottom: 1px solid #aaa;
    padding: 10px 0;
    width: 45%;
    text-align: left;
  }

  #main > ul > li:last-child {
    text-align: right;
  }
  #main > ul > li:first-child {
    text-align: left;
  }
  #main a.search{
    background: orange;
    color:white;
    display: block;
    text-align: center;
    padding: 10px;
    margin: 20px 0;
    border-radius: 3px;
  }
  .rdBox{
    flex-wrap: wrap;
    justify-content: flex-end;
    flex-grow: 1;
    font-size: 18px;
  }
  .rdBox > div{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
  .rdBox > input {
    margin: 5px 0 0 15px;
  }
  label {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 55%;

  }
  #date {
    width: 97%;
    margin: 1.5%;
    padding: 20px;
    border-radius: 3px;
    background: #fff;
    box-shadow: 1px 1px 40px #000;
  }
  #date .week,
  #date .date {
    display: flex;
    /*justify-content: space-around;*/
    flex-wrap: wrap;
    font-size: 20px;
  }
  #date .week > li,
  #date .date > li{
    width: 14%;
    margin-bottom: 10px;
    /*flex-grow: 1;*/
    padding: 0 2.5%;

  }
  .currentDate {
    color: orange;
    text-decoration: underline;
  }
  .selected {
    background: yellow;
    background-clip:content-box;
  }
  .pastDate{
    color: #bbb;
  }
  .btn{

    display: inline-block;
    font-size: 24px;
    width: 20px;
    color: #bbb;
  }
  .btnActive{
    color: #3C9CCE;
  }
  #main > ul li.exchangePic{
    text-align: center;
    height : 40px;
    border-bottom: none;
  }
  #main>ul, .search {
    font-size: 20px;
  }
  .alertText {
    color: red;
  }

  @keyframes myAnimate{
    0%   {margin-top: 0 }
    25%  {margin-top: -10px}
    50%  {margin-top: 0}
    100% {margin-top: 10px}
  }
  .alertAnimate {
    animation-name: myAnimate;
    animation-duration: 1s;
  }
  .finishedBtn{
    position:absolute;
    top: 5%;
    right: 5%;
    color: #00BCD4;
    font-size: 20px;
    border-bottom: 1px solid #00BCD4;
  }
  .cld-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    background: rgba(0,0,0,0.5);
  }
  .dateType {
    font-size: 12px;
  }


</style>
