<template>
  <v-app id="app">
    <v-app-bar app>
      <v-toolbar-title class="title-font">多模态协同感知机系统</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ml-2"
                   style="max-width: 100%"
      >
        <v-row dense>

          <v-col
              cols="2"
          >
            <electromyography :emg-prob="emgProb" :confidence="emgConfidence"/>
          </v-col>
          <v-col
              cols="2"
          >
            <postural :postural-prob="posturalProb" :confidence="postConfidence"/>
          </v-col>

          <v-col
              cols="4"
          >
            <visual :visual-data="visualProb" :confidence="visualConfidence"/>
          </v-col>

          <v-col
              cols="2"
          >
            <haptic :haptic-data="hapticData"/>
          </v-col>
          <v-col
              cols="2"
          >
            <v-row dense>
              <v-col cols="12">
                <hearing :voice="voice"/>
              </v-col>
              <v-col cols="12">
                <heart-beat :heart-rate="heartRate"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-spacer class="ma-8"></v-spacer>

        <v-row>
          <v-col cols="1">
            <v-row class="ml-4">
              <v-btn
                  class="mx-2 info-font"
                  dark
                  color="blue"
              >
                <v-icon dark>
                  mdi-face-recognition
                </v-icon>
                视觉
              </v-btn>
            </v-row>
            <v-spacer class="ma-6"></v-spacer>
            <v-row class="ml-4">
              <v-btn
                  class="mx-2 info-font"
                  dark
                  color="orange"
              >
                <v-icon dark>
                  mdi-arm-flex
                </v-icon>
                肌电
              </v-btn>
            </v-row>
            <v-spacer class="ma-6"></v-spacer>
            <v-row class="ml-4">
              <v-btn
                  class="mx-2 info-font"
                  dark
                  color="green darken-2"
              >
                <v-icon dark>
                  mdi-human-handsup
                </v-icon>
                位姿
              </v-btn>
            </v-row>
            <v-spacer class="ma-6"></v-spacer>
            <v-row class="ml-4">
              <v-btn
                  class="mx-2 info-font"
                  dark
                  color="deep-purple darken-1"
              >
                <v-icon dark>
                  mdi-cursor-pointer
                </v-icon>
                触觉
              </v-btn>
            </v-row>
            <v-spacer class="ma-6"></v-spacer>
            <v-row class="ml-4">
              <v-btn
                  class="mx-2 info-font"
                  dark
                  color="brown darken-2"
              >
                <v-icon dark>
                  mdi-ear-hearing
                </v-icon>
                听觉
              </v-btn>
            </v-row>
            <v-spacer class="ma-6"></v-spacer>
            <v-row class="ml-4">
              <v-btn
                  class="mx-2 info-font"
                  dark
                  color="pink"
              >
                <v-icon dark>
                  mdi-heart
                </v-icon>
                心率
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="12">
                <river :confidence="confidence"></river>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row>
              <v-col cols="12">
                <v-card
                    elevation="0"
                    height="40"
                >
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card class="result-font ma-4 fill-height "
                        height="80"
                        rounded="xl"
                >
                  {{ finalResult }}
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>


      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Postural from "@/components/postural"
import Electromyography from "@/components/electromyography"
import Haptic from "@/components/haptic"
import Hearing from "@/components/hearing"
import Visual from "@/components/visual"
import {dataRequest} from "@/network/request"
import HeartBeat from "@/components/heart-beat";
import River from "@/components/river";

export default {
  name: 'App',
  components: {River, HeartBeat, Visual, Hearing, Haptic, Electromyography, Postural},
  data() {
    return {
      timer: '',
      sentData: [],
      hapticData: [],
      emgProb: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.3],
      posturalProb: [0.1, 0.4, 0.1, 0.1, 0.1, 0.1, 0.1],
      visualProb: [],
      emgConfidence: 0,
      visualConfidence: 0,
      postConfidence: 0,
      voice: 0,
      heartRate: [100],
      confidence: [1.0, 1.5384615384615377, 1.0, 1.0, 0.0003509521484375, 0.5],
      finalResult: 0.88,
    }
  },
  created() {
    this.updateData()
    this.timer = setInterval(this.updateData, 1000)
  },
  mounted() {

  },
  methods: {
    updateData: function () {
      dataRequest().then((msg) => {
        this.sentData = msg.data
        this.visualProb = this.sentData.data[0]
        this.hapticData = this.sentData.data[1]
        this.emgProb = this.sentData.data[2]
        this.posturalProb = this.sentData.data[3]
        this.voice = this.sentData.data[4]
        this.heartRate = this.sentData.data[5]
        this.visualConfidence = this.sentData.data[6][0].toFixed(2)
        this.emgConfidence = this.sentData.data[6][2].toFixed(2)
        this.postConfidence = this.sentData.data[6][3].toFixed(2)
        this.confidence = this.sentData.data[6]
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
body::-webkit-scrollbar {
  display: none;
}

.title-font {
  font-family: 华文中宋, serif;
}

.info-font {
  font-family: 方正姚体简体, serif;
}

.result-font {
  font-family: 汉仪长美黑简, serif;
  font-size: xxx-large;
  text-align: center;
  vertical-align: middle;
  background-color: #80DEEA; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to bottom right, #80DEEA, #29B6F6);
}
</style>
