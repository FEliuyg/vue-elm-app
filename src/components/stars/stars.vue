<template id="stars">
  <div class="stars" :class="starsSize">
    <i class="star-item" :class="item" v-for="item in scoreTypes"></i>
  </div>
</template>

<script>
  const starNum = 5
  const starOn = 'on'
  const starOff = 'off'
  const starHalf = 'half'

  export default {
    name: 'stars',
    props: ['size', 'score'],
    computed: {
      starsSize () {
        return 'stars-' + this.size
      },
      scoreTypes () {
        let scoreTypes = []
        let computeScore = Math.floor(this.score * 2) / 2
        let isDec = computeScore % 1 !== 0
        let integer = Math.floor(computeScore)
        for (let i = 0; i < integer; i++) {
          scoreTypes.push(starOn)
        }
        if (isDec) scoreTypes.push(starHalf)
        while (scoreTypes.length < starNum) {
          scoreTypes.push(starOff)
        }
        return scoreTypes
      }
    }
  }
</script>

<style scope>
  .stars {
    display: flex;
    justify-content: center;
  }
  .star-item {
    background-position: 100% 100%;
    background-size: 100% 100%;
  }
  .stars.stars-48 i{
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }
  .stars i.star-item:last-child {
    margin-right: 0;
  }
  .stars-48 .star-item.on {
    background-image: url(star48_on@2x.png);
  }
  .stars-48 .star-item.off {
    background-image: url(star48_off@2x.png);
  }
  .stars-48 .star-item.half {
    background-image: url(star48_half@2x.png);
  }
  .stars.stars-36 i{
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
  .stars-36 .star-item.on {
    background-image: url(star36_on@2x.png);
  }
  .stars-36 .star-item.off {
    background-image: url(star36_off@2x.png);
  }
  .stars-36 .star-item.half {
    background-image: url(star36_half@2x.png);
  }
  .stars.stars-24 i{
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
  .stars-24 .star-item.on {
    background-image: url(star24_on@2x.png);
  }
  .stars-24 .star-item.off {
    background-image: url(star24_off@2x.png);
  }
  .stars-24 .star-item.half {
    background-image: url(star24_half@2x.png);
  }

</style>
