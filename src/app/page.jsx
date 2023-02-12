// eslint-disable-next-line import/no-unresolved
import { Light } from "@/components/Light";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="mt-5 flex justify-center">
        <Light />
      </div>
      <div className="mt-5 flex justify-center">
        <Light color="red" />
        <Light color="yellow" state="on" />
        <Light color="green" />
      </div>
      <div className=" mt-5 flex flex-col items-center justify-center gap-1">
        <Light color="red" state="off" />
        <Light color="yellow" state="off" />
        <Light color="green" state="on" />
      </div>
    </div>
  );
}
