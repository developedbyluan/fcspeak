"use client";

import Link from "next/link";

export const runtime = "edge";

export default function Error() {
  return (
    <>
      <title>Error: This page could not be found.</title>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Error</h1>
        <Link className="text-blue-500" href="/">
          Go back to All Courses
        </Link>
      </div>
    </>
  );
}

