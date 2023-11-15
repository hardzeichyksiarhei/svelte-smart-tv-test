{#if content}
	<div class='content-info'>
		<h3 class='content-info__title'>{content.title}</h3>
		<h3 class='content-info__description'>{content.description}</h3>
	</div>
{/if}

<script lang="ts">
	import type { Content } from '$lib/generate-contents';

	export let content: Content | null = null;
</script>

<style lang='scss'>
	.content-info {
    width: 50%;
    padding: 60px;
    color: #fff;

		&__title {
      margin-top: 0;
			font-family: sans-serif;
      font-size: 42px;
		}

		&__description {
      font-family: sans-serif;
      font-weight: 400;
      line-height: 1.4;
      font-size: 22px;
		}
	}
</style>

