<template>
  <div>
    <ul v-infinite-scroll="loadMore" :infinite-scroll-delay="200">
      <li v-for="num in list" :key="num">
        {{ num }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    loadMore() {
      console.log(111);
      this.list = this.list.concat([1, 2, 3, 4, 5]);
    },
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
