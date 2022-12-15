<template>
  <view>
    <view v-for="(item, i) in postingList" :key="i">
      <my-posting :postingInfo="item"></my-posting>
    </view>
  </view>
</template>

<script>
  import loadInfo from '@/mixins/loadInfo.js';
  export default {
    mixins: [loadInfo],
    onLoad(options) {
      this.getPostingList()
    },
    props: {
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        postingList: [],
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
      this.getPostingList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      this.pagenum = 1
      this.total = 0
      this.isloading = false
      this.postingList = []

      this.getPostingList(() => uni.stopPullDownRefresh())
    },
    methods: {
      async getPostingList(cb) {
        if (this.userId === '') {
          this.postingList = []
          this.total = 0
          return
        }
        this.isloading = true
        const res = await this.loadPostingInfo(this.userId, this.pagenum, this.pagesize)
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        // 为数据赋值
        this.postingList = [...this.postingList, ...res.list]
        this.total = res.total
      }
    }
  }
</script>

<style>
  page {
    background-color: #f4f4f4;
  }
</style>

<style lang="scss">
</style>
