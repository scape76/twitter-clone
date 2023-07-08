import { useState, useRef, useCallback } from "react";

export function useIntersection<T extends HTMLElement = any>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1]
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<IntersectionObserver | null>();
  const ref: (element: T | null) => void = useCallback(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
      if (element === null) {
        setEntry(null);
        return;
      }
      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry ?? null);
      }, options);
      observer.current.observe(element);
    },
    [
      options == null ? void 0 : options.rootMargin,
      options == null ? void 0 : options.root,
      options == null ? void 0 : options.threshold,
    ]
  );
  return { ref, entry };
}
