<template>
  <view>
    <view v-for="(item, i) in contactPostingInfo" :key="i">
      <my-posting :postingInfo="item"></my-posting>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      let contactPostingInfo = JSON.parse(decodeURIComponent(options.postingInfo))
      console.log('contactPostingInfo', contactPostingInfo)
      this.contactPostingInfo = contactPostingInfo
    },
    data() {
      return {
        contactPostingInfo: null
      };
    }
  }
</script>

<style>
  page {
    background-color: #f4f4f4;
  }
</style>

<style lang="scss">
</style>
