"use client";

import * as React from "react";
import { useState } from "react";
import { FuzzyText } from "@/components/ui/fuzzy-text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  const [enableHover] = useState(true);
  const [hoverIntensity] = useState(0.4);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-5">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        color="white"
        className="text-4xl font-bold"
      >
        404
      </FuzzyText>

      <Button variant="outline" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
