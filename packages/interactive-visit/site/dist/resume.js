const KEY = "chevallerie.lastRoute";
export function saveLastRoute(route) {
    try {
        localStorage.setItem(KEY, route);
    }
    catch {
        // ignore (mode privé, quotas, etc.)
    }
}
export function loadLastRoute() {
    try {
        return localStorage.getItem(KEY);
    }
    catch {
        return null;
    }
}
