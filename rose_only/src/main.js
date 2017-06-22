// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'//图片懒加载
import VueResource from 'vue-resource';
import VueSwiper from 'vue-swiper';


Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/default_list_pro_img.png',
  loading: '/static/img/default_list_pro_img.png',
  attempt: 2,
  listenEvents: [ 'scroll' ]
});

Vue.use(VueResource);
Vue.use(VueSwiper);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


