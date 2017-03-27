<template id="ratings">
  <div class="ratings-wrapper" ref="ratings">
    <div class="ratings">
      <div class="ratings-head">
        <div class="head-left-wrapper">
          <span class="score">{{ seller.score }}</span>
          <b>综合评分</b>
          <p class="rank-rate">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="head-right-wrapper">
          <div class="rating-item">
            <span class="label">商品评分</span>
            <stars :size="36" :score="seller.foodScore"></stars>
            <span class="rating-num">{{ seller.foodScore }}</span>
          </div>
          <div class="rating-item">
            <span class="label">服务态度</span>
            <stars :size="36" :score="seller.serviceScore"></stars>
            <span class="rating-num">{{ seller.serviceScore }}</span>
          </div>
          <div class="rating-item">
            <span class="label">送达时间</span>
            <span class="delivery-time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <div class="bar"></div>
      <div class="ratings-content">
        <ratingselect :ratings="ratingsList" :rating-type="ratingType" :only-content="onlyContent" @selectType="selectType" @toggleContent="toggleContent" :desc="desc"></ratingselect>
        <div class="ratings-list">
          <ul v-show="ratingsList.length">
            <li v-for="rating in ratingsList" class="rating-item border-1px" v-show="showRatingItem(rating)">
              <div class="avatar-wrapper">
                <img :src="rating.avatar" class="avatar"/>
              </div>
              <div class="content">
                <div class="name-time">
                  <span class="name">{{ rating.username }}</span>
                  <span class="time">{{ rating.rateTime | timeformat}}</span>
                </div>
                <div class="stars-delivery">
                  <stars :size="24" :score="rating.score"></stars>
                  <span class="delivery">{{ rating.deliveryTime && rating.deliveryTime + '分钟送达'}}</span>
                </div>
                <div class="text">{{ rating.text }}</div>
                <div class="recommend">
                  <i class="iconfont" :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></i>
                  <span class="label" v-for="label in rating.recommend">{{ label }}</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="on-rating" v-show="ratingsList.length === 0">暂无评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import stars from '@/components/stars/stars'
  import ratingselect from '@/components/ratingselect/ratingselect'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import moment from 'moment'
  const ALL = 2
  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      stars,
      ratingselect
    },
    data () {
      return {
        ratingsList: [],
        ratingType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    created () {
      axios.get('/api/ratings')
        .then((res) => {
          if (res.data.success) {
            this.ratingsList = res.data.data
            this.$nextTick(() => {
              if (!this.ratingsScroll) {
                this.ratingsScroll = new BScroll(this.$refs.ratings, {
                  click: true
                })
              } else {
                this.ratingsScroll.refresh()
              }
            })
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    methods: {
      selectType (type) {
        this.ratingType = type
        this.$nextTick(() => {
          this.ratingsScroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.ratingsScroll.refresh()
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
    filters: {
      timeformat (timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>

<style scope>
.ratings-wrapper {
  position: absolute;
  top: 174px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.ratings .bar {
  height: 16px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  background: #f3f5f7;
}
.ratings-head {
  display: flex;
  padding: 18px 0;
}
.ratings-head .head-left-wrapper {
  width: 137px;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.ratings-head .head-left-wrapper .score {
  font-size: 24px;
  color: rgb(255, 153, 0);
  line-height: 28px;
  margin-bottom: 6px;
}
.ratings-head .head-left-wrapper b {
  color: rgb(7, 17, 27);
  font-size: 12px;
  margin-bottom: 8px;
}
.ratings-head .head-left-wrapper .rank-rate {
  font-size: 10px;
  color: rgba(7, 17, 27, .5);
  margin-bottom: 6px;
}
.ratings-head .head-right-wrapper {
  flex: 1;
  padding: 4px 0;
}
.ratings-head .head-right-wrapper .rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.ratings-head .head-right-wrapper .rating-item:last-child {
  margin-bottom: 0;
}
.ratings-head .head-right-wrapper .label {
  font-size: 12px;
  line-height: 18px;
  color: rgb(7, 17, 27);
  margin-right: 12px;
  margin-left: 24px;
}
.ratings-head .head-right-wrapper .rating-num {
  font-size: 12px;
  color: rgb(255, 153, 0);
  margin-left: 12px;
  line-height: 18px;
}
.ratings-head .head-right-wrapper .delivery-time {
  font-size: 12px;
  line-height: 18px;
  color: rgb(147, 153, 159);
}
@media only screen and (max-width: 320px) {
  .ratings-head .head-left-wrapper {
    width: 122px;
  }
  .ratings-head .head-right-wrapper .label {
    margin-left: 4px;
  }
  .ratings-head .head-right-wrapper .rating-num{
    margin-left: 4px;
  }
}
.ratings-list {
  padding: 0 18px;
}
.ratings-list .rating-item {
  padding: 18px 0;
  display: flex;
}

.ratings-list .avatar {
  width: 28px;
  height: 28px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}
.ratings-list .content {
  flex: 1;
}
.ratings-list .name-time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  line-height: 12px;
  font-size: 10px;
}
.ratings-list .name {
  color: rgb(7, 17, 27);
}
.ratings-list .time {
  color: rgb(147, 153, 159);
}
.ratings-list .stars-delivery {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 6px;
  line-height: 16px;
}
.ratings-list .delivery {
  font-size: 10px;
  color: rgb(147, 153, 159);
  margin-left: 6px;
}
.ratings-list .text {
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 18px;
}
.ratings-list .iconfont {
  font-size: 12px;
  line-height: 24px;
  margin-right: 8px;
}
.ratings-list .iconfont.icon-thumb_up {
  color: rgb(0, 160, 220);
}
.ratings-list .iconfont.icon-thumb_down {
  color: rgb(147, 153, 159);
}
.ratings-list .label {
  padding: 0 8px;
  border: 1px solid rgba(7, 17, 27, 0.1);
  border-radius: 2px;
  margin-right: 8px;
  font-size: 9px;
  color: rgb(147, 153, 159);
  line-height: 16px;
}
.ratings-list .label:last-child {
  margin-right: 0;
}
</style>
