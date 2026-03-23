export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <div className="relative flex flex-col items-center">
        <div className="h-20 w-20 animate-bounce rounded-2xl bg-indigo-600 shadow-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-white">F</span>
        </div>
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-full animate-progress origin-left bg-indigo-600" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
          Securing your financial data...
        </p>
      </div>
    </div>
  );
}