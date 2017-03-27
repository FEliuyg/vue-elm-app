<template id="seller">
  <div class="seller-wrapper" ref="seller">
    <div class="seller">
      <div class="seller-head">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="condition">
          <stars :size="36" :score="seller.score"></stars>
          <span class="rating-count">({{ seller.ratingCount }})</span>
          <span class="sell-count">月售{{ seller.sellCount}}单</span>
          <div class="favourite" @click="toggleFavourite">
            <i class="iconfont icon-favorite" :class="{'active': favourite}"></i>
            <span class="favourite-text">{{ favourite ? '已收藏' : '收藏'}}</span>
          </div>
        </div>
        <div class="service">
          <div class="service-item">
            <p class="service-text">起送价</p>
            <p><span class="service-num">{{ seller.minPrice }}</span>元</p>
          </div>
          <div class="service-item">
            <p class="service-text">商家配送</p>
            <p><span class="service-num">{{ seller.deliveryPrice }}</span>元</p>
          </div>
          <div class="service-item">
            <p class="service-text">平均配送时间</p>
            <p><span class="service-num">{{ seller.deliveryTime }}</span>分钟</p>
          </div>
        </div>
      </div>
      <div class="bar"></div>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="content border-1px">{{ seller.bulletin }}</p>
        <ul class="activity-list">
          <li class="activity-item border-1px" v-for="item in seller.supports">
            <i class="icon-support" :class="classMap[item.type]"></i>
            <span class="desc">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <div class="bar"></div>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics">
          <ul class="pic-list" :style="{'width': seller.pics && seller.pics.length * 126 - 6 + 'px'}">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" />
            </li>
          </ul>
        </div>
      </div>
      <div class="bar"></div>
      <div class="seller-info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="info-list">
          <li class="info-item border-1px" v-for="info in seller.infos">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { saveData, getData, getQueryString } from '@/common/scripts/util'
  import stars from '@/components/stars/stars'
  import BScroll from 'better-scroll'
  const sellerId = getQueryString('id')

  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favourite: getData(sellerId, 'favourite', false)
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted () {
      this._initScroll()
      this._initPicsScroll()
    },
    watch: {
      seller () {
        this._initScroll()
        this._initPicsScroll()
      }
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.seller, {
              click: true
            })
          } else {
            this.sellerScroll.refresh()
          }
        })
      },
      _initPicsScroll () {
        this.$nextTick(() => {
          if (!this.picsScroll) {
            this.picsScroll = new BScroll(this.$refs.pics, {
              click: true,
              scrollX: true
            })
          } else {
            this.picsScroll.refresh()
          }
        })
      },
      toggleFavourite () {
        this.favourite = !this.favourite
        saveData(sellerId, 'favourite', this.favourite)
      }
    },
    components: {
      stars
    }
  }
</script>

<style scope>
  .seller-wrapper {
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .seller-head {
    padding: 18px;
    position: relative;
  }
  .seller-wrapper .title {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }
  .seller-head .condition {
    display: flex;
    justify-content: flex-start;
    font-size: 10px;
    color: rgb(77, 85, 93);
    line-height: 18px;
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .seller-head .condition .rating-count {
    margin-left: 8px;
    margin-right: 12px;
  }
  .seller-head .service {
    display: flex;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .seller-head .service .service-item {
    flex: 1;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
    text-align: center;
  }
  .seller-head .service .service-item:last-child {
    border-right: none;
  }
  .seller-head .service .service-item .service-text {
    line-height: 10px;
    margin-bottom: 4px;
  }
  .seller-head .service .service-item .service-num {
    font-size: 24px;
    line-height: 24px;
    color: rgb(7, 17, 27);
    font-weight: 200;
  }
  .bulletin {
    padding: 18px 18px 0;
  }
  .bulletin .content {
    font-size: 12px;
    line-height: 24px;
    color: rgb(240, 20, 20);
    font-weight: 200;
    padding: 0 12px;
    padding-bottom: 16px;
  }
  .bulletin .activity-item {
    padding: 16px 12px;
    font-size: 12px;
    color: rgb(7, 17, 17);
    font-weight: 200;
    line-height: 16px;
  }
  .bulletin .activity-item:last-child:after {
    border: none;
  }
  .icon-support {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% 100%;
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
  .icon-support.decrease {
    background-image: url('decrease_4@2x.png');
  }
  .icon-support.discount {
    background-image: url('discount_4@2x.png');
  }
  .icon-support.special {
    background-image: url('special_4@2x.png');
  }
  .icon-support.guarantee {
    background-image: url('guarantee_4@2x.png');
  }
  .icon-support.invoice {
    background-image: url('invoice_4@2x.png');
  }
  .pics {
    padding: 16px;
    overflow: hidden;
  }
  .pics .pics-wrapper {
    width: 100%;
    overflow: hidden;
  }
  .pics .pic-list {
    height: 90px;
    white-space: nowrap;
  }
  .pics .pic-list .pic-item {
    float: left;
    margin-right: 6px;
  }
  .pics .pic-list .pic-item:last-child {
    margin-right: 0
  }
  .pics .pic-list .pic-item img {
    width: 120px;
    height: 90px;
  }
  .seller-info {
    padding: 18px 18px 0 18px;
  }
  .seller-info .title {
    margin-bottom: 0;
    padding-bottom: 12px;
  }
  .seller-info .info-item {
    padding: 16px 12px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 200;
    color: rgb(7, 17, 27);
  }
  .seller-info .info-item:last-child:after {
    border: none;
  }
  .favourite {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 36px;
    text-align: center;
  }
  .favourite .iconfont {
    font-size: 24px;
    line-height: 24px;
    color: rgb(147, 153, 159);
  }
  .favourite .iconfont.active {
    color: rgb(240, 20, 20);
  }
  .favourite .favourite-text {
    font-size: 10px;
    line-height: 10px;
    color: rgb(77, 85, 93);
  }
</style>
