import * as React from "react";

type UseIntersectionObserverOptions = {
  rootRef: React.RefObject<Element | null>;
  targetRef: React.RefObject<Element | null>;
  onIntersect?: () => void;
  threshold?: number | number[];
  rootMargin?: string;
  enabled?: boolean;
  deps?: React.DependencyList;
};

/**
 * Observes `targetRef` within `rootRef` and calls `onIntersect` when visible.
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions
) {
  const {
    rootRef,
    targetRef,
    onIntersect,
    threshold = 0,
    rootMargin = "0px",
    enabled = true,
    deps = [],
  } = options;

  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    const rootElement = rootRef.current;
    const targetElement = targetRef.current;

    if (!rootElement || !targetElement || !onIntersect) return;

    // Disconnect any previous observer before creating a new one
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: rootElement as Element | Document | null,
        threshold,
        rootMargin,
      }
    );

    observer.observe(targetElement);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rootRef,
    targetRef,
    onIntersect,
    threshold,
    rootMargin,
    enabled,
    ...deps,
  ]);
}
