import React from "react";

export default function Preloader() {
  return (
      <div className="text-center">
          <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
          </div>
      </div>
  );
}
