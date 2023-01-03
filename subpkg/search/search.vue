<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-list">
        <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.channelId)">
          <view class="goods-name">{{item.channelName}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-box">
        <!-- 标题区域 -->
        <view class="history-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
        </view>
        <!-- 列表区域 -->
        <view class="history-list">
          <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    computed: {
      historys() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    data() {
      return {
        timer: null, // 延时器的 timerId
        kw: '', // 搜索关键词
        searchResults: [], // 搜索结果列表
        historyList: [], // 搜索关键词的历史记录
      };
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchList()
        }, 500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const res = await uni.$http.get('/shop/search', {
          query: this.kw
        })
        console.log(res)
        if (res.statusCode !== 200) return uni.$showMsg()
        if (res.data.total !== 0) {
          this.searchResults = res.data.list
          this.saveSearchHistory()
        }
      },
      // 保存搜索关键词的方法
      saveSearchHistory() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      gotoDetail(channelId) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 channelId 参数
          url: '/subpkg/channel_detail/channel_detail?channelId=' + channelId
        })
      },
      // 清空搜索历史记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },
      // 点击跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/channel_list/channel_list?query=' + kw
        })
      }
    },
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>
