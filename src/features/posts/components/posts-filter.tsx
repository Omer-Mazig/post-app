import * as React from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

type PostsFilterProps = {
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  debounceMs?: number;
};

export const PostsFilter = ({
  placeholder = "Search posts...",
  className,
  ariaLabel = "Search posts",
  debounceMs = 300,
}: PostsFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlValue = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = React.useState(urlValue);

  // Keep the input in sync if the URL param changes outside of typing (e.g., back/forward)
  React.useEffect(() => {
    setInputValue(urlValue);
  }, [urlValue]);

  // Debounce updating the URL/search param to reduce query churn while typing
  React.useEffect(() => {
    const timerId = window.setTimeout(() => {
      // Avoid redundant URL updates
      if (inputValue === urlValue) return;
      const params = new URLSearchParams(searchParams);
      if (inputValue) params.set("q", inputValue);
      else params.delete("q");
      setSearchParams(params, { replace: true });
    }, debounceMs);

    return () => window.clearTimeout(timerId);
  }, [inputValue, urlValue, debounceMs, searchParams, setSearchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Input
      value={inputValue}
      placeholder={placeholder}
      onChange={handleChange}
      aria-label={ariaLabel}
      className={className}
    />
  );
};
