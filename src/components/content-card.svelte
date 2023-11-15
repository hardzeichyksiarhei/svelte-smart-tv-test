<div class='content-card' class:active={active}>
	{#if content}
		<img src={content.image} alt={content.title}>
	{/if}
</div>

<script lang='ts'>
	import type { Content } from '$lib/generate-contents';

	export let content: Content | null = null;
	export let active = false;
</script>

<style lang='scss'>
  .content-card {
    border-radius: 10px;
    width: 300px;
    height: 240px;
		border: 4px solid transparent;
    padding: 10px;

		&.active {
      border-color: #fff;
		}
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
</style>

