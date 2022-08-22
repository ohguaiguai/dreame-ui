<template>
  <div>
    <!-- <d-carousel
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
    </d-carousel> -->
    <ul v-infinite-scroll :infinite-scroll-delay="200">
      <li v-for="num in 10" :key="num">
        {{ num }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // change(index) {
    //   console.log(index);
    // }
  },
};
</script>
<style>
ul {
  width: 100%;
  height: 500px;
  background: #ccc;
  overflow-y: auto;
}
</style>
