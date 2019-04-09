/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
		<h4>{{ title }}</h4>
		<div class="code-container" :class="{show: showCode}">
			<slot></slot>
		</div>
		<div class="code-button" :class="{hide: showCode}" @click.stop="showCode = !showCode">
			{{ showCode ? 'Hide Code' : 'Show Code' }}
		</div>
	</div>
</template>

<script>
export default {
	props: ['title'],
  data() {
    return {
			showCode: false,
		};
  }
};
</script>
<style lang='less'>
.code-container {
	overflow: hidden;
	height: 0;
	transition: height 0.5s;
	&.show {
		height: auto;
		transition: height 0.5s;
	}
}
.code-button {
	width: 50%;
	margin: 10px auto;
	cursor: pointer;
	padding: 12px;
	text-align: center;
	border: 1px solid #ccc;
	border-radius: 10px;
	&:hover {
		background: rgba(222, 222, 222, 0.2);
	}
	&.hide {
		background: #3eaf7c;
		color: #fff;
		&:hover {
			background: rgba(62, 175, 124, 0.9);
		}
	}
}
</style>