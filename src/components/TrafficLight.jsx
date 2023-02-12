"use client";

import {
  assign, createMachine
} from "xstate";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMachine } from "@xstate/react";
import { Light } from "./Light";

// eslint-disable-next-line operator-linebreak
const trafficLightMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOigHsBiZKgZWXQDsIAhATwG0AGAXUSgADlVg5kOKiyEgAHogCMAZl7kAbAFYAHNoAsigOyLNAJl2KANCE6JTpzeV7L1ew7wCcm9V5+aAvv7WaFi4hMRk5LDMbABGnAAqjPTCdMmsHDwCsqLiktKyCgh6ysoa6ryKeprOitq8erzq1rYI9o7Oru6+PQFBICHY+ESkFNFUqfRMGVx8gkgguRJSMgtFWtrk2oZ6Hsba6sbKKi12Dk4uNQ5amrfqgcEYQ+GjUTEQ8UkA4rRT77PZBZLfKrUDrHRbHYeDzaDwVUwmDynBDaRTkPTabzbUyXcwIwL9FhUCBwWSDMIjMg5MTLAprRAAWmaNkZ9365OGEQo1GpeRWhUQelMyMUijUykMylMh3Upi8HjF2geAyeFK5bwyn2SE15tNB8jsPnImmUHl4mjhilcGOZrVMGPIyiFei0uyaLnsyo5L0i42EupBAoQmkMpmNjWUJrNig8LmUyPtmyd9tdZvUHtMXtVnNe0U1iSoPwD-PpCEMe3IhludV4ktD6dtSkUYe2UsMqK05aaegJ-iAA */
createMachine({
  id: "trafficLight",
  initial: "go",
  context: {
    red: { state: "off" },
    yellow: { state: "off" },
    green: { state: "on" },
  },
  states: {
    go: {
      on: {
        toStandBy: {
          target: "standbyToStop",
          actions: assign({
            red: { state: "off" },
            yellow: { state: "on" },
            green: { state: "on" }
          })
        }
      }
    },
    standbyToStop: {
      on: {
        toStandBy: {
          target: "stop",
          actions: assign({
            red: { state: "on" },
            yellow: { state: "off" },
            green: { state: "off" }
          })
        }
      }
    },
    stop: {
      on: {
        toStandBy: {
          target: "standbyToGo",
          actions: assign({
            red: { state: "off" },
            yellow: { state: "on" },
            green: { state: "off" }
          })
        }
      }
    },
    standbyToGo: {
      on: {
        toStandBy: {
          target: "go",
          actions: assign({
            red: { state: "off" },
            yellow: { state: "off" },
            green: { state: "on" }
          })
        }
      }
    },
  },
});

export function TrafficLight() {
  const [current, send] = useMachine(trafficLightMachine);
  const {
    red: { state: redState },
    yellow: { state: yellowState },
    green: { state: greenState },
  } = current.context;

  const handlNext = () => {
    const [nextEvent] = current.nextEvents;
    send(nextEvent);
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div
        className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
      rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
      >
        <Light color="red" state={redState} />
        <Light color="yellow" state={yellowState} />
        <Light color="green" state={greenState} />
      </div>
      <button
        className="mx-auto rounded-md bg-slate-300 px-4 py-2 hover:bg-slate-400 focus:ring-1"
        type="button"
        onClick={handlNext}
      >next
      </button>
      <span>{current.toStrings()}</span>
    </div>
  );
}
