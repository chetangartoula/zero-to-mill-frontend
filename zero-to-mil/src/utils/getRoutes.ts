import { apiRoutes } from "@/constants/apiRoutes";
import { PageRoutes } from "@/constants/pageRoutes";
import { get, replace } from "lodash";
import queryString from "query-string";

export function getPageRoutes(
  name: keyof typeof PageRoutes,
  modifier?: Record<string, string>,
  params?: Record<string, string>
) {
  let pageRoute: string = PageRoutes[name];
  if (!pageRoute) {
    throw new Error(`No route named '${name}' found in PageRoutes.`);
  }
  if (modifier) {
    for (const key in modifier) {
      pageRoute = replace(pageRoute, `${key}`, get(modifier, key, ""));
    }
  }
  if (params) {
    pageRoute += `?${queryString.stringify(params)}`;
  }
  return pageRoute;
}

export function getApiRoutes(
  name: keyof typeof apiRoutes,
  modifier?: Record<string, string>
) {
  let apiRoute: string = apiRoutes[name];
  if (!apiRoute) {
    throw new Error(`No route named '${name}' found in apiRoutes.`);
  }
  if (modifier) {
    for (const key in modifier) {
      apiRoute = replace(apiRoute, `${key}`, get(modifier, key, ""));
    }
  }
  return apiRoute;
}
