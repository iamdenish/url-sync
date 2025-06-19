export type FilterValueType = "string" | "number" | "boolean";

export type FilterDefinition = {
  queryString: string;
  defaultValue: any;
  value?: any;
  type?: FilterValueType;
};

export type FiltersModel = {
  [key: string]: FilterDefinition | FiltersModel;
};

export type SortFieldToQueryString = {
  [fieldName: string]: string;
};

export type SortOrdersValues = {
  ASCENDING: string;
  DESCENDING: string;
};

export type DefaultSortValues = {
  sortOn: string;
  sortBy: string;
};

export type SortersModel = {
  fieldToQueryString: SortFieldToQueryString;
  sortOrdersValues: SortOrdersValues;
  defaultSortValues: DefaultSortValues;
};

export type URLConfigArgType = {
  filters: FiltersModel;
  sorters: SortersModel;
};

export type URLReturnType = {
  filters: Record<string, any>;
  sorters: Array<{ sortBy: string; sortOn: string }>;
  sorterState: Record<string, "ascend" | "descend" | null>;
  parsedQuery: Record<string, any>;
};
