import { useCallback, useEffect, useState } from "react";

export function useRecent(key: string, max = 8) {
  const storageKey = `eaos.recent.${key}`;
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [storageKey]);

  const push = useCallback((value: string) => {
    if (!value) return;
    setItems((prev) => {
      const next = [value, ...prev.filter((p) => p !== value)].slice(0, max);
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [storageKey, max]);

  const clear = useCallback(() => {
    setItems([]);
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
  }, [storageKey]);

  return { items, push, clear };
}
