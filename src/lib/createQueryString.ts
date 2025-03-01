import type { QueryParams } from "../types/types";

export function createQueryString(params: QueryParams) {
  const paramsArray = [];

  for (const key of Object.keys(params)) {
    switch (key) {
      case "limit":
      case "derivative":
      case "integral":
        if (params[key])
          paramsArray.push(`type=${key.toUpperCase()}`);
        break;
      case "easy":
      case "medium":
      case "hard":
      case "legendary":
        if (params[key])
          paramsArray.push(`difficulty=${key.toUpperCase()}`);
        break;
    }
  }

  return paramsArray.join("&");
}
