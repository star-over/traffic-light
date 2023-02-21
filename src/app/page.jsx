"use client";

/* eslint-disable import/no-unresolved */
import { TrafficControl } from "comp/TrafficControl";
import { trafficManagerMachine } from "machines/trafficManagerMachine";
import { useMachine } from "@xstate/react";
import { TrafficLight } from "comp/TrafficLight";

export default function Home() {
  const [manager, sendToManager] = useMachine(trafficManagerMachine);

  return (
    <div className="container mx-auto mt-24 flex h-screen w-max flex-col items-center gap-4">
      <div>
        <h1 className="text-center text-lg font-bold text-slate-600 sm:text-4xl">Traffic Light</h1>
        <h2 className="text-center text-sm  text-slate-600 sm:text-xl">x-state training project</h2>
      </div>
      <TrafficLight
        size="xl"
        manager={manager}
      />

      <TrafficControl
        manager={manager}
        sendToManager={sendToManager}
      />
    </div>
  );
}
