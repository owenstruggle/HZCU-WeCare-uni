<template>
  <view class="channels-item">
    <!-- 商品左侧图片区域 -->
    <image :src="sourceSrc + channels.channelImageSrc" class="channels-pic"></image>
    <!-- 商品标题 -->
    <view class="channels-name">{{channels.channelName}}</view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "my-channels",
    computed: {
      ...mapState('m_share', ['sourceSrc']),
    },
    props: {
      channels: {
        type: Object
      },
    },
    data() {
      return {};
    },
  }
</script>

<style lang="scss">
  .channels-item {
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    justify-content: center;

    .channels-pic {
      width: 600rpx;
      height: 250rpx;
      display: block;
    }

    .channels-name {
      padding-top: 10rpx;
      font-size: 18;
    }
  }
</style>
