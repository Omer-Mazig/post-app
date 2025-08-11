import * as React from "react";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  retryLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't complete your request. Please try again.",
  onRetry,
  retryLabel = "Try again",
  retryLoading = false,
  className,
  children,
}: ErrorStateProps) => {
  return (
    <div
      className={"flex items-center justify-center p-4 " + (className ?? "")}
    >
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row items-start gap-3">
          <div className="mt-1 rounded-full bg-destructive/10 p-2 text-destructive">
            <AlertCircle
              className="h-5 w-5"
              aria-hidden
            />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </CardHeader>
        {children ? (
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {children}
            </div>
          </CardContent>
        ) : null}
        <CardFooter className="justify-end gap-2">
          {onRetry ? (
            <Button
              onClick={onRetry}
              disabled={retryLoading}
            >
              {retryLoading ? "Retrying…" : retryLabel}
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};
