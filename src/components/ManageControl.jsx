"use client";

/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { ManageButton } from "./ManageButton";

export function ManageControl({ manager, sendToManager }) {
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
    <div className="">

      <ManageButton
        className="rounded-l-full"
        enabled={buttonStates.turnOff.isNext}
        selected={buttonStates.turnOff.isSelected}
        onClick={buttonStates.turnOff.handle}
      >{buttonStates.turnOff.caption}
      </ManageButton>

      <ManageButton
        enabled={buttonStates.standBy.isNext}
        selected={buttonStates.standBy.isSelected}
        onClick={buttonStates.standBy.handle}
      >{buttonStates.standBy.caption}
      </ManageButton>

      <ManageButton
        className="rounded-r-full"
        enabled={buttonStates.run.isNext}
        selected={buttonStates.run.isSelected}
        onClick={buttonStates.run.handle}
      >{buttonStates.run.caption}
      </ManageButton>

    </div>
  );
}
