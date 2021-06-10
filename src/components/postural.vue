<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card height="450" rounded="lg"
              :class="`elevation-${hover ? 12 : 3}`"
              class="mx-auto pa-6 transition-swing">
        <v-card-subtitle style="font-weight: bold;font-size: larger" class="title-font">位姿</v-card-subtitle>
        <v-row dense>
          <v-col cols="5" class="font-weight-bold info-font">
            {{ result }}
          </v-col>
          <v-col cols="4" class="font-weight-bold info-font">置信度:</v-col>
          <v-col cols="3">
            <v-card
                :color="calculateColor"
                rounded="pill"
                class="pl-1 info-font"
                style="alignment: center;color: #ffffff">
              {{ confidence }}
            </v-card>
          </v-col>
          <v-col>
            <v-img
                max-height="300"
                max-width="200"
                position="center"
                :src="imgURL"
            ></v-img>
          </v-col>
          <pos-table :posture="posture"/>
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import PosTable from "@/components/charts/pos-table";

export default {
  name: "postural",
  components: {PosTable},
  props: ['posturalProb', 'confidence'],
  methods: {
    preciseTo3bit(number) {
      return Math.round(number * 100) / 100
    }
  },
  data() {
    return {
      result: '来回走动',
      posture: {
        default: function () {
          return {
            nod: {
              prob: 0.1,
              cn: "点头"
            },
            shake_head: {
              prob: 0.4,
              cn: "摇头"
            },
            applaud: {
              prob: 0.1,
              cn: "鼓掌"
            },
            shake_leg: {
              prob: 0.1,
              cn: "抖腿"
            },
            scratch_head: {
              prob: 0.1,
              cn: "搔头"
            },
            arms_folded: {
              prob: 0.1,
              cn: "双手抱臂"
            },
            wandering: {
              prob: 0.1,
              cn: "来回走动"
            },
          }
        }
      },
      imgURL: {
        default: function () {
          return "../assets/img/poses/wandering.gif"
        }
      }
    }
  },
  computed: {
    calculateColor: function () {
      if (this.confidence < 0.3) {
        return "#E53935"
      } else if (this.confidence >= 0.3 && this.confidence < 0.6) {
        return "#FF9800"
      } else {
        return "#43A047"
      }
    },
  },
  watch: {
    posturalProb: {
      deep: true,
      handler(newValue) {
        this.posturalProb = newValue
        // console.log(this.posturalProb)
        let data = {
          "nod": {
            prob: 0.1,
            cn: "点头"
          },
          "shake_head": {
            prob: 0.4,
            cn: "摇头"
          },
          "applaud": {
            prob: 0.1,
            cn: "鼓掌"
          },
          "shake_leg": {
            prob: 0.1,
            cn: "抖腿"
          },
          "scratch_head": {
            prob: 0.1,
            cn: "搔头"
          },
          "arms_folded": {
            prob: 0.1,
            cn: "双手抱臂"
          },
          "wandering": {
            prob: 0.1,
            cn: "来回走动"
          },
        }
        data.nod.prob = this.preciseTo3bit(this.posturalProb[0])
        data.shake_head.prob = this.preciseTo3bit(this.posturalProb[1])
        data.applaud.prob = this.preciseTo3bit(this.posturalProb[2])
        data.shake_leg.prob = this.preciseTo3bit(this.posturalProb[3])
        data.scratch_head.prob = this.preciseTo3bit(this.posturalProb[4])
        data.arms_folded.prob = this.preciseTo3bit(this.posturalProb[5])
        data.wandering.prob = this.preciseTo3bit(this.posturalProb[6])
        this.posture = data
        let max = this.posturalProb[0]
        let maxE = ''
        let maxR = ''
        for (let e in data) {
          if (data[e].prob > max) {
            maxE = e
            max = data[e].prob
            maxR = data[e].cn
          }
        }
        this.result = maxR
        this.imgURL = require("../assets/img/poses/" + maxE + ".gif")
      }
    }
  }
}
</script>

<style scoped>
.title-font {
  font-family: 华文中宋, serif;
}

.info-font {
  font-family: 方正姚体简体, serif;
}
</style>
