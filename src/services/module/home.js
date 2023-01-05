import yYRequest from "../request/index";

export function getSuggestAll() {
  return yYRequest.get({
    url: "/home/hotSuggests",
  });
}

export function getCategoryAll() {
  return yYRequest.get({
    url: "/home/categories",
  });
}

export function gethouselistAll(currentPage) {
  return yYRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  });
}
