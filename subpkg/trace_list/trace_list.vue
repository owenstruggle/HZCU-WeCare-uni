<template>
  <view>
    <view v-for="(item, i) in contactTraceInfo" :key="i">
      <my-trace :traceInfo="item"></my-trace>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      let contactTraceInfo = JSON.parse(decodeURIComponent(options.traceInfo))
      console.log('contactTraceInfo', contactTraceInfo)
      this.contactTraceInfo = contactTraceInfo
    },
    data() {
      return {
        contactTraceInfo: null
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
