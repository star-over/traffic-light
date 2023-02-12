import { cva } from "class-variance-authority";

const cvaFn = cva("h-10 w-10 rounded-full", {
  variants: {
    color: {
      red: ["bg-red-600"],
      yellow: ["bg-yellow-500"],
      green: ["bg-green-600"],
    },
    state: {
      on: ["blur-sm"],
      off: ["grayscale-[50%] brightness-50 blur-[1px]"],
    }
  },
  defaultVariants: { color: "yellow", state: "off" },
});

export function Light(props) {
  return (
    <div className={cvaFn(props)} />
  );
}
