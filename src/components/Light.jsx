"use client";

import { cva } from "class-variance-authority";

const cvaFn = cva("rounded-full shadow-[inset_0_6px_6px_rgba(0,0,0,0.6)]", {
  variants: {
    color: {
      red: ["bg-red-500"],
      yellow: ["bg-yellow-500"],
      green: ["bg-green-500"],
    },
    enabled: {
      true: ["blur-sm"],
      false: ["grayscale-[80%] brightness-50 blur-[1px]"],
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

export function Light(props) {
  return (
    <div className={cvaFn(props)} />
  );
}
