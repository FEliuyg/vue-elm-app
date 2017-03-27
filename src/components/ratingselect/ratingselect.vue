<template id="ratingselect">
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active': ratingType === 2}" @click="selectRatingType(2)">{{ desc.all }} <b>{{ ratings.length }}</b></span>
      <span class="block positive" :class="{'active': ratingType === 0}" @click="selectRatingType(0)">{{ desc.positive }} <b>{{ positiveNum }}</b></span>
      <span class="block negative" :class="{'active': ratingType === 1}" @click="selectRatingType(1)">{{ desc.negative }} <b>{{ negativeNum }}</b></span>
    </div>
    <div class="only-content">
      <i class="iconfont icon-check_circle" @click="toggaleOnlyContent" :class="{'active': onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const ALL = 2
  export default {
    name: 'ratingselect',
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        }
      },
      ratingType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    computed: {
      positiveNum () {
        let positive = this.ratings.filter(rating => rating.rateType === 0)
        return positive.length
      },
      negativeNum () {
        let negative = this.ratings.filter(rating => rating.rateType === 1)
        return negative.length
      }
    },
    methods: {
      selectRatingType (type) {
        this.$emit('selectType', type)
      },
      toggaleOnlyContent () {
        this.$emit('toggleContent')
      }
    }
  }
</script>

<style scope>
  .ratingselect {
    padding: 18px 18px 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .ratingselect .rating-type {
    display: flex;
    padding-bottom: 18px;
  }
  .ratingselect .rating-type .block {
    padding: 8px 12px;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    color: rgb(77, 85, 93);
    margin-right: 8px;
  }
  .ratingselect .rating-type .block b {
    font-size: 8px;
  }
  .ratingselect .rating-type .positive {
    background-color: rgba(0, 160, 220, 0.2);
  }
  .ratingselect .rating-type .negative {
    background-color: rgba(77, 85, 93, 0.2);
  }
  .ratingselect .rating-type .positive.active {
    background-color: rgb(0, 160, 220);
    color: #fff;
  }
  .ratingselect .rating-type .negative.active {
    background-color: rgb(77, 85, 93);
    color: #fff;
  }
  .ratingselect .only-content {
    padding-top: 12px;
    color: rgb(147, 153, 159);
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  .ratingselect .only-content .iconfont {
    font-size: 24px;
    line-height: 24px;
    margin-right: 4px;
  }
  .ratingselect .iconfont.active {
    color: #00c850;
  }
</style>
