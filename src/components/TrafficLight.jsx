"use client";

/* eslint-disable import/no-unresolved */
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { trafficLightMachine } from "machines/trafficLightMachine";
import { Light } from "./Light";

export function TrafficLight() {
  const [current, send] = useMachine(trafficLightMachine);

  useEffect(() => {
    console.log("🚀  EFFECT>>>", current, current.context);
  }, [current]);

  return (
    <div className="container flex flex-col items-center justify-center">
      <div
        className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
        rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
      >
        <Light color="red" enabled={current.context.red} />
        <Light color="yellow" enabled={current.context.yellow} />
        <Light color="green" enabled={current.context.green} />
      </div>
      <span><code>{current.toStrings()}</code></span>
    </div>
  );
}
