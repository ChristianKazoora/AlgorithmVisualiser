import React from "react";

interface LoadingBarProps {
  isLoading: boolean;
}

/**
 * A slim loading bar that appears under the navbar
 * Bounces left-to-right while async operations are running
 */
const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="absolute w-full h-1 bg-base-300 overflow-hidden">
      <div
        className="absolute h-full w-1/4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-bounce-horizontal"
        style={{
          animation: "bounceHorizontal 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes bounceHorizontal {
          0%, 100% {
            left: 0%;
            transform: translateX(0);
          }
          50% {
            left: 75%;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;
