import { Skeleton } from "@/components/ui/skeleton";

export default function HotelCardSkeleton() {
  return (
    <div className="flex gap-4 p-4 border rounded-xl col-span-9">
      {/* Image */}
      <Skeleton className="h-36 w-56 rounded-lg" />

      <div className="flex flex-1 justify-between">
        {/* Left side */}
        <div className="space-y-3">
          {/* Hotel Name */}
          <Skeleton className="h-5 w-52" />

          {/* Location */}
          <Skeleton className="h-4 w-32" />

          {/* Rating */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-6 w-12 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end justify-between">
          {/* Price */}
          <Skeleton className="h-6 w-32" />

          {/* Subtext */}
          <Skeleton className="h-4 w-28" />

          {/* Button */}
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
