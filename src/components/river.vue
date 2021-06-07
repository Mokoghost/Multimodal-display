<template>
  <v-card
      height="250"
      elevation="0"
      id="river"></v-card>
</template>

<script>
let echarts = require("echarts")
export default {
  name: "river",
  props: {
    confidence: {
      default() {
        return [1.0, 1.5384615384615377, 1.0, 1.0, 0.0003509521484375, 0.5]
      }
    }
  },
  data() {
    return {
      chart: null,
      option: {},
      face: [],
      emg: [],
      pos: [],
      haptic: [],
      hear: [],
      heart: [],
      labels: [
        '面部',
        '肌电',
        '位姿',
        '触觉',
        '听觉',
        '心率'
      ]
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('river'))
    let rawData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 49, 67, 16, 0, 19, 19, 0, 0, 1, 10, 5, 6, 1, 1, 0, 25, 0, 0, 0],
      [0, 6, 3, 34, 0, 16, 1, 0, 0, 1, 6, 0, 1, 56, 0, 2, 0, 2, 0, 0],
      [0, 8, 13, 15, 0, 12, 23, 0, 0, 1, 0, 1, 0, 0, 6, 0, 0, 1, 0, 1],
      [0, 9, 28, 0, 91, 6, 1, 0, 0, 0, 7, 18, 0, 9, 16, 0, 1, 0, 0, 0],
      [0, 3, 42, 36, 21, 0, 1, 0, 0, 0, 0, 16, 30, 1, 4, 62, 55, 1, 0, 0],
    ]
    let data = [];
    for (let i = 0; i < rawData.length; i++) {
      for (let j = 0; j < rawData[i].length; j++) {
        let label = this.labels[i];
        data.push([
          j, rawData[i][j], label
        ]);
      }
    }
    this.option = {
      grid: {},
      singleAxis: {
        max: 'dataMax',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [{
        type: 'themeRiver',
        data: data,
        label: {
          show: false
        },
      }]
    }
    this.chart.setOption(this.option)
  },
  watch: {
    confidence: {
      deep: true,
      handler(newValue) {
        this.confidence = newValue
        this.face.push(this.confidence[0])
        this.emg.push(this.confidence[1])
        this.pos.push(this.confidence[2])
        this.haptic.push(this.confidence[3])
        this.hear.push(this.confidence[4])
        this.heart.push(this.confidence[5])
        let rawData = []
        rawData.push(this.face)
        rawData.push(this.emg)
        rawData.push(this.pos)
        rawData.push(this.haptic)
        rawData.push(this.hear)
        rawData.push(this.heart)
        let data = [];
        for (let i = 0; i < rawData.length; i++) {
          for (let j = 0; j < rawData[i].length; j++) {
            let label = this.labels[i];
            data.push([
              j, rawData[i][j], label
            ]);
          }
        }
        this.option = {
          grid: {},
          singleAxis: {
            max: 'dataMax',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          series: [{
            type: 'themeRiver',
            data: data,
            label: {
              show: false
            },
          }]
        }
        this.chart.setOption(this.option)
      }
    }
  }
}
</script>

<style scoped>

</style>
