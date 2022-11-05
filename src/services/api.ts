import axios from "axios";

const BASE_URL = "https://api.spaceflightnewsapi.net";

export interface IArticle {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: [];
  events: [];
}

export const listArticles = (limit: number) => {
  const request = axios.create({
    baseURL: BASE_URL,
  });
  return request.get<IArticle[]>(`/v3/articles?_limit=${limit}`);
};

export const listSingleArticle = (id: number) => {
  const request = axios.create({
    baseURL: BASE_URL,
  })
  return request.get<IArticle>(`/v3/article/${id}`)
}