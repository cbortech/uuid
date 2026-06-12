import { bench, describe } from 'vitest';
import { UUID } from './index';

const CANONICAL = '017f22e2-79b0-7cc3-98c4-dc0c0c07398f';
const BRACED = '{017f22e2-79b0-7cc3-98c4-dc0c0c07398f}';
const NO_DASHES = '017f22e279b07cc398c4dc0c0c07398f';
const FIXED_BYTES = new UUID(CANONICAL).toBytes();
const FIXED_NODE = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);

describe('generate', () => {
  bench('new UUID() (v4)', () => {
    new UUID();
  });

  bench('UUID.random() (v4)', () => {
    UUID.random();
  });

  bench('UUID.random({ ver: 7 })', () => {
    UUID.random({ ver: 7 });
  });

  bench('new UUID({ ver: 7, unix_ts_ms }) (fixed timestamp)', () => {
    new UUID({ ver: 7, unix_ts_ms: 1645557742000 });
  });

  bench('new UUID({ ver: 1, node })', () => {
    new UUID({ ver: 1, node: FIXED_NODE });
  });
});

describe('generate + toString', () => {
  bench('UUID.random().toString() (v4)', () => {
    UUID.random().toString();
  });

  bench('UUID.random({ ver: 7 }).toString()', () => {
    UUID.random({ ver: 7 }).toString();
  });
});

describe('parse', () => {
  bench('new UUID(canonical string)', () => {
    new UUID(CANONICAL);
  });

  bench('new UUID(braced string)', () => {
    new UUID(BRACED);
  });

  bench('new UUID(hex string without dashes)', () => {
    new UUID(NO_DASHES);
  });

  bench('new UUID(Uint8Array)', () => {
    new UUID(FIXED_BYTES);
  });
});

describe('methods', () => {
  const fixed = new UUID(CANONICAL);
  const same = new UUID(CANONICAL);
  const v7 = new UUID({ ver: 7, unix_ts_ms: 1645557742000 });

  bench('new UUID(bytes).toString()', () => {
    new UUID(FIXED_BYTES).toString();
  });

  bench('toString() (same instance)', () => {
    fixed.toString();
  });

  bench('parse()', () => {
    fixed.parse();
  });

  bench('getTime() (v7)', () => {
    v7.getTime();
  });

  bench('equals()', () => {
    fixed.equals(same);
  });
});

describe('native baseline', () => {
  bench('crypto.randomUUID()', () => {
    crypto.randomUUID();
  });

  const nodeCrypto =
    typeof process !== 'undefined' && process.getBuiltinModule
      ? (process.getBuiltinModule('node:crypto') as {
          randomUUIDv7?: () => string;
        })
      : undefined;
  const randomUUIDv7 = nodeCrypto?.randomUUIDv7;
  if (randomUUIDv7) {
    bench('crypto.randomUUIDv7()', () => {
      randomUUIDv7();
    });
  }
});
