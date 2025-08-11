import * as React from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

type PostsFilterProps = {
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
};

export const PostsFilter = ({
  placeholder = "Search posts...",
  className,
  ariaLabel = "Search posts",
}: PostsFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("q") ?? "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (nextValue) params.set("q", nextValue);
    else params.delete("q");
    setSearchParams(params, { replace: true });
  };

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      aria-label={ariaLabel}
      className={className}
    />
  );
};
