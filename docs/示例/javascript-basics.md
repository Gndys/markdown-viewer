# JavaScript 基础教程

本文档演示代码高亮功能，同时提供一些 JavaScript 基础知识。

## 变量和数据类型

### 变量声明

JavaScript 有三种变量声明方式：

```javascript
// var - 函数作用域（不推荐）
var oldWay = "旧方式";

// let - 块级作用域（推荐）
let modernWay = "现代方式";

// const - 常量（推荐）
const CONSTANT = "不可变";
```

### 数据类型

```javascript
// 基本类型
const number = 42;              // 数字
const string = "Hello";         // 字符串
const boolean = true;           // 布尔值
const nullValue = null;         // null
const undefinedValue = undefined; // undefined
const symbol = Symbol('id');    // Symbol
const bigInt = 123n;           // BigInt

// 引用类型
const object = { key: "value" };
const array = [1, 2, 3];
const func = function() {};
```

## 函数

### 函数声明

```javascript
// 传统函数声明
function greet(name) {
    return `Hello, ${name}!`;
}

// 函数表达式
const sayHi = function(name) {
    return `Hi, ${name}!`;
};

// 箭头函数（ES6+）
const welcome = (name) => `Welcome, ${name}!`;

// 使用函数
console.log(greet("张三"));      // Hello, 张三!
console.log(sayHi("李四"));      // Hi, 李四!
console.log(welcome("王五"));    // Welcome, 王五!
```

### 默认参数

```javascript
function multiply(a, b = 1) {
    return a * b;
}

console.log(multiply(5, 2));  // 10
console.log(multiply(5));     // 5
```

### 剩余参数

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15
```

## 对象

### 对象字面量

```javascript
const person = {
    name: "张三",
    age: 28,
    city: "北京",
    
    // 方法
    greet() {
        return `我是${this.name}，来自${this.city}`;
    },
    
    // Getter
    get info() {
        return `${this.name}, ${this.age}岁`;
    },
    
    // Setter
    set birthday(year) {
        this.age = new Date().getFullYear() - year;
    }
};

console.log(person.greet());  // 我是张三，来自北京
console.log(person.info);     // 张三, 28岁
```

### 解构赋值

```javascript
// 对象解构
const { name, age, city } = person;
console.log(name);  // 张三

// 数组解构
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first);  // red
```

## 数组方法

### 常用数组方法

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - 映射
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter - 过滤
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log(evenNumbers);  // [2, 4]

// reduce - 归约
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum);  // 15

// find - 查找
const found = numbers.find(n => n > 3);
console.log(found);  // 4

// some - 是否存在
const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven);  // true

// every - 是否全部满足
const allPositive = numbers.every(n => n > 0);
console.log(allPositive);  // true
```

### 数组操作

```javascript
const fruits = ["apple", "banana", "orange"];

// 添加元素
fruits.push("grape");        // 末尾添加
fruits.unshift("mango");     // 开头添加

// 删除元素
fruits.pop();                // 删除末尾
fruits.shift();              // 删除开头

// 切片
const sliced = fruits.slice(1, 3);

// 拼接
const moreFruits = ["watermelon", "pear"];
const allFruits = fruits.concat(moreFruits);

// 扩展运算符
const combined = [...fruits, ...moreFruits];
```

## 异步编程

### Promise

```javascript
// 创建 Promise
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: "成功获取数据" });
            } else {
                reject(new Error("URL 不能为空"));
            }
        }, 1000);
    });
}

// 使用 Promise
fetchData("https://api.example.com")
    .then(result => {
        console.log(result.data);
        return "处理完成";
    })
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error(error.message);
    })
    .finally(() => {
        console.log("清理工作");
    });
```

### Async/Await

```javascript
// 异步函数
async function getData() {
    try {
        const result = await fetchData("https://api.example.com");
        console.log(result.data);
        return result;
    } catch (error) {
        console.error("错误:", error.message);
    } finally {
        console.log("完成");
    }
}

// 调用异步函数
getData();
```

### 并行请求

```javascript
async function fetchMultiple() {
    try {
        // 并行执行
        const [user, posts, comments] = await Promise.all([
            fetchData("/api/user"),
            fetchData("/api/posts"),
            fetchData("/api/comments")
        ]);
        
        return { user, posts, comments };
    } catch (error) {
        console.error("获取数据失败:", error);
    }
}
```

## ES6+ 特性

### 模板字符串

```javascript
const name = "张三";
const age = 28;

// 模板字符串
const message = `我叫${name}，今年${age}岁`;

// 多行字符串
const multiline = `
    这是第一行
    这是第二行
    这是第三行
`;
```

### 类

```javascript
// 定义类
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} 发出声音`);
    }
}

// 继承
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    speak() {
        console.log(`${this.name} 汪汪叫`);
    }
    
    fetch() {
        console.log(`${this.name} 去捡球`);
    }
}

// 使用类
const dog = new Dog("旺财", "金毛");
dog.speak();   // 旺财 汪汪叫
dog.fetch();   // 旺财 去捡球
```

### 模块

```javascript
// 导出（export）
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export default class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

// 导入（import）
import Calculator, { PI, add } from './calculator.js';

const calc = new Calculator();
console.log(calc.multiply(5, 3));  // 15
console.log(add(2, 3));            // 5
console.log(PI);                   // 3.14159
```

## DOM 操作

### 选择元素

```javascript
// 通过 ID
const element = document.getElementById('myId');

// 通过类名
const elements = document.getElementsByClassName('myClass');

// 通过标签名
const divs = document.getElementsByTagName('div');

// 查询选择器（推荐）
const item = document.querySelector('.item');
const items = document.querySelectorAll('.item');
```

### 修改内容

```javascript
// 修改文本内容
element.textContent = "新文本";

// 修改 HTML
element.innerHTML = "<strong>加粗文本</strong>";

// 修改样式
element.style.color = "blue";
element.style.fontSize = "20px";

// 添加/删除类
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('highlight');
```

### 事件处理

```javascript
// 添加事件监听器
const button = document.querySelector('button');

button.addEventListener('click', (event) => {
    console.log('按钮被点击了');
    event.preventDefault();  // 阻止默认行为
});

// 事件委托
document.querySelector('.list').addEventListener('click', (event) => {
    if (event.target.matches('.item')) {
        console.log('列表项被点击');
    }
});
```

## 错误处理

### Try-Catch

```javascript
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("除数不能为零");
        }
        return a / b;
    } catch (error) {
        console.error("错误:", error.message);
        return null;
    } finally {
        console.log("执行清理操作");
    }
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // null
```

### 自定义错误

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateAge(age) {
    if (age < 0) {
        throw new ValidationError("年龄不能为负数");
    }
    if (age > 150) {
        throw new ValidationError("年龄过大");
    }
    return true;
}

try {
    validateAge(-5);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error("验证错误:", error.message);
    } else {
        console.error("未知错误:", error);
    }
}
```

## 总结

这份文档展示了 JavaScript 的核心概念和语法。通过代码高亮功能，代码更加清晰易读。

### 学习建议

1. **实践为主**: 动手编写代码是最好的学习方式
2. **理解原理**: 不要只记忆语法，要理解背后的原理
3. **阅读文档**: MDN 是最好的 JavaScript 参考资料
4. **持续学习**: JavaScript 不断发展，保持学习新特性

### 参考资源

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [ES6 Features](http://es6-features.org/)

祝学习愉快！🚀

