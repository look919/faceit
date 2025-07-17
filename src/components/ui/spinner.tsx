import React from "react";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};
