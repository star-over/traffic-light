import { assign, createMachine } from "xstate";

export const blinkedLightMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QCMA2BLAdga0gGXSgAsAXAWQEMBjIrMAYgBUBVAJQDkB9AeXYG0ADAF1EoAA4B7WOhLoJmUSAAeiAOwBOACwA6AKwAmAGwBGAfs3r1AgBy7DAGhABPRPoDMOu4beX9Wt4aGZgC+wY5oWLgQBMTk1LSYDCwcPABiqYIiSCCS0rLyiioI1oba+voG1n6qAqr6xrrGji4I7p6BPup+mgGGoeEYOPiEpJQ0dPQAQngAkuwA0pzs3KxkAIJ4mYq5MnIK2UXG6m5ldo3GhtaqR4HNiAC0bsbahtdXAq8NutZubtb9IAiQ2iIzi40SU1mC04AGVGGt2AARSYATS22R2+X2oCKmmM1hemhqFgE5zcAiJdwQj2en3en103w8ugBQKiMVG8To2hIAFcAE6JCDcTD0JSwEgUEhgbQUABm0v5AApeJxEWw1owZrwAJT0NnDWJjBIyvmCyAi9HiKS7AoHRBuVSlTQCUzHcn6VS6VRuKn454k8pacq6J5+VmDdmg43cs1C7hyuViiVSmXyxUq9JqjVa3X6yOGzng00C+OJq05G1YwoO156X7WK49Nz6K7GX3OB0u7Rub7XVvWMyGXTqFkAzASCBwRQGkFGrmJbZVvY1hB-MoVVvVWr1RpUrTaAQUxkfIwh3SaCORQtgk080sW7GVvIr+0IbwCU4GHqnjxeqkVKoPZ1H8eLmH43huFewIcresYPsKiZLi+do4q4RJlIEWiaJojbDo2AGaKUGi1NYpjXFY+L6KEoRAA */
createMachine(
  {
    id: "blinkedLightMachine",
    initial: "turnedOff",
    predictableActionArguments: true,

    context: {
      blink: false,
      durations: {
        normal: { on: 700, off: 400, },
        standby: { on: 500, off: 500, },
        false: { on: 200, off: 200, }, // false as fallback option for delays
      }
    },

    on: {
      TURN_ON: { actions: assign({ blink: false }), target: "turnedOn" },
      TURN_OFF: { actions: assign({ blink: false }), target: "turnedOff" },
      BLINK_NORMAL: { actions: assign({ blink: "normal" }), target: "turnedOff" },
      BLINK_STANDBY: { actions: assign({ blink: "standby" }), target: "turnedOff" },
    },

    states: {
      turnedOn: { after: { ON_DURATION: [{ cond: (ctx) => ctx.blink, target: "turnedOff" }] } },
      turnedOff: { after: { OFF_DURATION: [{ cond: (ctx) => ctx.blink, target: "turnedOn", }] } }
    }
  },
  {
    delays: {
      ON_DURATION: (ctx) => ctx.durations[ctx.blink].on,
      OFF_DURATION: (ctx) => ctx.durations[ctx.blink].off,
    }
  }
);
