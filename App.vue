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
      basePath: 'https://localhost:8082/share',
      updateBasePath: 'https://localhost:8082/'
    }
	}
</script>

<style lang="scss">
</style>
