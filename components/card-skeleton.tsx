import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotelCardSkeleton() {
  return (
    <Card className="flex flex-col sm:flex-row overflow-hidden px-4">
      <div className="overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-r-none w-full sm:w-64 shrink-0">
        <Skeleton className="h-48 sm:h-40 w-full aspect-video sm:aspect-auto object-cover" />
      </div>

      <div className="flex-1 flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex gap-2 items-center">
            <Skeleton className="h-8 w-14 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 max-sm:items-center sm:items-end justify-between sm:mt-0 mt-2">
          <div className="flex flex-col items-end">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-30 mt-1" />
          </div>
          <Skeleton className="h-10 w-full sm:w-auto sm:min-w-24 rounded-md " />
        </div>
      </div>
    </Card>
  );
}
