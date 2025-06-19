export function URLSyncNavigate(updatedValueObj, locationSearch, locationPathname) {
    const isBrowser = typeof window !== "undefined";
    const getLocationSearch = locationSearch !== null && locationSearch !== void 0 ? locationSearch : (isBrowser ? window.location.search : "");
    const getLocationPathname = locationPathname !== null && locationPathname !== void 0 ? locationPathname : (isBrowser ? window.location.pathname : "/");
    const searchParams = new URLSearchParams(getLocationSearch);
    if (!updatedValueObj)
        return getLocationPathname;
    Object.keys(updatedValueObj).forEach((key) => {
        const value = updatedValueObj[key];
        if (value !== null && value !== undefined && value !== "") {
            const encoded = typeof value === "object" ? JSON.stringify(value) : String(value);
            searchParams.set(key, encoded);
        }
        else {
            searchParams.delete(key);
        }
    });
    return `${getLocationPathname}?${searchParams.toString()}`;
}
