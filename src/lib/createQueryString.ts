import type { QueryParams } from "@/types/types";

export function createQueryString(params: QueryParams) {
  const paramsArray = [];

  for (const key of Object.keys(params)) {
    for (const field of Object.keys(params[key as keyof QueryParams])) {
      if (params[key][field]) {
        paramsArray.push(`${key}=${field.toUpperCase()}`);
      }
    }
  }

  return paramsArray.join("&");
}
