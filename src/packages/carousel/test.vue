<template>
  <div>
    <dm-carousel
      height="200px"
      :autoplay="true"
      :delay="2000"
      :initial-index="2"
      :loop="true"
      @change="change"
    >
      <dm-carousel-item>
        <div class="content">1</div>
      </dm-carousel-item>
      <dm-carousel-item>
        <div class="content">2</div>
      </dm-carousel-item>
      <dm-carousel-item>
        <div class="content">3</div>
      </dm-carousel-item>
    </dm-carousel>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
