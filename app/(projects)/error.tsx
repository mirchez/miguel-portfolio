"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-2xl font-bold mb-4">
        There was an error in the projects page!
      </h2>
      <p className="mb-4">{error.message}</p>
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
