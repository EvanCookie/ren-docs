module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: '✨ feat: 新功能' },
    { value: 'fix', name: '🐛 fix: 修复' },
    { value: 'docs', name: '📚 docs: 仅文档更新' },
    { value: 'style', name: '🎨 style: 格式（不影响代码运行）' },
    {
      value: 'refactor',
      name: '🔨 refactor: 代码重构（既不是修复也不是新功能）'
    },
    { value: 'perf', name: '⚡ perf: 性能改进' },
    { value: 'test', name: '✅ test: 增加测试' },
    { value: 'chore', name: '🧹 chore: 构建过程或辅助工具的变动' },
    { value: 'revert', name: '↩️ revert: 回退' },
    { value: 'build', name: '📦 build: 打包' }
  ],

  // 作用域列表 (保留选项和自定义输入)
  scopes: ['docs', '*'],

  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    scope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },

  // 跳过步骤
  skipQuestions: ['body', 'footer'],

  // subject 限制长度
  subjectLimit: 72
}
