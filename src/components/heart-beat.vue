<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card height="220" rounded="lg"
              :class="`elevation-${hover ? 12 : 3}`"
              class="mx-auto pa-6 transition-swing">
        <div class="title-font">生理</div>
        <div class="heart"></div>
        <v-spacer></v-spacer>
        <div class="bottom_footer">心跳：{{ heartRate[0] }}</div>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "heart-beat",
  props: {
    heartRate: {
      default() {
        return [100]
      }
    },
  }
}
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
}

body {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(pink, #FF8888);
}

.heart {
  top: 40px;
  left: 60px;
  width: 60px;
  height: 60px;
  background-color: tomato;
  position: relative;
  animation: beat .6s infinite ease-in;
}

.heart:before, .heart:after {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: tomato;
  border-radius: 50%;
}

.heart:before {
  left: 30px;
}

.heart:after {
  top: -30px;
}

@keyframes beat {
  0% {
    transform: scale(1) rotate(-45deg);
  }

  40% {
    transform: scale(1) rotate(-45deg);
  }

  55% {
    transform: scale(1.3) rotate(-30deg);
  }

  70% {
    transform: scale(1) rotate(-45deg);
  }

  85% {
    transform: scale(1.3) rotate(-60deg);
  }

  100% {
    transform: scale(1) rotate(-45deg);
  }
}

.bottom_footer {
  position: absolute; /*or前面的是absolute就可以用*/
  bottom: 0;
  margin-bottom: 20px;
  font-family: 华文中宋, serif;
  left: 30%;
}

.title-font {
  left: 30%;
  font-weight: bold;
  font-family: 华文中宋, serif;
}
</style>
