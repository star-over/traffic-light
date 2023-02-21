"use client";

/* eslint-disable import/no-unresolved */
import { trafficManagerMachine } from "machines/trafficManagerMachine";
import { useMachine } from "@xstate/react";
import { Light } from "./Light";
import { ManageControl } from "./ManageControl";

export function TrafficLight() {
  const [manager, sendToManager] = useMachine(trafficManagerMachine);

  return (
    <div className="container flex flex-col items-center justify-center">
      <div
        className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
          rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
      >
        <Light color="red" type={manager.context.red} />
        <Light color="yellow" type={manager.context.yellow} />
        <Light color="green" type={manager.context.green} />
      </div>

      <div className="mt-10">
        <ManageControl
          manager={manager}
          sendToManager={sendToManager}
        />
      </div>
    </div>
  );
}
