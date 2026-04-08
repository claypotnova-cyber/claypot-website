"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "light";
}

const widths: Record<string, number> = {
  sm: 100,
  md: 130,
  lg: 170,
  xl: 220,
};

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
}) => {
  const w = widths[size] ?? 150;
  // Image is roughly 3:2 aspect ratio
  const h = Math.round(w * 0.6);

  return (
    <div className={`flex items-center ${className}`} aria-label="Clay Pot Indian Bar & Restaurant">
      <Image
        src="/images/logo.png"
        alt="Clay Pot Indian Bar & Restaurant"
        width={w}
        height={h}
        priority
        style={{ width: w, height: "auto", display: "block" }}
      />
    </div>
  );
};

export default Logo;
