<template>
  <view class="personal-info-container">
    <view class="panel">
      <view class="panel-list-item head-portrait">
        <text>头像</text>
        <image :src="userinfo.avatarUrl"></image>
      </view>
      <view class="panel-list-item" @click="changeNickName">
        <text>用户名</text>
        <text>{{userinfo.nickName}}</text>
      </view>
      <view class="panel-list-item" @click="changeGender">
        <text>性别</text>
        <text v-if="userinfo.gender === false">男</text>
        <text v-else>女</text>
      </view>
      <view class="panel-list-item">
        <text>手机号</text>
        <text v-if="userinfo.phoneNumber === ''">未知</text>
        <text v-else>{{userinfo.phoneNumber}}</text>
      </view>
      <view class="panel-list-item" @click="changeCity">
        <text>城市</text>
        <text v-if="userinfo.city === ''">未知</text>
        <text v-else>{{userinfo.city}}</text>
      </view>
      <view class="panel-list-item" @click="changeProvince">
        <text>省份</text>
        <text v-if="userinfo.province === ''">未知</text>
        <text v-else>{{userinfo.province}}</text>
      </view>
      <view class="panel-list-item" @click="changeCountry">
        <text>国家</text>
        <text v-if="userinfo.country === ''">未知</text>
        <text v-else>{{userinfo.country}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  let _self = null;
  export default {
    computed: {
      // 将 m_user 模块中的 userinfo 映射到当前页面中使用
      ...mapState('m_user', ['userinfo']),
    },
    onLoad() {
      _self = this
    },
    data() {
      return {
        update_info: {}
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo']),
      async update() {
        let query = {
          userId: this.update_info.userId,
          nickName: this.update_info.nickName,
          gender: this.update_info.gender,
          phoneNumber: this.update_info.phoneNumber,
          city: this.update_info.city,
          province: this.update_info.province,
          country: this.update_info.country
        }
        const res = await uni.$http.put('/my/user', query)
        console.log('res', res)
        if (res.statusCode !== 200) {
          uni.$showMsg('更新失败')
        }
        this.updateUserInfo(res.data)
        uni.$showMsg('更新成功')
      },
      changeNickName() {
        this.update_info = Object.assign({}, this.userinfo)  // 拷贝值
        uni.showModal({
          title: '修改用户名',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log(res)
            if (res.content !== '') {
              _self.update_info.nickName = res.content
              _self.update()
            }
            uni.$showMsg('更新失败')
          }
        })
      },
      changeGender() {
        this.update_info = Object.assign({}, this.userinfo)  // 拷贝值
        uni.showModal({
          title: '修改性别',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log(res)
            if (res.content === '男') {
              _self.update_info.gender = false
              _self.update()
            } else if (res.content === '女') {
              _self.update_info.gender = true
              _self.update()
            }
            uni.$showMsg('更新失败')
          }
        })
      },
      changeCity() {
        this.update_info = Object.assign({}, this.userinfo)  // 拷贝值
        uni.showModal({
          title: '修改城市',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log(res)
            if (res.content !== '') {
              _self.update_info.city = res.content
              _self.update()
            } 
            uni.$showMsg('更新失败')
          }
        })
      },
      changeProvince() {
        this.update_info = Object.assign({}, this.userinfo)  // 拷贝值
        uni.showModal({
          title: '修改城市',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log(res)
            if (res.content !== '') {
              _self.update_info.province = res.content
              _self.update()
            } 
            uni.$showMsg('更新失败')
          }
        })
      },
      changeCountry() {
        this.update_info = Object.assign({}, this.userinfo)  // 拷贝值
        uni.showModal({
          title: '修改城市',
          confirmColor: '#3A3A3A',
          cancelColor: '#999999',
          confirmText: '保存',
          editable: true,
          success(res) {
            console.log(res)
            if (res.content !== '') {
              _self.update_info.country = res.content
              _self.update()
            } 
            uni.$showMsg('更新失败')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .personal-info-container {
    height: 100%;
    // 为整个组件的结构添加浅灰色的背景
    background-color: #f4f4f4;

    .panel {
      background-color: white;
      border-radius: 6rpx;
      margin-bottom: 16rpx;
      margin-top: 20rpx;
      border-top: 1px solid #efefef;
    }

    .panel-list-item {
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      padding: 0 10px;
      border-bottom: 1px solid #efefef;
    }

    .head-portrait {
      height: 65px;

      image {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }
</style>
