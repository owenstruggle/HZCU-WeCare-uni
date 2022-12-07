<template>
  <view class="contact-info-container">
    <!-- 面板的列表区域 -->
    <view class="panel-list">
      <!-- 第一个：信息面板 -->
      <view class="panel">
        <!-- panel 的主体区域 -->
        <view class="panel-body info-panel">
          <image :src="basePath + contactInfo.avatarUrl"></image>
          <view class="base-info">
            <view class="name">{{contactInfo.nickName}}</view>
            <view v-if="contactInfo.gender === false">性别: 男</view>
            <view v-else>性别：女</view>
            <view v-if="contactInfo.phoneNumber === null">手机号: 未知</view>
            <view v-else>手机号：{{contactInfo.phoneNumber}}</view>
            <view>
              <text>地区：</text>
              <text v-if="contactInfo.country !== null">{{contactInfo.country + ' '}}</text>
              <text v-if="contactInfo.province !== null">{{contactInfo.province + ' '}} </text>
              <text v-if="contactInfo.city !== null">{{contactInfo.city + ' '}} </text>
              <text
                v-if="contactInfo.country === null && contactInfo.province === null && contactInfo.city === null">未知</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 第二个：动态面板 -->
      <view class="panel">
        <!-- 面板的标题 -->
        <view class="panel-title">
          <view>动态信息</view>
          <view>{{contactPastingNum}}</view>
        </view>
        <!-- 面板的主体 -->
        <view class="panel-body">
        </view>
      </view>

      <!-- 第三个：其他面板 -->
      <view class="panel">

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-contactinfo",
    props: {
      contactInfo: {
        type: Object
      },
    },
    onLoad() {
      loadPastingInfo()
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        contactPastingNum: 0,
        lastPasting: null
      };
    },
    methods: {
      async loadPastingInfo() {
        
      }
    }
  }
</script>

<style lang="scss">
  .contact-info-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;
  }

  .panel-list {
    padding: 0 10px;
    position: relative;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        display: flex;
        justify-content: space-between;
        padding: 0 30rpx 0 30rpx;

        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .info-panel {
        display: flex;
        height: 250rpx;
        align-items: center;

        image {
          width: 150rpx;
          height: 150rpx;
          padding: 0 30rpx 0 30rpx;
        }

        .base-info {
          color: #a3a3a3;
          font-size: 20rpx;
        }

        .name {
          color: #000;
          font-size: 40rpx;
          font-weight: bold;
          padding-bottom: 10rpx;
        }
      }
    }
  }
</style>
