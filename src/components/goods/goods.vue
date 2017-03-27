<template id="goods">
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul class="menu-list">
        <li v-for="(item, index) in goods" class="menu-item border-1px" :class="activeIndex === index ? 'active' : ''" @click="handleMenuClick(index, $event)">
          <div class="item-wrapper">
            <i class="icon-support" v-if="item.type !== -1" :class="classMap[item.type]"></i>
            <span>{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goods">
      <ul class="goods-list">
        <li v-for="cate in goods" class="cate-item cate-item-hook">
          <h3 class="title">{{ cate.name }}</h3>
          <ul class="cate">
            <li v-for="item in cate.foods" class="good-item border-1px" @click="selectFood(item)">
              <div class="img">
                <img :src="item.image">
              </div>
              <div class="content">
                <h4 class="food-name">{{ item.name }}</h4>
                <p class="desc" v-if="item.description">{{ item.description }}</p>
                <p class="sellRating">
                  <span>月售{{ item.sellCount }}</span>
                  <span class="rating">好评率{{ item.rating }}%</span>
                </p>
                <div class="priceNumber">
                  <div>
                    <span class="price"><span class="dollar">￥</span>{{ item.price }}</span>
                    <b v-if="item.oldPrice" class="old-price">￥{{ item.oldPrice }}</b>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="item" @add="_drop"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectGoods="selectGoods" ref="shopcart"></shopcart>
    <food ref="food" :food="selectedFood" @add="_drop"></food>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import food from '@/components/food/food'
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        heights: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      activeIndex () {
        for (let i = 0; i < this.heights.length; i++) {
          let height1 = this.heights[i]
          let height2 = this.heights[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      selectGoods () {
        var selectFoods = []
        this.goods.map(item => {
          item.foods.map(food => {
            if (food.count > 0) {
              selectFoods.push(food)
            }
          })
        })
        return selectFoods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special']
      axios.get('/api/goods')
        .then((res) => {
          if (res.data.success) {
            this.goods = res.data.data
            this.$nextTick(() => {
              this._initScroll()
              this._calcHeight()
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        })
        this.goodsScroll = new BScroll(this.$refs.goods, {
          click: true,
          probeType: 3
        })

        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = -Math.round(pos.y)
        })
      },
      _calcHeight () {
        let cates = this.$refs.goods.getElementsByClassName('cate-item-hook')
        let height = 0
        this.heights.push(height)
        for (let i = 0; i < cates.length; i++) {
          height += cates[i].clientHeight
          this.heights.push(height)
        }
      },
      _drop (target) {
        // 性能优化，防止两个动画同时执行产生卡顿
        this.$nextTick(() => {
          this.$refs.shopcart.handleDropBalls(target)
        })
      },
      handleMenuClick (index, e) {
        if (!e._constructed) return
        let cates = this.$refs.goods.getElementsByClassName('cate-item-hook')
        let el = cates[index]
        this.goodsScroll.scrollToElement(el, 300)
      },
      selectFood (food) {
        this.selectedFood = food
        this.$refs.food.showDetail()
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style scope>
  .goods {
    position: absolute;
    top: 174px;
    bottom: 48px;
    width: 100%;
    display: flex;
  }
  .menu-wrapper {
    width: 80px;
    background-color: #f3f5f7;
    color: rgb(77, 85, 93);
    font-size: 12px;
    overflow: hidden;
  }
  .menu-wrapper .menu-item {
    width: 56px;
    height: 54px;
    padding: 0 12px;
    display: table;
    position: relative;
  }
  .menu-wrapper .menu-item.active {
    background-color: #fff;
    position: relative;
    margin-top: -2px;
    z-index: 10;
    border: 1px solid #fff;
  }
  .menu-wrapper .menu-item.active:after {
    border: none;
  }
  .menu-wrapper .menu-item:after {
    width: 56px;
    left: 12px;
  }
  .menu-wrapper .item-wrapper{
    display: table-cell;
    vertical-align: middle;
    line-height: 14px;
  }
  .icon-support {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% 100%;
    margin-top: -2px;
    width: 12px;
    height: 12px;
  }
  .icon-support.decrease {
    background-image: url('decrease_3@2x.png');
  }
  .icon-support.discount {
    background-image: url('discount_3@2x.png');
  }
  .icon-support.special {
    background-image: url('special_3@2x.png');
  }
  /*商品列表样式*/
  .goods-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .goods-wrapper .title {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    background-color: #f3f5f7;
    padding-left: 14px;
    border-left: 2px solid #d9dde1;
    color: rgb(147, 153, 159);

  }
  .goods-wrapper .cate {
    padding: 0 18px;
  }
  .goods-wrapper .good-item {
    position: relative;
    padding: 18px 0;
    display: flex;
  }
  .goods-wrapper .good-item:last-child:after {
    border: none;
  }
  .goods-wrapper .good-item .img {
    width: 75px;
    height: 75px;
    overflow: hidden;
    margin-right: 10px;
  }
  .goods-wrapper .good-item .img img {
    width: 100%;
    height: 100%;
  }
  .goods-wrapper .good-item .content {
    flex: 1;
  }
  .goods-wrapper .good-item .food-name {
    font-size: 14px;
    margin: 2px 0 8px 0;
    color: rgb(7, 17, 27);
    font-weight: bold;
  }
  .goods-wrapper .good-item .desc,
  .goods-wrapper .good-item .sellRating {
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-bottom: 8px;
  }
  .goods-wrapper .good-item .rating {
    margin-left: 12px;
  }
  .goods-wrapper .good-item .priceNumber {
    display: flex;
    justify-content: space-between;
  }
  .goods-wrapper .good-item .price {
    color: rgb(240, 20, 20);
    font-size: 16px;
    font-weight: bold;
  }
  .goods-wrapper .good-item .price .dollar {
    font-size: 12px;
  }
  .goods-wrapper .good-item .old-price {
    text-decoration: line-through;
    color: rgb(147, 153, 159);
    margin-left: 8px;
    font-size: 10px;
  }
  .goods-wrapper .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 8px;
  }
</style>
