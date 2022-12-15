<template>
  <view class="panel">
    <image :src="basePath + postingInfo.postingImageSrc"></image>
    <view class="panel-info">
      <view class="panel-postingname">{{postingInfo.postingName}}</view>
      <view>发布日期：{{postingInfo.trace.traceTime}}</view>
      <view>发布位置：{{postingInfo.trace.longitude + ', ' + postingInfo.trace.latitude}}
      </view>
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
    padding: 10px;
    display: flex;
    height: 250rpx;
    width: 650rpx;
    align-items: center;

    image {
      width: 180rpx;
      height: 180rpx;
      padding: 0 20rpx 0 20rpx;
    }

    .panel-info {
      flex-direction: column;
      font-size: 25rpx;

      .panel-postingname {
        padding-bottom: 10rpx;
        font-size: 35rpx;
        font-weight: bold;
      }
    }
  }
</style>
