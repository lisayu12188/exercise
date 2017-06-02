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
            {{goingMonth}}月{{goingDate}}日
            <small>{{goingDay}}</small>
          </div>
        </li>
        <li @click="showBackingSchedule">
          <span>返程</span>
          <br/>
          <div v-if="!showDate"> — — </div>
          <div v-if="showDate">
            {{backingMonth}}月{{backingDate}}日
            <small>{{backingDay}}</small>
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
      <div v-if="showGoSchedule" :style="{height:activeHeight + 'px'}" class="scheduleWrapper">
        <schedule :isOneway="isOneway" v-model="goingTime" :goOrBack="goOrBack" @input="changeDate"/>
      </div>
      <div v-if="showBackSchedule" :style="{height:activeHeight + 'px'}" class="scheduleWrapper">
        <schedule :isRoundway="isRoundway" :goingTime="goingTime" :goOrBack="goOrBack" @input="changeDate"/>
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
import Schedule from './Schedule.vue';
const cities=['北京','上海'];
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
      showGoSchedule: false,
      showBackSchedule: false,
      goingTime:'',
      goingDate: new Date().getDate(),
      goingMonth: new Date().getMonth() + 1,
      goingDay: '',
      backingTime:'',
      backingDate: '',
      backingMonth: '',
      backingDay: '',
      isOneway:true,
      isRoundway: false,
      goOrBack: '去程',
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
      this.showGoSchedule = true;
      this.goOrBack = '去程';
      this.activeHeight = window.screen.height;
    },
    showBackingSchedule: function () {
      this.showBackSchedule = true;
      this.isRoundway = true;
      this.showDate = true;
      this.goOrBack = '返程';
      this.activeHeight = window.screen.height;
    },
    changeDate: function (myGoingTime,myGoingDay,myBackingTime,myBackingDay) {
      if (myGoingTime) {
        this.goingTime = myGoingTime;
        console.log('hello go time'+this.goingTime);
        this.goingMonth = myGoingTime.getMonth() + 1;
        this.goingDate = myGoingTime.getDate();
        this.goingDay = myGoingDay;
      };
      if (myBackingTime) {
        this.myBackingTime = myBackingTime;
        this.backingMonth = myBackingTime.getMonth() + 1;
        this.backingDate = myBackingTime.getDate();
        this.backingDay = myBackingDay;
      }else {
        this.showDate = false;
      };
      this.showGoSchedule = false;
      this.showBackSchedule = false;
    },
//    getRoundway: function () {
//    },
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
</style>
