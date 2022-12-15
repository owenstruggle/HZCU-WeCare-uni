<template>
  <view v-if="todaypostingInfo.total != 0">
    {{todaypostingInfo.total}}
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
      ...mapState('m_user', ['userinfo', 'todaypostingInfo']),
    },
    onShow() {

    },
    data() {
      return {

      };
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
