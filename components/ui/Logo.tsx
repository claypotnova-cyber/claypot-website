"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "light";
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  variant = "default",
}) => {
  const sizes = {
    sm: { height: 24, iconWidth: 18 },
    md: { height: 40, iconWidth: 32 },
    lg: { height: 64, iconWidth: 52 },
    xl: { height: 96, iconWidth: 78 },
  };

  const { height, iconWidth } = sizes[size];
  const maroon = "#651F12";
  const primaryColor = variant === "light" ? "#FDF8F1" : maroon;
  const capsuleColor = variant === "light" ? "rgba(255,255,255,0.1)" : maroon;
  const strokeColor = variant === "light" ? "#FDF8F1" : "white";

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Clay Pot Logo">
      {/* Icon Part: Capsule with Pot and Fire */}
      <svg
        width={iconWidth}
        height={height}
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Maroon Capsule */}
        <rect x="0" y="0" width="100" height="125" rx="50" fill={capsuleColor} />
        
        {/* Clay Pot Outline */}
        <path
          d="M15 65C15 85 85 85 85 65C85 55 15 55 15 65Z"
          stroke={strokeColor}
          strokeWidth="3"
        />
        <path
          d="M15 65C15 68 85 68 85 65M20 75C20 90 80 90 80 75"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Steam/Bubbles */}
        <circle cx="35" cy="50" r="4" stroke={strokeColor} strokeWidth="2" />
        <circle cx="55" cy="45" r="3" stroke={strokeColor} strokeWidth="2" />
        
        {/* Flame (Orange-Red Gradient) */}
        <path
          d="M30 95C30 85 40 80 50 90C60 80 70 85 70 95C70 105 50 115 30 95Z"
          fill="#E65100"
        />
        <path
          d="M40 98C40 92 45 88 50 94C55 88 60 92 60 98C60 104 50 108 40 98Z"
          fill="#FF9800"
        />
      </svg>

      {/* Text Part */}
      {showText && (
        <div className="flex flex-col justify-center select-none">
          <span
            className="font-black leading-none tracking-tight"
            style={{
              color: primaryColor,
              fontSize: size === "xl" ? "2.5rem" : size === "lg" ? "1.75rem" : size === "md" ? "1.25rem" : "0.875rem",
              fontFamily: "var(--font-inter), sans-serif",
              textTransform: "uppercase",
              transform: "scaleY(1.1)",
            }}
          >
            Clay Pot
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="h-px opacity-20 flex-1" style={{ backgroundColor: primaryColor }} />
            <span
              className="font-bold tracking-[0.2em] whitespace-nowrap"
              style={{
                color: primaryColor,
                fontSize: size === "xl" ? "0.75rem" : size === "lg" ? "0.6rem" : size === "md" ? "0.5rem" : "0.4rem",
                textTransform: "uppercase",
              }}
            >
              Indian Bar & Restaurant
            </span>
            <div className="h-px opacity-20 flex-1" style={{ backgroundColor: primaryColor }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
