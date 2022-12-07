import {
  mapMutations
} from 'vuex'

export default {
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateContactInfo', 'updateMyTraceInfo', 'updateMyPostingInfo',
      'updatePostingInfo', 'updateSubscriptionInfo'
    ]),
    async load() {
      await this.loadContactInfo()
      await this.loadPostingInfo()
      await this.loadMyPostingInfo()
      await this.loadMyTraceInfo()
      await this.loadSubscription()
    },
    async loadSubscription() {
      const res = await uni.$http.get('/my/subscription', {
        userId: this.userinfo.userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      this.updateSubscriptionInfo(res.data)
    },
    async loadContactInfo() {
      const res = await uni.$http.get('/contacts', {
        userId: this.userinfo.userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      this.updateContactInfo(res.data)
    },
    async loadPostingInfo() {
      const res = await uni.$http.get('/home/posting', {
        userId: this.userinfo.userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      this.updatePostingInfo(res.data)
    },
    async loadMyPostingInfo() {
      const res = await uni.$http.get('/my/posting', {
        userId: this.userinfo.userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      this.updateMyPostingInfo(res.data)
    },
    async loadMyTraceInfo() {
      const res = await uni.$http.get('/contacts/trace', {
        userId: this.userinfo.userId
      })
      // console.log('res', res)
      if (res.statusCode !== 200) return
      this.updateMyTraceInfo(res.data)
    },
  }
}
