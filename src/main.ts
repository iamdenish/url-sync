import {
  URLConfigArgType,
  FiltersModel,
  FilterDefinition,
  URLReturnType,
} from "./types";

function URLSync(
  argData: URLConfigArgType,
  locationSearch?: string
): URLReturnType {
  const filterModel = argData.filters;
  const sorterObj = argData.sorters;
  const location = window.location;
  const getLocationSearch =
    locationSearch ??
    (typeof window !== "undefined" ? window.location.search : "");
  const urlParams = new URLSearchParams(getLocationSearch);

  const urlValueToObject: Record<string, any> = {};
  const paramsEntries = Array.from(urlParams.entries());
  paramsEntries.forEach(([key, value]) => {
    try {
      urlValueToObject[key] = JSON.parse(value);
    } catch {
      urlValueToObject[key] = value;
    }
  });

  const querySorters: Array<{ sortBy: string; sortOn: string }> = [];
  const sorters: Record<string, "ascend" | "descend" | null> = {};

  Object.keys(sorterObj?.fieldToQueryString).forEach((item) => {
    const queryKey = sorterObj.fieldToQueryString[item];
    if (urlParams.has(queryKey)) {
      const value = urlParams.get(queryKey);
      sorters[item] = value
        ? value === sorterObj.sortOrdersValues.ASCENDING
          ? "ascend"
          : "descend"
        : null;

      querySorters.push({
        sortBy: value ?? "",
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

function prepareFilterPayloadFromUrl(
  filterObj: FiltersModel,
  urlValueToObject: Record<string, any>
): Record<string, any> {
  const queryObject: Record<string, any> = {};

  Object.keys(filterObj).forEach((key) => {
    const value = filterObj[key];
    if ("queryString" in value) {
      const def = value as FilterDefinition;
      let finalValue: any;
      if (def.value || typeof def.value === "boolean") {
        finalValue = def.value;
      } else if (
        urlValueToObject[def.queryString] ||
        typeof urlValueToObject[def.queryString] === "boolean"
      ) {
        finalValue = urlValueToObject[def.queryString];
      } else {
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
    } else {
      queryObject[key] = prepareFilterPayloadFromUrl(
        value as FiltersModel,
        urlValueToObject
      );
    }
  });

  return queryObject;
}

export default URLSync;
