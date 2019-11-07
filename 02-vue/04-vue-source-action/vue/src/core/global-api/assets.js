/* @flow */

import { ASSET_TYPES } from "shared/constants";
import { isPlainObject, validateComponentName } from "../util/index";

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    // Vue['component']
    Vue[type] = function(
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production" && type === "component") {
          validateComponentName(id);
        }
        // component处理，指定一个name，对definition做转换，获取组件构造函数
        // Vue.component("comp", {template: ""})
        if (type === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          // 转换组件配置对象为构造函数
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        // 全局注册该组件
        // options[components] = Ctor
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
