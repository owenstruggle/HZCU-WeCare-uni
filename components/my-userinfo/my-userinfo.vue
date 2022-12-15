<template>
  <view class="my-userinfo-container">
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="basePath + userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>

    <!-- 面板的列表区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <!-- panel 的主体区域 -->
        <view class="panel-body">
          <!-- panel 的 item 项 -->
          <view class="panel-item" @click="gotoContacts">
            <text v-if="contactInfo.length">{{contactInfo.length}}</text>
            <text v-else>0</text>
            <text>联系人数</text>
          </view>
          <view class="panel-item" @click="gotoHome">
            <text v-if="postingInfo.length">{{postingInfo.length}}</text>
            <text v-else>0</text>
            <text>今日动态</text>
          </view>
          <view class="panel-item" @click="gotoPosting">
            <text v-if="myPostingInfo.total">{{myPostingInfo.total}}</text>
            <text v-else>0</text>
            <text>我的动态</text>
          </view>
          <view class="panel-item" @click="gotoTrace">
            <text v-if="myTraceInfo.length">{{myTraceInfo.length}}</text>
            <text v-else>0</text>
            <text>轨迹数据</text>
          </view>
        </view>
      </view>

      <!-- 第二个面板 -->
      <view class="panel">
        <!-- 面板的标题 -->
        <view class="panel-title">频道订阅信息</view>
        <!-- 面板的主体 -->
        <view class="panel-body">
          <!-- 面板主体中的 item 项 -->
          <view class="panel-item" @click="gotoSubscriptionList(0)">
            <image src="/static/my-icons/IndividualSubscription.png" class="icon"></image>
            <text>个人订阅</text>
          </view>
          <view class="panel-item" @click="gotoSubscriptionList(1)">
            <image src="/static/my-icons/SubscriptionApplication.png" class="icon"></image>
            <text>订阅申请</text>
          </view>
          <view class="panel-item" @click="gotoSubscriptionList(2)">
            <image src="/static/my-icons/AllSubscribe.png" class="icon"></image>
            <text>全部订阅</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/PushedInformation.png" class="icon"></image>
            <text>推送信息</text>
          </view>
        </view>
      </view>

      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item" @click="gotoPersonalInfo">
          <text>个人设置</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="contactUs">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import loadInfo from '@/mixins/loadInfo.js';
  export default {
    name: "my-userinfo",
    mixins: [loadInfo],
    computed: {
      // 将 m_user 模块中的 userinfo 映射到当前页面中使用
      ...mapState('m_user', ['userinfo', 'contactInfo', 'todaypostingInfo', 'myPostingInfo', 'myTraceInfo']),
    },
    created() {
      this.load()
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo']),
      // 退出登录
      async logout() {
        // 询问用户是否退出登录
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)

        if (succ && succ.confirm) {
          // 用户确认了退出登录的操作
          // 需要清空 vuex 中的 userinfo、token 和 address
          this.updateUserInfo({})
        }
      },
      async contactUs() {
        await uni.showModal({
          title: '联系我们',
          content: '电话：16279401758',
          showCancel: false
        })
      },
      gotoPersonalInfo() {
        uni.navigateTo({
          url: '/subpkg/personal_info/personal_info'
        })
      },
      gotoContacts() {
        uni.switchTab({
          url: '/pages/contacts/contacts'
        })
      },
      gotoHome() {
        uni.switchTab({
          url: '/pages/home/home'
        })
      },
      gotoSubscriptionList(type) {
        uni.navigateTo({
          url: '/subpkg/subscription_list/subscription_list?type=' + type
        })
      },
      gotoPosting() {
        uni.navigateTo({
          url: '/subpkg/posting_list/posting_list?userId=' + this.userinfo.userId
        })
      },
      gotoTrace() {
        uni.navigateTo({
          url: '/subpkg/trace_list/trace_list?traceInfo=' + encodeURIComponent(JSON.stringify(this.myTraceInfo))
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;

    .top-box {
      height: 400rpx;
      background-color: #41A863;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .avatar {
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid white;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        color: white;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;
        }
      }
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }

  .panel-list-item {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding: 0 10px;
  }
</style>
