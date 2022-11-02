<template>
  <div>
    <dm-progress :percentage="percentage" :color="customColor"></dm-progress>

    <dm-progress
      :percentage="percentage"
      :color="customColorMethod"
    ></dm-progress>

    <dm-progress :percentage="percentage" :color="customColors"></dm-progress>
    <div>
      <dm-button-group>
        <dm-button icon="dm-icon-minus" @click="decrease"></dm-button>
        <dm-button icon="dm-icon-plus" @click="increase"></dm-button>
      </dm-button-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 20,
      customColor: '#409eff',
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
    };
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
  },
};
</script>
