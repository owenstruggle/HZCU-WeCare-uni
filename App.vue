<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    globalData: {
      // basePath: 'https://localhost:8082/share',
      basePath: 'https://121.199.66.137:8082/share',
      // updateBasePath: 'https://localhost:8082/'
      updateBasePath: 'https://121.199.66.137:8082/'
    }
  }
</script>

<style lang="scss">
</style>
