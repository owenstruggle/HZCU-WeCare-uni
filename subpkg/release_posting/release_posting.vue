<template>
  <view>
    <view class="panel">
      <view class="posting-info">
        <view class="posting-name">
          <view>动态名</view>
          <view v-if="postingName == ''" class="back" @click="setPostingName">
            <view>设定</view>
          </view>
          <view v-else>{{postingName}}</view>
        </view>
        <view class="posting-description">
          <view class="description-title">
            <view>动态详细信息</view>
          </view>
          <view class="description-content">
            <view v-if="postingDescription == ''" class="back" @click="setPostingDescription">
              <view>设定</view>
            </view>
            <view v-else class="content">{{postingDescription}}</view>
          </view>
        </view>
      </view>

      <view class="posting-media">
        <view class="media-select">
          <uni-data-select v-if="show" :localdata="range" placeholder="选择媒体" :clear="false" @change="changeSelect">
          </uni-data-select>
        </view>
        <view class="media">
          <view v-if="mediaType == 0">
            <uni-file-picker limit="1" file-mediatype="image" title="选择 1 张图片" @select="select"></uni-file-picker>
          </view>
          <view v-if="mediaType == 1">
            <uni-file-picker limit="1" file-mediatype="video" title="选择 1 个视频" @select="select"></uni-file-picker>
          </view>
          <view v-if="mediaType == 2" class="recording">
            <nb-voice-record @endRecord="end" @cancelRecord="cancel"></nb-voice-record>
          </view>
        </view>
        <view v-if="tempFilePath != ''" style="color: green;" class="finish">
          <view v-if="mediaType == 0 || mediaType == 1">已完成上传</view>
          <view v-if="mediaType == 2">已完成录音</view>
        </view>
      </view>
    </view>
    <view class="posting-submit" @click="releasePosting">
      <view>发布动态</view>
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
    onLoad() {
      _self = this
      this.show = true
    },
    data() {
      return {
        show: false,
        range: [{
            value: 0,
            text: "图片"
          },
          {
            value: 1,
            text: "视频"
          },
          {
            value: 2,
            text: "录音"
          },
        ],
        mediaType: -1,
        postingName: '',
        postingDescription: '',
        postingImageSrc: '',
        tempFilePath: ''
      };
    },
    methods: {
      changeSelect(e) {
        // console.log('e', e)
        if (e !== "") this.mediaType = e
      },
      end(event) {
        // 结束录音并处理得到的录音文件event中，app端仅有tempFilePath字段，微信小程序还有duration和fileSize两个字段
        // console.log("event", event)
        this.tempFilePath = event.tempFilePath
      },
      cancel() {
        uni.$showMsg('取消录音')
      },
      select(e) {
        if (!e.tempFilePaths.length) return;
        const path = e.tempFilePaths.pop();
        this.tempFilePath = path
      },
      setPostingName() {
        uni.showModal({
          title: '设定动态名',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log('showModal res', res)
            if (res.cancel === false && res.content !== '') {
              _self.postingName = res.content
              return
            }
            uni.$showMsg('设定失败')
          }
        })
      },
      setPostingDescription() {
        uni.showModal({
          title: '设定动态详细信息',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log('showModal res', res)
            if (res.cancel === false && res.content !== '') {
              _self.postingDescription = res.content
              return
            }
            uni.$showMsg('设定失败')
          }
        })
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
        const uploadRes = await uni.uploadFile({
          url: 'https://localhost:8082/home/uploadPostingMedia',
          filePath: _self.tempFilePath,
          name: "fileUpload",
          formData: {
            "userId": _self.userinfo.userId
          },
          header: {
            "Content-Type": "multipart/form-data",
          }
        });
        console.log("uploadRes", uploadRes)
        if (uploadRes[1].statusCode === 200) {
          let imageSrc = null
          let filePath = null
          if (_self.mediaType === 0) {
            imageSrc = String(uploadRes[1].data).split('share')[1]
          } else if (_self.mediaType === 1 || _self.mediaType === 2) {
            filePath = String(uploadRes[1].data).split('share')[1]
            if (_self.mediaType === 1) {
              imageSrc = "/posting/media/videoDefault.png"
            } else {
              imageSrc = "/posting/media/recordDefault.png"
            }
          } else {
            imageSrc = "/posting/media/imgDefault.png"
          }

          const res = await uni.$http.post('/home/posting', {
            traceId: traceId,
            postingName: _self.postingName,
            postingImageSrc: imageSrc,
            postingMediaSrc: filePath,
            postingDescription: _self.postingDescription,
            mediaType: _self.mediaType
          })
          console.log("res", res)
          if (res.statusCode === 200 && res.data === 1) {
            uni.$showMsg("发布成功")
            uni.switchTab({
              url: "/pages/home/home"
            })
          }
        }
      },
      async releasePosting() {
        if (this.postingName === '') {
          uni.$showMsg("请输入动态名")
          return
        }
        if (this.postingDescription === '') {
          uni.$showMsg("请输入动态详细信息")
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
    border-radius: 3px;
    background-color: white;

    .posting-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;

      .posting-name {
        height: 80rpx;
        border: 1px solid #efefef;
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .back {
          padding: 20rpx;
          border-radius: 3px;
          background-color: green;
          color: white;
        }
      }

      .posting-description {
        border: 1px solid #efefef;
        padding: 10rpx;
        display: flex;
        flex-direction: column;

        .description-title {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20rpx;
        }

        .description-content {
          height: 400rpx;
          border: 1px solid #efefef;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;

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
      }
    }

    .posting-media {
      margin-top: 20rpx;

      .media-select {
        padding: 20rpx;
      }

      .media {
        padding: 20rpx 30rpx;

        .recording {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }

      .finish {
        padding: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .posting-submit {
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 3px;
    background-color: green;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
