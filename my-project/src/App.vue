<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1 v-text="title"></h1>
    <input v-model.trim ="newItem" type="text" @keyup.enter="addNew()">
    <ul class="list">
      <li @mouseleave="hideCancel(item, index)" @mouseenter="showCancel(item, index)" @click.stop="toggleFinish(item, index)" v-for="(item, index) in items" :class=[liClass,{finished:item.isFinished}]>
        {{item.label}} <span class="cancel-btn" v-show="item.isCancel" @click.stop="removeItem(index, item)">✘</span>
      </li>
      <li> {{msg}} </li>
      <!--<li v-show="ino-ifo === 0 "> no holding items.</li>-->
    </ul>
    <ul v-if="allItems.length!=0" class="recap">
      <li @click="showAllItems()">total items : <span>{{ ino }} </span></li>
      <li @click="showFinished()">finished items : <span> {{ ifo }} </span></li>
      <li @click="showHolding()">holding items : <span>{{ ino-ifo }} </span></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      title: 'this is a todo list',
      allItems: [],
      items: [],
      liClass: {
        liClass: {}
      },
      newItem: '',
      ino: 0,
      ifo: 0,
      msgBox: '',
      msg: ''
    }
  },
  methods: {
    updateLS: function (item, index) {
      let lstr = localStorage.getItem('lists')
      let arr = JSON.parse(lstr)
      arr[index] = item
      let str = JSON.stringify(arr)
      localStorage.lists = str
      localStorage.getItem('lists')
    },
    toggleFinish: function (item, index) {
      item.isFinished = !item.isFinished
      if (item.isFinished === true) {
        this.ifo += 1
        this.updateLS(item, index)
      } else {
        this.ifo -= 1
        this.updateLS(item, index)
      }
    },
    addNew: function () {
      let lstr = localStorage.getItem('lists')
      if (lstr) {
        let arr = JSON.parse(lstr)
        this.allItems = arr
        let subArr = arr.filter(function (val) {
          return val.isFinished === true
        })
        this.ifo = subArr.length
      }
      this.allItems.push({
        label: this.newItem,
        isFinished: false,
        isCancel: false
      })
      let str = JSON.stringify(this.allItems)
      localStorage.setItem('lists', str)
      this.items = this.allItems
      this.newItem = ''
      this.ino = this.allItems.length
      this.msg = ''
    },
    showCancel: function (item, index) {
      if (item.isCancel === false) {
        item.isCancel = true
      }
      this.updateLS(item, index)
    },
    hideCancel: function (item, index) {
      if (item.isCancel === true) {
        item.isCancel = false
      }
      this.updateLS(item, index)
    },
    removeItem: function (index, item) {
      this.items.splice(index, 1)
      this.ino = this.allItems.length
      if (item.isFinished === true) {
        this.ifo -= 1
      }
      this.updateLS(item, index)
      let lstr = localStorage.getItem('lists')
      let arr = JSON.parse(lstr)
      arr.splice(index, 1)
      let str = JSON.stringify(arr)
      localStorage.lists = str
      localStorage.getItem('lists')
    },
    showAllItems: function () {
      this.msg = ''
      this.items = this.allItems
    },
    showFinished: function () {
//      let finished = []
//      for (let i = 0; i < this.allItems.length; i++) {
//        if (this.allItems[i].isFinished === true) {
//          finished.push(this.allItems[i])
//        }
//      }
      this.msg = ''
      let finished = this.allItems.filter(function (val) {
        return (val.isFinished === true)
      })
      this.items = finished
      if (this.ifo === 0) {
        this.msgBox = 'no finished items'
        this.msg = this.msgBox
      }
    },
    showHolding: function () {
      this.msg = ''
      let holding = this.allItems.filter(function (val) {
        return (val.isFinished === false)
      })
      this.items = holding
      if (this.ino - this.ifo === 0) {
        this.msgBox = 'no holding items'
        this.msg = this.msgBox
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .liClass, .list{
    color: blue;
    width: 200px;
    margin:10px auto;
  text-align: left;
  list-style: disc;

  }
 .list{
  color: red;
   list-style: none;

}
#app .finished{
  text-decoration: line-through;
  color: #999;
}

#app li .cancel-btn{
    margin-left:20px;
    color:red;
  }
#app  input {
    width:300px;
    height: 30px;
  }
.recap {
    display: flex;
    list-style: none;
    width: 500px;
    margin:10px auto;

  }
.recap li{
  margin-right: 20px;
}
.recap li span{
  font-weight: bold;
  color: green;
  text-decoration: underline;
}

</style>
