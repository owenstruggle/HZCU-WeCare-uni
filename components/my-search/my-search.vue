<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#41A863'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18 // 单位是 px
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandler() {
        // 触发外界通过 @click 绑定的 click 事件处理函数
        this.$emit('click')
      }
    },
  }
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
