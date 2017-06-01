<template>
    <div id="date-box" v-show = "showDateBox">
      <h2>
        <b @click="pre" :class="{color: isGrey}" class="pre">&lt;</b>
       {{selYear}}年{{selMonth}}月
          <b @click="next">&gt;</b>
      </h2>
      <ul class="week">
        <li v-for="day in week">{{day}}</li>
      </ul>
      <ul class="date">
        <li v-for="space in spaces">{{space}}</li>
        <li @click.prevent="getMyDay(index)"  :class="[{pastDate: day.isPast, currentDate: day.isCurrentDate, selected: day.isSelected}]" v-for="(day, index) in days"  >{{day.date}} <small class="dateType">{{day.go}}</small></li>
      </ul>
    </div>
</template>

<script>

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
  // 获取每月的最后一天
  var len_days;
  function getLastDay(year,month) {
    var new_year = year;    //取当前的年份
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month>12)            //如果当前大于12月，则年份转到下一年
    {
      new_month -=12;        //月份减
      new_year++;            //年份增
    }
    var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天
    len_days = (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
  };
  //清空'去程'
  function clearGo() {
    this.days.forEach(function (day) {
      if (day.isSelected === true) {
        day.isSelected = false;
        day.go = '';
      }
    })
  };
  export default {
    props: ['selYear','selMonth','selDate'],
    name: 'calender',
    data () {
        return {
          week: ["日","一","二","三","四","五","六"],
          showDateBox: true,
          isActive:'',
          isGrey: true,
        }
    },
  computed: {
    //每月首行的空格数
    spaces: function () {
//        获取当月的第一天日期并将其格式化为日期对象，再转化为星期
        if (this.selMonth<10){
          this.selMonth = "0"+this.selMonth;
        }
      var firstDay = this.selMonth+"/"+"01/"+this.selYear;
      var d = new Date(firstDay);
      var w = d.getDay();
      var spaces = [];
      for (var i = 1; i <= w; i++) {
        spaces.push(' ')
      }
      return spaces;
    },
//  渲染每月的天数
    days : function () {
//      this.click = 1;
      var days = [];
      const eightHour= 8*60*60*1000; //8小时毫秒数
      getLastDay(this.selYear,this.selMonth);
        for (var i = 1; i <= len_days; i++) {
          let x = 0, y = 0;
          let everyday = this.selMonth + "/" + (i) + "/" + this.selYear
          everyday = Date.parse(everyday);
          let today = currentMonth () + "/" + currentDate () + "/" + currentYear ();
          today = Date.parse(today);

          if (everyday <= today -eightHour ) {
            y = true;
          }
          if (everyday === today) {
            x = true;
          }
          days.push({
            date: i,
            isSelected: false,
            isPast: y,
            isCurrentDate: x,
            go:'',
            back:'',
          })
        }
        return days;
    }



  },
  methods: {
    //选择我的'出发' 或 '返程' 日期
      getMyDay: function (index) {
        if (!this.days[index].isPast) {
          this.selDate = this.days[index].date;
          clearGo.call(this);
          this.days[index].isSelected = true;
          this.days[index].go = "去程";
//          this.selMonth
//          this.$emit('change', newDate);
        }
      },
//         单击左箭头，回翻日历，单击右箭头，向后翻日历
      pre: function () {
        if ( this.selMonth > currentMonth() ) {
          this.selMonth -= 1
        } else if (this.selMonth <= 1) {
          this.selYear -= 1;
          this.selMonth = 12;
        }
        if ( this.selMonth <= currentMonth() || this.selYear < currentYear() ) {
          this.isActive = false ;
          this.isGrey = true;

        }


      },
      next: function () {
        if (this.selMonth < 12) {
          this.selMonth = parseInt(this.selMonth);
          this.selMonth += 1;

        } else if (this.selMonth === 12) {
          this.selYear += 1;
          this.selMonth = 1;
        }
        this.isActive = true;
        this.isGrey = false;


      },

  }



  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


 h2{
   margin: 0;
 }

  #date-box .week,
  #date-box .date {
    display: flex;
    flex-wrap: wrap;
    font-size: 20px;
  }
  #date-box .week > li,
  #date-box .date > li{
    position: relative;
    width: 14%;
    margin-bottom: 10px;
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


  .cld-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    background: rgba(0,0,0,0.5);
  }
  .dateType {
    position: absolute;
    bottom:0;
    right:0;
    font-size: 12px;
    color: #000;
    background: #FF9800;
  }

  .pre.color {
    color: #bbb;
  }


</style>
