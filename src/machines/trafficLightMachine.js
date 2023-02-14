import { assign, createMachine } from "xstate";

export const trafficLightMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOigHsBiAD1mXWTHKxdQAoAFAQQGV+AfQAiAUQK8AmgEoaaLLkLEylKgG0ADAF1EoAA5VYOZDioA7PSDqIATJoCs5AJwAWBwGYAjADZPt5y9NAHZggBoQAE9Eb2cXL28HYIdbDwcvB3cAXyyIhWx8IlIKZCp+JnMIACNImgAVAEkAYQBpLV0kEENjUwsrGwRXTVdyAA4vW0zk21GPTS8I6IR7TXJggPHbW1cPUfnbHLyMAuVi8lLy9Eqa+kZmVnYwLjqAJV4AOX4GxoB5d9EJNI5PklEVVBcKtVIu0rN0TGZLJ0BplVhMHI4PDs-D5ND5FjEPHEPLYfBNSaMHG5fIcQCDCioKHdrpE6mVSvp6s02jpYUZ4X0kYhghTyKlJl5nNtRq5gs4HPjlvZyF5XLZguSfD5XFqZTS6adVEyoazylQOQwmCw2JgOJwAEIEBrvFoAySyeTHUEM8hGmom9kwzpw3qI0ADSWrBx7UYBHaaZxpWwKtKjNaEoJYmOuSV6z30s6MM23S0PG1PTj8Oo-biuoEexT5w0BnlBvkh-qINEjbUZ1KaQnONzJqNp5whLa7LU53K0vMGxmQv1UADitAt92ttodTpd4jdwLnYIXV2NK40LYMbYRHYQXfIPeGfYHQ6iiHG94pPmCqt2rlmbhyGdzCoCA4CsfUj15Hpr0FBAAFo8VfeCfFzBt5zUKD+VDaxEFVBU1TidEZn7NVRh8UZJWCVCTiPc42RPGpMPbWCPHVcgQgcTj1gcLUyNmZN5jGbwU3sQk9l1GcIO9X0WTZM0mJgsMhR4+9KXWGVNG2HwE2TWwvFFVw42FEktQ8PxqK9At2QUgUlNveMnHSJJJlCIJRlGcIkI8TEDNSMTNVY1iHAsxtj2ZVlVxs7CBhVAJyEJKN1k0YZnBjeUvKVGMPMcbTgjmOVAKyIA */
createMachine(
  {
    id: "trafficLight",
    initial: "go",
    predictableActionArguments: true,
    context: {
      red: false, yellow: false, green: true,
    },
    states: {

      go: {
        entry: assign({
          red: false, yellow: false, green: true
        }),
        after: { PASS_DELAY: "goToStandby" },
      },

      goToStandby: {
        entry: assign({
          red: false, yellow: false, green: true
        }),
        invoke: {
          src: () => (cb) => {
            const interval = setInterval(() => cb("TICK"), 500);
            return () => clearInterval(interval);
          }
        },
        on: { TICK: { actions: assign({ green: (ctx) => !ctx.green }) } },
        after: { TRANSITION_DELAY: "standbyToStop" },
      },

      standbyToStop: {
        entry: assign({
          red: false, yellow: true, green: false
        }),
        invoke: {
          src: () => (cb) => {
            const interval = setInterval(() => cb("TICK"), 500);
            return () => clearInterval(interval);
          }
        },
        on: { TICK: { actions: assign({ yellow: (ctx) => !ctx.yellow }) } },
        after: { BLINK_DELAY: "stop" },
      },

      stop: {
        entry: assign({
          red: true, yellow: false, green: false
        }),
        after: { STOP_DELAY: "stopToGo" }
      },

      stopToGo: {
        entry: assign({
          red: true, yellow: true, green: false
        }),
        after: { BLINK_DELAY: "go" }
      },

    }
  },
  {
    delays: {
      TRANSITION_DELAY: 3000,
      BLINK_DELAY: 3000,
      PASS_DELAY: 3000,
      STOP_DELAY: 2500,
    },
  }
);
