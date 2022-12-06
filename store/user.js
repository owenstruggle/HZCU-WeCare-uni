export default {
  // 开启命名空间
  namespaced: true,

  // 数据
  state: () => ({
    // 用户的信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 联系人对象
    contactInfo: JSON.parse(uni.getStorageSync('contactInfo') || '{}'),
    // 今日动态
    postingInfo: JSON.parse(uni.getStorageSync('postingInfo') || '{}'),
    // 我的动态
    myPostingInfo: JSON.parse(uni.getStorageSync('myPostingInfo') || '{}'),
    // 我的轨迹数据
    myTraceInfo: JSON.parse(uni.getStorageSync('myTraceInfo') || '{}'),
  }),

  // 方法
  mutations: {
    // userinfo 的更新方法
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    // contactInfo 的更新方法
    updateContactInfo(state, contactInfo) {
      state.contactInfo = contactInfo
      this.commit('m_user/saveContactInfoToStorage')
    },
    saveContactInfoToStorage(state) {
      uni.setStorageSync('contactInfo', JSON.stringify(state.contactInfo))
    },
    // PostingInfo 的更新方法
    updatePostingInfo(state, postingInfo) {
      state.postingInfo = postingInfo
      this.commit('m_user/savePostingInfoToStorage')
    },
    savePostingInfoToStorage(state) {
      uni.setStorageSync('postingInfo', JSON.stringify(state.postingInfo))
    },
    // myPostingInfo 的更新方法
    updateMyPostingInfo(state, myPostingInfo) {
      state.myPostingInfo = myPostingInfo
      this.commit('m_user/saveMyPostingInfoToStorage')
    },
    saveMyPostingInfoToStorage(state) {
      uni.setStorageSync('myPostingInfo', JSON.stringify(state.myPostingInfo))
    },
    // myTraceInfo 的更新方法
    updateMyTraceInfo(state, myTraceInfo) {
      state.myTraceInfo = myTraceInfo
      this.commit('m_user/saveMyTraceInfoToStorage')
    },
    saveMyTraceInfoToStorage(state) {
      uni.setStorageSync('myTraceInfo', JSON.stringify(state.myTraceInfo))
    },
  },

  getters: {}
}
