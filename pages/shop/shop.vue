<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.imageSrc"></image>
        </view>
      </swiper-item>
    </swiper>
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
      };
    },
    onLoad() {
      this.getSwiperList() // 在小程序页面刚加载的时候，调用获取轮播图数据的方法
    },
    methods: {
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
        for (var i = 0; i < this.swiperList.length; i++) {
          this.swiperList[i].imageSrc = this.imageSourceSrc + this.swiperList[i].imageSrc
        }
      },
    },
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }
</style>
