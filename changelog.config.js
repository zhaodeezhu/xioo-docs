module.exports = {
  "disableEmoji": false,
  "list": [
    "test",
    "feat",
    "fix",
    "chore",
    "docs",
    "refactor",
    "style",
    "ci",
    "perf"
  ],
  "maxMessageLength": 64,
  "minMessageLength": 3,
  "questions": [
    "type",
    "scope",
    "subject",
    "body",
    "breaking",
    "issues",
    "lerna"
  ],
  "scopes": [],
  "types": {
    "chore": {
      "description": "跟仓库主要业务无关的构建/工程依赖/工具等功能改动（比如新增一个文档生成工具）",
      "emoji": "🤖",
      "value": "chore"
    },
    "ci": {
      "description": "CI related changes",
      "emoji": "🎡",
      "value": "ci"
    },
    "docs": {
      "description": "更新了文档（比如改了 Readme）",
      "emoji": "✏️",
      "value": "docs"
    },
    "feat": {
      "description": "一个新的特性",
      "emoji": "🚀",
      "value": "feat"
    },
    "fix": {
      "description": "修复bug",
      "emoji": "🐛",
      "value": "fix"
    },
    "perf": {
      "description": "优化了性能的代码改动",
      "emoji": "⚡️",
      "value": "perf"
    },
    "refactor": {
      "description": "一些代码结构上优化，既不是新特性也不是修 Bug（比如函数改个名字）",
      "emoji": "💡",
      "value": "refactor"
    },
    "release": {
      "description": "Create a release commit",
      "emoji": "🏹",
      "value": "release"
    },
    "style": {
      "description": "代码的样式美化，不涉及到功能修改（比如改了缩进）",
      "emoji": "💄",
      "value": "style"
    },
    "test": {
      "description": "新增或者修改已有的测试代码",
      "emoji": "💍",
      "value": "test"
    }
  }
};