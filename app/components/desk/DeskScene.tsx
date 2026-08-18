"use client";

import DeskFoodPlate from "./DeskFoodPlate";
import DeskLaptop from "./DeskLaptop";
import DeskMatcha from "./DeskMatcha";
import DeskMountainPlush from "./DeskMountainPlush";
import DeskPhone from "./DeskPhone";
import DeskPolaroidBoard from "./DeskPolaroidBoard";

export default function DeskScene() {
  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-lg overflow-visible"
      aria-hidden="true"
    >
      <DeskPolaroidBoard />
      <DeskLaptop />
      <DeskPhone />
      <DeskMatcha />
      <DeskFoodPlate />
      <DeskMountainPlush />
    </div>
  );
}
