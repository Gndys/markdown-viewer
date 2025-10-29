#!/bin/bash

# Vercel 部署脚本

echo "========================================"
echo "   部署到 Vercel"
echo "========================================"
echo ""

cd "/Users/gndys/Documents/编程开发/#开发中ind/10.29md 文件发布"

echo "📦 项目目录：$(pwd)"
echo ""

echo "🚀 开始部署到 Vercel..."
echo ""
echo "接下来会发生什么："
echo "1. 浏览器会自动打开，要求您登录 Vercel"
echo "2. 登录后，回到终端"
echo "3. 按照提示回答几个问题"
echo "4. 等待部署完成"
echo ""
echo "准备好了吗？按回车继续..."
read

echo ""
echo "正在启动 Vercel CLI..."
echo ""

# 运行 Vercel 部署
npx vercel

echo ""
echo "========================================"
echo "  部署完成！"
echo "========================================"
echo ""
echo "您的网站已经上线了！"
echo "Vercel 已经给您提供了一个 URL。"
echo ""
echo "下次更新文档后，只需再次运行："
echo "  npx vercel"
echo ""
echo "或者运行："
echo "  npx vercel --prod"
echo "（直接部署到生产环境）"
echo ""

