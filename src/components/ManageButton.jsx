"use client";

/* eslint-disable import/no-unresolved */
import { cva } from "class-variance-authority";

const cvaFn = cva("py-3 px-6 w-36 transition-all border-4 font-bold text-lg", {
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

export function ManageButton({
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
