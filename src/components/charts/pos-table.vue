<template>
  <div class="text-center pt-1">
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
          点击查看位姿识别概率
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="type in posture"
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
  name: "pos-table",
  props: {
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
  },
  data() {
  },
  watch: {
    posture: {
      deep: true,
      handler(newValue) {
        this.posture = newValue
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
