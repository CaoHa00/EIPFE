import Link from "next/link";
import ReportCard from "./components/ReportCard";

type Report = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
};

const REPORTS: Report[] = [
  {
    id: "report5A",
    title: "Report 5 A",
    description: "Summary and metrics for Report 5A",
    thumbnail: "/img/report-5a-thumb.png",
  },
  {
    id: "reportX",
    title: "Report X",
    description: "Another example report",
    thumbnail: "/img/report-x-thumb.png",
  },
  // add more report entries here
];

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold mb-1">Reports</h1>
        <p className="text-sm text-gray-600">Choose a report</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPORTS.map((r) => (
          <Link
            key={r.id}
            href={`/reports/${r.id}`}
            prefetch
            className="h-full"
          >
            <ReportCard
              title={r.title}
              description={r.description}
              thumbnail={r.thumbnail}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
