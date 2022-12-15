<template>
  <view v-if="todayPostingList.length != 0" class="panel">
    <view v-for="(item, i) in todayPostingList" :key="i" class="panel-item">
      <view class="contact-info" @click="gotoContact(item)">
        <image :src="basePath + item.user.avatarUrl"></image>
        <view class="nickname">{{item.user.nickName}}</view>
      </view>
      <view class="posting-info" @click="gotoPostingDetail(item)">
        <my-posting :postingInfo="item"></my-posting>
      </view>
    </view>
  </view>
  <view v-else class="no-data-image">
    <image src="../../static/no_data.png"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import loadInfo from '@/mixins/loadInfo.js';
  export default {
    mixins: [loadInfo],
    computed: {
      // 将 m_user 模块中的 userinfo 映射到当前页面中使用
      ...mapState('m_user', ['userinfo', 'todayPostingInfo']),
    },
    onLoad() {
      this.getTodayPostingInfo()
    },
    data() {
      return {
        basePath: getApp().globalData.basePath,
        todayPostingList: [],
        pagenum: 1,
        pagesize: 10,
        total: 0, // 总数量，用来实现分页
        isloading: false
      };
    },
    // 触底的事件
    onReachBottom() {
      if (this.pagenum * this.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if (this.isloading) return
      // 让页码值自增 +1
      this.pagenum += 1
      // 重新获取列表数据
      this.getTodayPostingInfo()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      this.pagenum = 1
      this.total = 0
      this.isloading = false
      this.todayPostingList = []

      this.getTodayPostingInfo(() => uni.stopPullDownRefresh())
    },
    methods: {
      async getTodayPostingInfo(cb) {
        if (this.userinfo.userId === '') {
          this.todayPostingList = []
          this.total = 0
          return
        }
        this.isloading = true
        const res = await this.loadTodayPostingInfo(this.userinfo.userId, this.pagenum, this.pagesize)
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        // 为数据赋值
        this.todayPostingList = [...this.todayPostingList, ...res.list]
        console.log("todayPostingList", this.todayPostingList)
        this.total = res.total
      },
      gotoContact(e) {
        if (e.user.userId === this.userinfo.userId) {
          uni.switchTab({
            url: "/pages/my/my"
          })
        } else {
          // switchTab 无法携带参数，因此使用 reLaunch
          uni.reLaunch({
            url: "/pages/contacts/contacts?userId=" + e.user.userId
          })
        }
      },
      gotoPostingDetail(e) {
        uni.navigateTo({
          url: "/subpkg/posting_detail/posting_detail?postingInfo=" + encodeURIComponent(JSON.stringify(e))
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f4f4f4;
  }

  .no-data-image {
    width: 750rpx;
    height: 1300rpx;
    display: flex;
    justify-content: center;

    image {
      align-self: center;
    }
  }

  .panel {
    margin: 10rpx 10rpx 0 10rpx;

    .panel-item {
      display: flex;
      border-radius: 3px;

      .contact-info {
        margin: 60rpx 10rpx 150rpx 0rpx;
        padding: 10rpx;
        background-color: white;
        font-size: 20rpx;

        image {
          height: 80rpx;
          width: 80rpx;
        }
      }
    }
  }
</style>
