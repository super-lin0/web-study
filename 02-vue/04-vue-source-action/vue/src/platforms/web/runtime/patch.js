/* @flow */

import * as nodeOps from "web/runtime/node-ops";
import { createPatchFunction } from "core/vdom/patch";
import baseModules from "core/vdom/modules/index";
import platformModules from "web/runtime/modules/index";

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules);

/**
 * 传入平台特有的节点操作方法，实现跨平台
 * nodeOps： 节点相关操作方法
 * modules： 跟属性相关代码
 */
export const patch: Function = createPatchFunction({ nodeOps, modules });
