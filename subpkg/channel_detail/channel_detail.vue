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

    <!-- 订阅部分 -->
    <view class="channel-subscribe">
      <view class="time-selector">
        <uni-datetime-picker @change="changeTime"></uni-datetime-picker>
      </view>
      <view class="subscribe">
        <view class="accept-user">
          <uni-data-select v-if="show" :localdata="range" placeholder="选择被订阅者" :clear="false" @change="changeSelect">
          </uni-data-select>
        </view>
        <view class="subscribe-friend" @click="subscribe">
          <view class="text">订阅</view>
        </view>
      </view>
    </view>

    <!-- 详情图 -->
    <view :v-if="channel_info.channelIntroduce">
      <rich-text :nodes="channel_info.channelIntroduce"></rich-text>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  let _self = null;
  export default {
    computed: {
      ...mapState('m_user', ['userinfo', 'contactInfo']),
    },
    onLoad(options) {
      _self = this
      this.getChannelsDetail(options.channelId)
      this.loadRange()
      this.show = true
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        channel_info: {}, // 商品详情对象
        subscribe_time: '',
        show: false,
        range: [],
        acceptUserId: ''
      };
    },
    methods: {
      loadRange() {
        this.range.push({
          value: 0,
          text: "自己",
          userId: _self.userinfo.userId
        })
        let value = 1
        this.contactInfo.forEach(e => {
          _self.range.push({
            value: value,
            text: e.nickName,
            userId: e.userId
          })
          value = value + 1
        })
      },
      // 定义请求商品详情数据的方法
      async getChannelsDetail(channelId) {
        const res = await uni.$http.get('/shop/channel/' + channelId)
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.channelIntroduce !== null) {
          res.data.channelIntroduce = res.data.channelIntroduce.replace(/<img /g,
            '<img style="display:block;" ').replace(/webp/g, 'jpg')
        }
        this.channel_info = res.data
      },
      changeTime(e) {
        console.log('change事件:', e);
        this.subscribe_time = String(e).split(' ')[1]
      },
      changeSelect(e) {
        console.log('change事件:', e);
        this.acceptUserId = this.range[e].userId
      },
      async subscribe() {
        if (this.subscribe_time === '') {
          uni.$showMsg('请选择时间')
          return
        }
        if (this.acceptUserId === '') {
          uni.$showMsg('请选择被订阅者')
          return
        }
        let query = {
          userId: _self.userinfo.userId,
          acceptUserId: _self.acceptUserId,
          channelId: _self.channel_info.channelId,
          subscriptionTime: _self.subscribe_time
        }
        const res = await uni.$http.post('/shop/subscription', query)
        console.log("res", res)
        if (res.statusCode === 200) {
          if (res.data === 1) {
            uni.$showMsg("订阅请求已发送")
          }
          if (res.data === -1) {
            uni.$showMsg("订阅者已订阅该频道")
          }
          return
        }
        uni.$showMsg("订阅失败")
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

  .channel-subscribe {
    border: 1rpx solid #dedede;
    border-radius: 10rpx;
    margin: 20rpx 10rpx;
    height: 250rpx;
    display: flex;
    flex-direction: column;

    .time-selector {
      margin: 10rpx 10rpx 0 10rpx;
    }

    .subscribe {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 15rpx;

      .subscribe-friend {
        margin: 20rpx 10rpx 20rpx 30rpx;
        padding: 10rpx;
        border-radius: 10rpx;
        background-color: green;

        .text {
          margin: 20rpx;
          color: white;
        }
      }

      .subscribe-me {
        margin: 20rpx 30rpx 20rpx 10rpx;
        padding: 10rpx;
        border-radius: 10rpx;
        background-color: red;

        .text {
          margin: 20rpx;
          color: white;
        }
      }
    }
  }
</style>
