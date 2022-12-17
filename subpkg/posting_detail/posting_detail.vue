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
        <view class="media">
          <view v-if="postingInfo.mediaType == 0">
            <image :src="basePath + postingInfo.postingImageSrc" mode="widthFix"></image>
          </view>
          <view v-else-if="postingInfo.mediaType == 1">
            <video :src="basePath + postingInfo.postingMediaSrc"></video>
          </view>
          <view v-else-if="postingInfo.mediaType == 2">
            <video :src="basePath + postingInfo.postingMediaSrc"></video>
          </view>
        </view>
        <view class="posting-trace">
          <view>{{postingInfo.trace.traceTime}}</view>
          <view style="color: skyblue;" @click="openLocation(postingInfo.trace.longitude, postingInfo.trace.latitude)">
            位置</view>
        </view>
      </view>
    </view>

    <!-- 评论部分 -->
    <view v-if="commentList.length != 0" class="comment">
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
                <view style="color: skyblue;" @click="openLocation(item.trace.longitude, item.trace.latitude)">位置</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加评论部分 -->
    <view class="add-comment">
      <view class="add-icon">
        <image src="/static/add.png"></image>
      </view>
      <view class="comment">
        <view class="comment-title">
          <view>评论内容</view>
        </view>
        <view class="comment-info">
          <view v-if="commentContent == ''" class="back" @click="setCommentContent">
            <view>输入</view>
          </view>
          <view v-else class="content">{{commentContent}}</view>
        </view>
        <view class="back" @click="releaseComment">
          <view>提交</view>
        </view>
      </view>
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
      ...mapState('m_user', ['userinfo']),
    },
    onLoad(options) {
      _self = this
      let postingInfo = JSON.parse(decodeURIComponent(options.postingInfo));
      this.show = true
      console.log("postingInfo", postingInfo)
      this.postingInfo = postingInfo
      this.loadCommentList()
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        postingInfo: null,
        commentList: [],
        commentContent: ''
      };
    },
    methods: {
      changeSelect(e) {
        if (e !== "") this.mediaType = e
      },
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
      },
      async createTrace() {
        const location = await uni.getLocation()
        console.log("location", location)
        if (location.length > 1) {
          const traceRes = await uni.$http.post('/home/trace', {
            userId: _self.userinfo.userId,
            longitude: location[1].longitude,
            latitude: location[1].latitude
          })
          console.log("traceRes", traceRes)
          if (traceRes.statusCode === 200) {
            return traceRes.data.traceId
          }
        }
        return null
      },
      async upload(traceId) {
        const uploadRes = await uni.$http.post('/home/comment', {
          traceId: traceId,
          postingId: _self.postingInfo.postingId,
          content: _self.commentContent
        })
        console.log("uploadRes", uploadRes)
        if (res.statusCode === 200 && res.data === 1) {
          uni.$showMsg("评论成功")
          uni.switchTab({
            url: "/pages/home/home"
          })
        }
      },
      setCommentContent() {
        uni.showModal({
          title: '输入评论内容',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log('showModal res', res)
            if (res.cancel === false && res.content !== '') {
              _self.commentContent = res.content
              return
            }
            uni.$showMsg('设定失败')
          }
        })
      },
      async releaseComment() {
        if (this.postingName === '') {
          uni.$showMsg("请输入评论内容")
          return
        }
        const traceId = await this.createTrace()
        if (traceId !== null) {
          this.upload(traceId)
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
      margin-top: 20rpx;

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

    .add-comment {
      margin-top: 20rpx;
      background-color: white;
      display: flex;
      border-radius: 3px;
      margin-bottom: 10px;

      .add-icon {
        padding: 5rpx;
        border-right: 1rpx solid #efefef;

        image {
          width: 50rpx;
          height: 50rpx;
        }
      }

      .comment {
        width: 100%;
        margin: 20rpx;
        display: flex;
        flex-direction: column;

        .comment-title {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20rpx;
        }

        .comment-info {
          height: 400rpx;
          border: 1px solid #efefef;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;

          .back {
            padding: 20rpx;
            border-radius: 3px;
            background-color: green;
            color: white;
          }

          .content {
            width: 90%;
            display: inline-block;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }

        .back {
          padding: 20rpx;
          border-radius: 3px;
          background-color: green;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20rpx 40rpx;
        }
      }
    }
  }
</style>
