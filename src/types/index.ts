export type habit = {
    habit: string;
    streak: number;
    done: boolean;
  };

export type data={
    mode:string,
    habits:habit[]
}