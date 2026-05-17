import { test, expect, describe } from 'vitest';
import {
  UUID,
  type UUIDv1Parsed,
  type UUIDv2Parsed,
  type UUIDv3Parsed,
  type UUIDv4Parsed,
  type UUIDv5Parsed,
  type UUIDv6Parsed,
  type UUIDv7Parsed,
  type UUIDv8Parsed,
  type NilUUIDParsed,
  type MaxUUIDParsed,
} from './index';

// Only import crypto in Node.js environment
let createHash: typeof import('node:crypto').createHash;
try {
  createHash = require('node:crypto').createHash;
} catch {
  // Browser environment - createHash will be undefined
  createHash = undefined as any;
}

// =============================================================================
// RFC 9562 Appendix A Examples
// =============================================================================

describe('RFC 9562 Appendix A Examples', () => {
  // UUIDv1 Example from RFC 9562 Appendix A.1
  // Tuesday, February 22, 2022 2:22:22 PM GMT-05:00 = 2022-02-22T19:22:22.000Z
  test('should generate UUIDv1 matching RFC 9562 example', () => {
    const uuid = new UUID({
      ver: 1,
      time_low: 0xc232ab00,
      time_mid: 0x9414,
      time_high: 0x1ec,
      clock_seq: 0x33c8,
      node: 0x9f6bdeced846n,
    });

    expect(uuid.toString()).toBe('c232ab00-9414-11ec-b3c8-9f6bdeced846');
    expect(uuid.getVersion()).toBe(1);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv1Parsed;
    expect(parsed.time_low).toBe(0xc232ab00);
    expect(parsed.time_mid).toBe(0x9414);
    expect(parsed.time_high).toBe(0x1ec);
    expect(parsed.clock_seq).toBe(0x33c8);
    expect(parsed.node).toBe(0x9f6bdeced846);

    // Verify timestamp: Tuesday, February 22, 2022 2:22:22 PM GMT-05:00
    // = 2022-02-22T19:22:22.000Z = 1645557742000 ms
    expect(uuid.getTime()).toBe(1645557742000);
  });

  // UUIDv3 Example from RFC 9562 Appendix A.2
  // Namespace: DNS (6ba7b810-9dad-11d1-80b4-00c04fd430c8)
  // Name: www.example.com
  // MD5: 5df418813aed051548a72f4a814cf09e
  test('should generate UUIDv3 matching RFC 9562 example (from hash)', () => {
    // Pre-computed MD5 hash from RFC 9562
    const hash = new Uint8Array([
      0x5d, 0xf4, 0x18, 0x81, 0x3a, 0xed, 0x05, 0x15, 0x48, 0xa7, 0x2f, 0x4a,
      0x81, 0x4c, 0xf0, 0x9e,
    ]);

    const uuid = new UUID({ ver: 3, hash });

    expect(uuid.toString()).toBe('5df41881-3aed-3515-88a7-2f4a814cf09e');
    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv3Parsed;
    expect(parsed.md5_high).toBe(0x5df418813aed);
    expect(parsed.md5_mid).toBe(0x515);
  });

  // UUIDv3 with actual MD5 computation (only runs if crypto is available)
  test.runIf(typeof createHash === 'function')(
    'should generate UUIDv3 with computed MD5 matching RFC 9562 example',
    () => {
      // DNS namespace UUID
      const namespaceUuid = new UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
      const name = 'www.example.com';

      // Concatenate namespace bytes + name bytes
      const namespaceBytes = namespaceUuid.toBytes();
      const nameBytes = new TextEncoder().encode(name);
      const data = new Uint8Array(namespaceBytes.length + nameBytes.length);
      data.set(namespaceBytes);
      data.set(nameBytes, namespaceBytes.length);

      // Compute MD5
      const hash = createHash('md5').update(data).digest();
      expect(hash).toBeDefined();

      const uuid = new UUID({ ver: 3, hash: hash! });

      expect(uuid.toString()).toBe('5df41881-3aed-3515-88a7-2f4a814cf09e');
    }
  );

  // UUIDv5 Example from RFC 9562 Appendix A.3
  // Namespace: DNS (6ba7b810-9dad-11d1-80b4-00c04fd430c8)
  // Name: www.example.com
  // SHA1: 2ed6657de927468b55e12665a8aea6a22dee3e35
  test('should generate UUIDv5 matching RFC 9562 example (from hash)', () => {
    // Pre-computed SHA-1 hash from RFC 9562 (first 16 bytes)
    const hash = new Uint8Array([
      0x2e, 0xd6, 0x65, 0x7d, 0xe9, 0x27, 0x56, 0x8b, 0x95, 0xe1, 0x26, 0x65,
      0xa8, 0xae, 0xa6, 0xa2, 0x2d, 0xee, 0x3e, 0x35,
    ]);

    const uuid = new UUID({ ver: 5, hash });

    expect(uuid.toString()).toBe('2ed6657d-e927-568b-95e1-2665a8aea6a2');
    expect(uuid.getVersion()).toBe(5);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  // UUIDv5 with actual SHA-1 computation (only runs if crypto is available)
  test.runIf(typeof crypto !== 'undefined')(
    'should generate UUIDv5 with computed SHA1 matching RFC 9562 example',
    async () => {
      // DNS namespace UUID
      const namespaceUuid = new UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
      const name = 'www.example.com';

      // Concatenate namespace bytes + name bytes
      const namespaceBytes = namespaceUuid.toBytes();
      const nameBytes = new TextEncoder().encode(name);
      const data = new Uint8Array(namespaceBytes.length + nameBytes.length);
      data.set(namespaceBytes);
      data.set(nameBytes, namespaceBytes.length);

      // Compute SHA-1
      const hash = await crypto.subtle.digest('SHA-1', data);
      expect(hash).toBeDefined();

      const uuid = new UUID({ ver: 5, hash: hash! });

      expect(uuid.toString()).toBe('2ed6657d-e927-568b-95e1-2665a8aea6a2');
    }
  );

  // UUIDv6 Example from RFC 9562 Appendix A.4
  // Same timestamp as v1 example: Tuesday, February 22, 2022 2:22:22 PM GMT-05:00
  test('should generate UUIDv6 matching RFC 9562 example', () => {
    const uuid = new UUID({
      ver: 6,
      time_high: 0x1ec9414c,
      time_mid: 0x232a,
      time_low: 0xb00,
      clock_seq: 0x33c8,
      node: 0x9f6bdeced846n,
    });

    expect(uuid.toString()).toBe('1ec9414c-232a-6b00-b3c8-9f6bdeced846');
    expect(uuid.getVersion()).toBe(6);
    expect(uuid.getVariant()).toBe('RFC4122');

    // Same timestamp as v1 example
    expect(uuid.getTime()).toBe(1645557742000);
  });

  // UUIDv7 Example from RFC 9562 Appendix A.5
  // Tuesday, February 22, 2022 2:22:22.00 PM GMT-05:00 = 1645557742000 ms
  test('should generate UUIDv7 matching RFC 9562 example', () => {
    const uuid = new UUID({
      ver: 7,
      unix_ts_ms: 0x017f22e279b0, // 1645557742000
      rand_a: 0xcc3,
      rand_b: 0x18c4dc0c0c07398fn,
    });

    expect(uuid.toString()).toBe('017f22e2-79b0-7cc3-98c4-dc0c0c07398f');
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('RFC4122');
    expect(uuid.getTime()).toBe(1645557742000);
  });

  // UUIDv8 Example from RFC 9562 Appendix B.2
  // Namespace: DNS (6ba7b810-9dad-11d1-80b4-00c04fd430c8)
  // Name: www.example.com
  // SHA-256: 5c146b143c524afd938a375d0df1fbf6fe12a66b645f72f6158759387e51f3c8
  test('should generate UUIDv8 matching RFC 9562 example (from hash)', () => {
    // Pre-computed SHA-1 hash from RFC 9562 (first 16 bytes)
    const hash = new Uint8Array([
      0x5c, 0x14, 0x6b, 0x14, 0x3c, 0x52, 0x4a, 0xfd, 0x93, 0x8a, 0x37, 0x5d,
      0x0d, 0xf1, 0xfb, 0xf6, 0xfe, 0x12, 0xa6, 0x6b, 0x64, 0x5f, 0x72, 0xf6,
      0x15, 0x87, 0x59, 0x38, 0x7e, 0x51, 0xf3, 0xc8,
    ]);

    const uuid = new UUID({ ver: 8, custom: hash });

    expect(uuid.toString()).toBe('5c146b14-3c52-8afd-938a-375d0df1fbf6');
    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  // UUIDv8 with actual SHA-256 computation (only runs if crypto is available)
  test.runIf(typeof crypto !== 'undefined')(
    'should generate UUIDv8 with computed SHA-256 matching RFC 9562 example',
    async () => {
      // DNS namespace UUID
      const namespaceUuid = new UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
      const name = 'www.example.com';

      // Concatenate namespace bytes + name bytes
      const namespaceBytes = namespaceUuid.toBytes();
      const nameBytes = new TextEncoder().encode(name);
      const data = new Uint8Array(namespaceBytes.length + nameBytes.length);
      data.set(namespaceBytes);
      data.set(nameBytes, namespaceBytes.length);

      // Compute SHA-256
      const hash = await crypto.subtle.digest('SHA-256', data);
      expect(hash).toBeDefined();

      const uuid = new UUID({ ver: 8, custom: hash! });

      expect(uuid.toString()).toBe('5c146b14-3c52-8afd-938a-375d0df1fbf6');
    }
  );
});

// =============================================================================
// Constructor Edge Cases
// =============================================================================

describe('Constructor Edge Cases', () => {
  test('should generate UUID v4 by default when no input', () => {
    const uuid = new UUID();
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should create Nil UUID when input is null', () => {
    const uuid = new UUID(null);
    expect(uuid.isNil()).toBe(true);
    expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000');
  });

  test('should throw on invalid input type', () => {
    expect(() => new UUID(123 as never)).toThrow('Invalid UUID input');
    expect(() => new UUID({} as never)).toThrow('Invalid UUID input');
    expect(() => new UUID([] as never)).toThrow('Invalid UUID input');
  });
});

// =============================================================================
// Parsing Tests
// =============================================================================

describe('UUID Parsing', () => {
  test('should parse UUID v4 string', () => {
    const uuid = new UUID('550e8400-e29b-41d4-a716-446655440000');
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('RFC4122');
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse UUID v7 string', () => {
    const uuid = new UUID('018d3f52-87e0-7000-8000-0123456789ab');
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('RFC4122');
    expect(uuid.toString()).toBe('018d3f52-87e0-7000-8000-0123456789ab');
  });

  test('should parse UUID with braces (GUID format)', () => {
    const uuid = new UUID('{550e8400-e29b-41d4-a716-446655440000}');
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse UUID with leading/trailing whitespace', () => {
    const uuid = new UUID('  550e8400-e29b-41d4-a716-446655440000  ');
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse UUID with parentheses', () => {
    const uuid = new UUID('(550e8400-e29b-41d4-a716-446655440000)');
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse UUID without hyphens', () => {
    const uuid = new UUID('550e8400e29b41d4a716446655440000');
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse uppercase UUID', () => {
    const uuid = new UUID('550E8400-E29B-41D4-A716-446655440000');
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should throw on invalid UUID string', () => {
    expect(() => new UUID('invalid-uuid')).toThrow('Invalid UUID string');
    expect(() => new UUID('550e8400-e29b-41d4-a716')).toThrow(
      'Invalid UUID string'
    );
  });

  test('should parse from Uint8Array', () => {
    const bytes = new Uint8Array([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66,
      0x55, 0x44, 0x00, 0x00,
    ]);
    const uuid = new UUID(bytes);
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should copy from existing UUID', () => {
    const original = new UUID('550e8400-e29b-41d4-a716-446655440000');
    const copy = new UUID(original);
    expect(copy.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(copy.equals(original)).toBe(true);
    // Ensure it's a copy, not the same reference
    expect(copy).not.toBe(original);
    expect(copy.toBytes()).not.toBe(original.toBytes());
  });

  test('should throw on invalid byte array length', () => {
    expect(() => new UUID(new Uint8Array(15))).toThrow(
      'UUID bytes must be exactly 16 bytes'
    );
  });

  test('should parse from ArrayBuffer', () => {
    const buffer = new ArrayBuffer(16);
    const view = new Uint8Array(buffer);
    view.set([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66,
      0x55, 0x44, 0x00, 0x00,
    ]);
    const uuid = new UUID(buffer);
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse from DataView', () => {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    // Set bytes manually
    [
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66,
      0x55, 0x44, 0x00, 0x00,
    ].forEach((b, i) => view.setUint8(i, b));
    const uuid = new UUID(view);
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('should parse from offset ArrayBufferView', () => {
    // Create a larger buffer with UUID data at offset
    const buffer = new ArrayBuffer(32);
    const fullView = new Uint8Array(buffer);
    fullView.set(
      [
        0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66,
        0x55, 0x44, 0x00, 0x00,
      ],
      8
    ); // Start at offset 8

    // Create a view that points to the UUID data
    const uuidView = new Uint8Array(buffer, 8, 16);
    const uuid = new UUID(uuidView);
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.toString()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });
});

// =============================================================================
// Nil and Max UUID Tests
// =============================================================================

describe('Nil and Max UUIDs', () => {
  test('should identify Nil UUID', () => {
    const nil = new UUID('00000000-0000-0000-0000-000000000000');
    expect(nil.isNil()).toBe(true);
    expect(nil.isMax()).toBe(false);
    expect(nil.getVersion()).toBe(0);
  });

  test('should identify Max UUID', () => {
    const max = new UUID('ffffffff-ffff-ffff-ffff-ffffffffffff');
    expect(max.isMax()).toBe(true);
    expect(max.isNil()).toBe(false);
    expect(max.getVersion()).toBe(15);
  });

  test('should create Nil UUID via static method', () => {
    const nil = UUID.nil();
    expect(nil.isNil()).toBe(true);
    expect(nil.toString()).toBe('00000000-0000-0000-0000-000000000000');
  });

  test('should create Max UUID via static method', () => {
    const max = UUID.max();
    expect(max.isMax()).toBe(true);
    expect(max.toString()).toBe('ffffffff-ffff-ffff-ffff-ffffffffffff');
  });

  test('should parse Nil UUID structure', () => {
    const nil = UUID.nil();
    const parsed = nil.parse() as NilUUIDParsed;
    expect(parsed.ver).toBe(0);
    expect(parsed.nil).toBe(true);
  });

  test('should parse Max UUID structure', () => {
    const max = UUID.max();
    const parsed = max.parse() as MaxUUIDParsed;
    expect(parsed.ver).toBe(15);
    expect(parsed.max).toBe(true);
  });
});

// =============================================================================
// UUID v4 Tests
// =============================================================================

describe('UUID v4', () => {
  test('should generate UUID v4', () => {
    const uuid = new UUID({ ver: 4 });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v4 with custom random', () => {
    const random = new Uint8Array(16).fill(0x42);
    const uuid = new UUID({ ver: 4, random });
    expect(uuid.getVersion()).toBe(4);
    // Version bits should be set to 4
    expect((uuid.toBytes()[6] >> 4) & 0x0f).toBe(4);
    // Variant bits should be RFC4122
    expect((uuid.toBytes()[8] >> 6) & 0x03).toBe(2);
  });

  test('should parse UUID v4 structure', () => {
    const uuid = new UUID('550e8400-e29b-41d4-a716-446655440000');
    const parsed = uuid.parse() as UUIDv4Parsed;
    expect(parsed.ver).toBe(4);
    expect(typeof parsed.random_a).toBe('number');
    expect(typeof parsed.random_b).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.random_c).toBe('bigint');
  });
});

// =============================================================================
// UUID v7 Tests
// =============================================================================

describe('UUID v7', () => {
  test('should generate UUID v7 with current timestamp', () => {
    const before = Date.now();
    const uuid = new UUID({ ver: 7 });
    const after = Date.now();

    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('RFC4122');
    expect(uuid.getTime()).toBeGreaterThanOrEqual(before);
    expect(uuid.getTime()).toBeLessThanOrEqual(after);
  });

  test('should generate UUID v7 with specific timestamp', () => {
    const timestamp = 1706198400000; // 2024-01-25T12:00:00.000Z
    const uuid = new UUID({ ver: 7, unix_ts_ms: timestamp });

    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getTime()).toBe(timestamp);
  });

  test('should parse UUID v7 structure', () => {
    const uuid = new UUID('018d3f52-87e0-7000-8000-0123456789ab');
    const parsed = uuid.parse() as UUIDv7Parsed;

    expect(parsed.ver).toBe(7);
    expect(typeof parsed.unix_ts_ms).toBe('number');
    expect(typeof parsed.rand_a).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.rand_b).toBe('bigint');
  });

  test('should extract timestamp from UUID v7', () => {
    // Known UUID v7 with specific timestamp
    const timestamp = 1706198400000;
    const uuid = new UUID({
      ver: 7,
      unix_ts_ms: timestamp,
      rand_a: 0,
      var: 'RFC4122',
      rand_b: 0n,
    });

    expect(uuid.getTime()).toBe(timestamp);
  });

  test('should generate UUID v7 with unix_ts_ms as Date', () => {
    const date = new Date('2024-01-25T12:00:00.000Z');
    const uuid = new UUID({
      ver: 7,
      unix_ts_ms: date,
    });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getTime()).toBe(date.getTime());
  });

  test('should generate UUID v7 with unix_ts_ms as bigint', () => {
    const timestamp = 1706198400000n;
    const uuid = new UUID({
      ver: 7,
      unix_ts_ms: timestamp,
    });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getTime()).toBe(Number(timestamp));
  });

  test('should generate UUID v7 with random as bigint', () => {
    const random = 0x0123456789abcdef0123n; // 80 bits
    const uuid = new UUID({
      ver: 7,
      random,
    });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v7 with random as UUIDBytes', () => {
    const random = new Uint8Array(10).fill(0x42);
    const uuid = new UUID({
      ver: 7,
      random,
    });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v7 with rand_a and rand_b', () => {
    const uuid = new UUID({
      ver: 7,
      rand_a: 0xabc,
      rand_b: 0x123456789abcdef0n,
    });
    expect(uuid.getVersion()).toBe(7);

    const parsed = uuid.parse() as UUIDv7Parsed;
    expect(parsed.rand_a).toBe(0xabc);
  });

  test('should throw if v7 random data is less than 10 bytes', () => {
    expect(
      () =>
        new UUID({
          ver: 7,
          random: new Uint8Array(9),
        })
    ).toThrow('v7 random data must be at least 10 bytes');
  });

  test('should generate monotonically increasing v7 UUIDs', () => {
    const uuids: string[] = [];
    for (let i = 0; i < 1000; i++) {
      uuids.push(new UUID({ ver: 7 }).toString());
    }

    // Verify each UUID is greater than the previous one
    for (let i = 1; i < uuids.length; i++) {
      expect(uuids[i] > uuids[i - 1]).toBe(true);
    }
  });
});

// =============================================================================
// UUID v1 Tests
// =============================================================================

describe('UUID v1', () => {
  const testNode = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);

  test('should generate UUID v1', () => {
    const uuid = new UUID({ ver: 1, node: testNode });
    expect(uuid.getVersion()).toBe(1);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v1 with specific timestamp', () => {
    const timestamp = 1706198400000;
    const uuid = new UUID({ ver: 1, unix_ts_ms: timestamp, node: testNode });

    expect(uuid.getVersion()).toBe(1);
    // Timestamp should be close (may differ due to 100ns precision)
    expect(Math.abs(uuid.getTime() - timestamp)).toBeLessThan(1);
  });

  test('should parse UUID v1 structure', () => {
    const uuid = new UUID({ ver: 1, node: testNode });
    const parsed = uuid.parse() as UUIDv1Parsed;

    expect(parsed.ver).toBe(1);
    expect(typeof parsed.time_low).toBe('number');
    expect(typeof parsed.time_mid).toBe('number');
    expect(typeof parsed.time_high).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.clock_seq).toBe('number');
    expect(typeof parsed.node).toBe('number');
  });

  test('should generate UUID v1 with FieldOptions', () => {
    const uuid = new UUID({
      ver: 1,
      time_low: 0x12345678,
      time_mid: 0xabcd,
      time_high: 0x0ef,
      clock_seq: 0x1234,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(1);

    const parsed = uuid.parse() as UUIDv1Parsed;
    expect(parsed.time_low).toBe(0x12345678);
    expect(parsed.time_mid).toBe(0xabcd);
    expect(parsed.time_high).toBe(0x0ef);
    expect(parsed.clock_seq).toBe(0x1234);
  });

  test('should generate UUID v1 with time as bigint', () => {
    const time = 0x1ef_abcd_12345678n; // 60-bit timestamp
    const uuid = new UUID({
      ver: 1,
      time,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(1);

    const parsed = uuid.parse() as UUIDv1Parsed;
    expect(parsed.time_high).toBe(0x1ef);
    expect(parsed.time_mid).toBe(0xabcd);
    expect(parsed.time_low).toBe(0x12345678);
  });

  test('should generate UUID v1 with clock_seq option', () => {
    const uuid = new UUID({
      ver: 1,
      clock_seq: 0x2abc,
      node: testNode,
    });
    const parsed = uuid.parse() as UUIDv1Parsed;
    expect(parsed.clock_seq).toBe(0x2abc);
  });

  test('should generate UUID v1 with node as number', () => {
    const nodeNum = 0x0123456789ab;
    const uuid = new UUID({
      ver: 1,
      node: nodeNum,
    });
    const parsed = uuid.parse() as UUIDv1Parsed;
    expect(parsed.node).toBe(nodeNum);
  });

  test('should generate UUID v1 with node as bigint', () => {
    const nodeBigint = 0x0123456789abn;
    const uuid = new UUID({
      ver: 1,
      node: nodeBigint,
    });
    const parsed = uuid.parse() as UUIDv1Parsed;
    expect(parsed.node).toBe(Number(nodeBigint));
  });

  test('should generate UUID v1 with unix_ts_ms as Date', () => {
    const date = new Date('2024-01-25T12:00:00.000Z');
    const uuid = new UUID({
      ver: 1,
      unix_ts_ms: date,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(1);
    expect(Math.abs(uuid.getTime() - date.getTime())).toBeLessThan(1);
  });
});

// =============================================================================
// UUID v2 Tests
// =============================================================================

describe('UUID v2', () => {
  const testNode = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);

  test('should generate UUID v2', () => {
    const uuid = new UUID({
      ver: 2,
      local_domain: 0,
      local_id: 1000,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(2);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should parse UUID v2 structure', () => {
    const uuid = new UUID({
      ver: 2,
      local_domain: 0,
      local_id: 1000,
      node: testNode,
    });
    const parsed = uuid.parse() as UUIDv2Parsed;

    expect(parsed.ver).toBe(2);
    expect(parsed.local_id).toBe(1000);
    expect(parsed.local_domain).toBe(0);
    expect(parsed.var).toBe('RFC4122');
  });

  test('should generate UUID v2 with FieldOptions', () => {
    const uuid = new UUID({
      ver: 2,
      local_id: 12345,
      time_mid: 0xabcd,
      time_high: 0x0ef,
      clock_seq_high: 0x1f,
      local_domain: 1,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(2);

    const parsed = uuid.parse() as UUIDv2Parsed;
    expect(parsed.local_id).toBe(12345);
    expect(parsed.time_mid).toBe(0xabcd);
    expect(parsed.time_high).toBe(0x0ef);
    expect(parsed.local_domain).toBe(1);
  });

  test('should generate UUID v2 with time as bigint', () => {
    const time = 0x1ef_abcd_12345678n; // 60-bit timestamp
    const uuid = new UUID({
      ver: 2,
      time,
      local_id: 1000,
      local_domain: 0,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(2);

    const parsed = uuid.parse() as UUIDv2Parsed;
    expect(parsed.time_high).toBe(0x1ef);
    expect(parsed.time_mid).toBe(0xabcd);
  });

  test('should generate UUID v2 with unix_ts_ms as Date', () => {
    const date = new Date('2024-01-25T12:00:00.000Z');
    const uuid = new UUID({
      ver: 2,
      unix_ts_ms: date,
      local_id: 1000,
      local_domain: 0,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(2);
  });

  test('should generate UUID v2 with node as number', () => {
    const nodeNum = 0x0123456789ab;
    const uuid = new UUID({
      ver: 2,
      local_id: 1000,
      local_domain: 0,
      node: nodeNum,
    });
    const parsed = uuid.parse() as UUIDv2Parsed;
    expect(parsed.node).toBe(nodeNum);
  });
});

// =============================================================================
// UUID v3 and v5 Tests
// =============================================================================

describe('UUID v3 and v5', () => {
  test('should generate UUID v3 from pre-computed hash', () => {
    const hash = new Uint8Array(16).fill(0x42);
    const uuid = new UUID({ ver: 3, hash });

    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v5 from pre-computed hash', () => {
    const hash = new Uint8Array(16).fill(0x42);
    const uuid = new UUID({ ver: 5, hash });

    expect(uuid.getVersion()).toBe(5);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should throw if hash is missing for v3', () => {
    expect(() => new UUID({ ver: 3 } as never)).toThrow(
      'v3 requires a 16-byte pre-computed MD5 hash'
    );
  });

  test('should throw if hash is missing for v5', () => {
    expect(() => new UUID({ ver: 5 } as never)).toThrow(
      'v5 requires a 16-byte pre-computed SHA-1 hash'
    );
  });

  test('should parse existing UUID v3', () => {
    const uuid = new UUID('5df41881-3aed-3515-88a7-2f4a814cf09e');
    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv3Parsed;
    expect(parsed.ver).toBe(3);
    expect(typeof parsed.md5_high).toBe('number');
    expect(typeof parsed.md5_mid).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.md5_low).toBe('bigint');
  });

  test('should parse existing UUID v5', () => {
    const uuid = new UUID('2ed6657d-e927-568b-95e1-2665a8aea6a2');
    expect(uuid.getVersion()).toBe(5);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv5Parsed;
    expect(parsed.ver).toBe(5);
    expect(typeof parsed.sha1_high).toBe('number');
    expect(typeof parsed.sha1_mid).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.sha1_low).toBe('bigint');
  });

  test('should round-trip UUID v3', () => {
    const uuid = new UUID('5df41881-3aed-3515-88a7-2f4a814cf09e');
    const parsed = uuid.parse();
    const reconstructed = new UUID(parsed);
    expect(uuid.equals(reconstructed)).toBe(true);
  });

  test('should round-trip UUID v5', () => {
    const uuid = new UUID('2ed6657d-e927-568b-95e1-2665a8aea6a2');
    const parsed = uuid.parse();
    const reconstructed = new UUID(parsed);
    expect(uuid.equals(reconstructed)).toBe(true);
  });

  test('should generate UUID v3 with FieldOptions (number)', () => {
    const uuid = new UUID({
      ver: 3,
      md5_high: 0x5df418813aed,
      md5_mid: 0x515,
      md5_low: 0x08a72f4a814cf09en,
    });
    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv3Parsed;
    expect(parsed.md5_high).toBe(0x5df418813aed);
    expect(parsed.md5_mid).toBe(0x515);
  });

  test('should generate UUID v3 with FieldOptions (bigint)', () => {
    const uuid = new UUID({
      ver: 3,
      md5_high: 0x5df418813aedn,
      md5_mid: 0x515n,
      md5_low: 0x08a72f4a814cf09en,
    });
    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv3Parsed;
    expect(parsed.md5_high).toBe(0x5df418813aed);
    expect(parsed.md5_mid).toBe(0x515);
  });

  test('should generate UUID v3 with FieldOptions (UUIDBytes)', () => {
    const md5_high = new Uint8Array([0x5d, 0xf4, 0x18, 0x81, 0x3a, 0xed]);
    const md5_mid = new Uint8Array([0x05, 0x15]);
    const md5_low = new Uint8Array([
      0x08, 0xa7, 0x2f, 0x4a, 0x81, 0x4c, 0xf0, 0x9e,
    ]);
    const uuid = new UUID({
      ver: 3,
      md5_high,
      md5_mid,
      md5_low,
    });
    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv3Parsed;
    expect(parsed.md5_high).toBe(0x5df418813aed);
    expect(parsed.md5_mid).toBe(0x515);
  });

  test('should throw if md5_high has wrong byte length', () => {
    expect(
      () =>
        new UUID({
          ver: 3,
          md5_high: new Uint8Array([0x01, 0x02, 0x03]),
          md5_mid: 0x515,
          md5_low: 0x08a72f4a814cf09en,
        })
    ).toThrow('md5_high must be at least 6 bytes');
  });

  test('should throw if md5_mid has wrong byte length', () => {
    expect(
      () =>
        new UUID({
          ver: 3,
          md5_high: 0x5df418813aed,
          md5_mid: new Uint8Array([0x01]),
          md5_low: 0x08a72f4a814cf09en,
        })
    ).toThrow('md5_mid must be at least 2 bytes');
  });
});

// =============================================================================
// UUID v6 Tests
// =============================================================================

describe('UUID v6', () => {
  const testNode = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);

  test('should generate UUID v6', () => {
    const uuid = new UUID({ ver: 6, node: testNode });
    expect(uuid.getVersion()).toBe(6);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v6 with specific timestamp', () => {
    const timestamp = 1706198400000;
    const uuid = new UUID({ ver: 6, unix_ts_ms: timestamp, node: testNode });

    expect(uuid.getVersion()).toBe(6);
    expect(Math.abs(uuid.getTime() - timestamp)).toBeLessThan(1);
  });

  test('should parse UUID v6 structure', () => {
    const uuid = new UUID({ ver: 6, node: testNode });
    const parsed = uuid.parse() as UUIDv6Parsed;

    expect(parsed.ver).toBe(6);
    expect(typeof parsed.time_high).toBe('number');
    expect(typeof parsed.time_mid).toBe('number');
    expect(typeof parsed.time_low).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.clock_seq).toBe('number');
    expect(typeof parsed.node).toBe('number');
  });

  test('should generate UUID v6 with FieldOptions', () => {
    const uuid = new UUID({
      ver: 6,
      time_high: 0x12345678,
      time_mid: 0xabcd,
      time_low: 0x0ef,
      clock_seq: 0x1234,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(6);

    const parsed = uuid.parse() as UUIDv6Parsed;
    expect(parsed.time_high).toBe(0x12345678);
    expect(parsed.time_mid).toBe(0xabcd);
    expect(parsed.time_low).toBe(0x0ef);
    expect(parsed.clock_seq).toBe(0x1234);
  });

  test('should generate UUID v6 with time as bigint', () => {
    // v6 time layout: time_high(32) | time_mid(16) | time_low(12) = 60 bits
    const time = 0x1234_5678_9abc_defn; // 60-bit timestamp
    const uuid = new UUID({
      ver: 6,
      time,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(6);

    const parsed = uuid.parse() as UUIDv6Parsed;
    expect(parsed.time_high).toBe(0x12345678);
    expect(parsed.time_mid).toBe(0x9abc);
    expect(parsed.time_low).toBe(0xdef);
  });

  test('should generate UUID v6 with unix_ts_ms as Date', () => {
    const date = new Date('2024-01-25T12:00:00.000Z');
    const uuid = new UUID({
      ver: 6,
      unix_ts_ms: date,
      node: testNode,
    });
    expect(uuid.getVersion()).toBe(6);
    expect(Math.abs(uuid.getTime() - date.getTime())).toBeLessThan(1);
  });

  test('should generate UUID v6 with clock_seq option', () => {
    const uuid = new UUID({
      ver: 6,
      clock_seq: 0x2abc,
      node: testNode,
    });
    const parsed = uuid.parse() as UUIDv6Parsed;
    expect(parsed.clock_seq).toBe(0x2abc);
  });

  test('should generate UUID v6 with node as number', () => {
    const nodeNum = 0x0123456789ab;
    const uuid = new UUID({
      ver: 6,
      node: nodeNum,
    });
    const parsed = uuid.parse() as UUIDv6Parsed;
    expect(parsed.node).toBe(nodeNum);
  });
});

// =============================================================================
// UUID v8 Tests
// =============================================================================

describe('UUID v8', () => {
  test('should generate UUID v8 from custom data', () => {
    const customData = new Uint8Array(16).fill(0x42);
    const uuid = new UUID({ ver: 8, custom: customData });

    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should throw if custom is missing for v8', () => {
    expect(() => new UUID({ ver: 8 } as never)).toThrow(
      'v8 requires 16 bytes of custom data'
    );
  });

  test('should parse UUID v8 structure', () => {
    const customData = new Uint8Array(16).fill(0x42);
    const uuid = new UUID({ ver: 8, custom: customData });
    const parsed = uuid.parse() as UUIDv8Parsed;

    expect(parsed.ver).toBe(8);
    expect(typeof parsed.custom_a).toBe('number');
    expect(typeof parsed.custom_b).toBe('number');
    expect(parsed.var).toBe('RFC4122');
    expect(typeof parsed.custom_c).toBe('bigint');
  });

  test('should generate UUID v8 with FieldOptions (number)', () => {
    const uuid = new UUID({
      ver: 8,
      custom_a: 0x123456789abc,
      custom_b: 0xdef,
      custom_c: 0x0123456789abcdefn,
    });
    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv8Parsed;
    expect(parsed.custom_a).toBe(0x123456789abc);
    expect(parsed.custom_b).toBe(0xdef);
  });

  test('should generate UUID v8 with FieldOptions (bigint)', () => {
    const uuid = new UUID({
      ver: 8,
      custom_a: 0x123456789abcn,
      custom_b: 0xdefn,
      custom_c: 0x0123456789abcdefn,
    });
    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv8Parsed;
    expect(parsed.custom_a).toBe(0x123456789abc);
    expect(parsed.custom_b).toBe(0xdef);
  });

  test('should generate UUID v8 with FieldOptions (UUIDBytes)', () => {
    const custom_a = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc]);
    const custom_b = new Uint8Array([0x0d, 0xef]);
    const custom_c = new Uint8Array([
      0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
    ]);
    const uuid = new UUID({
      ver: 8,
      custom_a,
      custom_b,
      custom_c,
    });
    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('RFC4122');

    const parsed = uuid.parse() as UUIDv8Parsed;
    expect(parsed.custom_a).toBe(0x123456789abc);
    expect(parsed.custom_b).toBe(0xdef);
  });

  test('should round-trip UUID v8 with FieldOptions', () => {
    const uuid = new UUID({
      ver: 8,
      custom_a: 0xaabbccddeeff,
      custom_b: 0x123,
      custom_c: 0x0fedcba987654321n,
    });
    const parsed = uuid.parse();
    const reconstructed = new UUID(parsed);
    expect(uuid.equals(reconstructed)).toBe(true);
  });
});

// =============================================================================
// Round-trip Tests
// =============================================================================

describe('Round-trip', () => {
  test('should round-trip UUID v7', () => {
    const original = new UUID({ ver: 7, unix_ts_ms: 1706198400000 });
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
    expect(original.toString()).toBe(reconstructed.toString());
  });

  test('should round-trip UUID v4', () => {
    const original = new UUID({ ver: 4 });
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });

  test('should round-trip UUID v1', () => {
    const original = new UUID({
      ver: 1,
      node: new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]),
    });
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });

  test('should round-trip Nil UUID', () => {
    const original = UUID.nil();
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });

  test('should round-trip Max UUID', () => {
    const original = UUID.max();
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });

  test('should round-trip string to bytes and back', () => {
    const original = '550e8400-e29b-41d4-a716-446655440000';
    const uuid = new UUID(original);
    const bytes = uuid.toBytes();
    const fromBytes = new UUID(bytes);

    expect(fromBytes.toString()).toBe(original);
  });
});

// =============================================================================
// Method Tests
// =============================================================================

describe('UUID Methods', () => {
  test('toString should return hyphenated format', () => {
    const uuid = new UUID({ ver: 4 });
    const str = uuid.toString();

    expect(str).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  test('toBytes should return 16-byte array', () => {
    const uuid = new UUID({ ver: 4 });
    const bytes = uuid.toBytes();

    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBe(16);
  });

  test('toBytes should return a copy', () => {
    const uuid = new UUID({ ver: 4 });
    const bytes1 = uuid.toBytes();
    const bytes2 = uuid.toBytes();

    bytes1[0] = 0xff;
    expect(bytes2[0]).not.toBe(0xff);
  });

  test('toJSON should return string', () => {
    const uuid = new UUID('550e8400-e29b-41d4-a716-446655440000');
    expect(uuid.toJSON()).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('equals should compare UUIDs correctly', () => {
    const uuid1 = new UUID('550e8400-e29b-41d4-a716-446655440000');
    const uuid2 = new UUID('550e8400-e29b-41d4-a716-446655440000');
    const uuid3 = new UUID('550e8400-e29b-41d4-a716-446655440001');

    expect(uuid1.equals(uuid2)).toBe(true);
    expect(uuid1.equals(uuid3)).toBe(false);
  });
});

// =============================================================================
// Variant Detection Tests
// =============================================================================

describe('Variant Detection', () => {
  test('should detect RFC4122 variant', () => {
    const uuid = new UUID('550e8400-e29b-41d4-a716-446655440000');
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should detect NCS variant', () => {
    // NCS variant has 0xxx in variant bits (byte 8)
    const bytes = new Uint8Array([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0x07, 0x16, 0x44, 0x66,
      0x55, 0x44, 0x00, 0x00,
    ]);
    const uuid = new UUID(bytes);
    expect(uuid.getVariant()).toBe('NCS');
  });

  test('should detect Microsoft variant', () => {
    // Microsoft variant has 110x in variant bits (byte 8)
    const bytes = new Uint8Array([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xc7, 0x16, 0x44, 0x66,
      0x55, 0x44, 0x00, 0x00,
    ]);
    const uuid = new UUID(bytes);
    expect(uuid.getVariant()).toBe('Microsoft');
  });

  test('should detect Reserved variant', () => {
    // Reserved variant has 111x in variant bits (byte 8)
    const bytes = new Uint8Array([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xe7, 0x16, 0x44, 0x66,
      0x55, 0x44, 0x00, 0x00,
    ]);
    const uuid = new UUID(bytes);
    expect(uuid.getVariant()).toBe('Reserved');
  });
});

// =============================================================================
// Variant Generation Tests
// =============================================================================

describe('Variant Generation', () => {
  test('should generate UUID v4 with NCS variant', () => {
    const uuid = new UUID({
      ver: 4,
      var: 'NCS',
    });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('NCS');
  });

  test('should generate UUID v4 with Microsoft variant', () => {
    const uuid = new UUID({
      ver: 4,
      var: 'Microsoft',
    });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('Microsoft');
  });

  test('should generate UUID v4 with Reserved variant', () => {
    const uuid = new UUID({
      ver: 4,
      var: 'Reserved',
    });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('Reserved');
  });

  test('should generate UUID v7 with NCS variant', () => {
    const uuid = new UUID({
      ver: 7,
      var: 'NCS',
    });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('NCS');
  });

  test('should generate UUID v1 with Microsoft variant', () => {
    const uuid = new UUID({
      ver: 1,
      var: 'Microsoft',
      node: new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]),
    });
    expect(uuid.getVersion()).toBe(1);
    expect(uuid.getVariant()).toBe('Microsoft');
  });

  test('should generate UUID v8 with Reserved variant', () => {
    const uuid = new UUID({
      ver: 8,
      var: 'Reserved',
      custom: new Uint8Array(16).fill(0x42),
    });
    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('Reserved');
  });
});

// =============================================================================
// Error Handling Tests
// =============================================================================

describe('Error Handling', () => {
  test('should throw when calling getTime() on v4', () => {
    const uuid = new UUID({ ver: 4 });
    expect(() => uuid.getTime()).toThrow(
      'getTime() is not available for UUID version 4'
    );
  });

  test('should throw when calling getTime() on v3', () => {
    const uuid = new UUID({ ver: 3, hash: new Uint8Array(16) });
    expect(() => uuid.getTime()).toThrow(
      'getTime() is not available for UUID version 3'
    );
  });

  test('should throw when calling getTime() on v5', () => {
    const uuid = new UUID({ ver: 5, hash: new Uint8Array(16) });
    expect(() => uuid.getTime()).toThrow(
      'getTime() is not available for UUID version 5'
    );
  });

  test('should throw when calling getTime() on v8', () => {
    const uuid = new UUID({ ver: 8, custom: new Uint8Array(16) });
    expect(() => uuid.getTime()).toThrow(
      'getTime() is not available for UUID version 8'
    );
  });

  test('should throw on invalid v4 random type', () => {
    expect(
      () =>
        new UUID({
          ver: 4,
          random: 'invalid' as never,
        })
    ).toThrow('Invalid random type');
  });

  test('should throw on invalid v3 hash type', () => {
    expect(
      () =>
        new UUID({
          ver: 3,
          hash: 'invalid' as never,
        })
    ).toThrow('Invalid hash type');
  });

  test('should throw on invalid v5 hash type', () => {
    expect(
      () =>
        new UUID({
          ver: 5,
          hash: 'invalid' as never,
        })
    ).toThrow('Invalid hash type');
  });

  test('should throw on invalid v8 custom type', () => {
    expect(
      () =>
        new UUID({
          ver: 8,
          custom: 'invalid' as never,
        })
    ).toThrow('Invalid custom type');
  });

  test('should throw on invalid v7 random type', () => {
    expect(
      () =>
        new UUID({
          ver: 7,
          random: 'invalid' as never,
        })
    ).toThrow('Invalid random type');
  });
});

// =============================================================================
// Edge Cases
// =============================================================================

describe('Edge Cases', () => {
  test('should handle hash with more than 16 bytes (v3)', () => {
    const hash = new Uint8Array(20).fill(0x42);
    const uuid = new UUID({ ver: 3, hash });
    expect(uuid.getVersion()).toBe(3);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should handle hash with more than 16 bytes (v5)', () => {
    const hash = new Uint8Array(20).fill(0x42); // SHA-1 is 20 bytes
    const uuid = new UUID({ ver: 5, hash });
    expect(uuid.getVersion()).toBe(5);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should handle random with more than 16 bytes (v4)', () => {
    const random = new Uint8Array(32).fill(0x42);
    const uuid = new UUID({ ver: 4, random });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should handle custom with more than 16 bytes (v8)', () => {
    const custom = new Uint8Array(32).fill(0x42);
    const uuid = new UUID({ ver: 8, custom });
    expect(uuid.getVersion()).toBe(8);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should throw on invalid Nil UUID (version 0 but not all zeros)', () => {
    const bytes = new Uint8Array(16);
    bytes[0] = 0x01; // Not all zeros
    bytes[6] = 0x00; // version 0
    const uuid = new UUID(bytes);
    expect(() => uuid.parse()).toThrow(
      'Invalid Nil UUID: Not all bytes are zero'
    );
  });

  test('should throw on invalid Max UUID (version 15 but not all 0xFF)', () => {
    const bytes = new Uint8Array(16).fill(0xff);
    bytes[0] = 0x00; // Not all 0xFF
    const uuid = new UUID(bytes);
    expect(() => uuid.parse()).toThrow(
      'Invalid Max UUID: Not all bytes are 0xFF'
    );
  });

  test('should handle v4 random data less than 16 bytes', () => {
    expect(
      () =>
        new UUID({
          ver: 4,
          random: new Uint8Array(15),
        })
    ).toThrow('Random data must be at least 16 bytes');
  });

  test('should handle v3 hash less than 16 bytes', () => {
    expect(
      () =>
        new UUID({
          ver: 3,
          hash: new Uint8Array(15),
        })
    ).toThrow('v3 requires a 16-byte pre-computed MD5 hash');
  });

  test('should handle v5 hash less than 16 bytes', () => {
    expect(
      () =>
        new UUID({
          ver: 5,
          hash: new Uint8Array(15),
        })
    ).toThrow('v5 requires a 16-byte pre-computed SHA-1 hash');
  });

  test('should handle v8 custom less than 16 bytes', () => {
    expect(
      () =>
        new UUID({
          ver: 8,
          custom: new Uint8Array(15),
        })
    ).toThrow('v8 requires 16 bytes of custom data');
  });

  test('should round-trip UUID v2', () => {
    const testNode = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);
    const original = new UUID({
      ver: 2,
      local_id: 1000,
      local_domain: 1,
      node: testNode,
    });
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });

  test('should round-trip UUID v6', () => {
    const testNode = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);
    const original = new UUID({
      ver: 6,
      node: testNode,
    });
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });

  test('should round-trip UUID v8', () => {
    const original = new UUID({
      ver: 8,
      custom: new Uint8Array(16).fill(0x42),
    });
    const parsed = original.parse();
    const reconstructed = new UUID(parsed);

    expect(original.equals(reconstructed)).toBe(true);
  });
});

// =============================================================================
// Static random() Tests
// =============================================================================

describe('UUID.random()', () => {
  test('should generate UUID v4 RFC4122 by default (no arguments)', () => {
    const uuid = UUID.random();
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v4 RFC4122 with explicit options', () => {
    const uuid = UUID.random({ ver: 4, var: 'RFC4122' });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('RFC4122');
  });

  test('should generate UUID v4 with NCS variant', () => {
    const uuid = UUID.random({ ver: 4, var: 'NCS' });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('NCS');
  });

  test('should generate UUID v4 with Microsoft variant', () => {
    const uuid = UUID.random({ ver: 4, var: 'Microsoft' });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('Microsoft');
  });

  test('should generate UUID v4 with Reserved variant', () => {
    const uuid = UUID.random({ ver: 4, var: 'Reserved' });
    expect(uuid.getVersion()).toBe(4);
    expect(uuid.getVariant()).toBe('Reserved');
  });

  test('should generate UUID v7 with RFC4122 variant', () => {
    const before = Date.now();
    const uuid = UUID.random({ ver: 7 });
    const after = Date.now() + 1; // +1 to account for any slight delay

    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('RFC4122');
    expect(uuid.getTime()).toBeGreaterThanOrEqual(before);
    expect(uuid.getTime()).toBeLessThanOrEqual(after);
  });

  test('should generate UUID v7 with NCS variant', () => {
    const uuid = UUID.random({ ver: 7, var: 'NCS' });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('NCS');
  });

  test('should generate UUID v7 with Microsoft variant', () => {
    const uuid = UUID.random({ ver: 7, var: 'Microsoft' });
    expect(uuid.getVersion()).toBe(7);
    expect(uuid.getVariant()).toBe('Microsoft');
  });

  test('should generate unique UUIDs', () => {
    const uuids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      uuids.add(UUID.random().toString());
    }
    expect(uuids.size).toBe(1000);
  });

  test('should generate unique v7 UUIDs', () => {
    const uuids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      uuids.add(UUID.random({ ver: 7 }).toString());
    }
    expect(uuids.size).toBe(1000);
  });

  test('should generate monotonically increasing v7 UUIDs', () => {
    const uuids: string[] = [];
    for (let i = 0; i < 1000; i++) {
      uuids.push(UUID.random({ ver: 7 }).toString());
    }

    // Verify each UUID is greater than the previous one
    for (let i = 1; i < uuids.length; i++) {
      expect(uuids[i] > uuids[i - 1]).toBe(true);
    }
  });
});
