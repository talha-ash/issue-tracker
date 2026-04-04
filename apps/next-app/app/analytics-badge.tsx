"use client";

export function AnalyticsBadge() {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600">
      Analytics: {process.env.NEXT_PUBLIC_ANALYTICS_ID ?? "not set"}     
    </span>
  );
}
