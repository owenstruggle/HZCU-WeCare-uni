<template>
  <view class="panel">
    <view class="img">
      <image :src="basePath + postingInfo.postingImageSrc" mode="widthFix"></image>
    </view>
    <view class="panel-info">
      <view class="panel-postingname">{{postingInfo.postingName}}</view>
      <view>发布日期：{{postingInfo.trace.traceTime}}</view>
      <view>发布位置：{{postingInfo.trace.longitude.toFixed(4) + ', ' + postingInfo.trace.latitude.toFixed(4)}}
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

    .img {
      border: 1rpx solid #efefef;
      width: 180rpx;
      height: 180rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      
      image {
        width: 100%;
        height: 100%;
        padding: 0 20rpx 0 20rpx;
      }
    }

    .panel-info {
      margin-left: 20rpx;
      display: flex;
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
