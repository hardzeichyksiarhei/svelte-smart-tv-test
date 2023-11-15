<div class='wrapper' style:background-image={`url(${content.image})`}>
  <div class='wrapper__top'>
    <ContentInfo content={content} />
  </div>

  <div class='wrapper__bottom'>
    <Carousel duration={7000} direction='column' on:change-slide={handleChangeRowSlide}>
      {#each rows as row, rowIndex (row.id)}
        <CarouselSlide>
          <Carousel
                  title='Title #{rowIndex}'
                  duration={row.duration}
                  active={rowIndex === currentRowSlide}
                  direction='row'
                  on:change-slide={handleChangeColumnSlide}
          >
            {#each row.contents as content, columnIndex (content.image)}
              <CarouselSlide index={columnIndex}>
                <ContentCard content={content}
                             active={rowIndex === currentRowSlide && columnIndex === currentColumnSlide}
                />
              </CarouselSlide>
            {/each}
          </Carousel>
        </CarouselSlide>
      {/each}
    </Carousel>
  </div>
</div>

<script lang='ts'>
  import type { ComponentEvents } from 'svelte';
  import { onMount } from 'svelte';

  import { generateContents } from './helpers/generate-contents';
  import { runFrameCount } from './helpers/fps';

  import Carousel from './components/carousel.svelte';
  import CarouselSlide from './components/carousel-slide.svelte';
  import ContentCard from './components/content-card.svelte';
  import ContentInfo from './components/content-info.svelte';

  let currentRowSlide = 0;
  let currentColumnSlide = 0;
  let rows = generateContents();

  $: content = rows[currentRowSlide].contents[currentColumnSlide];

  onMount(() => {
    runFrameCount();
  })

  const handleChangeRowSlide = (event: ComponentEvents<Carousel>['currentSlide']) => {
    currentRowSlide = event.detail.currentSlide;
  };

  const handleChangeColumnSlide = (event: ComponentEvents<Carousel>['currentSlide']) => {
    currentColumnSlide = event.detail.currentSlide;
  };
</script>

<style lang='scss'>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .wrapper {
    position: relative;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    will-change: transform, opacity;
    transform: translateZ(0);
    transition: .5s background-image linear;

    &:after {
      content: '';
      position: absolute;
      z-index: 5;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .6);
    }

    &__top {
      position: relative;
      z-index: 10;

      height: 500px;
    }

    &__bottom {
      position: relative;
      z-index: 10;

      padding: 0 60px;

      height: 580px;
      overflow-y: hidden;
      overflow-x: hidden;
    }
  }
</style>