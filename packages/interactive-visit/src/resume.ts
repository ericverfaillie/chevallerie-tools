const KEY = "chevallerie.lastRoute";

export function saveLastRoute(route: string): void {
  try {
    localStorage.setItem(KEY, route);
  } catch {
    // ignore (mode privé, quotas, etc.)
  }
}

export function loadLastRoute(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
