import { assign, createMachine } from "xstate";

export const trafficManagerMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFsCGA7VMBOA6ALgK7bqQDyAZhQMQAqZA+gMq0CCAcgCIBCAmgNoAGALqJQABwD2sAJb4Zk9GJAAPRAHYAjAFZcgwQDZB6gMwAmYwYMAOawBoQAT0QmAnJtzWT564JPrDQQAWAF8QhzRMHFxYfAwIACNHOkZaAFUAJXYAUU4GMgAxAqFRJBApWXlFZTUELV19I1MLdStbB2cEIKCzXHMzayttdSDXL3UwiIwsMDxY+KSUhgy09hLlCrkFJTLagIbA5ssbeydEMwMTXFcTTTuzd1HNdQvJkEiZvGxCdHQZdCgSxYHB4AhEG2kW2qu0QBlcBya5mO7TOCDMmiu3R0twuoxemgMbw+0W+v3+UFwUEk1BU83wYFwqAo9OwAAoAOKMTjZAAyrF4AEpqMTZrhSX8AZTJOsypsqjtQLVNMZBNdrBdWuobndtAYOudXEFrgNjDdtGYgjozETpiSfhKKVTaJImHF0IlkrS4vTGczZhzUoxgVw+AxuXzBcLbaLxeSpc7XQtHDKJJD5TVEBjBrggrdrK5BK5XAYLej9WjDcbfIadLmzK1tDaojH7XH5u6kgn8JJxDS6QymSzWcHQQx6Mx6AAFMO8-lCkVfVuS9sers9lPlNPbDMIZ7w67aQQ6bQF09mbTlh5G1wmrUmc2W7SaJufMVLimxHt970Dv1slhkNO4ZzlGzaLmSy7duIG5ytuMJouiugGMMFoGFoQSCBal6Vjevh3g+OjPuE7zRuBDoxFBzrstSXqoD6g7+gB07jpyM4RvOpFvhBH6UZI1EwVu0KKuciG4MhLxBGhmgYVhqKEbgmjWC8R5wv4BaaNabzoJIEBwMoC4QpUcHCQg96qtJyG3Pirharq5YALRmFc6jWJaBiKYWJhwi8L7REQJDkFQhlQgqqiIIeqq6lYHmCOayGuOW3l9Ih0kBDZWgmL5oorkkwXpvBbjWApknaFZ6I2fCeqol5RXeFo8LWNJBJKY2xELlxDp5cZYUINYJ56P494EqVdzqIlzlHk+RY9OimFZWRcZUl1Qk9QW6gDaYT6WaNl7aEaT7qBl3QYdJXnzR1i2SF2SbLaFSpmPWOaDLq2h9SWuZjai9aqrmGJuN4mEPYSbWcbGkFJmu4i3TuBK3J4DyxQMQR9YpQSXgEOa3N4NwmIDrwg2BF2QT20PwRYuq4Fomg3joIyYXt6M-Vj-24w9GrnWDPE9lRkikyZFomEabg9LFAQmPmmi7etR6HRix1HrmYRhEAA */
createMachine(
  {
    id: "manager",
    initial: "turnedOff",
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
        initial: "standbyToStop",
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
