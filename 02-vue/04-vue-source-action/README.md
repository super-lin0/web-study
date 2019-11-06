用户在界面中修改值，触发 setter 函数，setter 触发 dep,dep 执行 notify 通知 watcher 更新，watcher 执行 updateComponent，updateComponent 需先 render，render 得到虚拟 dom，然后再执行\_update 得到最新的 dom 做更新
