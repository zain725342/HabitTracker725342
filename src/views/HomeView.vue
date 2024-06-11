<script setup lang="ts">
import Habits from "@/components/Habits.vue";
import Indicator from "@/components/Indicator.vue";
import { ref, onMounted, watch } from "vue";
import type { habit } from "@/types";
const current_date = ref(new Date());
const stored_date = ref<number | null>(null);

const data = ref([
  {
    mode: "good",
    habits: [],
  },
  {
    mode: "bad",
    habits: [],
  },
]);

watch(
  data,
  (newValue, oldValue) => {
    localStorage.setItem("habits", JSON.stringify(data.value));
  },
  { deep: true }
);

const setData = () => {
  if (JSON.parse(localStorage.getItem("habits") as string)) {
    data.value = JSON.parse(localStorage.getItem("habits") as string);
    stored_date.value = JSON.parse(
      localStorage.getItem("habits_date") as string
    );
    if (stored_date.value == null) {
      stored_date.value = 0;
    }
    if (
      stored_date.value != null &&
      stored_date.value < current_date.value.getDate()
    ) {
      data.value.forEach((d) => {
        (d.habits as habit[]).forEach((h) => {
          h.done = false;
        });
      });
      localStorage.setItem(
        "habits_date",
        JSON.stringify(current_date.value.getDate())
      );
    }
  }
};
onMounted(() => {
  setData();
});
</script>

<template>
  <main class="flex flex-row justify-center items-center h-[40rem] gap-10">
    <div
      v-for="(data_type, index) in data"
      class="flex justify-center items-center"
    >
      <Habits :mode="data_type.mode" v-model="data_type.habits" />
      <Indicator v-if="index == 0" :data="data" />
    </div>
  </main>
</template>
