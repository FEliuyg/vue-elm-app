<template id="food">
  <transition name="fly">
    <div class="food" v-show="showflag" ref="detail">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hideDetail">
            <i class="iconfont icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h2 class="name">{{ food.name }}</h2>
          <div class="num-rating">
            <span class="number">月售{{ food.sellCount }}</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now"><b>￥</b>{{ food.price }}</span>
            <span class="old" v-show="food.oldPrice">{{ food.oldPrice }}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <transition name="fade">
              <div class="first-cart" v-show="!food.count" @click="firstAdd">加入购物车</div>
            </transition>
            <cartcontrol :food="food" v-show="food.count" @add="addMore"></cartcontrol>
          </div>
        </div>
        <div class="bar"></div>
        <div class="desc">
          <h3 class="title">商品介绍</h3>
          <p class="desc-content">{{ food.info }}</p>
        </div>
        <div class="bar"></div>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <ratingselect :ratings="food.ratings" :rating-type="ratingType" :only-content="onlyContent" @selectType="selectType" @toggleContent="toggleContent"></ratingselect>
          <div class="rating-list">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="showRatingItem(rating)">
                <div class="head">
                  <span class="time">{{ rating.rateTime | timeformat}}</span>
                  <div class="user">
                    <span class="name">{{ rating.username }}</span>
                    <img :src="rating.avatar" class="avatar"/>
                  </div>
                </div>
                <div class="rating-content">
                  <i class="iconfont" :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></i>
                  <span class="text">{{ rating.text || '暂未评论' }}</span>
                </div>
              </li>
            </ul>
            <div class="on-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import ratingselect from '@/components/ratingselect/ratingselect'
  import moment from 'moment'
  const ALL = 2
  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showflag: false,
        ratingType: ALL,
        onlyContent: true
      }
    },
    methods: {
      showDetail () {
        this.showflag = true
        this.ratingType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.detailScroll) {
            this.detailScroll = new BScroll(this.$refs.detail, {
              click: true
            })
          } else {
            this.detailScroll.refresh()
          }
        })
      },
      hideDetail () {
        this.showflag = false
      },
      firstAdd (e) {
        if (!e._constructed) return
        console.log('1')
        Vue.set(this.food, 'count', 1)
        this.$emit('add', e.target)
      },
      addMore (e) {
        this.$emit('add', e)
      },
      selectType (type) {
        this.ratingType = type
        this.$nextTick(() => {
          this.detailScroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.detailScroll.refresh()
        })
      },
      showRatingItem (rating) {
        if (!rating.text && this.onlyContent) {
          return false
        }
        if (this.ratingType === ALL) {
          return true
        } else if (rating.rateType === this.ratingType) {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      cartcontrol,
      ratingselect
    },
    filters: {
      timeformat (timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>

<style scope>
  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
    z-index: 50;
  }
  .fly-enter-active, .fly-leave-active {
    transition: all 0.4s linear;
  }
  .fly-enter, .fly-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .image-header {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }
  .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .image-header .back {
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 8px;
    color: #fff;
    font-size: 12px;
  }
  .food .content {
    padding: 18px;
    position: relative;
  }
  .food .name {
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: rgb(7, 17, 17);
    margin-bottom: 8px;
  }
  .food .num-rating {
    color: rgb(147, 153, 159);
    font-size: 10px;
    line-height: 10px;
    margin-bottom: 18px;
  }
  .food .num-rating .rating {
    margin-left: 12px;
  }
  .food .now {
    font-size: 14px;
    font-weight: bold;
    color: rgb(240, 20, 20);
    line-height: 24px;
  }
  .food .now b {
    font-size: 10px;
    font-weight: normal;
  }
  .food .old {
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    text-decoration: line-through;
  }
  .food .cartcontrol-wrapper {
    position: absolute;
    right: 18px;
    bottom: 18px;
  }
  .food .first-cart {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 74px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    border-radius: 12px;
    background-color: rgb(0, 160, 220);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.2s linear;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .food .bar {
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }
  .food .desc {
    padding: 18px;
  }
  .food .title {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 6px;
  }
  .food .desc-content {
    font-size: 12px;
    color: rgb(77, 85, 93);
    line-height: 24px;
  }
  .food .rating{
    padding: 18px 0;
  }
  .food .rating .title {
    margin-left: 18px;
  }
  .food .rating-list {
    padding: 0 18px;
  }
  .food .rating-list .rating-item {
    padding: 16px 0;
  }
  .food .rating-item .head {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 12px;
    margin-bottom: 6px;
  }
  .food .rating-item .name {
    margin-right: 6px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food .rating-item .avatar {
    width: 12px;
    height: 12px;
  }
  .food .rating-item .iconfont {
    font-size: 12px;
    line-height: 24px;
    margin-right: 4px;
  }
  .food .rating-item .iconfont.icon-thumb_up {
    color: rgb(0, 160, 220);
  }
  .food .rating-item .iconfont.icon-thumb_down {
    color: rgb(147, 153, 159);
  }
  .food .rating-item .text {
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 16px;
  }
  .food .no-rating {
    font-size: 12px;
    color: rgb(147, 153, 159);
    text-align: center;
    line-height: 48px;
  }
</style>
