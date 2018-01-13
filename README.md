# mabylove.cn 2.0版本
  
  ## 简介
  该项目基于1.0版本进行重构，完全去除掉原有的无效文件，并使用 [maby-cli](https://github.com/Liuqing650/maby-cli) 导入的项目模板进行重构，项目中首页使用效果使用的是 [Ant Motion](https://motion.ant.design/) 

  ## 开始项目
  ```bash
  1. npm install
  2. npm start
  3. [开始编程](https://ant.design/docs/react/practical-projects-cn)
  ```

  ## 目录树

```bash
.
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ ├── index.css      # 全局样式文件
│ └── index.ejs      # html文本模板
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```
