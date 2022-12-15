<template>
  <view class="panel">
    <!-- 动态主体部分 -->
    <view class="posting">
      <view class="head-portrait">
        <image :src="basePath + postingInfo.user.avatarUrl"></image>
      </view>
      <view class="content">
        <view class="username" @click="gotoContact(postingInfo.user.userId)">{{postingInfo.user.nickName}}</view>
        <view class="posting-content">{{postingInfo.postingDescription}}</view>
        <image :src="basePath + postingInfo.postingImageSrc" mode="widthFix"></image>
        <view class="posting-trace">
          <view>{{postingInfo.trace.traceTime}}</view>
          <view style="color: skyblue;" @click="openLocation(postingInfo.trace.longitude, postingInfo.trace.latitude)">
            位置</view>
        </view>
      </view>
    </view>

    <!-- 评论部分 -->
    <view class="comment">
      <view class="comment-icon">
        <image src="/static/comment.png"></image>
      </view>
      <view class="comment-list">
        <view v-for="(item, i) in commentList" :key="i">
          <view class="comment-item">
            <view class="head-portrait">
              <image :src="basePath + item.user.avatarUrl"></image>
            </view>
            <view class="content">
              <view class="comment-username" @click="gotoContact(item.user.userId)">{{item.user.nickName}}</view>
              <view class="comment-content">{{item.content}}</view>
              <view class="comment-trace">
                <view>{{item.trace.traceTime}}</view>
                <view style="color: skyblue;"
                  @click="openLocation(item.trace.longitude, item.trace.latitude)">位置</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    computed: {
      ...mapState('m_user', ['userinfo']),
    },
    onLoad(options) {
      let postingInfo = JSON.parse(decodeURIComponent(options.postingInfo));
      console.log("postingInfo", postingInfo)
      this.postingInfo = postingInfo
      this.loadCommentList()
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        postingInfo: null,
        commentList: []
      };
    },
    methods: {
      async loadCommentList() {
        const res = await uni.$http.get('/home/comment/' + this.postingInfo.postingId)
        if (!res.statusCode || res.statusCode !== 200) return
        this.commentList = res.data
      },
      openLocation(longitude, latitude) {
        uni.openLocation({
          latitude: latitude,
          longitude: longitude
        })
      },
      gotoContact(userId) {
        if (userId === this.userinfo.userId) {
          uni.switchTab({
            url: "/pages/my/my"
          })
        } else {
          // switchTab 无法携带参数，因此使用 reLaunch
          uni.reLaunch({
            url: "/pages/contacts/contacts?userId=" + userId
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f4f4f4;
  }

  .panel {
    margin: 20rpx;

    .posting {
      display: flex;

      .head-portrait {
        image {
          height: 80rpx;
          width: 80rpx;
        }
      }

      .content {
        width: 100%;
        margin: 0 30rpx;

        .username {
          font-size: 40rpx;
          font-weight: bold;
          color: skyblue;
        }

        .posting-content {
          padding: 10rpx 0;
        }

        image {
          width: 100%;
        }

        .posting-trace {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .comment {
      display: flex;
      background-color: white;
      border-radius: 3px;
      margin-bottom: 10px;

      .comment-icon {
        padding: 5rpx;
        border-right: 1rpx solid #efefef;

        image {
          width: 50rpx;
          height: 50rpx;
        }
      }

      .comment-list {
        width: 100%;
        margin: 20rpx;

        .comment-item {
          display: flex;
          padding: 20rpx 0;
          border-bottom: 1rpx solid #efefef;
          border-top: 1rpx solid #efefef;

          .head-portrait {
            margin-right: 10rpx;

            image {
              height: 80rpx;
              width: 80rpx;
            }
          }

          .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 10rpx;

            .comment-username {
              font-weight: bold;
              color: skyblue;
            }

            .comment-content {
              padding: 10rpx 0;
            }

            .comment-trace {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
</style>
