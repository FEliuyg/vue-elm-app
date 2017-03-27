<template id="cartcontrol">
  <div class="cartcontrol">
    <transition name="move">
      <div class="decrease-wrapper" v-show="food.count > 0" @click.stop="decreaseFood">
          <div class="decrease">
            <i class="iconfont icon-remove_circle_outline"></i>
          </div>
      </div>
    </transition>
    <span class="count" v-show="food.count > 0">{{ food.count }}</span>
    <div class="add" @click.stop="addFood">
      <i class="iconfont icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      addFood (e) {
        if (!e._constructed) return
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          Vue.set(this.food, 'count', this.food.count + 1)
        }
        this.$emit('add', e.target)
      },
      decreaseFood (e) {
        if (!e._constructed) return
        Vue.set(this.food, 'count', this.food.count - 1)
      }
    }
  }
</script>

<style scope>
  .cartcontrol {
    display: flex;
    align-items: center;
  }
  .cartcontrol .add,
  .cartcontrol .decrease {
    padding: 6px;
  }
  .cartcontrol .add .icon-add_circle,
  .cartcontrol .decrease .icon-remove_circle_outline {
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .cartcontrol .count {
    width: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    text-align: center;
  }
  .move-enter-active, .move-leave-active {
    transition: all 0.5s linear;
  }
  .move-enter, .move-leave-active {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }
  .move-enter-active .decrease, .move-leave-active .decrease{
    transition: all 0.5s linear;
  }
  .move-enter .decrease, .move-leave-active .decrease {
    opacity: 0;
    transform: rotate(180deg);
  }
</style>
