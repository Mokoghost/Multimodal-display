<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card height="450" rounded="lg"
              :class="`elevation-${hover ? 12 : 3}`"
              class="mx-auto pa-6 transition-swing">
        <v-card-subtitle style="font-weight: bold;font-size: larger">肌电识别</v-card-subtitle>
        <v-row dense>
          <v-col cols="5" class="font-weight-bold">
            手势：OK
          </v-col>
          <v-col cols="4" class="font-weight-bold">置信度:</v-col>
          <v-col cols="3">
            <v-card
                v-bind:color="calculateColor"
                rounded="pill"
                class="pl-1"
                style="alignment: center;color: #ffffff">
              {{ probability }}
            </v-card>
          </v-col>
          <v-col>
            <v-img
                max-height="350"
                max-width="200"
                position="center"
                :src="imgURL"
            ></v-img>
          </v-col>
          <eeg-table :emg="emg"/>
        </v-row>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import EegTable from "@/components/charts/emg-table";

export default {
  name: "electromyography",
  components: {EegTable},
  props: ['emgProb'],
  data() {
    return {
      probability: 0.65,
      emg: {
        default: function () {
          return {
            "pinch": {
              prob: 0.1,
              cn: "食指拇指捏合"
            },
            "raise_palm": {
              prob: 0.1,
              cn: "向上抬起手掌"
            },
            "thumb_up": {
              prob: 0.1,
              cn: "竖起拇指"
            },
            "wave": {
              prob: 0.1,
              cn: "左右摆手"
            },
            "flip_palm": {
              prob: 0.1,
              cn: "食指拇指捏合"
            },
            "hand_open": {
              prob: 0.1,
              cn: "开放手掌"
            },
            "index_out": {
              prob: 0.1,
              cn: "食指单指"
            },
            "ok_pos": {
              prob: 0.3,
              cn: "OK手势"
            },
          }
        }
      },
      imgURL: {
        default: function () {
          return "../assets/img/gestures/ok_pos.png"
        }
      }
    }
  },
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
  watch: {
    emgProb: {
      deep: true,
      handler(newValue) {
        this.emgProb = newValue
        // console.log(this.emgProb);
        let data = {
          "pinch": {
            prob: 0.1,
            cn: "食指拇指捏合"
          },
          "raise_palm": {
            prob: 0.1,
            cn: "向上抬起手掌"
          },
          "thumb_up": {
            prob: 0.1,
            cn: "竖起拇指"
          },
          "wave": {
            prob: 0.1,
            cn: "左右摆手"
          },
          "flip_palm": {
            prob: 0.1,
            cn: "食指拇指捏合"
          },
          "hand_open": {
            prob: 0.1,
            cn: "开放手掌"
          },
          "index_out": {
            prob: 0.1,
            cn: "食指单指"
          },
          "ok_pos": {
            prob: 0.3,
            cn: "OK手势"
          },
        }
        data.index_out.prob = this.emgProb[0]
        data.ok_pos.prob = this.emgProb[1]
        data.thumb_up.prob = this.emgProb[2]
        data.hand_open.prob = this.emgProb[3]
        data.wave.prob = this.emgProb[4]
        data.pinch.prob = this.emgProb[5]
        data.raise_palm.prob = this.emgProb[6]
        data.flip_palm.prob = this.emgProb[7]
        this.emg = data
        let max = this.emgProb[0]
        let maxE = ''
        for (let e in data) {
          if (data[e].prob > max) {
            maxE = e
            max = data[e].prob
          }
        }
        // console.log(maxE)
        this.imgURL = require("../assets/img/gestures/" + maxE + ".png")
        // console.log(this.imgURL);
      }
    }
  }
}
</script>

<style scoped>

</style>
