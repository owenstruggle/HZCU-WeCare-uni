<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item" @click="channelDetailClick(item.channelId)">
          <image :src="imageSourceSrc + item.channelImageSrc"></image>
        </view>
      </swiper-item>
    </swiper>

    <!-- 类别区域 -->
    <view class="category-list">
      <view v-for="(item, i) in categoryList" :key="i">
        <view class="category-item" @click="channelCategoryClick(item.channelCategoryName)">
          <image :src="imageSourceSrc + item.channelCategoryImageSrc"></image>
          <text>{{item.channelCategoryName}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    computed: {
      ...mapState('m_share', ['imageSourceSrc']),
    },
    data() {
      return {
        swiperList: [], // 轮播图的数据列表，默认为空数组
        categoryList: [], // 频道类别
      };
    },
    onLoad() {
      this.getSwiperList() // 在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getcategoryList() // 在小程序页面刚加载的时候，调用获取轮播图数据的方法
    },
    methods: {
      // 跳转到分包中的搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // 获取轮播图数据的方法
      async getSwiperList() {
        const res = await uni.$http.get('/shop/swiperdata')
        if (res.statusCode !== 200) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none',
          })
        }
        this.swiperList = res.data
      },
      async getcategoryList() {
        const res = await uni.$http.get('/shop/category')
        if (res.statusCode !== 200) {
          return uni.showToast({
            title: '数据请求失败！',
            duration: 1500,
            icon: 'none',
          })
        }
        this.categoryList = res.data
      },
      channelCategoryClick(channelCategoryName) {
        uni.navigateTo({
          url: '/subpkg/channel_list/channel_list?query=' + channelCategoryName
        })
      }, 
      channelDetailClick(channelId) {
        uni.navigateTo({
          url: '/subpkg/channel_detail/channel_detail?channelId=' + channelId
        })
      }
    },
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;  // 设置定位效果为“吸顶”
    top: 0;  // 吸顶的“位置”
    z-index: 999;  // 提高层级，防止被轮播图覆盖
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    border-top: 1rpx solid #efefef;
    border-left: 1rpx solid #efefef;
    background-color: #e1e1e1;
    margin: 10rpx 10rpx;
    border-radius: 10rpx;

    .category-item {
      width: 365rpx;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-right: 1rpx solid #efefef;
      border-bottom: 1rpx solid #efefef;
      box-sizing: border-box;
      border-radius: 10rpx;

      image {
        width: 80rpx;
        height: 80rpx;
      }

      text {
        font-size: 40rpx;
        margin: 18rpx;
      }
    }
  }
</style>
