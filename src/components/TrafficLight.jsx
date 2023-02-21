"use client";

/* eslint-disable import/no-unresolved */
import { Light } from "./Light";

export function TrafficLight({ manager, size }) {
  return (
    <div
      className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
          rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
    >
      <Light size={size} color="red" type={manager.context.red} />
      <Light size={size} color="yellow" type={manager.context.yellow} />
      <Light size={size} color="green" type={manager.context.green} />
    </div>

  );
}
