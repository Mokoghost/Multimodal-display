<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
          height="450" id="haptic-chart" rounded="lg"
          :class="`elevation-${hover ? 12 : 3}`"
          class="mx-auto pa-6 transition-swing"
      >
        Prop based elevation
      </v-card>
    </template>
  </v-hover>
</template>

<script>
let echarts = require("echarts")
let data = []
let cols = ['col 1', 'col 2', 'col 3', 'col 4', 'col 5', 'col 6']
let rows = ['row 1', 'row 2', 'row 3', 'row 4']
export default {
  name: "haptic",
  props: ['hapticData'],
  data() {
    return {
      chart: null,
      option: {}
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('haptic-chart'))

    // let sentData = [1, 1, 1, 1, 2, 2, 2, 4, 1, 1, 1, 1, 2, 2, 2, 4, 1, 1, 1, 1, 2, 2, 2, 4]
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        data.push([i, j, this.hapticData[i * 6 + j]])//this.
      }
    }
    // console.log(data);
    data = data.map(function (item) {
      return [item[1], item[0], item[2] || '-']
    })

    this.option = {
      title: {
        top: "5%",
        left: "center",
        text: "触觉",
        textStyle: {
          fontFamily: "华文中宋"
        }
      },
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '40%',
        top: '25%'
      },
      xAxis: {
        type: 'category',
        data: cols,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: rows,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 2,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '10%',
        inRange: {
          color: ['rgba(0,191,255,0.1)', 'rgba(30,144,255,1)'],
        },
        show: true,
      },
      series: [{
        name: 'Haptic Card',
        type: 'heatmap',
        data: data,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
    this.chart.setOption(this.option)
  },
  watch: {
    hapticData: {
      deep: true,
      handler(newValue) {
        // console.log(newValue)
        this.hapticData = newValue
        data = []
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 6; j++) {
            data.push([i, j, this.hapticData[i * 6 + j]])
          }
        }
        // console.log(data)
        data = data.map(function (item) {
          return [item[1], item[0], item[2] || '-']
        })
        this.option = {
          title: {
            top: "5%",
            left: "center",
            text: "触觉传感器",
            textStyle: {
              fontFamily: "华文中宋"
            }
          },
          tooltip: {
            position: 'top'
          },
          grid: {
            height: '40%',
            top: '25%'
          },
          xAxis: {
            type: 'category',
            data: cols,
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: rows,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: 2,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '10%',
            inRange: {
              color: ['rgba(0,191,255,0.1)', 'rgba(30,144,255,1)'],
            },
            show: true,
          },
          series: [{
            name: 'Haptic Card',
            type: 'heatmap',
            data: data,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
