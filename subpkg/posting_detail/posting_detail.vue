<template>
  <view>
    posting_detail
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      let postingInfo = JSON.parse(decodeURIComponent(options.postingInfo));
      console.log("postingInfo", postingInfo)
      this.postingInfo = postingInfo
    },
    data() {
      return {
        postingInfo: null
      };
    }
  }
</script>

<style lang="scss">

</style>
