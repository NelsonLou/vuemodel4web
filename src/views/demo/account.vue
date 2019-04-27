<template lang="html">
<div class="account">
	<tableComp :dataUrl='dataUrl'></tableComp>
</div>
</template>

<script>
export default {
	name: 'account',
	data() {
		return {
			dataUrl: '/mock/userList'
		}
	}
}
</script>

<style lang="css" scoped>
</style>
