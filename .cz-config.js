module.exports = {
  // 可选类型
  types: [
    { value: "feat", name: "feat: 新功能" },
    { value: "fix", name: "fix: 修复" },
    { value: "docs", name: "docs: 文档更新" },
    {
      value: "style",
      name: "style: 不影响代码含义的更改(空白、格式化、缺少分号等)",
    },
    {
      value: "refactor",
      name: "refactor: 重构(既不修复错误bug也不增加功能的代码更改)",
    },
    { value: "perf", name: "perf: 改进性能的代码更改" },
    { value: "test", name: "test: 增加测试" },
    { value: "chore", name: "chore: 构建过程或辅助工具的变动" },
    { value: "revert", name: "revert: 回退" },
    { value: "build", name: "build: 打包" },
  ],

  // 定义你的作用域列表(省略此字段，则作用域将是可选的)
  scopes: [  
    // 你可以列出项目中的模块、组件或其他分类作为作用域选项。  
    'docs',  
    // 或者使用通配符来允许自定义作用域  
    '*'  
  ],  

  // 消息步骤
  messages: {
    type: "请选择提交类型:",
    scope: "请输入修改范围(可选):",
    subject: "请简要描述提交(必填):",
    body: "请输入详细描述(可选):",
    footer: "请输入要关闭的issue(可选):",
    confirmCommit: "确认使用以上信息提交？(y/n/e/h)",
  },

  // 跳过步骤
  skipQuestions: ["body", "footer"],

  // subject文字长度默认是72
  subjectLimit: 72,
};
