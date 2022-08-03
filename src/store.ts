import { initMethods } from "./init";
const date = require("./plugins/date");
interface pluginsObject {
  [key: string]: pluginsFunc;
}
interface pluginsFunc {
  (...key: any): number;
}
interface KeyValueObject {
  [key: string]: any;
}
class Sprage {
  protected autoClear: boolean;
  protected exclude: string[];
  static plugins: pluginsObject = {};
  constructor(option: KeyValueObject = { autoClear: true, exclude: [] }) {
    this.autoClear = option.autoClear;
    this.exclude = option.exclude ? option.exclude : [];
    const vm: any = this;
    this.init(vm);
  }
  // 初始化挂载类上的所有方法
  private init(vm: any) {
    initMethods(vm);
  }
  // 为类添加插件的方法
  static install(name: string, descriptor: any) {
    this.plugins[name] = descriptor;
  }
}
// initPlugins(Sprage)
// 初始化处理时间的插件方法
Sprage.install("time", new date().timeInvertFn);
export default Sprage;
