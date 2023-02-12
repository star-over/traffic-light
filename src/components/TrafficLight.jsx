"use client";

/* eslint-disable import/order */

import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { Light } from "./Light";
import { useEffect } from "react";

const trafficLightMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOigHsBiZKgZWXQDsIAhATwG0AGAXUSgADlVg5kOKiyEgAHogCMAZl7kAbAFYAHNoAsigOyLNAJl2KANCE6JTpzeV7L1ew7wCcm9V5+aAvv7WaFi4hMRk5LDMbABGnAAqjPTCNAkA8gD6DBkACnyCSCCi4pLSsgoIesrKGuq8inqazoravHq86ta2CPaOzq7uvsMBQSAh2PhEpBTRVKn0TKwcPAKyJRJSMkWVWtrk2oZ6Hsba6sbKKt12Dk4uzQ5ams-qgcEYk+EzUTEQ8UkAcVoGUyAPSBXWYk25R2iD2ByOHg82g89VMJg81wQ2kU5D02m8h1M93M6MCYxYVAgcFkEzC0zIkNKWwqiAAtF0bOzHEikW1USZ2qZDNo3uMPvSIhRqEzodtQJU9KYsYpFGplIZlKZzupTF4PGrRWM6VMpT9lv9kvNZWV5fI7D5yJplB5eJoBa58ZyeqZ8eRlEq9Fpjp0XPYxSavpE5sIbSzYQhNIZTE6Ospna7FB4XMosb79gHfcHXeow6YIxLTd9ohbElQgXGYQrEIYTuRDM9WrxNcnS96lIoU4ctSLFFpW509OT-EA */
createMachine({
  id: "trafficLight",
  initial: "allowed",
  predictableActionArguments: true,
  context: {
    red: false,
    yellow: false,
    green: true,
  },
  states: {
    allowed: {
      entry: assign({
        red: false,
        yellow: false,
        green: true
      }),
      on: { TO_STANDBY: "standbyToStop" },
    },
    standbyToStop: {
      entry: assign({
        red: false,
        yellow: true,
        green: true
      }),
      on: { TO_NOT_ALLOWED: "notAllowed" }
    },
    notAllowed: {
      entry: assign({
        red: true,
        yellow: false,
        green: false
      }),
      on: { TO_STANDBY: "standbyToGo" }
    },
    standbyToGo: {
      entry: assign({
        red: false,
        yellow: true,
        green: false
      }),
      on: { TO_ALLOWED: "allowed" }
    },
  },
});

export function TrafficLight() {
  const [current, send] = useMachine(trafficLightMachine);
  const {
    red: redState,
    yellow: yellowState,
    green: greenState,
  } = current.context;

  const handlNext = () => {
    const [nextEvent] = current.nextEvents;
    send(nextEvent);
  };

  useEffect(() => {
    console.log("🚀 > TrafficLight > current", current.toStrings(), current.context);
  }, [current]);

  return (
    <div className="container flex flex-col items-center justify-center">
      <div
        className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
      rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
      >
        <Light color="red" enabled={redState} />
        <Light color="yellow" enabled={yellowState} />
        <Light color="green" enabled={greenState} />
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
