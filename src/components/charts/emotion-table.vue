<template>
  <v-simple-table dense class="pl-2">
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left" style="padding: 8px">
          Neutral
        </th>
        <th class="text-left" style="padding: 8px">
          Anger
        </th>
        <th class="text-left" style="padding: 8px">
          Disgust
        </th>
        <th class="text-left" style="padding: 8px">
          Fear
        </th>
        <th class="text-left" style="padding: 8px">
          Happy
        </th>
        <th class="text-left" style="padding: 8px">
          Sad
        </th>
        <th class="text-left" style="padding: 8px">
          Surprise
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in emotion"
          :key="item.name"
      >
        <td>{{ item.Neutral }}</td>
        <td>{{ item.Anger }}</td>
        <td>{{ item.Disgust }}</td>
        <td>{{ item.Fear }}</td>
        <td>{{ item.Happy }}</td>
        <td>{{ item.Sad }}</td>
        <td>{{ item.Surprise }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
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
  },
  data() {
    return {}
  },
  watch:{
    emotion:{
      deep: true,
      handler(newValue) {
        this.emotion = newValue
      }
    }
  }
}
</script>

<style scoped>

</style>
