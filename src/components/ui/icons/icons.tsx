import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const PlayIcon: React.FC<IconProps> = ({
  size = 16,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={color}
      {...props}>
      <rect width="256" height="256" fill="none" />
      <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
    </svg>
  );
};

export const SwitchIcon: React.FC<IconProps> = ({
  size = 16,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={color}
      {...props}>
      <rect width="256" height="256" fill="none" />
      <polyline
        points="112 176 80 208 48 176"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="80"
        y1="48"
        x2="80"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="144 80 176 48 208 80"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="176"
        y1="208"
        x2="176"
        y2="48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};

export const SearchIcon: React.FC<IconProps> = ({
  size = 16,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={color}
      {...props}>
      <rect width="256" height="256" fill="none" />
      <circle
        cx="112"
        cy="112"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="168.57"
        y1="168.57"
        x2="224"
        y2="224"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};

export const CheckIcon: React.FC<IconProps> = ({
  size = 16,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor" 
      strokeWidth="3.5"     
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 12.5L9.5 17.5C11.5 13.5 15.5 8 20 4.5" />
    </svg>
  );
};

