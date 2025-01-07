import React from "react";

export default function EmptyResults() {
  return (
    <div className="border-[1px] border-stone-500/25 w-full flex  flex-grow justify-center items-center h-32 flex-col">
      <p className="text-xl font-semibold">Not found any Cars</p>
      <p>Please back to previous page and try again</p>
    </div>
  );
}
