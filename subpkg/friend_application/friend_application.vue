<template>
  <view>
    <view v-for="(item, i) in applicationList" :key="i">
      <my-application :applicationInfo="item"></my-application>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    computed: {
      ...mapState('m_user', ['userinfo'])
    },
    onLoad() {
      this.loadApplication(this.userinfo.userId)
    },
    data() {
      return {
        applicationList: []
      };
    },
    methods: {
      async loadApplication(userId) {
        const res = await uni.$http.get('/my/application?userId=' + userId)
        // console.log("res", res)
        if (res.statusCode !== 200) return
        this.applicationList = res.data
      }
    }
  }
</script>

<style lang="scss">

</style>
