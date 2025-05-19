"use client";

import * as React from "react";
import { useState } from "react";
import { FuzzyText } from "@/components/ui/fuzzy-text";

export default function NotFound() {
  const [enableHover] = useState(true);
  const [hoverIntensity] = useState(0.4);

  return (
    <FuzzyText
      baseIntensity={0.2}
      hoverIntensity={hoverIntensity}
      enableHover={enableHover}
      color="white"
      className="text-4xl font-bold"
    >
      404
    </FuzzyText>
  );
}
