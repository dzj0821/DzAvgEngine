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

### 声明变量命令

声明编列的Command为**Var**，Arg1为声明变量的类型，Arg2为声明变量的名称，其余参数根据变量类型的不同而有所不同。

#### Number变量

Number为数值类型，包含了小数和整数。声明Number变量时Arg3可以指定变量的初始值，如果留空将自动初始化为0。

例：下方的命令定义了一个类型为Number，名字为a，初始值为12的变量。

> Command: "Var", Arg1: "Number", Arg2: "a", Arg3: 12

#### String变量

String为字符串类型，声明String变量时Arg3可以指定变量的初始值，如果留空将自动初始化为空字符串。

例：下方的命令定义了一个类型为String，名字为b，初始值为"This is a string"的变量。

> Command: "Var", Arg1: "String", Arg2: "b", Arg3: "This is a string"

#### Sprite变量

Sprite为精灵类型，一般用于显示图像，声明Sprite变量时Arg3为图片相对于resources的路径，Arg4和Arg5分别为图片坐标（相对于1920*1080的Canvas的中间）。所有的Sprite默认都是隐藏的。

例：下方的命令定义了一个类型为Sprite，名字为c，图片相对路径为"photo/test"（假设图片为"photo/test.jpg"，声明时不需要后缀名），图片坐标为(0, 0)（即屏幕中心）的变量。

> Command: "Var", Arg1: "Sprite", Arg2: "c", Arg3: "photo/test", Arg4: 0, Arg5: 0

#### CharacterStatus变量

CharacterStatus为引擎自定义的类型之一，其中包含了对话栏的名字，对话栏名字图片相对于resources的路径（允许为空，为空则显示默认图片，即在引擎中的图片），人物头像图片相对于resources的路径（允许为空，为空则显示默认图片，即在引擎中的图片）。用于在对话时切换人物。声明CharacterStatus变量时Arg3、Arg4、Arg5分别为角色名字，角色名字图片相对路径，角色头像图片相对路径。

例：下方的命令定义了一个类型为CharacterStatus， 名字为d，角色名为"James"，

> Command: "Var", Arg1: ""


### 普通对话命令

普通对话的Command列为空，Text为对话的内容。

> Command: "", Text: "*对话的内容*"

例：
> Command: "", Text: "这是我说的话"

#### 变更对话栏状态的对话命令

### 选择选项命令

在选择选项前，先写入一条SelectStart命令，并在Arg1传入一个变量名（如果这个变量未被初始化，则会被自动初始化）用于记录玩家选择的结果。

> Command: "SelectStart", Arg1: "*一个变量名*"

随后对于每个选项，写入一条Select命令，Arg1为选择此选项后**将SelectStart所指定的变量赋值**的值，Text为此选项显示的文本。对于每个选项，这个值必须为一个唯一的整数。

> Command: "Select", Arg1: *一个唯一的整数* , Text: "*选项显示的内容*"

所有选项写入完毕后，写入一条SelectEnd命令，此时引擎会显示选项并等待用户选择。

> Command: "SelectEnd"

用户选择完毕后，SelectStart所指定的变量将会被赋值并继续执行脚本。

例：
> Command: "SelectStart", Arg1: "choose"
> 
> Command: "Select", Arg1: 1, Text: "选项1"
> 
> Command: "Select", Arg1: 2, Text: "选项2"
> 
> Command: "SelectEnd"

玩家如果选择选项1，则执行到末尾时choose变量的值为1，如果选择选项2则值为2。

## 更新日志

### 0.1.0

创建项目，新增普通对话命令和选择选项命令。

  [1]: http://www.bejson.com/json/col2json/