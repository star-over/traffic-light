"use client";

/* eslint-disable import/no-unresolved */
import { cva } from "class-variance-authority";

const cvaFn = cva(["py-1 sm:py-2 px-2 sm:px-4 w-24 sm:w-30 sm:w-36 transition-all border-2",
  "font-normal sm:font-bold text-base sm:text-lg"], {
  variants: {
    selected: {
      true: "bg-orange-500 border-orange-600 text-sky-100",
      false: "",
    },
    enabled: {
      true: "bg-sky-200 border-sky-300  text-slate-700 hover:bg-orange-300 hover:border-orange-500 ",
      false: "",
    },
  },
  compoundVariants: [{
    enabled: false,
    selected: false,
    className: "bg-gray-200 border-gray-300 text-gray-400",
  }],
  defaultVariants: { enabled: false, selected: false },
});

export function ControlButton({
  enabled, selected, onClick, children, className
}) {
  const cn = cvaFn({ enabled, selected, className });

  return (
    <button
      type="button"
      className={cn}
      onClick={onClick}
      disabled={!enabled}
    >
      {children}
    </button>
  );
}
