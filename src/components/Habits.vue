<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { habit } from "@/types";
import { ref } from "vue";

const temp = defineModel<habit[] | undefined>();
const input = ref("");
const props = defineProps({
  mode: {
    type: String,
    default: "",
  },
});
const check = (i: number) => {
  if (temp.value !== undefined) {
    temp.value[i].done = !temp.value[i].done;
    if (temp.value[i].done) {
      temp.value[i].streak++;
    }
  }
};
const addHabit = () => {
  if (temp.value !== undefined) {
    temp.value.push({
      habit: input.value,
      streak: 0,
      done: false,
    });
    input.value = "";
  }
};
</script>
<template>
  <div class="w-[400px] h-[350px] rounded-md">
    <div
      class="h-[30%] flex justify-center items-center rounded-tl-md rounded-tr-md"
      :class="mode == 'good' ? 'bg-green-300' : 'bg-red-300'"
    >
      <h3 class="text-2xl text-white font-semibold">
        {{ mode == "good" ? "Good Habits" : "Bad Habits" }}
      </h3>
    </div>
    <div class="h-[60%] bg-white">
      <ScrollArea
        class="h-full w-auto border p-4"
        v-if="(temp as habit[]).length>0"
      >
        <section class="flex flex-col gap-y-4">
          <div
            class="w-full flex justify-between items-center"
            v-for="(t, index) in temp"
          >
            <div class="flex w-full gap-4">
              <span>{{ t.habit }}</span>
              <span>{{ t.streak }}-Day(s)</span>
            </div>
            <Checkbox
              id="habit"
              :checked="t.done"
              @update:checked="check(index)"
              :disabled="t.done"
            />
          </div>
        </section>
      </ScrollArea>
      <div
        v-else
        class="h-full w-auto flex items-center justify-center text-gray-300"
      >
        <h3>No data</h3>
      </div>
    </div>
    <div class="h-[10%] flex">
      <Input
        class="rounded-none rounded-bl-md w-[85%]"
        placeholder="New habit"
        type="text"
        v-model="input"
      />
      <Button class="rounded-none rounded-br-md w-[15%]" @click="addHabit()"
        >Add</Button
      >
    </div>
  </div>
</template>
