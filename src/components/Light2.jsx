"use client";

import { cva } from "class-variance-authority";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";

const cvaFn = cva("rounded-full transition-all shadow-[inset_0_6px_6px_rgba(0,0,0,0.6)]", {
  variants: {
    color: {
      red: ["bg-red-500"],
      yellow: ["bg-yellow-500"],
      green: ["bg-green-500"],
    },
    light: {
      on: ["blur-sm"],
      off: ["grayscale-[80%] brightness-50 blur-[1px]"],
    },
    size: {
      sm: ["w-8 h-8"],
      md: ["w-10 h-10"],
      xl: ["w-12 h-12"],
    }
  },
  defaultVariants: {
    color: "yellow", size: "md", enabled: false,
  },
});

const lightMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QBsCWUAWAXAsgQwGMNUA7MAOiwFcAnMiAeRIGIAPWLPLCvAM25oAKAOwAGUQEpmaTLkLEylWvSYBtUQF1EoAA4B7WKiyo9JbSFaIATKIBs5AJwOAzAFZxD27c+3XAGhAAT0QADgBGcgAWENdvZytnWzCnK0iAXzSAmWx8IlIKajpIBl5eNg4uHn4wIWdxKWy5PMVClVL1LSQQfUNjU3NLBBtXR0jXZzCw8XjRKxiA4IQwucdhZ09xURCU5xCMzJASPQg4c0bchTBzHqMTMy7BgFpbBcRHkadPr+-nDKz0HLyfJKIqMe66Ay3foPRCRUTCRwhOq2Oo+VxhNavBAOCJ2NwOYRhcaiJxJP4gc5AlrKYqla6QvrgiywqxYkIhcixfGE4mksL7NJAA */
createMachine({
  id: "lightMachine",
  initial: "turnedOff",
  predictableActionArguments: true,
  context: {
    light: "off",
    blink: false,
    standby: false,
    normalDelays: { on: 700, off: 300, },
    standbyDelays: { on: 500, off: 500, }
  },

  on: {
    TURN_ON: { actions: assign({ light: "on", blink: false }), },
    TURN_OFF: { actions: assign({ light: "off", blink: false }) },
    BLINK: { actions: assign({ light: "on", blink: true }) },
  },

  states: {
    turnedOn: {
      entry: assign({ light: "on" }),
      after: {
        700: [{
          cond: (ctx) => ctx.blink,
          target: "turnedOff"
        }]
      }
    },

    turnedOff: {
      entry: assign({ light: "off" }),
      after: {
        300: [{
          cond: (ctx) => ctx.blink,
          target: "turnedOn",
        }]
      }
    }
  },

});

export function Light2({ type }) {
  const [current, send] = useMachine(lightMachine);

  useEffect(() => {
    send({ type });
  }, []);
  const { light } = current.context;
  return (
    <div className={cvaFn({ light })} />
  );
}
