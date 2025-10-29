#!/usr/bin/env node

/**
 * 配置生成脚本
 * 自动扫描 docs 目录下的所有 Markdown 文件，生成导航配置
 * 
 * 使用方法:
 *   node generate-config.js
 */

const fs = require('fs');
const path = require('path');

// 配置
const DOCS_DIR = path.join(__dirname, 'docs');
const CONFIG_FILE = path.join(__dirname, 'js', 'config.js');
const SITE_TITLE = '我的文档'; // 可以修改网站标题

/**
 * 递归扫描目录，获取所有 Markdown 文件
 */
function scanDirectory(dir, baseDir = dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
        console.warn(`⚠️  目录不存在: ${dir}`);
        return files;
    }
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        // 跳过隐藏文件和特殊目录
        if (item.startsWith('.') || item.startsWith('_')) {
            return;
        }
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // 递归扫描子目录
            files.push(...scanDirectory(fullPath, baseDir));
        } else if (stat.isFile() && item.endsWith('.md')) {
            // 计算相对路径
            const relativePath = path.relative(baseDir, fullPath);
            
            // 提取文档标题（从文件名或文件内容）
            const title = extractTitle(fullPath);
            
            files.push({
                title: title,
                path: relativePath.replace(/\\/g, '/') // Windows 路径转换
            });
        }
    });
    
    return files;
}

/**
 * 提取文档标题
 * 优先从文档内容的第一个 # 标题提取，否则使用文件名
 */
function extractTitle(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 匹配第一个 # 标题
        const match = content.match(/^#\s+(.+)$/m);
        if (match && match[1]) {
            return match[1].trim();
        }
        
        // 使用文件名（去掉 .md 后缀）
        const fileName = path.basename(filePath, '.md');
        return fileName;
    } catch (error) {
        console.error(`读取文件失败: ${filePath}`, error);
        return path.basename(filePath, '.md');
    }
}

/**
 * 生成配置文件
 */
function generateConfig() {
    console.log('🔍 开始扫描文档...');
    
    // 扫描所有 Markdown 文件
    const files = scanDirectory(DOCS_DIR);
    
    if (files.length === 0) {
        console.warn('⚠️  未找到任何 Markdown 文件');
    } else {
        console.log(`✅ 找到 ${files.length} 个文档`);
    }
    
    // 按路径排序
    files.sort((a, b) => a.path.localeCompare(b.path, 'zh-CN'));
    
    // 生成配置对象
    const config = {
        title: SITE_TITLE,
        files: files
    };
    
    // 生成 JavaScript 代码
    const code = `/**
 * 文档配置文件
 * 此文件由 generate-config.js 自动生成
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 */

window.DOC_CONFIG = ${JSON.stringify(config, null, 4)};
`;
    
    // 确保目录存在
    const configDir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    
    // 写入配置文件
    fs.writeFileSync(CONFIG_FILE, code, 'utf-8');
    
    console.log('✅ 配置文件已生成:', CONFIG_FILE);
    console.log('\n文档列表:');
    files.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.title} (${file.path})`);
    });
    
    console.log('\n🎉 完成！现在可以打开 index.html 查看您的文档站点。');
}

/**
 * 主函数
 */
function main() {
    console.log('========================================');
    console.log('   Markdown 文档配置生成工具');
    console.log('========================================\n');
    
    try {
        generateConfig();
    } catch (error) {
        console.error('❌ 生成配置失败:', error);
        process.exit(1);
    }
}

// 执行
main();

