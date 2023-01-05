import yYRequest from "../request/index";

export function getCityAll() {
  return yYRequest.get({
    url: "/city/all",
  });
}
