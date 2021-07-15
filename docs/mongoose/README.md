# Mongoose

Mongoose 中文阅读文档[传送门](http://www.mongoosejs.net/)

## Connections

```bash
mongoose.connect('mongodb://localhost/myapp');
```

你也可以在 uri 中指定多个参数：

```bash
mongoose.connect('mongodb://username:password@host:port/database?options...');
```

或者

```bash
mongoose.connect(uri, options);
```

举例：

```js
const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
};
mongoose.connect(uri, options);
```

### 回调

`connect()`函数接受回调函数，或返回一个 promise。

```js
mongoose.connect(uri, options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
});

// Or using promises
mongoose.connect(uri, options).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
  (err) => {
    /** handle initial connection error */
  }
);
```

## Schemas

Mongoose 的一切始于 Schema，Schema 定义了一个集合中数据的基本格式，每个 schema 都会映射到一个 MongoDB collection ，并定义这个 collection 里的文档的构成。

```js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

### SchemaTypes 类型

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

## Models

`Models` 是从 `Schema` 编译来的构造函数。 它们的实例就代表着可以从数据库保存和读取的 documents。 从数据库创建和读取 document 的所有操作都是通过 model 进行的。

```js
var schema = new mongoose.Schema({ name: "string", size: "string" });
var Tank = mongoose.model("Tank", schema);
```

第一个参数是跟 `model` 对应的集合（ collection ）名字的 单数 形式。 Mongoose 会自动找到名称是 `model` 名字 复数 形式的 `collection` 。 对于上例，Tank 这个 model 就对应数据库中 tanks 这个 collection。`.model()` 这个函数是对 `schema` 做了拷贝（生成了 `model`）。 你要确保在调用 `.model()` 之前把所有需要的东西都加进 `schema` 里了！

## Documents

Mongoose `document` 代表着 MongoDB 文档的一对一映射。 每个 document 都是他的 Model 的实例。
