# @cbortech/uuid

[日本語](./README.ja.md)

TypeScript library and CLI for generating, parsing, and inspecting UUIDs.

This package supports UUID versions 1 through 8 as defined by RFC 9562, with
convenient helpers for UUID v4 and monotonic UUID v7.

## Install

```bash
npm install @cbortech/uuid
```

## Import

```ts
import { UUID } from '@cbortech/uuid';
```

Default import is also supported:

```ts
import UUID from '@cbortech/uuid';
```

CommonJS is supported too:

```js
const { UUID } = require('@cbortech/uuid');
```

## Quick Examples

### Generate UUID v7

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

`UUID.random({ ver: 7 })` generates monotonically increasing UUIDs when called
multiple times within the same millisecond in the same JavaScript runtime.

### Generate UUID v4

```ts
import { UUID } from '@cbortech/uuid';

const uuid = UUID.random();

console.log(uuid.toString());
// 550e8400-e29b-41d4-a716-446655440000
```

### Parse a UUID

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

### Convert to and from bytes

```ts
import { UUID } from '@cbortech/uuid';

const uuid = new UUID('550e8400-e29b-41d4-a716-446655440000');
const bytes = uuid.toBytes();
const copy = new UUID(bytes);

console.log(copy.equals(uuid));
// true
```

### Create special UUID values

```ts
import { UUID } from '@cbortech/uuid';

console.log(UUID.nil().toString());
// 00000000-0000-0000-0000-000000000000

console.log(UUID.max().toString());
// ffffffff-ffff-ffff-ffff-ffffffffffff
```

## Constructor Inputs

`new UUID(input)` accepts:

- UUID strings, with or without braces or hyphens
- `Uint8Array`, `DataView`, `ArrayBuffer`, and other array buffer views
- another `UUID` instance
- UUID option objects for versions 1 through 8
- `undefined` for a random UUID v4
- `null` for the Nil UUID

Examples:

```ts
new UUID('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
new UUID('{295714e9-5955-40b4-b69b-9758989a6c06}');
new UUID(new Uint8Array(16));
new UUID({ ver: 7 });
new UUID(null);
```

The object returned by `uuid.parse()` can be passed back to the constructor for
round-trip operations:

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

`getTime()` is available for time-based UUIDs: v1, v2, v6, and v7. For UUID v2,
the recovered timestamp is coarse because v2 replaces part of the timestamp with
the local identifier.

For detailed field access such as `clock_seq`, `node`, `rand_a`, or `rand_b`,
use `parse()`. It returns a version-specific object.

## CLI

Use `npx` or `npm exec` to run the CLI without a global install:

```bash
npx @cbortech/uuid
npx @cbortech/uuid -v7
npx @cbortech/uuid inspect 017f22e2-79b0-7cc3-98c4-dc0c0c07398f
```

If installed globally, the `uuid` command is available directly:

```bash
npm install -g @cbortech/uuid

uuid
uuid -v7 -n 5
uuid parse 017f22e2-79b0-7cc3-98c4-dc0c0c07398f --json
uuid inspect 017f22e2-79b0-7cc3-98c4-dc0c0c07398f
uuid validate 017f22e2-79b0-7cc3-98c4-dc0c0c07398f
```

Commands:

- `generate` or no command: generate a UUID
- `parse <uuid>`: show UUID fields
- `inspect <uuid>`: show version, variant, and timestamp when available
- `validate <uuid>`: validate a UUID string

Options:

- `-v4`: generate UUID v4, the default
- `-v7`: generate UUID v7
- `-n <count>`: generate multiple UUIDs
- `--json`: output JSON
- `--no-color`: disable color
- `-h, --help`: show help
- `-v, --version`: show version

A bare UUID argument without a subcommand is treated as `parse`.

## Runtime

- Node.js 20 or newer
- Modern browsers with Web Crypto

This library uses `crypto.getRandomValues()` when available. If Web Crypto is
unavailable, it falls back to `Math.random()`, which is not suitable for
security-sensitive UUID generation.

## Public API

The documented public export is:

- `UUID`

The package also exports the related TypeScript types used by the `UUID` API.

## Specifications

- [RFC 9562: Universally Unique IDentifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html)
- [RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace](https://www.rfc-editor.org/rfc/rfc4122)

RFC 4122 is the older UUID specification and is superseded by RFC 9562.

## License

Apache-2.0
