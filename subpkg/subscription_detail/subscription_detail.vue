<template>
  <view class="my-container">
    <view class="channel-image">
      <image :src="basePath + subscription.channel.channelImageSrc"></image>
    </view>

    <view class="panel-list">
      <view class="panel">
        <view class="panel-title">订阅信息</view>
        <view class="panel-body">
          <view>频道名：{{subscription.channel.channelName}}</view>
          <view>订阅时间：{{subscription.subscriptionTime}}</view>
          <text v-if="subscription.isAccept" style="color: green;">订阅状态：已生效</text>
          <text v-else style="color: red;">订阅状态：等待接受</text>
        </view>
      </view>

      <view class="panel">
        <view class="panel-title">订阅发起人</view>
        <view class="panel-body">
          <image :src="basePath + subscription.user.avatarUrl"></image>
          <view class="panel-info">
            <view>{{subscription.user.nickName}}</view>
            <view class="location">
              {{subscription.user.country + ' ' + subscription.user.province + ' ' + subscription.user.city}}
            </view>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-title">订阅接收人</view>
        <view class="panel-body">
          <image :src="basePath + subscription.acceptUser.avatarUrl"></image>
          <view class="panel-info">
            <view>{{subscription.acceptUser.nickName}}</view>
            <view class="location">
              {{subscription.acceptUser.country + ' ' + subscription.acceptUser.province + ' ' + subscription.acceptUser.city}}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" options="" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import loadInfo from '@/mixins/loadInfo.js';
  let _self = null;
  export default {
    mixins: [loadInfo],
    computed: {
      ...mapState('m_user', ['userinfo']),
    },
    onLoad(options) {
      _self = this
      let subscription = JSON.parse(decodeURIComponent(options.subscription));
      this.subscription = subscription

      if (!subscription.isAccept) this.buttonGroup.push({
        text: '接受',
        backgroundColor: '#5ea66a',
        color: '#fff'
      })
      else this.buttonGroup.push({
        text: '取消订阅',
        backgroundColor: '#ff0000',
        color: '#fff'
      })
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        subscription: {},
        // 右侧按钮组的配置对象
        buttonGroup: []
      };
    },
    methods: {
      async updateState(state) {
        const res = await uni.$http.put('/my/subscription/state?subscriptionId=' + this.subscription.subscriptionId +
          '&isAccept=' + state)
        if (res.statusCode != 200 || res.data !== 1) {
          uni.$showMsg('更新失败')
          return
        }
        this.subscription.isAccept = state
        uni.$showMsg('更新成功')
        await this.loadSubscription()
        uni.navigateBack()
      },
      async buttonClick(e) {
        if (e.content.text === '接受') {
          const [err, succ] = await uni.showModal({
            title: '提示',
            content: '确认接受订阅吗？'
          }).catch(err => err)

          if (succ && succ.confirm) {
            _self.updateState(true)
          }
        } else if (e.content.text === '取消订阅') {
          const [err, succ] = await uni.showModal({
            title: '提示',
            content: '确认取消订阅吗？'
          }).catch(err => err)

          if (succ && succ.confirm) {
            _self.updateState(false)
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;
  }

  .channel-image {
    width: 750rpx;
    display: flex;
    justify-content: center;

    image {
      width: 100%;
    }
  }

  .panel-list {
    padding: 20rpx 20rpx 5rpx 20rpx;
    position: relative;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 40px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: center;
        padding: 10rpx;

        image {
          width: 80rpx;
          height: 80rpx;
        }

        .panel-info {
          display: flex;
          flex-direction: column;

          .location {
            font-size: 25rpx;
          }
        }
      }
    }
  }
</style>
