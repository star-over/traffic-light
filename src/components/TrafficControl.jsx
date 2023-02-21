"use client";

/* eslint-disable import/no-unresolved */
import { ControlButton } from "./ControlButton";

export function TrafficControl({ manager, sendToManager }) {
  return (
    <div className="min-w-min shadow-lg">

      <ControlButton
        className="rounded-l-lg"
        enabled={manager.nextEvents.includes("TO_TURNED_OFF")}
        selected={manager.matches("turnedOff")}
        onClick={() => sendToManager("TO_TURNED_OFF")}
      >Turn off
      </ControlButton>

      <ControlButton
        enabled={manager.nextEvents.includes("TO_STANDBY")}
        selected={manager.matches("standby")}
        onClick={() => sendToManager("TO_STANDBY")}
      >Stand by
      </ControlButton>

      <ControlButton
        className="rounded-r-lg"
        enabled={manager.nextEvents.includes("TO_RUN")}
        selected={manager.matches("running")}
        onClick={() => sendToManager("TO_RUN")}
      >Run
      </ControlButton>

    </div>
  );
}
