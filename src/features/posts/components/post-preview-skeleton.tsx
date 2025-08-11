import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostPreviewSkeleton = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base sm:text-lg">
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-3 w-24" />
      </CardFooter>
    </Card>
  );
};
