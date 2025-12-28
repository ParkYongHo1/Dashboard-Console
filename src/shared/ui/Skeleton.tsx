import { cn } from "@/shared/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn("bg-muted animate-pulse rounded-md", className)} />;
};
