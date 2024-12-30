import { cn } from "@/lib/utils";

export function BetItemsSkeleton() {
  return (
    <div className="animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className={cn("flex-column text-s bg-betcard border rounded m-4 p-4")}
        >
          <div className="flex gap-2 justify-between w-full px-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-32 mx-auto mt-2"></div>
          <div className="flex justify-between mt-4 gap-6 pl-2">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
