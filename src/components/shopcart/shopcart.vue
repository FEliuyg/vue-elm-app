<template id="shopcart">
  <div class="shopcart">
    <div class="left-wrapper" @click="showShopcartList">
      <div class="cart-icon-wrapper">
        <div class="cart-icon" :class="{'active': totalCount !== 0}">
          <i class="iconfont icon-shopping_cart"></i>
          <span class="count" v-show="totalCount !== 0">{{ totalCount }}</span>
        </div>
      </div>
      <div class="total" :class="{'active': totalCount !== 0}">￥{{ totalPrice }}</div>
      <div class="desc">另需配送费¥{{ deliveryPrice }}元</div>
    </div>
    <div class="right-wrapper" :class="{'active': enough}" @click="pay">{{ deliveryText }}</div>
    <div class="ball-container">
      <transition-group name="drop" tag="div" @before-enter="dropBeforeEnter" @enter="dropEnter" @after-enter="dropAfterEnter">
        <div class="ball-wrapper" v-for="item in balls" v-show="item.show" :key="item.id">
          <span class="inner inner-hook"></span>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="showList">
        <div class="list-header">
          <span class="title">购物车</span>
          <a class="clean" @click="cleanSelectGoods">清空</a>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="item in selectGoods" class="list-item border-1px">
              <span class="name">{{ item.name }}</span>
              <span class="price">￥{{ item.price * item.count }}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="mask" v-show="showList"></div>
    </transition>
  </div>
</template>

<script>
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  export default {
    name: 'shopcart',
    props: {
      selectGoods: {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 0
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            id: 1,
            show: false
          },
          {
            id: 2,
            show: false
          },
          {
            id: 3,
            show: false
          },
          {
            id: 4,
            show: false
          },
          {
            id: 5,
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectGoods.map(item => {
          total += item.price * item.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectGoods.map(item => {
          count += item.count
        })
        return count
      },
      deliveryText () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      enough () {
        if (this.totalCount > 0 && this.totalPrice >= this.minPrice) {
          return true
        } else {
          return false
        }
      },
      showList () {
        if (!this.selectGoods.length) {
          return false
        }
        var show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.cartListScroll) {
              this.cartListScroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.cartListScroll.refresh()
            }
          })
        }
        return !this.fold
      }
    },
    methods: {
      handleDropBalls (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      dropBeforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 44)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropEnter (el) {
        /* eslint-disable no-unused-vars */
        // let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      dropAfterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      showShopcartList () {
        if (!this.selectGoods.length) {
          return
        }
        this.fold = !this.fold
      },
      cleanSelectGoods () {
        this.selectGoods.forEach(item => {
          item.count = 0
        })
      },
      pay () {
        if (!this.totalPrice || this.totalPrice < this.minPrice) return
        window.alert('支付' + this.totalPrice + '元')
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style scope>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    background-color: #141d27;
    display: flex;
    z-index: 90;
  }
  .shopcart .left-wrapper {
    flex: 1;
    display: flex;
    background-color: #141d27;
  }
  .shopcart .cart-icon-wrapper {
    position: relative;
    margin-top: -10px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #141d27;
    padding: 6px;
    margin-left: 15px;
    box-sizing: border-box;
  }
  .shopcart .cart-icon {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
  .shopcart .cart-icon.active {
    background-color: rgb(0, 160, 220);
    color: #fff;
  }
  .shopcart .cart-icon .icon-shopping_cart {
    font-size: 24px;
    line-height: 44px;
  }
  .shopcart .cart-icon .count {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    background-color: #f01414;
    color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    font-weight: bold;
    border-radius: 8px;
    font-size: 10px;
  }
  .shopcart .total {
    height: 24px;
    margin-top: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    width: 50px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
  }
  .shopcart .total.active {
    color: #fff;
  }
  .shopcart .desc {
    padding: 0 12px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    line-height: 48px;
  }
  .shopcart .right-wrapper {
    width: 105px;
    height: 48px;
    line-height: 48px;
    box-sizing: border-box;
    padding:  0 8px;
    text-align: center;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    background-color: #2b333b;
  }
  .shopcart .right-wrapper.active {
    background-color: #00b43c;
    color: #fff;
  }
  .ball-container {
    position: fixed;
    left: 32px;
    bottom: 20px;
    z-index: 50;
  }
  .ball-container .ball-wrapper {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .ball-container .ball-wrapper .inner {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgb(0, 160, 220);
  }
  .drop-enter-active {
    transition: all .5s cubic-bezier(.27, -0.51, .84, .51);
  }
  .drop-enter-active .inner {
    transition: all .5s linear;
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }
  .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    display: flex;
    justify-content: space-between;
    padding: 0 18px;
  }
  .shopcart-list .list-header .title {
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopcart-list .list-header .clean {
    font-size: 12px;
    color: rgb(0, 160, 220);
  }
  .shopcart-list .list-content {
    padding: 0 18px;
    background-color: #fff;
    max-height: 192px;
    overflow: hidden;
  }
  .shopcart-list .list-content .list-item {
    height: 48px;
    position: relative;
  }
  .shopcart-list .name {
    line-height: 48px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopcart-list .price {
    font-size: 12px;
    color: rgb(240, 20, 20);
    font-weight: 700;
    position: absolute;
    right: 86px;
    bottom: 14px;
  }
  .shopcart-list .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .fold-enter-active, .fold-leave-active {
    transition: all 0.5s linear;
  }
  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.6);
    z-index: -3;
    backdrop-filter: blur(10px);
  }
  .mask-enter-active, .mask-leave-active {
    transition: all 0.5s linear;
  }
  .mask-enter, .mask-leave-active {
    opacity: 0;
  }
</style>
