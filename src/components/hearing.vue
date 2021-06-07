<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card height="220" rounded="lg" id="line-chart"
              :class="`elevation-${hover ? 12 : 3}`"
              class="mx-auto pa-6 transition-swing">
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "hearing",
  props: ['voice'],
  data() {
    return {
      chart: null,
      option: {},
      xAxisData: [],
      yAxisData: [],
      counter: 0
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('line-chart'))
    let xAxisData = []
    let yAxisData = []
    for (let i = 0; i < 300; i++) {
      xAxisData.push("t" + i)
      yAxisData.push(Math.random() * 100)
    }
    this.option = {
      title: {
        top: "5%",
        left: "center",
        text: "听觉",
        textStyle: {
          fontFamily: "华文中宋"
        }
      },
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '60%',
        top: '25%',
        left: '10%',
        right: '10%'
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        show: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [{
        data: yAxisData,
        type: 'line'
      }]
    }
    this.chart.setOption(this.option)
  },
  watch: {
    voice: {
      deep: true,
      handler(newValue) {
        this.voice = newValue
        console.log("this.voice: " + this.voice)
        this.counter++
        this.xAxisData.push("t" + this.counter)
        this.yAxisData.push(this.voice[0])
        this.option = {
          title: {
            top: "5%",
            left: "center",
            text: "听觉",
            textStyle: {
              fontFamily: "华文中宋"
            }
          },
          tooltip: {
            position: 'top'
          },
          grid: {
            height: '60%',
            top: '25%',
            left: '10%',
            right: '10%'
          },
          xAxis: {
            type: 'category',
            data: this.xAxisData,
            show: false,
          },
          yAxis: {
            type: 'value',
            show: false,
          },
          series: [{
            data: this.yAxisData,
            type: 'line'
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
