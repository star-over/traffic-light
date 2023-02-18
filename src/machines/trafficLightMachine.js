import { assign, createMachine } from "xstate";

export const trafficLightMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOigHsBiAD1mXWTHKxdQAoAFAQQGV+AfQAiAUQK8AmgEoaaLLkLEylKgG0ADAF1EoAA5VYOZDioA7PSDqIATJoCs5AJwAWBwGYAjADZPt5y9NAHZggBoQAE9Eb2cXL28HYIdbDwcvB3cAXyyIhWx8IlIKZCp+JnMIACNImgAVAEkAYQBpLV0kEENjUwsrGwRXTVdyAA4vW0zk21GPTS8I6IR7TXJggPHbW1cPUfnbHLyMAuVi8lLy9Eqa+kZmVnYwLjqAJV4AOX4GxoB5d9EJNI5PklEVVBcKtVIu0rN0TGZLJ0BplVhMHI4PDs-D5ND5FjEPHEPLYfBNSaMHG5fIcQCDCioKHdrpE6mVSvp6s02jpYUZ4X0kYhghTyKlJl5nNtRq5gs4HPjlvZyF5XLZguSfD5XFqZTS6adVEyoazylQOQwmCw2JgOJwAEIEBrvFoAySyeTHUEM8hGmom9kwzpw3qI0ADSWrBx7UYBHaaZxpWwKtKjNaEoJYmOuSV6z30s6MM23S0PG1PTj8Oo-biuoEexT5w0BnlBvkh-qINEjbUZ1KaQnONzJqNp5whLa7LU53K0vMGxmQv1UADitAt92ttodTpd4jdwLnYIXV2NK40LYMbYRHYQXfIPeGfYHQ6iiHG94pPmCqt2rlmbhyGdzCoCA4CsfUj15Hpr0FBAAFo8VfeCfFzBt5zUKD+VDaxEFVBU1TidEZn7NVRh8UZJWCVCTiPc42RPGpMPbWCPHVcgQgcTj1gcLUyNmZN5jGbwU3sQk9l1GcIO9X0WTZM0mJgsMhR4+9KXWGVNG2HwE2TWwvFFVw42FEktQ8PxqK9At2QUgUlNveMnHSJJJlCIJRlGcIkI8TEDNSMTNVY1iHAsxtj2ZVlVxs7CBhVAJyEJKN1k0YZnBjeUvKVGMPMcbTgjmOVAKyIA */
createMachine(
  {
    id: "running",
    initial: "go",
    predictableActionArguments: true,
    // context: { red: "TURN_OFF", yellow: "TURN_OFF", green: "TURN_OFF", },
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
