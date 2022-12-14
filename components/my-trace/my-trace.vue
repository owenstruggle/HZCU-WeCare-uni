<template>
  <view class="container-pannel">
    <view class="panel" @click="openLocation">
      <view class="date">{{traceInfo.traceTime.split(' ')[0]}}</view>
      <view class="time">{{traceInfo.traceTime.split(' ')[1]}}</view>
      <view class="longitude">{{traceInfo.longitude}}</view>
      <view class="latitude">{{traceInfo.latitude}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-trace",
    props: {
      traceInfo: {
        type: Object
      }
    },
    data() {
      return {

      };
    },
    methods: {
      openLocation() {
        uni.openLocation({
          latitude: this.traceInfo.latitude,
          longitude: this.traceInfo.longitude
        })
      }
    }
  }
</script>

<style lang="scss">
  .container-pannel {
    height: 100%;

    .panel {
      border-radius: 3px;
      background-color: #f4f4f4;
      margin-bottom: 8px;
      padding: 30rpx;
    }
  }
</style>
