# GitHub 认证指南

## 方法 1：使用 Personal Access Token（推荐）

### 第 1 步：生成 Token

1. 登录 GitHub，访问：https://github.com/settings/tokens/new

2. 填写信息：
   - **Note**: `Markdown Viewer` （随便写，用于识别）
   - **Expiration**: 选择 `No expiration`（永不过期）或 `90 days`
   - **Select scopes**: 勾选 `repo`（包括所有子选项）

3. 滚动到底部，点击 **Generate token**

4. **立即复制 token！** （只显示一次，类似这样：`ghp_xxxxxxxxxxxxxxxxxxxx`）

### 第 2 步：使用 Token 推送

在终端运行：

```bash
cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"
git push -u origin main
```

会提示输入：
- **Username for 'https://github.com'**: 输入 `Gndys`
- **Password for 'https://Gndys@github.com'**: **粘贴您的 token**（不是 GitHub 密码！）

### 第 3 步：保存凭据（可选，避免每次输入）

```bash
# macOS 使用 Keychain 保存
git config --global credential.helper osxkeychain
```

下次推送就不用再输入了！

---

## 方法 2：使用 SSH（一劳永逸）

### 第 1 步：检查是否有 SSH 密钥

```bash
ls -la ~/.ssh
```

如果看到 `id_rsa` 或 `id_ed25519`，说明已有密钥，跳到第 3 步。

### 第 2 步：生成 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"

# 按提示操作：
# - 直接回车（使用默认路径）
# - 输入密码（可选，可以留空）
```

### 第 3 步：复制公钥

```bash
cat ~/.ssh/id_ed25519.pub
```

复制输出的内容（以 `ssh-ed25519` 开头）

### 第 4 步：添加到 GitHub

1. 访问：https://github.com/settings/ssh/new
2. **Title**: `我的 Mac`
3. **Key**: 粘贴刚才复制的公钥
4. 点击 **Add SSH key**

### 第 5 步：改用 SSH 推送

```bash
cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"

# 改用 SSH 地址
git remote set-url origin git@github.com:Gndys/markdown-viewer.git

# 推送（第一次会问是否信任，输入 yes）
git push -u origin main
```

以后推送永远不需要输入密码！

---

## 方法 3：使用 GitHub Desktop（最简单，图形界面）

### 下载安装

访问：https://desktop.github.com

### 使用步骤

1. 打开 GitHub Desktop
2. 用 GitHub 账号登录（会打开浏览器）
3. **File** → **Add Local Repository**
4. 选择项目文件夹：
   ```
   /Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布
   ```
5. 点击 **Publish repository**
6. 完成！

完全不需要命令行，点几下就好！

---

## 快速对比

| 方法 | 难度 | 推荐度 | 说明 |
|------|------|--------|------|
| GitHub Desktop | ⭐ | ⭐⭐⭐⭐⭐ | 最简单，图形界面 |
| Personal Access Token | ⭐⭐ | ⭐⭐⭐⭐ | 简单，但 token 要保管好 |
| SSH | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 一次配置，永久使用 |

---

## 推荐流程

### 如果您想快速上线：

**跳过 Git，直接用 Vercel 拖拽上传！**

1. 访问 https://vercel.com/new
2. 拖拽项目文件夹
3. 点 Deploy
4. 完成！

### 如果您想规范使用 Git：

1. 下载 **GitHub Desktop**（最简单）
2. 或使用 **Personal Access Token**（如果习惯命令行）
3. 推送代码
4. 在 Vercel 导入 GitHub 仓库

---

## 遇到问题？

### Token 输入后还是失败？

确保：
1. Token 勾选了 `repo` 权限
2. Token 没有过期
3. 用户名是 `Gndys`（不是邮箱）

### SSH 连接失败？

```bash
# 测试连接
ssh -T git@github.com

# 应该看到：Hi Gndys! You've successfully authenticated...
```

### 不想用命令行？

**GitHub Desktop 是最好的选择！** 完全图形化，跟普通软件一样简单。

---

需要更多帮助随时问我！

