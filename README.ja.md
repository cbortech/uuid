# @cbortech/uuid

UUIDの生成、解析、確認を行うためのTypeScriptライブラリです。

RFC 9562で定義されているUUIDバージョン1から8に対応しています。UUID v4と、
単調増加するUUID v7を簡単に扱うためのヘルパーも提供します。

## インストール

```bash
npm install @cbortech/uuid
```

## インポート

```ts
import { UUID } from '@cbortech/uuid';
```

default importも利用できます。

```ts
import UUID from '@cbortech/uuid';
```

CommonJSにも対応しています。

```js
const { UUID } = require('@cbortech/uuid');
```

## クイック例

### UUID v7を生成する

```ts
import { UUID } from '@cbortech/uuid';

const uuid = UUID.random({ ver: 7 });

console.log(uuid.toString());
// 019ca305-7aa2-7d6b-8b95-fbcbf17e1d66

console.log(uuid.getVersion());
// 7

console.log(new Date(uuid.getTime()).toISOString());
// 2026-02-28T06:52:51.234Z
```

`UUID.random({ ver: 7 })` は、同じJavaScriptランタイム内で同一ミリ秒に複数回
呼び出された場合でも、単調増加するUUIDを生成します。

### UUID v4を生成する

```ts
import { UUID } from '@cbortech/uuid';

const uuid = UUID.random();

console.log(uuid.toString());
// 550e8400-e29b-41d4-a716-446655440000
```

### UUIDを解析する

```ts
import { UUID } from '@cbortech/uuid';

const uuid = new UUID('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
const parsed = uuid.parse();

console.log(parsed);
// {
//   ver: 7,
//   unix_ts_ms: 1645557742000,
//   rand_a: 3267,
//   var: 'RFC4122',
//   rand_b: 0x18c4dc0c0c07398fn
// }
```

### バイト列との相互変換

```ts
import { UUID } from '@cbortech/uuid';

const uuid = new UUID('550e8400-e29b-41d4-a716-446655440000');
const bytes = uuid.toBytes();
const copy = new UUID(bytes);

console.log(copy.equals(uuid));
// true
```

### 特別なUUID値を作る

```ts
import { UUID } from '@cbortech/uuid';

console.log(UUID.nil().toString());
// 00000000-0000-0000-0000-000000000000

console.log(UUID.max().toString());
// ffffffff-ffff-ffff-ffff-ffffffffffff
```

## コンストラクタの入力

`new UUID(input)` は以下を受け取れます。

- UUID文字列。波括弧やハイフンの有無は問いません
- `Uint8Array`、`DataView`、`ArrayBuffer`、その他のArrayBufferビュー
- 別の `UUID` インスタンス
- バージョン1から8までのUUIDオプションオブジェクト
- `undefined`: ランダムなUUID v4を生成
- `null`: Nil UUIDを生成

例:

```ts
new UUID('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
new UUID('{295714e9-5955-40b4-b69b-9758989a6c06}');
new UUID(new Uint8Array(16));
new UUID({ ver: 7 });
new UUID(null);
```

`uuid.parse()` が返すオブジェクトは、そのままコンストラクタに渡せます。
ラウンドトリップ処理に利用できます。

```ts
const uuid = new UUID('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
const copy = new UUID(uuid.parse());

console.log(copy.equals(uuid));
// true
```

## API

```ts
uuid.getVersion(): number
uuid.getVariant(): 'NCS' | 'RFC4122' | 'Microsoft' | 'Reserved'
uuid.getTime(): number
uuid.toString(): string
uuid.toBytes(): Uint8Array
uuid.toJSON(): string
uuid.parse(): ParsedUUID
uuid.equals(other: UUID): boolean
uuid.isNil(): boolean
uuid.isMax(): boolean

UUID.nil(): UUID
UUID.max(): UUID
UUID.random(options?: { ver?: 4 | 7 }): UUID
```

`getTime()` は、時刻ベースのUUIDで利用できます。対象はv1、v2、v6、v7です。
UUID v2ではタイムスタンプの一部がローカル識別子で置き換えられるため、復元される
時刻は粗い値になります。

`clock_seq`、`node`、`rand_a`、`rand_b` などの詳細なフィールドにアクセスしたい
場合は `parse()` を使ってください。バージョンごとのオブジェクトを返します。

## CLI

このパッケージをベースにしたコマンドラインツールを
[@cbortech/uuid-cli](https://www.npmjs.com/package/@cbortech/uuid-cli) として公開しています。

## 実行環境

- Node.js 20以上
- Web Cryptoを利用できるモダンブラウザ

このライブラリは、利用可能な場合は `crypto.getRandomValues()` を使います。
Web Cryptoが利用できない場合は `Math.random()` にフォールバックしますが、
セキュリティ上重要なUUID生成には適していません。

## Public API

ドキュメント化されている公開exportは以下です。

- `UUID`

このパッケージは、`UUID` APIで利用する関連TypeScript型もexportします。

## 仕様

- [RFC 9562: Universally Unique IDentifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html)
- [RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace](https://www.rfc-editor.org/rfc/rfc4122)

RFC 4122は古いUUID仕様であり、RFC 9562によって置き換えられています。

## ライセンス

Apache-2.0
