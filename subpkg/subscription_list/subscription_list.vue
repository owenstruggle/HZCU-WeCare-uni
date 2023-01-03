<template>
  <view>
    <view v-for="(item, i) in subscription" :key="i" @click="gotoDetail(item)">
      <my-subscription :subscription="item"></my-subscription>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    computed: {
      ...mapState('m_user', ['userinfo', 'subscriptionInfo']),
    },
    onLoad(options) {
      this.type = options.type
    },
    onShow() {
      let tempSubscription = []
      if (this.type === '0') {
        // 个人订阅
        this.subscriptionInfo.forEach(e => {
          if (e.userId === this.userinfo.userId && e.acceptUserId === this.userinfo.userId) tempSubscription.push(e)
        })
        this.subscription = tempSubscription
      } else if (this.type === '1') {
        // 订阅申请
        this.subscriptionInfo.forEach(e => {
          if (e.userId !== this.userinfo.userId && e.acceptUserId === this.userinfo.userId) tempSubscription.push(e)
        })
        this.subscription = tempSubscription
      } else {
        // 全部订阅
        this.subscription = Object.assign([], this.subscriptionInfo)
      }
      console.log("subscription_list subscription", this.subscription)
    },
    data() {
      return {
        type: null,
        subscription: []
      };
    },
    methods: {
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/subscription_detail/subscription_detail?subscription=' + encodeURIComponent(JSON.stringify(item))
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
