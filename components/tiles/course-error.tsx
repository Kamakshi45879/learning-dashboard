import { AlertTriangle, RefreshCw } from "lucide-react";

export function CourseError({ message }: { message: string }) {
  return (
    <div className="col-span-full rounded-2xl border border-red-500/20 bg-red-950/20 p-6 flex items-start gap-4">
      <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-4 h-4 text-red-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-red-300 mb-1">
          Failed to load courses
        </h3>
        <p className="text-xs text-red-400/60 mb-3">{message}</p>
        <p className="text-xs text-white/30">
          Check your Supabase environment variables in{" "}
          <code className="text-white/50 bg-white/5 px-1 rounded">.env.local</code>
        </p>
      </div>
    </div>
  );
}
