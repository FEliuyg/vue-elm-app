<template id="header">
  <div class="header">
    <div class="shop-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" />
      </div>
      <div class="info">
        <div class="title">
          <i class="icon-brand"></i>
          <span>{{ seller.name }}</span>
        </div>
        <div class="delivery">
          <span>{{ seller.description}}</span> /
          <span>{{ seller.deliveryTime }}分钟送达</span>
        </div>
        <div v-if="seller.supports" class="supports">
          <i class="icon-support" :class="classMap[seller.supports[0].type]"></i>
          <span>{{ seller.supports[0].description }}</span>
          <div class="supports-num" @click="showDetail">
            <span>{{ seller.supports.length }}个</span><i class="iconfont icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <i class="icon-bulletin"></i>
      <span>{{ seller.bulletin }}</span>
      <i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" />
    </div>
    <transition name="fade">
      <div class="seller-detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="main">
            <div class="name">{{ seller.name }}</div>
            <div class="star">
              <Stars size="48" :score="seller.score"/>
            </div>
            <div class="title">
              <span class="line"></span>
              <h2>优惠信息</h2>
              <span class="line"></span>
            </div>
            <ul class="supports-list" v-if="seller.supports">
              <li v-for="item in seller.supports">
                <i class="icon-support" :class="classMap[item.type]"></i>
                <span>{{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <span class="line"></span>
              <h2>商家公告</h2>
              <span class="line"></span>
            </div>
            <div class="content">
              <p>{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="close" @click="hideDetail">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Stars from '@/components/stars/stars'
  export default {
    name: 'header',
    props: ['seller'],
    data () {
      return {
        detailShow: false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      Stars
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    }
  }
</script>

<style scope>
  .header {
    color: #fff;
    font-size: 10px;
    position: relative;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.5);
  }
  .shop-wrapper {
    padding: 24px 12px 18px 24px;
    display: flex;
  }
  .shop-wrapper .avatar {
    width: 64px;
    height: 64px;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 16px;
  }
  .shop-wrapper .avatar img {
    width: 100%;
    height: 100%;
  }
  .info {
    flex: 1;
    position: relative;
  }
  .info .title {
    font-size: 16px;
    font-weight: bold;
    margin: 2px 0 8px 0;
  }
  .info .delivery {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .info .supports-num {
    position: absolute;
    display: flex;
    right: 0;
    bottom: 0;
    padding: 0 8px;
    border-radius: 100px;
    line-height: 24px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .icon-brand {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 18px;
    background-image: url('brand@2x.png');
    background-size: 100% 100%;
    margin-top: -2px;
    margin-right: 6px;
  }
  .icon-support {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% 100%;
    margin-top: -2px;
    width: 12px;
    height: 12px;
  }
  .icon-bulletin {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% 100%;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background-image: url('bulletin@2x.png');
    margin-right: 4px;
  }
  .icon-support.decrease {
    background-image: url('decrease_1@2x.png');
  }
  .icon-support.discount {
    background-image: url('discount_1@2x.png');
  }
  .icon-support.special {
    background-image: url('special_1@2x.png');
  }
  .icon-support.invoice {
    background-image: url('invoice_1@2x.png');
  }
  .icon-support.guarantee {
    background-image: url('guarantee_1@2x.png');
  }
  .bulletin-wrapper {
    display: flex;
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    background-color: rgba(7 , 17, 27, 0.2);
  }
  .bulletin-wrapper span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);
  }
  .background img {
    width: 100%;
    height: 100%;
  }

  .seller-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 100;
    backdrop-filter: blur(10px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s,
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .detail-wrapper {
    padding: 64px 0;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
  }
  .seller-detail .close {
    position: relative;
    margin: -64px auto 0 auto;
    text-align: center;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.5)
  }
  .main {
    width: 80%;
    margin: 0 auto;
  }
  .main .name {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .main .title {
    display: flex;
    align-items: center;
  }
  .main .title .line {
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .main .title h2 {
    padding: 0 12px;
    font-size: 14px;
    font-weight: bold;
    margin: 28px 0 24px 0;
  }
  .main .supports-list {
    font-size: 12px;
    padding: 0 12px;
  }
  .main .supports-list li {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
  .main .supports-list li:last-child {
    margin-bottom: 0;
  }
  .main .supports-list li span {
    margin-left: 6px;
  }
  .main .content {
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
  }
  .main .icon-support {
    width: 16px;
    height: 16px;
  }
  .main .icon-support.decrease {
    background-image: url('decrease_2@2x.png');
  }
  .main .icon-support.discount {
    background-image: url('discount_2@2x.png');
  }
  .main .icon-support.special {
    background-image: url('special_2@2x.png');
  }
  .main .icon-support.invoice {
    background-image: url('invoice_2@2x.png');
  }
  .main .icon-support.guarantee {
    background-image: url('guarantee_2@2x.png');
  }
</style>
