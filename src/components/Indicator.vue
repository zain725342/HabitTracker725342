<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import type { data } from "@/types";
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const getGoodCount = computed(() => {
  let goodCount = 0;
  (props.data as data[]).forEach((n) => {
    if (n.mode == "good") {
      n.habits.forEach((p) => {
        goodCount += p.streak;
      });
    }
  });
  return goodCount;
});
const getBadCount = computed(() => {
  let badCount = 0;
  (props.data as data[]).forEach((n) => {
    if (n.mode == "bad") {
      n.habits.forEach((p) => {
        badCount += p.streak;
      });
    }
  });
  return badCount;
});
</script>
<template>
  <div
    class="w-[60px] h-[60px] ml-10 flex justify-center items-center rounded-full"
    :class="
      getGoodCount !== getBadCount
        ? getGoodCount > getBadCount
          ? 'bg-green-300'
          : 'bg-red-300'
        : 'bg-gray-300'
    "
  >
    <Icon
      class="text-4xl text-white"
      :icon="
        getGoodCount !== getBadCount
          ? getGoodCount > getBadCount
            ? 'ic:baseline-greater-than'
            : 'ic:baseline-less-than'
          : 'lucide:equal'
      "
    />
  </div>
</template>
