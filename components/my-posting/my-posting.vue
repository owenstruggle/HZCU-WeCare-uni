<template>
  <view>
    <view>{{postingInfo[0].trace.traceTime}}</view>
    <image :src="basePath + postingInfo[0].postingImageSrc"></image>
    <view>{{postingInfo[0].postingDescription}}</view>
  </view>
</template>

<script>
  export default {
    name:"my-posting",
    props: {
      postingInfo: {
        type: Object
      }
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
      };
    }
  }
</script>

<style lang="scss">

</style>