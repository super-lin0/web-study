import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import { join } from "path";

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";
type LoadOptions = {
  /**
   * 路由文件扩展名，默认值是`.{js.ts}`
   */
  extname?: string;
};
type RouteOptions = {
  /**
   * 适用于某个请求比较特殊，需要单独指定前缀的清醒
   */
  prefix?: string;

  /**
   * 给当前路由添加一个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>;
};

const router = new KoaRouter();

// export const get = (path: string, options?: RouteOptions) => {
//   return (target, property, descriptor) => {
//     const url = options && options.prefix ? options.prefix + path : path;
//     router["get"](url, target[property]);
//   };
// };
export const decorate = (
  methods: HTTPMethod,
  path: string,
  options: RouteOptions = {},
  router: KoaRouter
) => {
  return (target, property: string) => {
    const url = options && options.prefix ? options.prefix + path : path;
    router[methods](url, target[property]);
  };
};

const method = methods => (path: string, options?: RouteOptions) =>
  decorate(methods, path, options, router);

export const get = method("get");
export const post = method("post");
export const del = method("del");
export const put = method("put");
export const patch = method("patch");

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || ".{js,ts}";
  glob.sync(join(folder, `./**/*${extname}`)).forEach(file => require(file));

  return router;
};