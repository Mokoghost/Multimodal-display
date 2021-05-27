<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card height="450" rounded="lg" id="line-chart"
              :class="`elevation-${hover ? 12 : 3}`"
              class="mx-auto pa-6 transition-swing">
        <v-card-subtitle style="font-weight: bold;font-size: larger">听觉识别</v-card-subtitle>
        <!--<v-col>-->
        <!--  <v-card></v-card>-->
        <!--</v-col>-->
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "hearing",
  mounted() {
    let chartDom = document.getElementById('line-chart')
    let myChart = echarts.init(chartDom)
    let option
    let xAxisData = []
    let yAxisData = []
    for (let i = 0; i < 300; i++) {
      xAxisData.push("t" + i)
      yAxisData.push(Math.random())
    }
    option = {
      title: {
        top: "5%",
        left: "center",
        text: "听觉传感器",
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
    };

    option && myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize()
    })
  },
}
</script>

<style scoped>

</style>
