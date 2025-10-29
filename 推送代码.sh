#!/bin/bash

# 推送代码到 GitHub 的脚本

echo "========================================"
echo "  推送代码到 GitHub"
echo "========================================"
echo ""

cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"

echo "✅ 远程仓库已设置：https://github.com/Gndys/markdown-viewer.git"
echo ""
echo "正在推送代码..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  ✅ 推送成功！"
    echo "========================================"
    echo ""
    echo "您的代码已上传到："
    echo "https://github.com/Gndys/markdown-viewer"
    echo ""
    echo "下一步：部署到 Vercel"
    echo "1. 访问 https://vercel.com"
    echo "2. 用 GitHub 登录"
    echo "3. 导入 markdown-viewer 项目"
    echo "4. 点击 Deploy"
    echo ""
else
    echo ""
    echo "========================================"
    echo "  ⚠️  推送失败"
    echo "========================================"
    echo ""
    echo "可能的原因："
    echo "1. 需要 GitHub 认证"
    echo "2. 网络连接问题"
    echo ""
    echo "解决方法："
    echo ""
    echo "方法 1：使用 GitHub CLI（推荐）"
    echo "  brew install gh"
    echo "  gh auth login"
    echo "  然后重新运行此脚本"
    echo ""
    echo "方法 2：使用 SSH"
    echo "  git remote set-url origin git@github.com:Gndys/markdown-viewer.git"
    echo "  git push -u origin main"
    echo ""
    echo "方法 3：使用 Personal Access Token"
    echo "  1. 访问 https://github.com/settings/tokens/new"
    echo "  2. 生成 token（勾选 repo 权限）"
    echo "  3. 运行：git push"
    echo "  4. 用户名输入：Gndys"
    echo "  5. 密码输入：您的 token"
    echo ""
fi

