import {
  mapMutations
} from 'vuex'

export default {
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateContactInfo', 'updateMyTraceInfo', 'updateTodaypostingInfo',
      'updatePostingInfo', 'updateSubscriptionInfo'
    ]),
    async load() {
      var userId = this.userinfo.userId

      this.updateSubscriptionInfo(await this.loadSubscription(userId))
      this.updateContactInfo(await this.loadContactInfo(userId))
      this.updatePostingInfo(await this.loadPostingInfo(userId, 1, 1))
      this.updateTodaypostingInfo(await this.loadTodayPostingInfo(userId))
      this.updateMyTraceInfo(await this.loadTraceInfo(userId))
    },
    async loadSubscription(userId) {
      const res = await uni.$http.get('/my/subscription', {
        userId: userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      return res.data
    },
    async loadContactInfo(userId) {
      const res = await uni.$http.get('/contacts', {
        userId: userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      return res.data
    },
    async loadPostingInfo(userId, pageNum, pageSize) {
      const res = await uni.$http.get('/my/posting', {
        userId: userId,
        pageNum: pageNum,
        pageSize: pageSize
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      return res.data
    },
    async loadTodayPostingInfo(userId) {
      const res = await uni.$http.get('/home/posting', {
        userId: userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      return res.data
    },
    async loadTraceInfo(userId) {
      const res = await uni.$http.get('/contacts/trace', {
        userId: userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      return res.data
    },
  }
}
