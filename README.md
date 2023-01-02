# sports-scu-data

## 简介

四川大学创高体育理论考试试卷数据参考

注意：本数据收集于 **2020-02-17**，实时性已无法保证

## 在线使用

<https://scu-sports-data.vercel.app/>

## 数据

收集原始试卷 8540 张 HTML，提取不重复试卷 1089，不重复题目 3992

科目数 20，判断题 2045，单选题 1787，多选题 160

更多信息见 [master](https://github.com/lisonge/scu-sports-data/tree/master) 分支

## 其他

这是 3 年前的项目, 当时使用 Vue+LeanCloud 部署在 GiteePages

最近在学习 solidjs 索性重构了一下, 大致改动如下

- vue-cli -> vite + unocss
- vue -> solidjs
- LeanCloud -> 一次性请求全部 json 文件 + 本地内存搜索
- GiteePages -> vercel
