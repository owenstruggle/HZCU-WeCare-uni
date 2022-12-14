<template>
  <view class="panel">
    <image :src="basePath + postingInfo.postingImageSrc"></image>
    <view class="panel-info">
      <view>发布日期：{{postingInfo.trace.traceTime}}</view>
      <view>发布位置：{{postingInfo.trace.longitude + ', ' + postingInfo.trace.latitude}}
      </view>
      <view class="panel-description">{{postingInfo.postingDescription}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-posting",
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
  .panel {
    background-color: white;
    border-radius: 3px;
    margin: 10px;
    display: flex;
    height: 250rpx;
    align-items: center;

    image {
      width: 200rpx;
      height: 200rpx;
      padding: 0 30rpx 0 30rpx;
    }

    .panel-info {
      flex-direction: column;
      font-size: 25rpx;

      .panel-description {
        padding-top: 10rpx;
      }
    }
  }
</style>
