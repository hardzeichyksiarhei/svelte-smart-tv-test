<div class='carousel__item'>
	{#if index !== -1}<span>{index + 1}</span>{/if}
	<slot></slot>
</div>


<script lang='ts'>
	// props
	export let index = -1;
</script>

<style lang='scss'>
  .carousel {
    &__item {
      position: relative;
      border: 2px solid transparent;

      span {
        position: absolute;
        top: 25px;
        left: 25px;
        color: #fff;
        font-size: 28px;
        background-color: #000;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
        border-radius: 10px;
      }
    }
  }
</style>