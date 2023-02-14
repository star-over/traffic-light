"use client";

/* eslint-disable import/no-unresolved */
import { cva } from "class-variance-authority";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { blinkedLightMachine } from "machines/blinkedLightMachine";

const cvaFn = cva("rounded-full transition-all shadow-[inset_0_6px_6px_rgba(0,0,0,0.6)]", {
  variants: {
    color: {
      red: ["bg-red-500"],
      yellow: ["bg-yellow-500"],
      green: ["bg-green-500"],
    },
    light: {
      turnedOn: ["blur-sm"],
      turnedOff: ["grayscale-[80%] brightness-50 blur-[1px]"],
    },
    size: {
      sm: ["w-8 h-8"],
      md: ["w-10 h-10"],
      xl: ["w-12 h-12"],
    }
  },
  defaultVariants: { color: "yellow", size: "md", enabled: false, },
});

export function Light2({ type, color, size }) {
  const [current, send] = useMachine(blinkedLightMachine);
  const { value: light } = current;
  const cn = cvaFn({ light, color, size });

  useEffect(() => {
    send({ type });
  }, []);

  return (
    <div className={cn} />
  );
}
