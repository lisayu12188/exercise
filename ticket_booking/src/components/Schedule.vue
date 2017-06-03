<template>
  <div id="calender" v-if="closeCalender" >
    <div id="date">
      <a class="finishedBtn" @click="close">完成</a>
      <div>
        <h2>选择{{goOrBack}}日期</h2>
      </div>
      <ul class="search-date">
        <li class="dateItem" :class="{current: !isRoundway}" @click="oneway">
          <span class="date-hint">去程</span>
          <br>
          <label class="date-label">{{goingTimeDate | toChineseDate}}</label>
          <span class="weekday">{{goingTimeDate | toWeekday}}</span>
        </li>
        <li class="dateItem" :class="{current: isRoundway}"  @click.stop="roundway">
          <div class="date-tip" v-if="showTip" >选择返程</div>
          <div v-if="!showTip">
            <span class="date-hint">返程</span>
            <br>
            <label class="date-label">{{backingTimeDate | toChineseDate}}</label>
            <span class="weekday">{{backingTimeDate | toWeekday}}</span>
            <span class="iconDelete" @click.stop="deleteDate"> <b> × </b> </span>
          </div>
        </li>
      </ul>
      <!--去程日期表-->
      <div v-if="!isRoundway">
        <Calender @input="changeDate" :limit="limitDate" :isRoundway="isRoundway" :value="goingTimeDate" />
      </div>
      <!--返程日期表-->
      <div v-if="isRoundway">
        <Calender  @input="changeDate" :limit="limitDate" :isRoundway="isRoundway"  :value="backingTimeDate" />
      </div>
    </div>
  </div>
</template>

<script>
  import Calender from './Calender.vue';
  //如果去程日期大于返程日期，跳回去程日历表
  function compareDate () {
    if (Date.parse(this.backingTimeDate) < Date.parse(this.goingTimeDate)){
      if(this.isRoundway){
        this.goingTimeDate = this.backingTimeDate
      };
      this.backingTimeDate = '';
      this.showTip = true;
      this.isRoundway = false;
//      this.goOrBack = '去程';
    }
  };
  export default {
    name: 'calender',
    props: ['backway','goingTime','backingTime'],
    data () {
      return {
        isRoundway: this.backway || false,
        goingTimeDate: this.goingTime || new Date(),
        backingTimeDate: this.backingTime || '',
        goOrBack: this.backway ? '返程' : '去程',
        closeCalender: true,
        showTip: String(this.backingTime) === '',
      }
    },
    components: {
        Calender
    },
    methods: {
      //点击完成关闭行程表,并把选择的日期传到父组件
      close: function () {
        let myGoingTime=new Date(this.goingTimeDate);
        if (this.backingTimeDate) {
          var myBackingTime =new Date(this.backingTimeDate);
        }
        this.$emit('input',myGoingTime,myBackingTime);
        this.closeCalender = false;
      },
      oneway: function () {
        this.isRoundway = false;
        this.goOrBack = '去程';
      },
      roundway: function () {
        this.isRoundway = true;
        this.goOrBack = '返程';
        if(this.backingTimeDate){
          this.showTip = false;
          this.isRoundway = true;
        }
      },
      changeDate: function (v) {
        if(!this.isRoundway){
          this.goingTimeDate = v;
          compareDate.call(this);
        }else if(this.isRoundway || this.backway){
          this.backingTimeDate = v;
          this.roundway();
          compareDate.call(this);
        }
      },
      limitDate: function (v) {
        //今天之前不能选
        const oneday = 24*60*60*1000;
        return v.getTime() < new Date().getTime()-oneday;
      },
      deleteDate: function () {
        this.backingTimeDate = '';
        this.showTip = true;
        this.isRoundway = false;
        this.goOrBack = '去程';
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
  #calender .dateItem {
    position: relative;
    text-align: left;
    border-bottom: 2px solid #ddd;
  }
  #calender .dateItem .date-hint {
    font-size: 16px;
  }
  #calender .dateItem .date-label {
    font-size: 20px;
    font-weight: bold;
  }
  #calender .dateItem .weekday {
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
  #calender .dateItem.current {
    border-bottom-color: lightseagreen;
  }
  .iconDelete {
    position: absolute;
    top: 16%;
    right: 0;
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
