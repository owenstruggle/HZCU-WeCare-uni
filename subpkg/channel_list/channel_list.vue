<template>
  <view>
    <view class="channels-list">
      <view v-for="(item, i) in channelsList" :key="i" @click="gotoDetail(item)">
        <my-channels :channels="item"></my-channels>
      </view>
    </view>
    <view v-show="total === 0" class="no-data-image">
      <image src="../../static/no_data.png"></image>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      // 调用获取商品列表数据的方法
      this.getChannelsList()
    },
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        channelsList: [], // 商品列表的数据
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
      this.getChannelsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      this.pagenum = 1
      this.total = 0
      this.isloading = false
      this.channelsList = []

      this.getChannelsList(() => uni.stopPullDownRefresh())
    },
    methods: {
      // 获取商品列表数据的方法
      async getChannelsList(cb) {
        if (this.query === '') {
          this.channelsList = []
          this.total = 0
          return
        }
        this.isloading = true
        const res = await uni.$http.get('/shop/search', {
          query: this.query,
          pageNum: this.pagenum,
          pageSize: this.pagesize
        })
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        if (res.statusCode !== 200) return uni.$showMsg()
        // 为数据赋值
        this.channelsList = [...this.channelsList, ...res.data.list]
        this.total = res.data.total
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/channel_detail/channel_detail?channelId=' + item.channelId
        })
      }
    }
  }
</script>

<style lang="scss">
.no-data-image {
  width: 750rpx;
  height: 1300rpx;
  display: flex;
  justify-content: center;
  image {
    align-self: center;
  }
}
</style>
