# 🚀 Vercel 部署指南

您的项目已经准备好部署了！Git 仓库已初始化并提交。

---

## 📋 第一步：在 GitHub 创建仓库

### 方法 A：使用 GitHub 网站（推荐）

1. 访问 **https://github.com/new**

2. 填写仓库信息：
   - **Repository name**: `markdown-viewer`（或您喜欢的名字）
   - **Description**: `Markdown 文档查看器`
   - **Public** 或 **Private**：随意选择
   - ⚠️ **不要勾选** "Add a README file"、".gitignore" 等选项

3. 点击 **Create repository**

4. 复制页面上显示的命令（类似下面这样）：

```bash
git remote add origin https://github.com/您的用户名/markdown-viewer.git
git push -u origin main
```

### 方法 B：使用 GitHub CLI（如果已安装）

```bash
cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"
gh repo create markdown-viewer --public --source=. --remote=origin --push
```

---

## 📤 第二步：推送代码到 GitHub

### 如果使用方法 A，在终端运行：

```bash
cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"

# 添加远程仓库（替换成您的仓库地址）
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送代码
git push -u origin main
```

**如果遇到认证问题：**

1. GitHub 现在需要使用 Personal Access Token（不能用密码）
2. 访问：https://github.com/settings/tokens/new
3. 勾选 `repo` 权限
4. 生成 token 并复制
5. 推送时，用户名输入您的 GitHub 用户名，密码输入 token

---

## 🌐 第三步：部署到 Vercel

### 1. 注册/登录 Vercel

访问：**https://vercel.com**

- 点击 **Sign Up**
- 选择 **Continue with GitHub**（推荐）
- 授权 Vercel 访问您的 GitHub

### 2. 导入项目

1. 登录后，点击 **Add New...** 按钮
2. 选择 **Project**
3. 点击 **Import Git Repository**
4. 找到您刚才创建的仓库（`markdown-viewer`）
5. 点击 **Import**

### 3. 配置项目

**保持默认设置即可！** Vercel 会自动检测到 `vercel.json` 配置。

- **Framework Preset**: 选择 `Other` 或 `Static`
- **Build Command**: `node generate-config.js`（已在 vercel.json 配置）
- **Output Directory**: `.`（已在 vercel.json 配置）

### 4. 部署

点击 **Deploy** 按钮

⏱️ 等待 1-2 分钟...

✅ **部署成功！**

---

## 🎉 完成！获取您的网站

部署成功后，您会看到：

```
https://您的项目名.vercel.app
```

**示例：**
- `https://markdown-viewer.vercel.app`
- `https://my-docs-123abc.vercel.app`

### 访问您的网站

点击 Vercel 页面上的 **Visit** 按钮，或直接在浏览器输入您的域名。

---

## 🔄 后续更新

每次修改文档后：

```bash
cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"

# 重新生成配置（如果添加了新文档）
node generate-config.js

# 提交更改
git add .
git commit -m "更新文档"
git push

# Vercel 会自动重新部署！无需手动操作
```

---

## 🌐 自定义域名（可选）

如果您有自己的域名（如 `docs.yoursite.com`）：

### 在 Vercel 设置：

1. 进入项目 → **Settings** → **Domains**
2. 输入您的域名，点击 **Add**
3. Vercel 会给您 DNS 记录

### 在域名服务商设置：

添加 CNAME 记录：
```
类型: CNAME
名称: docs（或 @）
值: cname.vercel-dns.com
```

等待几分钟，DNS 生效后即可访问！

---

## 💡 小贴士

### 查看部署状态
- 在 Vercel 项目页面，可以看到所有部署历史
- 每次 Git push 都会触发新的部署

### 环境变量（如需要）
- 项目 → Settings → Environment Variables

### 回滚版本
- Vercel 保存所有历史版本
- 可以一键回滚到之前的任何版本

### 团队协作
- 可以邀请团队成员共同管理项目
- 支持多个 GitHub 仓库

---

## ❓ 常见问题

**Q: 部署失败怎么办？**
A: 查看 Vercel 的构建日志，通常是 `generate-config.js` 执行失败。确保 docs 目录有文件。

**Q: 可以绑定多个域名吗？**
A: 可以！在 Domains 设置中添加多个域名。

**Q: 免费版有限制吗？**
A: 个人用户免费版已经足够使用：
- 无限带宽
- 无限部署
- 自动 HTTPS
- 全球 CDN

**Q: 可以看到访问统计吗？**
A: Vercel Pro 版本提供 Analytics，或者可以自己集成 Google Analytics。

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs
- GitHub 文档：https://docs.github.com

---

**现在开始第一步：去 GitHub 创建仓库吧！** 🚀

创建好后告诉我，我可以帮您推送代码！

