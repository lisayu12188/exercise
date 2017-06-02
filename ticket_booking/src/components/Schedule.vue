<template>
  <div id="calender" v-if="closeCalender" >
    <div id="date">
      <a class="finishedBtn" @click="close">完成</a>
      <div>
        <h2>选择{{goOrBack}}日期</h2>
      </div>
      <ul class="search-date">
        <li class="date-item" :class="{current: isOneway}" @click="oneway">
          <span class="date-hint">去程</span>
          <br>
          <label class="date-label">{{monthGo}}月{{dateGo}}日</label>
          <span class="weekday">{{dayGo}}</span>
        </li>
        <li class="date-item" :class="{current: isRoundway}"  @click="roundway">
          <div class="date-tip" v-if="showTip" >选择返程</div>
          <div v-if="showDate">
            <span class="date-hint">返程</span>
            <br>
            <label class="date-label">{{monthBack}}月{{dateBack}}日</label>
            <span class="weekday">{{dayBack}}</span>
          </div>
        </li>
      </ul>
      <!--去程日期表-->
      <div v-if="isOneway">
        <Calender @input="changeDate" :limit="limitDate" :isOneway="isOneway" />
      </div>
      <!--返程日期表-->
      <div v-if="isRoundway">
        <Calender  @input="changeDate" :limit="limitDate" :isRoundway="isRoundway"  />
      </div>
    </div>
  </div>
</template>

<script>
  import Calender from './Calender.vue';
  const d = new Date;
  const weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  let selGoDate,selBackDate; //保存去程和返程的日期用于比较大小
  function currentYear() {
        return d.getFullYear()
      };
  function currentMonth () {
        return d.getMonth()+1
      };
  function currentDate () {
      return d.getDate()
    };
  function currentDay () {
      return d.getDay()
    };
  export default {
    name: 'calender',
    props: ['isOneway','isRoundway','goOrBack','goingTime','backingTime'],
    data () {
      return {
        yearGo: currentYear(),
        monthGo: currentMonth(),
        dateGo: currentDate(),
        yearBack:'',
        monthBack: '',
        dateBack: '',
        closeCalender: true,
        showTip: true,
        showDate: false,
      }
    },
    computed: {
      dayGo : function () {
        let myDate = this.monthGo + "/" + this.dateGo + "/" + this.yearGo;
        let  w= new Date(myDate).getDay();
        return weekday[w];
      },
      dayBack : function () {
        let myDate = this.monthBack + "/" + this.dateBack + "/" + this.yearGo;
        let w = new Date(myDate).getDay();
        return weekday[w];
      },
    },
    components: {
        Calender
    },
    methods: {
      //点击完成关闭行程表,并把选择的日期传到父组件
      close: function () {
        var myGoingTime=new Date(this.yearGo+'/'+this.monthGo+'/'+this.dateGo);
        var myGoingDay = this.dayGo;
        if (this.yearBack && this.monthBack && this.dateBack) {
          var myBackingTime =new Date(this.yearBack+'/'+this.monthBack+'/'+this.dateBack);
          var myBackingDay = this.dayBack
        }
        this.$emit('input',myGoingTime,myGoingDay,myBackingTime,myBackingDay);
        this.closeCalender = false;
      },
      oneway: function () {
        this.isRoundway = false;
        this.isOneway = true;
        this.goOrBack = '去程';
      },
      roundway: function () {
        this.isOneway = false;
        this.isRoundway = true;
        this.goOrBack = '返程';
        if(selBackDate){
          this.showTip = false;
          this.showDate = true;
        }
      },
      changeDate: function (v) {
        if(this.isOneway){
          selGoDate = v;
          this.yearGo = selGoDate.getFullYear()
          this.monthGo = selGoDate.getMonth()+1;
          this.dateGo = selGoDate.getDate();
        };
        if(this.isRoundway){
          selBackDate = v;
          console.log('goooo'+this.goingTime);
          this.yearGo = this.goingTime.getFullYear();
          this.monthGo = this.goingTime.getMonth()+1;
          this.dateGo = this.goingTime.getDate();
          this.yearBack = selBackDate.getFullYear()
          this.monthBack = selBackDate.getMonth()+1;
          this.dateBack = selBackDate.getDate();
          this.roundway();
          //如果去程日期大于返程日期，跳回去程日历表
          if (selBackDate < selGoDate ){
            console.log('=back'+v)
            this.showTip = true;
            this.showDate = false;
            this.monthGo = this.monthBack;
            this.dateGo = this.dateBack;
            this.yearBack='';
            this.monthBack='';
            this.dateBack='';
            this.oneway();
          }
        }
      },
      limitDate(v){
        //今天之前不能选
        const oneday = 24*60*60*1000;
        return v.getTime() < new Date().getTime()-oneday;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2{
    margin: 0;
  }
  #calender{
    width:100%;
    padding: 20px;
    border-radius: 3px;
    border: 1px solid transparent;
  }
  #calender > ul {
    position: relative;
    margin:  0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  #calender > ul > li {
    border-bottom: 1px solid #aaa;
    padding: 10px 0;
    width: 45%;
    text-align: left;
  }
  #calender > ul > li:last-child {
    text-align: right;
  }
  #calender > ul > li:first-child {
    text-align: left;
  }
  #calender .search-date {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-radius: 3px;
    padding: 20px;
    margin: 20px 0;
  }
  #calender .date-item {
    text-align: left;
    border-bottom: 2px solid #ddd;
  }
  #calender .date-item .date-hint {
    font-size: 16px;
  }
  #calender .date-item .date-label {
    font-size: 20px;
    font-weight: bold;
  }
  #calender .date-item .weekday {
    font-size: 14px;
  }
  #date {
    width: 97%;
    margin: 1.5%;
    padding: 20px;
    border-radius: 3px;
    background: lightseagreen;
    box-shadow: 1px 1px 40px #000;
  }
  .finishedBtn{
    position:absolute;
    right: 10%;
    color: orange;
    font-size: 20px;
    border-bottom: 1px solid orange;
  }
  .date-tip {
    color: #bbb;
    font-size: 20px;
    margin-top: 15px;
  }
  #calender .date-item.current {
    border-bottom-color: lightseagreen;
  }
</style>
