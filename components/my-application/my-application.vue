<template>
  <view class="panel" v-if="applicationInfo.user.userId != userinfo.userId">
    <view class="panel-user">
      <view class="head-portrait">
        <image :src="basePath + applicationInfo.user.avatarUrl"></image>
      </view>
      <view class="userinfo">
        <view class="nickname">{{applicationInfo.user.nickName}}</view>
        <view class="status">等待申请通过</view>
      </view>
    </view>
    <view class="panel-select" @click="agreeApplication(applicationInfo.relationshipId)">
      <view class="agree">同意申请</view>
    </view>
  </view>
  <view class="panel" v-else>
    <view class="panel-user">
      <view class="head-portrait">
        <image :src="basePath + applicationInfo.acceptUser.avatarUrl"></image>
      </view>
      <view class="userinfo">
        <view class="nickname">{{applicationInfo.acceptUser.nickName}}</view>
        <view class="status">等待申请通过</view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    name: "my-application",
    computed: {
      ...mapState('m_user', ['userinfo']),
    },
    props: {
      applicationInfo: {
        type: Object
      }
    },
    data() {
      return {
        basePath: getApp().globalData.basePath
      };
    },
    methods: {
      async agreeApplication(relationshipId) {
        const res = await uni.$http.put('/my/agree/' + relationshipId)
        console.log("res", res)
        if (res.statusCode === 200 && res.data === 1) {
          uni.$showMsg('添加成功')
          uni.switchTab({
            url: "/pages/my/my"
          })
        }
        uni.$showMsg('添加失败')
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f4f4f4;
  }

  .panel {
    background-color: white;
    border-radius: 3px;
    margin: 20rpx;
    padding: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .panel-user {
      display: flex;
      padding: 10rpx;

      .head-portrait {
        padding: 0 30rpx 0 0;

        image {
          height: 200rpx;
          width: 200rpx;
        }
      }

      .userinfo {
        padding: 30rpx 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .nickname {
          font-size: 40rpx;
          font-weight: bold;
        }

        .status {
          font-size: 25rpx;
          color: red;
        }
      }
    }

    .panel-select {
      margin-right: 20rpx;
      padding: 20rpx;
      border-radius: 3px;
      background-color: green;

      .agree {
        color: white;
      }
    }
  }
</style>
