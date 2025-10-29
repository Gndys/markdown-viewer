# Markdown 语法指南

这份文档展示了本查看器支持的各种 Markdown 语法。

## 标题

Markdown 支持六级标题，使用 `#` 符号：

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 文本样式

### 强调

- **粗体文本** 使用 `**粗体**` 或 `__粗体__`
- *斜体文本* 使用 `*斜体*` 或 `_斜体_`
- ***粗斜体*** 使用 `***粗斜体***`
- ~~删除线~~ 使用 `~~删除线~~`

### 段落

段落之间用空行分隔。

这是第一段。

这是第二段。

## 列表

### 无序列表

使用 `-`、`*` 或 `+` 创建无序列表：

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

### 有序列表

使用数字加 `.` 创建有序列表：

1. 第一步
2. 第二步
3. 第三步
   1. 子步骤 3.1
   2. 子步骤 3.2

### 任务列表

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个任务

## 链接

- 内联链接：[百度](https://www.baidu.com)
- 引用式链接：[Google][1]
- 自动链接：<https://www.example.com>

[1]: https://www.google.com

## 图片

插入图片的语法：

```markdown
![图片描述](图片地址)
```

示例：
![示例图片](https://via.placeholder.com/600x300?text=示例图片)

## 引用

使用 `>` 创建引用：

> 这是一段引用文本。
> 
> 引用可以包含多个段落。
>
> > 这是嵌套引用。

## 代码

### 行内代码

使用反引号包裹：`const name = "行内代码";`

### 代码块

使用三个反引号创建代码块，并指定语言以启用语法高亮：

#### JavaScript

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome, ${name}`;
}

const message = greet('World');
```

#### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 计算前10个斐波那契数
for i in range(10):
    print(fibonacci(i))
```

#### HTML

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>示例页面</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>这是一个示例页面。</p>
</body>
</html>
```

#### CSS

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.button {
    background-color: #3b82f6;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #2563eb;
}
```

#### Bash

```bash
#!/bin/bash

# 批量重命名文件
for file in *.txt; do
    mv "$file" "${file%.txt}.md"
done

echo "重命名完成！"
```

## 表格

使用 `|` 和 `-` 创建表格：

| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 28 | 工程师 |
| 李四 | 32 | 设计师 |
| 王五 | 25 | 产品经理 |

对齐方式：

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  | 内容2    | 内容3  |
| 长内容 | 短内容   | 中等   |

## 分隔线

使用三个或更多的 `-`、`*` 或 `_` 创建分隔线：

---

***

___

## 嵌套元素

Markdown 支持元素嵌套：

1. **列表中的代码块**
   
   ```javascript
   const nested = true;
   ```

2. **列表中的引用**
   
   > 这是列表项中的引用。

3. **列表中的表格**
   
   | 列1 | 列2 |
   |-----|-----|
   | A   | B   |

## 转义字符

使用反斜杠 `\` 转义特殊字符：

\* 这不是斜体 \*
\# 这不是标题
\[这不是链接\]

## 数学公式（如果启用）

行内公式：$E = mc^2$

块级公式：

$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

## HTML 支持

Markdown 中可以直接使用 HTML：

<div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px;">
    <h3 style="color: #3b82f6;">这是 HTML 内容</h3>
    <p>Markdown 支持嵌入 HTML 标签。</p>
</div>

## 注释

<!-- 这是 HTML 注释，不会在页面上显示 -->

## 最佳实践

### 1. 标题层级

保持标题层级的连续性，不要跳级：

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 2. 列表格式

列表项之间保持一致的缩进（通常是 2 或 4 个空格）。

### 3. 代码块

始终为代码块指定语言，以获得更好的语法高亮。

### 4. 链接和图片

- 使用有意义的链接文本
- 为图片添加描述性的 alt 文本

### 5. 文件组织

- 使用清晰的文件名
- 用文件夹组织相关文档
- 在文档开头添加简要说明

## 总结

Markdown 是一种简单而强大的标记语言，非常适合编写文档。通过本查看器，您可以充分利用 Markdown 的各种特性，创建美观、易读的文档。

尝试使用不同的语法，找到最适合您的写作风格！

