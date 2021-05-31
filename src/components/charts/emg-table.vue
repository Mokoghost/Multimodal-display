<template>
  <div class="text-center pt-6">
    <v-menu
        transition="scale-transition"
        origin="center center"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            color="primary"
            v-bind="attrs"
            v-on="on"
            class="info-font"
        >
          点击查看手势识别概率
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="type in emg"
            @click="() => {}"
        >
          <v-list-item-title
              v-text="type.cn + '的概率为：' + type.prob"
              class="info-font"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "eeg-table",
  props:{
    emg:{
      default:function (){
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
    }
  },
  data() {
  },
  watch: {
    emg: {
      deep: true,
      handler(newValue) {
        this.emg = newValue
      }
    }
  }
}
</script>

<style scoped>
.info-font {
  font-family: 方正姚体简体, serif;
}
</style>
