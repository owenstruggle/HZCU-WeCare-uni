<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- 可以从 @getUserProfile 事件处理函数的形参中，获取到用户的基本信息 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: "my-login",
    created() {
      // 一定要讲 code 申请写在 Load 中
      this.login()
    },
    data() {
      return {
        code: ''
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      async login() {
        await uni.login({
          success: (res) => {
            this.code = res.code
            console.log("code", res.code)
          },
          fail: (err) => {
            if (res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
          }
        })
      },
      // 获取微信用户的基本信息
      async getUserProfile() {
        const [err, res] = await uni.getUserProfile({
          desc: '获取登录授权'
        }).catch(err => err)
        if (err && err.errMsg === "getUserProfile:fail auth deny") {
          return uni.$showMsg('您取消了登录授权！')
        }
        console.log(res)
        this.updateUserInfo(res.userInfo)
        this.getToken(res)
      },
      // 调用登录接口，换取永久的 openid
      async getToken(info) {
        // 换取 openid
        console.log("this.code", this.code)
        const loginResult = await uni.$http.post('/my/user/wxlogin', {
          code: this.code, // 用户登录凭证（有效期五分钟）
          encryptedData: info.encryptedData, // 包括敏感数据在内的完整用户信息的加密数据
          iv: info.iv, // 加密算法的初始向量，详见 用户数据的签名验证和加解密
          rawData: info.rawData, // 不包括敏感信息的原始数据字符串，用于计算签名
          signature: info.signature // 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
        })
        console.log("loginResult", loginResult)
        if (loginResult.statusCode !== 200) return uni.$showMsg('登录失败！')
        this.updateToken(loginResult.data.openid)
        uni.$showMsg('登录成功')
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
