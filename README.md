# DNARankings-frontend

## 组件
使用 `papaparse` 来解析csv文件。尝试过 `react-table` 、 `Material-UI` 来展示表格。

## 文件/组件结构
一种（之前的形式）是只有一个 `CSVTable.js` 构成的组件，直接在 `App.js` 中使用 `CSVTable` 即可。在当前commit下，`CSVTable.js`是用 `Material-UI` 来展示表格（带有边框），另外几个 `CSVTable-*.js` 分别表示对应组件来简单展示表格，以及在最普通的表格上进行的改进（例如排序）

另一种（目前）是有 `CSVReader` 和 `Table` 两个组件，在 `App.js` 中使用 `CSVReader`。在 `CSVReader.js` 中先使用 `papaparse` 解析csv文件，然后使用 `Table` 组件展示表格。`Table.js` 中目前使用的是 `react-table`，支持简单的排序，样式在 `Table.css` 中。之后应该是要换成其他更加美观、功能更加丰富的组件来展示（例如Antd？）