# DzAvgEngine
基于cocos2d-x的AVG游戏引擎
工具：CocosCreator V2.0.5
语言：TypeScript
## 如何使用
### 如何打开项目
打开Cocos Creator，点击打开其他项目...，选择文件夹即可。
### 如何修改脚本
打开项目根目录下的**脚本.csv**，按照格式填写脚本。填写完毕后[点此链接][1]，将脚本转换成Json格式（请**不要**勾选**值全部用字符串**），并删除最后一个Json元素后的逗号，随后覆盖项目下的assets\Resources\json\script.json即可。
## 脚本语法说明
注明的列为必填项，未注明的列的对脚本无影响。
### 普通对话命令
> Command: "", Text: "*对话的内容*"

### 选择选项命令
在选择选项前，先写入一条SelectStart命令，并在Arg1传入一个变量名用于记录玩家选择的结果。
> Command: "SelectStart", Arg1: "*一个变量名*"

随后对于每个选项，写入一条Select命令，Arg1为选择此选项后**将SelectStart所指定的变量赋值**的值。对于每个选项，这个值必须为一个唯一的整数。
> Command: "Select", Arg1: *一个唯一的整数*

所有选项写入完毕后，写入一条SelectEnd命令，此时引擎会显示选项并等待用户选择。
>Command: "SelectEnd"

用户选择完毕后，SelectStart所指定的变量将会被赋值并继续执行脚本。

## 更新日志

### 0.1.0
创建项目，新增普通对话命令和选择选项命令。

  [1]: http://www.bejson.com/json/col2json/