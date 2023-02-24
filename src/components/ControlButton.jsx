"use client";

/* eslint-disable import/no-unresolved */
import { cva } from "class-variance-authority";

const cvaFn = cva(["py-1 sm:py-2 px-2 w-24 sm:w-30 sm:w-36 transition-all border",
  "font-normal text-base sm:text-lg"], {
  variants: {
    selected: {
      true: "bg-blue-600 border-blue-600 text-white",
      false: "",
    },
    enabled: {
      true: "bg-white border-gray-400/50  text-slate-900 hover:text-blue-600 ",
      false: "",
    },
  },
  compoundVariants: [{
    enabled: false,
    selected: false,
    className: "bg-gray-200/50 border-gray-400/50 text-gray-400/50",
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
