<template>
  <div id="app">
    <HeaderComponent :seller="seller"></HeaderComponent>
    <div class="tab border-1px">
      <router-link to="/goods" active-class="active">商品</router-link>
      <router-link to="/ratings" active-class="active">评价</router-link>
      <router-link to="/seller" active-class="active">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/header'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    HeaderComponent
  },
  created () {
    axios.get('/api/seller')
      .then((res) => {
        if (res.data.success) {
          this.seller = res.data.data
        } else {
          console.log(res.data.errMsg)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scope>
  html,body,#app {
    height: 100%;
  }
  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab a {
    flex: 1;
    display: block;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
  .tab a.active {
    color: rgb(240, 20, 20);
  }
</style>
