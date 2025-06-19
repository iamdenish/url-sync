function URLSync(argData, locationSearch) {
    const filterModel = argData.filters;
    const sorterObj = argData.sorters;
    const location = window.location;
    const getLocationSearch = locationSearch !== null && locationSearch !== void 0 ? locationSearch : (typeof window !== "undefined" ? window.location.search : "");
    const urlParams = new URLSearchParams(getLocationSearch);
    const urlValueToObject = {};
    const paramsEntries = Array.from(urlParams.entries());
    paramsEntries.forEach(([key, value]) => {
        try {
            urlValueToObject[key] = JSON.parse(value);
        }
        catch (_a) {
            urlValueToObject[key] = value;
        }
    });
    const querySorters = [];
    const sorters = {};
    Object.keys(sorterObj === null || sorterObj === void 0 ? void 0 : sorterObj.fieldToQueryString).forEach((item) => {
        const queryKey = sorterObj.fieldToQueryString[item];
        if (urlParams.has(queryKey)) {
            const value = urlParams.get(queryKey);
            sorters[item] = value
                ? value === sorterObj.sortOrdersValues.ASCENDING
                    ? "ascend"
                    : "descend"
                : null;
            querySorters.push({
                sortBy: value !== null && value !== void 0 ? value : "",
                sortOn: item,
            });
        }
    });
    if (!querySorters.length && sorterObj.defaultSortValues) {
        const defaultSort = sorterObj.defaultSortValues;
        querySorters.push(defaultSort);
        sorters[defaultSort.sortOn] =
            defaultSort.sortBy === sorterObj.sortOrdersValues.ASCENDING
                ? "ascend"
                : "descend";
    }
    const filters = prepareFilterPayloadFromUrl(filterModel, urlValueToObject);
    return {
        filters,
        sorters: querySorters,
        sorterState: sorters,
        parsedQuery: urlValueToObject,
    };
}
function prepareFilterPayloadFromUrl(filterObj, urlValueToObject) {
    const queryObject = {};
    Object.keys(filterObj).forEach((key) => {
        const value = filterObj[key];
        if ("queryString" in value) {
            const def = value;
            let finalValue;
            if (def.value || typeof def.value === "boolean") {
                finalValue = def.value;
            }
            else if (urlValueToObject[def.queryString] ||
                typeof urlValueToObject[def.queryString] === "boolean") {
                finalValue = urlValueToObject[def.queryString];
            }
            else {
                finalValue = def.defaultValue;
            }
            switch (def.type) {
                case "number":
                    queryObject[key] = isNaN(Number(finalValue))
                        ? null
                        : Number(finalValue);
                    break;
                case "string":
                    queryObject[key] = String(finalValue);
                    break;
                case "boolean":
                    queryObject[key] = finalValue === "true" || finalValue === true;
                    break;
                default:
                    queryObject[key] = finalValue;
            }
        }
        else {
            queryObject[key] = prepareFilterPayloadFromUrl(value, urlValueToObject);
        }
    });
    return queryObject;
}
export default URLSync;
