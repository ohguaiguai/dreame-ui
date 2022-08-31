<template>
  <div>
    <d-carousel
      height="200px"
      :autoplay="true"
      :delay="2000"
      :initial-index="2"
      :loop="true"
      @change="change"
    >
      <d-carousel-item>
        <div class="content">1</div>
      </d-carousel-item>
      <d-carousel-item>
        <div class="content">2</div>
      </d-carousel-item>
      <d-carousel-item>
        <div class="content">3</div>
      </d-carousel-item>
    </d-carousel>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
