<div class='carousel' class:row={direction === 'row'}>
	{#if title}<h3 class='carousel__title'>{title}</h3>{/if}
	<div
		class='carousel__inner'
		style:transform={transform}
		style:flex-direction={direction}
		bind:this={innerEl}
	>
		<slot></slot>
	</div>
</div>


<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	// props
	export let title = '';
	export let active = true;
	export let duration = 500;
	export let direction: 'row' | 'column' = 'row';

	// variables
	let currentSlide = 0;
	let ended = false;
	let started = true;
	let transform = '';

	let interval = 0;
	let innerEl: HTMLDivElement | null;

	$: {
		if (active) startTrack(duration);
		else stopTrack();
	}

	const startTrack = (timeout: number) => {
		if (interval) return;
		interval = setInterval(() => {
			if (!innerEl) return;

			if (started) {
				currentSlide++;

				if (currentSlide === innerEl.children.length) {
					ended = true;
					started = false;
				}
			}

			if (ended) {
				currentSlide--;

				if (currentSlide <= 0) {
					ended = false;
					started = true;
				}
			}

			const slide = innerEl.children[currentSlide] as HTMLDivElement;

			if (direction === 'row') {
				transform = `translateX(-${(currentSlide) * (slide.offsetWidth + 20)}px)`;
			} else if (direction === 'column') {
				transform = `translateY(-${(currentSlide) * slide.offsetHeight}px)`;
			}

			dispatch('change-slide', { currentSlide });
		}, timeout);
	};

	const stopTrack = () => {
		if (interval) {
			clearInterval(interval);
			interval = 0;
		}
	};

	onMount(() => {
		if (active) startTrack(duration);

		return () => stopTrack();
	});
</script>

<style lang='scss'>
  .carousel {
    &.row :global(.carousel__item) {
			margin-right: 20px;
		}

    &__title {
      font-size: 32px;
      font-family: sans-serif;
      font-weight: 400;
      margin: 0;
      padding: 20px 0;
      color: #fff;
    }

    &__inner {
      display: flex;
      transition: .5s transform linear;
      will-change: transform;
			transform: translateZ(0);
    }
  }
</style>