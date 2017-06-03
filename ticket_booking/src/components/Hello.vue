<template>
  <div id="container">
    <ul class="title">
      <li @click="selType(index)" :class="[{current: item.isCurrent}]" v-for="(item, index) in typeItems">{{item.type}}</li>
    </ul>
    <div id="main" v-if="!getResult">
      <ul>
        <li>
          <b>{{from}}</b>
        </li>
        <li class="exchangePic">
          <img  src="../assets/exchange.png" width="70px" alt="" @click="exchangeCity">
        </li>
        <li>
          <b>{{to}}</b>
        </li>
      </ul>
      <ul>
        <li @click="showGoingSchedule" >
          <span>去程</span>
          <br/>
          <div>
            {{goingTime | toChineseDate}}
            <small>{{goingTime | toWeekday}}</small>
          </div>
        </li>
        <li @click="showBackingSchedule">
          <span>返程</span>
          <br/>
          <div v-if="!showDate"> — — </div>
          <div v-if="showDate" class="backingTime">
            {{backingTime | toChineseDate}}
            <small>{{backingTime | toWeekday}}</small>
            <span class="iconDelete" @click.stop="deleteDate"> <b> × </b> </span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <b>经济舱</b>
        </li>
        <li class="rdBox">
          <div>
            <input type="radio" name="rdChild" id="child">
            <label for="child">
              <span>携带儿童</span>
              <small>2-12岁</small
              ></label>
          </div>
          <div>
            <input type="radio" name="rdChild" id="baby">
            <label for="baby">
              <span>携带婴儿</span>
              <small>14天-2岁</small>
            </label>
          </div>
        </li>
      </ul>
      <div v-if="showSchedule" :style="{height:activeHeight + 'px'}" class="scheduleWrapper">
        <schedule :backway="roundway" :goingTime="goingTime" :backingTime="backingTime" @input="changeDate"/>
      </div>
      <a class="search" @click="search"> 搜 索 </a>
    </div>
    <div v-if="getResult">
      正在查询,请稍后...
     <a class="btnBack" @click="getBack"> 返回 </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Schedule from './Schedule.vue';
const cities=['北京','上海'];
//定义两个全局过滤器toChineseDate，toWeekday
Vue.filter("toChineseDate", function (date) {
  var m = new Date(date).getMonth()+1;
  var d = new Date(date).getDate();
  return (m+'月'+d+'日');
},);
Vue.filter("toWeekday", function (date) {
  const weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  let  w= new Date(date).getDay();
  return weekday[w];
});
export default {
  name: 'container',
  data () {
    return {
      typeItems: [
        {type: '国内', isCurrent: 1},
        {type: '国际', isCurrent: 0},
      ],
      from: '北京',
      to: '上海',
      showSchedule: false,
      goingTime: this.goingTime || new Date(),
      backingTime: this.backingTime || '',
      roundway: false,
//      goOrBack: '去程',
      showDate: false,
      getResult: false,
      showBookingInf: false,
      activeHeight:0,
    }
  },
  components: {
    Schedule
  },
  methods: {
    selType: function (index) {
      this.typeItems.forEach(function (item) {
        if (item.isCurrent === 1) {
          item.isCurrent = 0;
        }
      });
      this.typeItems[index].isCurrent = 1;
      if (this.typeItems[index].type === '往返') {
        this.isRound = 1;
      }else {
        this.isRound = 0;
      }
    },
    showGoingSchedule: function () {
      this.roundway = false;
      this.showSchedule = true;
//      this.goOrBack = '去程';
      this.activeHeight = window.screen.height;
    },
    showBackingSchedule: function () {
      if (!this.showDate) {
        this.backingTime = '';
      }
      this.roundway = true;
      this.showSchedule = true;
      this.showDate = true;
//      this.goOrBack = '返程';
      this.activeHeight = window.screen.height;
      if(this.backingTime){
        this.showDate = true;
      }
      if ( Date.parse(this.goingTime) > Date.parse(this.backingTime) ) {
        this.backingTime ='' ;
      }
    },
    changeDate: function (myGoingTime,myBackingTime) {
      if (myGoingTime) {
        this.goingTime = myGoingTime;
      };
      if (myBackingTime) {
        this.showDate = true;
        this.backingTime = myBackingTime;
      }else {
        this.showDate = false;
      };
      this.showSchedule = false;
    },
    search: function () {
      this.getResult = true;
    },
    getBack: function () {
      this.getResult = false;
    },
    exchangeCity: function () {
      var copyFrom = this.from;
      this.from = this.to;
      this.to = copyFrom;
    },
    deleteDate: function () {
        this.showDate = false;
        this.backingTime = '';
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container{
    width: 100%;
    padding-bottom: 30px;
    border: 1px solid transparent;
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
    box-shadow: 2px 10px 20px;
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
  #main > ul > li:first-child {
    text-align: left;
  }

  #main > ul > li:last-child {
    text-align: right;
  }
  #main a.search{
    background: orange;
    color:white;
    display: block;
    text-align: center;
    padding: 5px;
    margin: 20px 0;
    border-radius: 3px;
    font-weight:bold;
    font-size: 24px;
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
  #main > ul li.exchangePic{
    text-align: center;
    height : 40px;
    border-bottom: none;
  }
  #main>ul, .search {
    font-size: 20px;
  }
  .btnBack {
    color:orange;
    text-decoration: underline;
  }
  .scheduleWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,0.5);
  }
  .backingTime{
    position: relative;
  }
  .iconDelete {
    position: absolute;
    top: 16%;
    right: -20px;
    background: #cacaca;
    color: #fff;
    font-size: 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
  }
</style>
