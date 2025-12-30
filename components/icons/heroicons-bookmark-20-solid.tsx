import * as React from "react";

export function Bookmark20SolidIcon({
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path fillRule="evenodd" d="M10 2q-2.575.002-5.07.31A2.213 2.213 0 0 0 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.926 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41 41 0 0 0 10 2" clip-rule="evenodd"/>
    </svg>
  );
}
