import axios, { AxiosResponse } from "axios";
import Feature from "@/models/feature";

export function getFeatures() {
  return axios.get<Feature[]>("/api/list");
}
