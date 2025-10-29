/**
 * Markdown 文档查看器 - 主应用逻辑
 */

class MarkdownViewer {
    constructor() {
        this.config = window.DOC_CONFIG || { files: [], title: '我的文档' };
        this.currentDoc = null;
        this.searchIndex = null;
        this.theme = localStorage.getItem('theme') || 'light';
        
        // 初始化 markdown-it
        this.md = window.markdownit({
            html: true,
            linkify: true,
            typographer: true,
            highlight: (str, lang) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(str, { language: lang }).value;
                    } catch (err) {
                        console.error('代码高亮错误:', err);
                    }
                }
                return '';
            }
        });
        
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        // 设置网站标题
        document.title = this.config.title || 'Markdown 文档查看器';
        document.querySelector('.site-title').textContent = this.config.title || '我的文档';
        
        // 应用主题
        this.applyTheme();
        
        // 渲染导航
        this.renderNav();
        
        // 绑定事件
        this.bindEvents();
        
        // 处理路由
        this.handleRoute();
        
        // 构建搜索索引
        this.buildSearchIndex();
    }

    /**
     * 应用主题
     */
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        
        // 更新代码高亮主题
        const highlightTheme = document.getElementById('highlight-theme');
        if (this.theme === 'dark') {
            highlightTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
        } else {
            highlightTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
        }
    }

    /**
     * 切换主题
     */
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    /**
     * 渲染导航树
     */
    renderNav() {
        const navTree = document.getElementById('navTree');
        navTree.innerHTML = '';
        
        if (!this.config.files || this.config.files.length === 0) {
            navTree.innerHTML = '<div class="loading">暂无文档</div>';
            return;
        }
        
        const tree = this.buildTree(this.config.files);
        navTree.appendChild(this.renderTreeNode(tree));
    }

    /**
     * 构建导航树结构
     */
    buildTree(files) {
        const tree = { children: {} };
        
        files.forEach(file => {
            const parts = file.path.split('/');
            let current = tree;
            
            parts.forEach((part, index) => {
                if (index === parts.length - 1) {
                    // 文件节点
                    if (!current.children) {
                        current.children = {};
                    }
                    current.children[part] = {
                        type: 'file',
                        title: file.title || part.replace(/\.md$/, ''),
                        path: file.path
                    };
                } else {
                    // 文件夹节点
                    if (!current.children) {
                        current.children = {};
                    }
                    if (!current.children[part]) {
                        current.children[part] = {
                            type: 'folder',
                            title: part,
                            children: {}
                        };
                    }
                    current = current.children[part];
                }
            });
        });
        
        return tree;
    }

    /**
     * 渲染树节点
     */
    renderTreeNode(node, level = 0) {
        const container = document.createElement('div');
        
        if (node.children) {
            const sortedKeys = Object.keys(node.children).sort((a, b) => {
                const aNode = node.children[a];
                const bNode = node.children[b];
                // 文件夹优先，然后按名称排序
                if (aNode.type === 'folder' && bNode.type === 'file') return -1;
                if (aNode.type === 'file' && bNode.type === 'folder') return 1;
                return a.localeCompare(b, 'zh-CN');
            });
            
            sortedKeys.forEach(key => {
                const child = node.children[key];
                
                if (child.type === 'folder') {
                    const folder = document.createElement('div');
                    folder.className = 'nav-folder';
                    
                    const toggle = document.createElement('div');
                    toggle.className = 'folder-toggle';
                    toggle.innerHTML = `
                        <span class="folder-icon">▶</span>
                        <span>${child.title}</span>
                    `;
                    
                    const children = document.createElement('div');
                    children.className = 'folder-children';
                    children.appendChild(this.renderTreeNode(child, level + 1));
                    
                    toggle.addEventListener('click', () => {
                        const icon = toggle.querySelector('.folder-icon');
                        icon.classList.toggle('expanded');
                        children.classList.toggle('expanded');
                    });
                    
                    folder.appendChild(toggle);
                    folder.appendChild(children);
                    container.appendChild(folder);
                } else if (child.type === 'file') {
                    const item = document.createElement('div');
                    item.className = 'nav-item';
                    
                    const link = document.createElement('a');
                    link.className = 'nav-link';
                    link.href = `#${child.path}`;
                    link.textContent = `📄 ${child.title}`;
                    link.dataset.path = child.path;
                    
                    item.appendChild(link);
                    container.appendChild(item);
                }
            });
        }
        
        return container;
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 主题切换
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // 菜单切换（移动端）
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });
        
        // 搜索
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.search(e.target.value);
            }, 300);
        });
        
        // 关闭搜索结果
        document.getElementById('closeSearch').addEventListener('click', () => {
            document.getElementById('searchResults').style.display = 'none';
            searchInput.value = '';
        });
        
        // 路由变化
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
        
        // 导航点击
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                // 移动端关闭侧边栏
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('open');
                }
            }
        });
    }

    /**
     * 处理路由
     */
    handleRoute() {
        const hash = window.location.hash.slice(1);
        
        if (hash) {
            this.loadDocument(hash);
        } else {
            // 显示欢迎页面
            this.showWelcome();
        }
    }

    /**
     * 显示欢迎页面
     */
    showWelcome() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="welcome fade-in">
                <h1>欢迎使用 Markdown 文档查看器</h1>
                <p>请从左侧选择一个文档开始阅读</p>
                <div class="features">
                    <div class="feature-item">
                        <h3>📁 文件夹导航</h3>
                        <p>支持多层级文件夹结构组织</p>
                    </div>
                    <div class="feature-item">
                        <h3>🔍 全文搜索</h3>
                        <p>快速查找任何文档内容</p>
                    </div>
                    <div class="feature-item">
                        <h3>🌓 主题切换</h3>
                        <p>明暗主题自由切换</p>
                    </div>
                    <div class="feature-item">
                        <h3>📑 自动目录</h3>
                        <p>文章标题自动生成目录</p>
                    </div>
                    <div class="feature-item">
                        <h3>💻 代码高亮</h3>
                        <p>支持多种编程语言语法高亮</p>
                    </div>
                </div>
            </div>
        `;
        
        // 清空目录
        document.getElementById('tocNav').innerHTML = '<div class="toc-empty">当前文档无目录</div>';
        
        // 更新导航高亮
        this.updateNavHighlight(null);
    }

    /**
     * 加载文档
     */
    async loadDocument(path) {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading">加载中...</div>';
        
        try {
            const response = await fetch(`docs/${path}`);
            if (!response.ok) {
                throw new Error('文档加载失败');
            }
            
            const markdown = await response.text();
            const html = this.md.render(markdown);
            
            content.innerHTML = `<div class="markdown-body fade-in">${html}</div>`;
            
            // 代码高亮
            content.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // 生成目录
            this.generateTOC(content);
            
            // 更新导航高亮
            this.updateNavHighlight(path);
            
            // 滚动到顶部
            content.scrollTop = 0;
            
            this.currentDoc = { path, content: markdown };
        } catch (error) {
            console.error('加载文档失败:', error);
            content.innerHTML = `
                <div class="markdown-body">
                    <h1>❌ 加载失败</h1>
                    <p>无法加载文档：${path}</p>
                    <p>错误信息：${error.message}</p>
                </div>
            `;
        }
    }

    /**
     * 生成文章目录
     */
    generateTOC(content) {
        const tocNav = document.getElementById('tocNav');
        const headings = content.querySelectorAll('h1, h2, h3, h4');
        
        if (headings.length === 0) {
            tocNav.innerHTML = '<div class="toc-empty">当前文档无目录</div>';
            return;
        }
        
        tocNav.innerHTML = '';
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.substring(1));
            const id = `heading-${index}`;
            heading.id = id;
            
            const item = document.createElement('div');
            item.className = 'toc-item';
            
            const link = document.createElement('a');
            link.className = `toc-link level-${level}`;
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // 更新目录高亮
                document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
            
            item.appendChild(link);
            tocNav.appendChild(item);
        });
        
        // 监听滚动，更新目录高亮
        const contentEl = document.getElementById('content');
        contentEl.addEventListener('scroll', () => {
            this.updateTOCHighlight(headings);
        });
    }

    /**
     * 更新目录高亮
     */
    updateTOCHighlight(headings) {
        const contentEl = document.getElementById('content');
        const scrollTop = contentEl.scrollTop;
        
        let activeHeading = null;
        headings.forEach(heading => {
            if (heading.offsetTop - scrollTop < 100) {
                activeHeading = heading;
            }
        });
        
        if (activeHeading) {
            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeHeading.id}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    /**
     * 更新导航高亮
     */
    updateNavHighlight(path) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.path === path) {
                link.classList.add('active');
                
                // 展开父文件夹
                let parent = link.closest('.folder-children');
                while (parent) {
                    parent.classList.add('expanded');
                    const toggle = parent.previousElementSibling;
                    if (toggle && toggle.classList.contains('folder-toggle')) {
                        toggle.querySelector('.folder-icon').classList.add('expanded');
                    }
                    parent = parent.parentElement.closest('.folder-children');
                }
            }
        });
    }

    /**
     * 构建搜索索引
     */
    async buildSearchIndex() {
        const documents = [];
        
        for (const file of this.config.files) {
            try {
                const response = await fetch(`docs/${file.path}`);
                const content = await response.text();
                documents.push({
                    title: file.title,
                    path: file.path,
                    content: content
                });
            } catch (error) {
                console.error(`索引文档失败: ${file.path}`, error);
            }
        }
        
        this.searchIndex = new Fuse(documents, {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'content', weight: 0.6 }
            ],
            threshold: 0.3,
            includeMatches: true,
            minMatchCharLength: 2
        });
    }

    /**
     * 搜索文档
     */
    search(query) {
        const searchResults = document.getElementById('searchResults');
        const searchResultsContent = document.getElementById('searchResultsContent');
        
        if (!query || query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        searchResults.style.display = 'block';
        searchResultsContent.innerHTML = '<div class="loading">搜索中...</div>';
        
        if (!this.searchIndex) {
            searchResultsContent.innerHTML = '<div class="no-results">搜索索引尚未构建完成，请稍候...</div>';
            return;
        }
        
        const results = this.searchIndex.search(query);
        
        if (results.length === 0) {
            searchResultsContent.innerHTML = '<div class="no-results">没有找到相关文档</div>';
            return;
        }
        
        searchResultsContent.innerHTML = '';
        
        results.slice(0, 20).forEach(result => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            
            // 提取匹配片段
            let snippet = '';
            if (result.matches && result.matches.length > 0) {
                const match = result.matches[0];
                const content = result.item.content;
                const matchIndex = match.indices[0][0];
                const start = Math.max(0, matchIndex - 50);
                const end = Math.min(content.length, matchIndex + 100);
                snippet = content.substring(start, end);
                
                // 高亮匹配文本
                snippet = snippet.replace(new RegExp(query, 'gi'), (match) => {
                    return `<span class="search-highlight">${match}</span>`;
                });
                
                if (start > 0) snippet = '...' + snippet;
                if (end < content.length) snippet = snippet + '...';
            }
            
            item.innerHTML = `
                <div class="search-result-title">${result.item.title}</div>
                <div class="search-result-path">${result.item.path}</div>
                <div class="search-result-snippet">${snippet || '无预览'}</div>
            `;
            
            item.addEventListener('click', () => {
                window.location.hash = result.item.path;
                searchResults.style.display = 'none';
                document.getElementById('searchInput').value = '';
            });
            
            searchResultsContent.appendChild(item);
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownViewer();
});

