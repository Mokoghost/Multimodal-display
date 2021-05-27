<template>
  <v-app id="app">
    <v-app-bar app>
      <v-toolbar-title>多模态情感分析平台</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="ml-2"
                   style="max-width: 100%"
      >
        <v-row dense>
          <v-col
              cols="4"
          >
            <visual :visual-data="visualProb"/>
          </v-col>
          <v-col
              cols="2"
          >
            <electromyography :emg-prob="emgProb"/>
          </v-col>
          <v-col
              cols="2"
          >
            <postural :postural-prob="posturalProb"/>
          </v-col>
          <v-col
              cols="2"
          >
            <haptic :haptic-data="hapticData"/>
          </v-col>
          <v-col
              cols="2"
          >
            <hearing/>
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

export default {
  name: 'App',
  components: {Visual, Hearing, Haptic, Electromyography, Postural},
  data() {
    return {
      timer: '',
      sentData: [],
      hapticData: [],
      emgProb: [],
      posturalProb: [],
      visualProb: [],
    }
  },
  created() {
    this.updateData()
    this.timer = setInterval(this.updateData, 1000)
  },
  methods: {
    updateData: function () {
      dataRequest().then((msg) => {
        this.sentData = msg.data
        if (this.sentData.data[1][0] !== null) {
          let tempData = this.sentData.data[1][0]
          tempData = tempData.substr(0, tempData.length)
          let stringData = tempData.split(",")
          this.hapticData = stringData.map(function (item) {
            return Number(item)
          })
        }
        this.visualProb = this.sentData.data[0]
        this.emgProb = this.sentData.data[2]
        this.posturalProb = this.sentData.data[3]
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

</style>
