"use client";

/* eslint-disable import/no-unresolved */
import { ManageButton } from "./ManageButton";

export function ManageControl({ manager, sendToManager }) {
  return (
    <div className="">

      <ManageButton
        className="rounded-l-full"
        enabled={manager.nextEvents.includes("TO_TURNED_OFF")}
        selected={manager.matches("turnedOff")}
        onClick={() => sendToManager("TO_TURNED_OFF")}
      >Turn off
      </ManageButton>

      <ManageButton
        enabled={manager.nextEvents.includes("TO_STANDBY")}
        selected={manager.matches("standby")}
        onClick={() => sendToManager("TO_STANDBY")}
      >Stand by
      </ManageButton>

      <ManageButton
        className="rounded-r-full"
        enabled={manager.nextEvents.includes("TO_RUN")}
        selected={manager.matches("running")}
        onClick={() => sendToManager("TO_RUN")}
      >Run
      </ManageButton>

    </div>
  );
}
