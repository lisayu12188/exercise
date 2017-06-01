<template>
  <div class="cld-wrapper" id="calender" v-if="closeCalender" >
        <div id="date">
          <a class="finishedBtn" @click="close">完成</a>
          <div>
            <h2>选择{{goOrBack}}日期</h2>
          </div>
          <ul class="search-date">
            <li class="date-item" :class="{current: isCurrentO}" @click="oneway">
              <span class="date-hint">去程</span>
              <br>
              <label class="date-label">{{selMonth}}月{{selDate}}日</label>
              <span class="weekday">{{selDayGo}}</span>
            </li>
            <li class="date-item" :class="{current: isCurrentR}"  @click="roundway">
              <div class="date-tip" v-if="showTip" >选择返程</div>
              <div v-if="showDate">
                <span class="date-hint">返程</span>
                <br>
                <label class="date-label">{{selMonth}}月{{selDate+1}}日</label>
                <span class="weekday">{{selDayBack}}</span>
              </div>

            </li>
          </ul>
          <!--去程日期表-->
          <div v-if="isOneway">
            <date-list :selMonth = "selMonth" :selYear = "selYear" :selDate = "selDate"/>
          </div>
          <!--返程日期表-->
          <div v-if="isRoundway">
            <date-list :selMonth = "selMonth" :selYear = "selYear" :selDate = "selDate" />
          </div>





        </div>
      </div>
</template>

<script>
  import dateList from './DateList.vue';

  const weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";

  const d = new Date;
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
    data () {
        return {
          selYear: currentYear(),
          selMonth: currentMonth(),
          selDate: currentDate(),
          goOrBack: '去程',
          isCurrentO: true,
          isCurrentR: false,
          closeCalender: true,
          isOneway: true,
          isRoundway: false,
          showTip: true,
          showDate: false,


        }
    },
  computed: {
    selDayGo : function () {
        let myDate = this.selMonth + "/" + this.selDate + "/" + this.selYear;
        let  w= new Date(myDate).getDay();
        return weekday[w];
    },
    selDayBack : function () {
      let myDate = this.selMonth + "/" + this.selDate + "/" + this.selYear;
      let w = new Date(myDate).getDay() + 1;
      return weekday[w];
    },


  },
components: {
      dateList
},
//  filters:{

//        toChinese : function (selDayGo) {
//          let myDate = this.selMonth + "/" + this.selDate + "/" + this.selYear;
//          let  w= new Date(myDate).getDay();
//          return weekday[w];
//        }
//  },
  methods: {
    //选择我的'出发' 或 '返程' 日期
      getMyDay: function (index) {
        if (!this.days[index].isPast) {
          this.selDate = this.days[index].date
          clearGo.call(this);
          this.days[index].isSelected = true;
          this.days[index].go = "去程";
        }
      },
      close: function () {
          this.closeCalender = false;

      },
      oneway: function () {
        this.isRoundway = false;
        this.isOneway = true;
        this.goOrBack = '去程';
        this.isCurrentR = false;
        this.isCurrentO = true;

      },
      roundway: function () {
        this.isOneway = false;
        this.isRoundway = true;
        this.goOrBack = '返程';
        this.showTip = false;
        this.showDate = true;
        this.isCurrentR = true;
        this.isCurrentO = false;

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
    /*margin: 1.5%;*/
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
    /*top: 18%;*/
    right: 10%;
    color: orange;
    font-size: 20px;
    border-bottom: 1px solid orange;
  }
  .cld-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    background: rgba(0,0,0,0.5);
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
