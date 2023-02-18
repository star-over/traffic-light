"use client";

/* eslint-disable import/no-unresolved */
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { trafficLightMachine } from "machines/trafficLightMachine";
import { Light } from "./Light";
import { assign, createMachine } from "xstate";
import { getShortestPaths } from "@xstate/graph";

export const trafficManagerMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFsCGA7VMBOA6ALgK7bqQDyAZhQMQAqZA+gMq0CCAcgCIBCAmgNoAGALqJQABwD2sAJb4Zk9GJAAPRAHYAjAFZcgwQDZB6gMwAmYwYMAOawBoQAT0QmAnJtzWT564JPrDQQAWAF8QhzRMHFxYfAwIACNHOkZaAFUAJXYAUU4GMgAxAqFRJBApWXlFZTUELV19I1MLdStbB2cEIKCzXHMzayttdSDXL3UwiIwsMDxY+KSUhgy09hLlCrkFJTLagIbA5ssbeydEMwMTXFcTTTuzd1HNdQvJkEiZvGxCdHQZdCgSxYHB4AhEG2kW2qu0QBlcBya5mO7TOCDMmiu3R0twuoxemgMbw+0W+v3+UFwUEk1BU83wYFwqAo9OwAAoAOKMTjZAAyrF4AEpqMTZrhSX8AZTJOsypsqjtQLVNMZBNdrBdWuobndtAYOudXEFrgNjDdtGYgjozETpiSfhKKVTaJImHF0IlkrS4vTGczZhzUoxgVw+AxuXzBcLbaLxeSpc7XQtHDKJJD5TVEBjBrggrdrK5BK5XAYLej9WjDcbfIadLmzK1tDaojH7XH5u6kgn8JJxDS6QymSzWcHQQx6Mx6AAFMO8-lCkVfVuS9sers9lPlNPbDMIZ7w67aQQ6bQF09mbTlh5G1wmrUmc2W7SaJufMVLimxHt970Dv1slhkNO4ZzlGzaLmSy7duIG5ytuMJouiugGMMFoGFoQSCBal6Vjevh3g+OjPuE7zRuBDoxFBzrstSXqoD6g7+gB07jpyM4RvOpFvhBH6UZI1EwVu0KKuciG4MhLxBGhmgYVhqKEbgmjWC8R5wv4BaaNabzoJIEBwMoC4QpUcHCQg96qtJyG3Pirharq5YALRmFc6jWJaBiKYWJhwi8L7REQJDkFQhlQgqqiIIeqq6lYHmCOayGuOW3l9Ih0kBDZWgmL5oorkkwXpvBbjWApknaFZ6I2fCeqol5RXeFo8LWNJBJKY2xELlxDp5cZYUINYJ56P494EqVdzqIlzlHk+RY9OimFZWRcZUl1Qk9QW6gDaYT6WaNl7aEaT7qBl3QYdJXnzR1i2SF2SbLaFSpmPWOaDLq2h9SWuZjai9aqrmGJuN4mEPYSbWcbGkFJmu4i3TuBK3J4DyxQMQR9YpQSXgEOa3N4NwmIDrwg2BF2QT20PwRYuq4Fomg3joIyYXt6M-Vj-24w9GrnWDPE9lRkikyZFomEabg9LFAQmPmmi7etR6HRix1HrmYRhEAA */
createMachine(
  {
    id: "manager",
    initial: "standby",
    predictableActionArguments: true,
    context: { red: "TURN_OFF", yellow: "TURN_OFF", green: "TURN_OFF", },
    states: {
      turnedOff: {
        entry: assign({ red: "TURN_OFF", yellow: "TURN_OFF", green: "TURN_OFF" }),
        on: { TO_STANDBY: "standby" },
      },
      standby: {
        entry: assign({ red: "TURN_OFF", yellow: "BLINK_NORMAL", green: "TURN_OFF" }),
        on: {
          TO_TURNED_OFF: "turnedOff",
          TO_RUN: "running",
        }
      },
      running: {
        id: "running",
        initial: "go",
        predictableActionArguments: true,
        states: {

          go: {
            entry: assign({ red: "TURN_OFF", yellow: "TURN_OFF", green: "TURN_ON" }),
            after: { GO_DELAY: "goToStandby" },
          },

          goToStandby: {
            entry: assign({ red: "TURN_OFF", yellow: "TURN_OFF", green: "BLINK_NORMAL" }),
            after: { GO_TO_STANDBY_DELAY: "standbyToStop" },
          },

          standbyToStop: {
            entry: assign({ red: "TURN_OFF", yellow: "TURN_ON", green: "TURN_OFF" }),
            after: { STANDBY_TO_STOP_DELAY: "stop" },
          },

          stop: {
            entry: assign({ red: "TURN_ON", yellow: "TURN_OFF", green: "TURN_OFF" }),
            after: { STOP_DELAY: "stopToGo" }
          },

          stopToGo: {
            entry: assign({ red: "TURN_ON", yellow: "TURN_ON", green: "TURN_OFF" }),
            after: { STOP_TO_GO_DELAY: "go" }
          },

        },
        on: { TO_STANDBY: "standby", }
      },
    }
  },
  {
    delays: {
      GO_DELAY: 3000,
      GO_TO_STANDBY_DELAY: 3000,
      STANDBY_TO_STOP_DELAY: 3000,
      STOP_DELAY: 3000,
      STOP_TO_GO_DELAY: 3000,
    },
  }
);

export function TrafficLight() {
  const [current, send] = useMachine(trafficLightMachine);
  const [manager, sendToManager] = useMachine(trafficManagerMachine);

  const showPaths = () => {
    const paths = getShortestPaths(trafficManagerMachine);
    const st = Object.values(paths).map((e) => {
      const path = e.paths.at(0);
      const result = { state: path.state.value, weight: path.weight, path };
      return result;
    });
    // const states = Object.keys(paths).filter((k) => paths[k].weight > 0);
    console.log(st);
    // [""thanks"", ""form"", ""closed"", ""nope""]
  };

  useEffect(() => {
    // console.log("🚀  EFFECT>>>", current, current.context);
    showPaths();

    console.log("🚀  manager>>>", manager.matches("standby"));
  }, [current]);

  return (
    <div className="container flex flex-col items-center justify-center">
      <div
        className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
        rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
      >
        <Light color="red" type={current.context.red} />
        <Light color="yellow" type={current.context.yellow} />
        <Light color="green" type={current.context.green} />
      </div>
      <span><code>{current.toStrings()}</code></span>
      <div>
        <p className="mt-10 text-lg">manager</p>
        <div
          className="my-2 flex max-w-fit flex-col items-center justify-center gap-2
        rounded-xl bg-zinc-700 p-4 shadow-slate-500 drop-shadow-lg"
        >
          <Light color="red" type={manager.context.red} />
          <Light color="yellow" type={manager.context.yellow} />
          <Light color="green" type={manager.context.green} />
        </div>
        <div className="inline-flex rounded-full">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-l-full
             bg-sky-500 py-[10px] px-[12px] text-center text-base
            font-semibold text-white transition-all hover:border-sky-300
             hover:bg-sky-600  sm:py-3 sm:px-6"
            onClick={() => sendToManager("TO_TURNED_OFF")}
          >
            turn off
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center
             bg-sky-400 py-[10px] px-[12px] text-center text-base
            font-semibold text-white transition-all hover:border-sky-300
             hover:bg-sky-600  disabled:bg-gray-500 sm:py-3 sm:px-6"
            onClick={() => sendToManager("TO_STANDBY")}
          >
            to standby
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-r-full
            bg-sky-400 py-[10px] px-[12px] text-center text-base
            font-semibold text-white transition-all hover:border-sky-300
            hover:bg-sky-600  sm:py-3 sm:px-6"
            onClick={() => sendToManager("TO_RUN")}
          >
            run
          </button>
        </div>
      </div>
    </div>
  );
}
