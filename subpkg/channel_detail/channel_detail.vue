<template>
  <view>
    <!-- 预览图 -->
    <view class="channel-image">
      <image :src="basePath + channel_info.channelImageSrc"></image>
    </view>

    <!-- 简介 -->
    <view class="channel-info">
      <view class="name">{{channel_info.channelName}}</view>
      <view class="author">创建人：{{channel_info.userId}}</view>
      <view class="description">{{channel_info.channelDescription}}</view>
    </view>

    <!-- 详情图 -->
    <view :v-if="channel_info.channelIntroduce">
      <rich-text :nodes="channel_info.channelIntroduce"></rich-text>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      this.getChannelsDetail(options.channelId)
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        channel_info: {}, // 商品详情对象
      };
    },
    methods: {
      // 定义请求商品详情数据的方法
      async getChannelsDetail(channelId) {
        const res = await uni.$http.get('/shop/channel/' + channelId)
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.channelIntroduce !== null) {
          res.data.channelIntroduce = res.data.channelIntroduce.replace(/<img /g,
            '<img style="display:block;" ').replace(/webp/g, 'jpg')
        }
        this.channel_info = res.data
      }
    }
  }
</script>

<style lang="scss">
  .channel-image {
    width: 750rpx;
    display: flex;
    justify-content: center;

    image {
      width: 100%;
    }
  }

  .channel-info {
    border: 1rpx solid #dedede;
    border-radius: 10rpx;
    margin: 20rpx 10rpx;

    .name {
      text-indent: 50rpx;
      font-weight: bold;
      font-size: 80rpx;
      text-align: center;
      padding: 30rpx 30rpx 0rpx 30rpx;
    }

    .author {
      text-align: center;
      color: gray;
    }

    .description {
      padding: 50rpx 30rpx;
    }
  }
</style>
