import { Skeleton } from "@/shared/ui/Skeleton";

export const DashboardEditSkeletonDesktop = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-9 w-24 rounded-lg" />

          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-8 w-40" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-20 rounded-lg" />
              <Skeleton className="h-10 w-20 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section className="bg-card rounded-2xl border border-border p-6">
            <Skeleton className="h-5 w-24 mb-6" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="col-span-2 space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-6">
            <Skeleton className="h-5 w-24 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-24 rounded-lg" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
