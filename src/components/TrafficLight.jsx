"use client";

/* eslint-disable import/no-unresolved */
import { trafficManagerMachine } from "machines/trafficManagerMachine";
import { useMachine } from "@xstate/react";
import { useEffect, useState } from "react";
import { Light } from "./Light";
import { ManageControl } from "./ManageControl";

export function TrafficLight() {
  const [manager, sendToManager] = useMachine(trafficManagerMachine);
  const [buttonStates, setButtonsState] = useState({
    turnOff: {
      isNext: false,
      isSelected: false,
      caption: "Turn off",
      stateName: "turnedOff",
      eventName: "TO_TURNED_OFF",
      handle: () => sendToManager("TO_TURNED_OFF"),
    },
    standBy: {
      isNext: false,
      isSelected: false,
      caption: "Stand by",
      stateName: "standby",
      eventName: "TO_STANDBY",
      handle: () => sendToManager("TO_STANDBY"),
    },
    run: {
      isNext: false,
      isSelected: false,
      caption: "Run",
      stateName: "running",
      eventName: "TO_RUN",
      handle: () => sendToManager("TO_RUN"),
    },
  });

  useEffect(() => {
    setButtonsState((prev) => ({
      turnOff: {
        ...prev.turnOff,
        isNext: manager.nextEvents.includes("TO_TURNED_OFF"),
        isSelected: manager.matches("turnedOff"),
      },
      standBy: {
        ...prev.standBy,
        isNext: manager.nextEvents.includes("TO_STANDBY"),
        isSelected: manager.matches("standby"),
      },
      run: {
        ...prev.run,
        isNext: manager.nextEvents.includes("TO_RUN"),
        isSelected: manager.matches("running"),
      },
    }));
  }, [manager]);

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
