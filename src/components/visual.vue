<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card height="450" rounded="lg"
              :class="`elevation-${hover ? 12 : 3}`"
              class="mx-auto pa-6 transition-swing">
        <v-card-subtitle style="font-weight: bold;font-size: larger">面部表情识别</v-card-subtitle>
        <v-row dense>
          <v-col cols="7" class="font-weight-bold pl-2">
            识别结果：开心
          </v-col>
          <v-col cols="2" class="font-weight-bold pl-2">置信度:</v-col>
          <v-col cols="2">
            <v-card v-bind:color="calculateColor" rounded="pill" style="alignment: center;color: #ffffff" class="pl-3">
              {{ probability }}
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="800"
                max-width="1000"
                position="center"
                src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <simple-table :emotion="emotion"/>
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import SimpleTable from "@/components/charts/emotion-table"

export default {
  name: "visual",
  data() {
    return {
      probability: 0.32,
      emotion: {
        default: function () {
          return [
            {
              Neutral: 0.3,
              Anger: 0.1,
              Disgust: 0.1,
              Fear: 0.1,
              Happy: 0.1,
              Sad: 0.1,
              Surprise: 0.1,
            },
          ]
        }
      }
    }
  },
  props: ['visualData'],
  computed: {
    calculateColor: function () {
      if (this.probability < 0.3) {
        return "#E53935"
      } else if (this.probability >= 0.3 && this.probability < 0.6) {
        return "#FF9800"
      } else {
        return "#43A047"
      }
    },
  },
  components: {SimpleTable},
  watch: {
    visualData: {
      deep: true,
      handler(newValue) {
        this.visualData = newValue
        let data = [
          {
            Neutral: 0.3,
            Anger: 0.1,
            Disgust: 0.1,
            Fear: 0.1,
            Happy: 0.1,
            Sad: 0.1,
            Surprise: 0.1,
          },
        ]
        data[0].Neutral = this.visualData[0]
        data[0].Anger = this.visualData[1]
        data[0].Disgust = this.visualData[2]
        data[0].Fear = this.visualData[3]
        data[0].Happy = this.visualData[4]
        data[0].Sad = this.visualData[5]
        data[0].Surprise = this.visualData[6]
        this.emotion = data
      }
    }
  }
}
</script>

<style scoped>

</style>
