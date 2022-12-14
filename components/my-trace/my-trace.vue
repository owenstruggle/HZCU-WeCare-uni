<template>
  <view class="container-pannel">
    <view class="panel" @click="openLocation">
      <view class="date">日期：{{traceInfo.traceTime.split(' ')[0]}}</view>
      <view class="content">
        <view class="time">时间：{{traceInfo.traceTime.split(' ')[1]}}</view>
        <view class="location">
          <view class="longitude">经度：{{traceInfo.longitude}}</view>
          <view class="latitude">维度：{{traceInfo.latitude}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-trace",
    props: {
      traceInfo: {
        type: Object
      }
    },
    data() {
      return {

      };
    },
    methods: {
      openLocation() {
        uni.openLocation({
          latitude: this.traceInfo.latitude,
          longitude: this.traceInfo.longitude
        })
      }
    }
  }
</script>

<style lang="scss"> 
  .container-pannel {
    height: 100%;

    .panel {
      border-radius: 3px;
      background-color: white;
      margin-bottom: 8px;
      margin: 20rpx;
      padding: 20rpx;

      .date {
        font-size: 40rpx;
        font-weight: bold;
      }
      
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: row;
      
        .time {
          margin-left: 10rpx;
          margin-top: 10rpx;
          font-size: 30rpx;
        }
      }
      
      .location {
        flex-direction: column;
        padding-left: 20rpx;
        font-size: 25rpx;
      }
    }
  }
</style>
