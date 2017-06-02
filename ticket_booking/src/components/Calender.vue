<template>
  <div id="date-box">
    <h2>
      <b @click="pre" class="pre">&lt;</b>
      {{selYear}}年{{selMonth}}月
      <b @click="next">&gt;</b>
    </h2>
    <ul class="week">
      <li v-for="day in week">{{day}}</li>
    </ul>
    <ul class="date">
      <li v-for="space in spaces">{{space}}</li>
      <li @click.prevent="getMyDay(index)"  :class="[{pastDate: day.isDisabled, currentDate: day.isToday, selected: day.isSelected}]" v-for="(day, index) in days"  >{{day.date}}</li>
    </ul>
  </div>
</template>

<script>
  const d = new Date;
  let len_days;
  function currentYear () {
    return d.getFullYear ()
  }
  function currentMonth () {
    return d.getMonth()+1
  }
  function currentDate () {
    return d.getDate()
  }
  // 获取每月的最后一天
  function getLastDay (year,month) {
    let new_year = year;
    let new_month = month++;
    if (month > 12) {
      new_month -= 12;
      new_year++;
    }
    let new_date = new Date(new_year,new_month,1); //取当年当月中的第一天
    return len_days = ( new Date(new_date.getTime() - 1000*60*60*24) ).getDate();//获取当月最后一天日期
  }
  export default {
    name: 'calender',
    props: ['value','limit'],
    data () {
      return {
      selYear: new Date(this.value).getFullYear() || new Date().getFullYear(),
      selMonth: new Date(this.value).getMonth()+1 || new Date().getMonth()+1,
      time: Date.parse(this.value),
      week: ["日","一","二","三","四","五","六"],
      }
    },
    computed: {
      //每月首行的空格数
      spaces: function () {
        //获取当月的第一天日期并将其格式化为日期对象，再转化为星期
        if (this.selMonth < 10) {
          this.selMonth = "0" + this.selMonth;
        }
        let firstDay = this.selMonth+"/"+"01/"+this.selYear;
        let d = new Date(firstDay);
        let w = d.getDay();
        let spaces = [];
        for (let i = 1; i <= w; i++) {
          spaces.push(' ')
        }
        return spaces;
      },
      //渲染每月的天数
      days : function () {
        let days = [];
        getLastDay(this.selYear,this.selMonth);
        for (let i = 1; i <= len_days; i++) {
          let everyday = this.selMonth + "/" + (i) + "/" + this.selYear;
          everyday = Date.parse(everyday);
          //从行程表中传入一个属性limit，限制日历可点击区域
          let disabled = false;
          if(this.limit){//调用limit属性中的方法
              disabled = this.limit(new Date(everyday));
          }
          let today = currentMonth() + "/" + currentDate() + "/" + currentYear();
          today = Date.parse(today);
          days.push({
            date: i,
            isSelected: this.time === everyday,
            isDisabled: disabled,
            isToday: today === everyday,
            go:'',
            back:'',
            time: everyday
          });
        }
        return days;
      },
    },
    methods: {
      //选择我的'出发' 或 '返程' 日期
      getMyDay: function (index) {
        if (!this.days[index].isDisabled) {
          let time = this.days[index].time;
          this.time = time;
          this.$emit('input', new Date(time)); //将选择日期传回父组件
        }
      },
     //单击左箭头:回翻日历，单击右箭头:向后翻日历
      pre: function () {
          this.selMonth -= 1;
        if (this.selMonth <= 1) {
          this.selYear -= 1;
          this.selMonth = 12;
        }
      },
      next: function () {
        if (this.selMonth < 12) {
          this.selMonth = parseInt(this.selMonth);
          this.selMonth += 1;
        }else if (this.selMonth === 12) {
          this.selYear += 1;
          this.selMonth = 1;
        }
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
    border-radius: 3px;
    box-shadow: 1px 1px 10px #000;
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
  .dateType {
    position: absolute;
    bottom:0;
    right:0;
    font-size: 12px;
    color: #000;
    background: #FF9800;
  }
</style>
