<template>
  <view class="my-container">
    <!-- 用户未登录时，显示登录组件 -->
    <my-login v-if="!userinfo || !userinfo.openid"></my-login>

    <!-- 用户登录后，显示用户信息组件 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import loadInfo from '@/mixins/loadInfo.js'
  import {
    mapState
  } from 'vuex'
  export default {
    mixins: [loadInfo],
    computed: {
      ...mapState('m_user', ['userinfo']),
    },
    onShow() {
      this.load()
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  page,
  .my-container {
    height: 100%;
  }
</style>
