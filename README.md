# Markdown 文档查看器

一个功能完整的单页应用，将本地 Markdown 文件转换成美观的网页展示。支持文件夹导航、全文搜索、主题切换、自动目录、代码高亮等功能。

## ✨ 特性

- 📁 **文件夹导航** - 支持多层级文件夹结构，可折叠展开
- 🔍 **全文搜索** - 快速查找任何文档内容，实时搜索
- 🌓 **主题切换** - 明亮/暗黑主题，自动保存偏好
- 📑 **自动目录** - 从标题自动生成文章目录
- 💻 **代码高亮** - 支持多种编程语言语法高亮
- 📱 **响应式设计** - 完美支持桌面端和移动端
- 🚀 **纯静态** - 可部署到任何静态托管服务
- ⚡ **按需加载** - 文档按需加载，性能优秀

## 🎯 技术栈

- **Markdown 解析**: markdown-it
- **代码高亮**: highlight.js
- **搜索引擎**: Fuse.js
- **样式**: 原生 CSS（CSS 变量）
- **无框架**: 纯 JavaScript，轻量高效

## 📦 文件结构

```
.
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── app.js             # 主应用逻辑
│   └── config.js          # 文档配置（自动生成）
├── docs/                  # Markdown 文件目录
│   ├── 欢迎.md
│   └── 示例/
│       ├── markdown-guide.md
│       └── javascript-basics.md
├── generate-config.js     # 配置生成脚本
└── README.md              # 本文件
```

## 🚀 快速开始

### 1. 添加 Markdown 文件

将您的 `.md` 文件放入 `docs/` 目录。支持子文件夹：

```
docs/
├── 首页.md
├── 教程/
│   ├── 入门.md
│   └── 进阶.md
└── API/
    └── 参考.md
```

### 2. 生成配置

运行配置生成脚本：

```bash
node generate-config.js
```

这会自动扫描 `docs/` 目录，生成 `js/config.js` 配置文件。

### 3. 本地预览

由于浏览器的 CORS 限制，需要使用本地服务器：

**方式一：使用 Python（推荐）**

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**方式二：使用 Node.js**

```bash
# 使用 http-server
npx http-server

# 或全局安装
npm install -g http-server
http-server
```

**方式三：使用 PHP**

```bash
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 🌐 部署到公网

### GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为发布源
4. 访问 `https://your-username.github.io/your-repo`

### Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 无需配置，直接部署
4. 获得免费的 HTTPS 域名

### Netlify

1. 将项目推送到 GitHub
2. 在 [Netlify](https://netlify.com) 导入仓库
3. 设置构建命令：`node generate-config.js`（可选）
4. 部署完成

### 自己的服务器（Nginx）

1. 将所有文件上传到服务器

2. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /path/to/markdown-viewer;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

3. 重启 Nginx：

```bash
sudo systemctl restart nginx
```

### 使用自定义域名

大多数托管服务都支持自定义域名：

1. 在域名 DNS 设置中添加 CNAME 或 A 记录
2. 在托管服务中配置自定义域名
3. 等待 DNS 生效（通常几分钟到几小时）

## ⚙️ 配置

### 修改网站标题

编辑 `generate-config.js`：

```javascript
const SITE_TITLE = '我的文档'; // 修改这里
```

然后重新运行 `node generate-config.js`

### 自定义样式

编辑 `css/style.css`，使用 CSS 变量快速修改配色：

```css
:root {
    --accent-color: #3b82f6;      /* 主题色 */
    --bg-primary: #ffffff;         /* 主背景色 */
    --text-primary: #2c3e50;       /* 主文字颜色 */
    /* ... 更多变量 ... */
}
```

### 修改代码高亮主题

在 `index.html` 中修改 highlight.js 的主题 CSS：

```html
<!-- 明亮主题 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">

<!-- 暗黑主题 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
```

更多主题可在 [highlight.js demo](https://highlightjs.org/demo) 查看。

## 📝 Markdown 语法

本查看器支持标准 Markdown 语法，包括：

- 标题（h1-h6）
- 文本样式（粗体、斜体、删除线）
- 列表（有序、无序、任务列表）
- 链接和图片
- 引用
- 代码块和行内代码
- 表格
- 分隔线
- HTML 标签

详细语法说明请查看示例文档。

## 🔧 高级功能

### 手动配置文件

如果不想使用自动生成脚本，可以手动编辑 `js/config.js`：

```javascript
window.DOC_CONFIG = {
    title: '我的文档',
    files: [
        {
            title: '首页',
            path: '首页.md'
        },
        {
            title: '教程',
            path: '教程/入门.md'
        }
    ]
};
```

### 添加自定义脚本

在 `index.html` 底部添加：

```html
<script>
// 自定义功能
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成');
});
</script>
```

### 集成 Google Analytics

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 💡 使用技巧

### 1. 文档组织

- 使用有意义的文件夹名称
- 文件名使用中文或英文都可以
- 在每个文档开头添加一级标题
- 使用合理的标题层级结构

### 2. 图片处理

将图片放在 `docs/images/` 目录：

```markdown
![图片描述](images/screenshot.png)
```

### 3. 链接其他文档

使用相对路径链接：

```markdown
[查看教程](教程/入门.md)
```

### 4. 代码块

始终指定语言以获得语法高亮：

````markdown
```javascript
const hello = "world";
```
````

### 5. 搜索优化

- 在文档中使用清晰的标题
- 避免过长的段落
- 使用关键词标签

## 🐛 常见问题

### Q: 打开 index.html 显示空白？

**A**: 这是浏览器的 CORS 限制。请使用本地服务器（见"快速开始"部分）。

### Q: 文档没有显示在导航中？

**A**: 确保：
1. 文件在 `docs/` 目录下
2. 文件扩展名是 `.md`
3. 已运行 `node generate-config.js`

### Q: 代码没有高亮？

**A**: 确保在代码块中指定了语言：

````markdown
```javascript
// 代码
```
````

### Q: 搜索不工作？

**A**: 等待搜索索引构建完成（通常几秒钟），或检查浏览器控制台是否有错误。

### Q: 主题切换后刷新页面又恢复了？

**A**: 检查浏览器是否启用了 localStorage。隐私模式可能会禁用此功能。

### Q: 可以使用数学公式吗？

**A**: 需要额外集成 KaTeX 或 MathJax。可以在 `index.html` 中添加相应的库。

## 📄 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器

不支持 IE 浏览器。

## 🔒 安全性

- 所有文件都是静态的，没有服务器端代码
- 不收集用户数据
- 主题偏好仅存储在本地浏览器

## 📈 性能优化

- 文档按需加载，不预加载所有内容
- 使用 CDN 加载第三方库
- 图片使用相对路径，支持懒加载
- CSS 使用变量，减少重复代码

## 🤝 贡献

欢迎提交问题和改进建议！

## 📜 许可

MIT License - 自由使用和修改

## 🙏 致谢

本项目使用了以下开源库：

- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown 解析器
- [highlight.js](https://highlightjs.org/) - 代码语法高亮
- [Fuse.js](https://fusejs.io/) - 模糊搜索库

---

**祝您使用愉快！** 如有问题，欢迎反馈。

