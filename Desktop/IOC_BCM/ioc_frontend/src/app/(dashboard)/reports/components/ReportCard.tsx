import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  description?: string;
  thumbnail?: string;
};

export default function ReportCard({ title, description, thumbnail }: Props) {
  return (
    <div className="flex flex-col h-full border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden bg-white">
      <div className="relative h-36 w-full bg-gray-100">
        {thumbnail ? (
          // Image optimizes automatically; adjust width/height if you prefer
          <Image
            src={thumbnail}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-600 flex-1">{description}</p>

        <div className="mt-4">
          <button
            className="cursor-pointer text-sm font-medium px-3 py-1 rounded bg-green-700 text-white hover:bg-indigo-700"
            aria-hidden
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
