<template>
  <view class="subscription-item">
    <!-- 商品左侧图片区域 -->
    <image :src="basePath + subscription.channel.channelImageSrc" class="subscription-pic"></image>
    <!-- 商品标题 -->
    <view class="subscription-info">
      <view class="subscription-name">{{subscription.channel.channelName}}</view>
      <view>订阅发起人：{{subscription.user.nickName}}</view>
      <view>接收订阅人：{{subscription.acceptUser.nickName}}</view>
      <view>订阅时间：{{subscription.subscriptionTime}}</view>
      <view v-if="subscription.accept" style="color: green;">订阅已生效</view>
      <view v-else style="color: red;">订阅未生效</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-subscription",
    props: {
      subscription: {
        type: Object
      },
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
      };
    }
  }
</script>

<style lang="scss">
  .subscription-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 25rpx;

    .subscription-pic {
      width: 350rpx;
      height: 200rpx;
      display: block;
    }

    .subscription-info {
      padding: 10rpx;
      font-size: 18;
    }
    
    .subscription-name {
      font-size: 35rpx;
      font-weight: bold;
    }
  }
</style>
