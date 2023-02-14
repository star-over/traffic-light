/* eslint-disable import/no-unresolved */
import { Light2 } from "comp/Light2";
import { TrafficLight } from "comp/TrafficLight";

export default function Home() {
  return (
    <div className="container mx-auto mt-8 flex h-screen justify-center ">
      {/* <TrafficLight /> */}
      <Light2 type="TURN_ON" />
      <Light2 type="TURN_OFF" />
      <Light2 type="BLINK" />
    </div>
  );
}
