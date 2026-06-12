// =============================================================================
// Type Definitions
// =============================================================================

export type UUIDVersion = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 15;
export type UUIDVariant = 'NCS' | 'RFC4122' | 'Microsoft' | 'Reserved';

export interface UUIDv1FieldOptions {
  ver: 1;
  time_low: number; // 32 bits
  time_mid: number; // 16 bits
  time_high: number; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  clock_seq?: number; // 13-15 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export interface UUIDv1TimeOptions {
  ver: 1;
  time: bigint; // 60 bits (100ns intervals since UUID epoch)
  var?: UUIDVariant; // 1-3 bits
  clock_seq?: number; // 13-15 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export interface UUIDv1UnixTsMsOptions {
  ver: 1;
  unix_ts_ms?: number | bigint | Date; // milliseconds since Unix epoch
  var?: UUIDVariant; // 1-3 bits
  clock_seq?: number; // 13-15 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export type UUIDv1Options =
  | UUIDv1FieldOptions
  | UUIDv1TimeOptions
  | UUIDv1UnixTsMsOptions;

export interface UUIDv2FieldOptions {
  ver: 2;
  local_id: number; // 32 bits (actually local_id)
  time_mid: number; // 16 bits
  time_high: number; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  clock_seq_high?: number; // 5-7 bits
  local_domain: number; // 8 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export interface UUIDv2TimeOptions {
  ver: 2;
  time: bigint; // 60 bits (100ns intervals since UUID epoch)
  local_id: number; // 32 bits (actually local_id)
  var?: UUIDVariant; // 1-3 bits
  clock_seq_high?: number; // 5-7 bits
  local_domain: number; // 8 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export interface UUIDv2UnixTsMsOptions {
  ver: 2;
  unix_ts_ms?: number | bigint | Date; // milliseconds since Unix epoch
  local_id: number; // 32 bits (actually local_id)
  var?: UUIDVariant; // 1-3 bits
  clock_seq_high?: number; // 5-7 bits
  local_domain: number; // 8 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export type UUIDv2Options =
  | UUIDv2FieldOptions
  | UUIDv2TimeOptions
  | UUIDv2UnixTsMsOptions;

export interface UUIDv3FieldOptions {
  ver: 3;
  md5_high: number | bigint | UUIDBytes; // 48 bits
  md5_mid: number | bigint | UUIDBytes; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  md5_low: bigint | UUIDBytes; // 61-63 bits
}

export interface UUIDv3HashOptions {
  ver: 3;
  hash: UUIDBytes; // 16 bytes (pre-computed MD5 hash)
  var?: UUIDVariant; // 1-3 bits
}

export type UUIDv3Options = UUIDv3FieldOptions | UUIDv3HashOptions;

export interface UUIDv4FieldOptions {
  ver: 4;
  random_a?: number | bigint | UUIDBytes; // 48 bits
  random_b?: number | bigint | UUIDBytes; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  random_c?: bigint | UUIDBytes; // 61-63 bits
}

export interface UUIDv4RandomOptions {
  ver: 4;
  random: UUIDBytes; // 16 bytes (custom randomness)
  var?: UUIDVariant; // 1-3 bits
}

export type UUIDv4Options = UUIDv4FieldOptions | UUIDv4RandomOptions;

export interface UUIDv5FieldOptions {
  ver: 5;
  sha1_high: number | bigint | UUIDBytes; // 48 bits
  sha1_mid: number | bigint | UUIDBytes; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  sha1_low: bigint | UUIDBytes; // 61-63 bits
}

export interface UUIDv5HashOptions {
  ver: 5;
  hash: UUIDBytes; // 16 bytes (pre-computed SHA-1 hash, first 16 bytes)
  var?: UUIDVariant; // 1-3 bits
}

export type UUIDv5Options = UUIDv5FieldOptions | UUIDv5HashOptions;

export interface UUIDv6FieldOptions {
  ver: 6;
  time_high: number; // 32 bits
  time_mid: number; // 16 bits
  time_low: number; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  clock_seq?: number; // 13-15 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export interface UUIDv6TimeOptions {
  ver: 6;
  time: bigint; // 60 bits (100ns intervals since UUID epoch)
  var?: UUIDVariant; // 1-3 bits
  clock_seq?: number; // 13-15 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export interface UUIDv6UnixTsMsOptions {
  ver: 6;
  unix_ts_ms?: number | bigint | Date; // milliseconds since Unix epoch
  var?: UUIDVariant; // 1-3 bits
  clock_seq?: number; // 13-15 bits
  node: number | bigint | UUIDBytes; // 48 bits
}

export type UUIDv6Options =
  | UUIDv6FieldOptions
  | UUIDv6TimeOptions
  | UUIDv6UnixTsMsOptions;

export interface UUIDv7FieldOptions {
  ver: 7;
  unix_ts_ms?: number | bigint | Date; // 48 bits (milliseconds since Unix epoch)
  rand_a?: number | bigint | UUIDBytes; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  rand_b?: bigint | UUIDBytes; // 61-63 bits
}

export interface UUIDv7RandomOptions {
  ver: 7;
  unix_ts_ms?: number | bigint | Date; // 48 bits (milliseconds since Unix epoch)
  random: bigint | UUIDBytes; // 10 bytes (custom randomness)
  var?: UUIDVariant; // 1-3 bits
}

export type UUIDv7Options = UUIDv7FieldOptions | UUIDv7RandomOptions;

export interface UUIDv8FieldOptions {
  ver: 8;
  custom_a: number | bigint | UUIDBytes; // 48 bits
  custom_b: number | bigint | UUIDBytes; // 12 bits
  var?: UUIDVariant; // 1-3 bits
  custom_c: bigint | UUIDBytes; // 61-63 bits
}

export interface UUIDv8CustomOptions {
  ver: 8;
  custom: UUIDBytes; // 16 bytes
  var?: UUIDVariant; // 1-3 bits
}

export type UUIDv8Options = UUIDv8FieldOptions | UUIDv8CustomOptions;

export interface NilUUIDFieldOptions {
  ver: 0;
}

export interface MaxUUIDFieldOptions {
  ver: 15;
}

export interface RandomUUIDOptions {
  ver?: 4 | 7;
  var?: UUIDVariant;
}

export type UUIDOptions =
  | UUIDv1Options
  | UUIDv2Options
  | UUIDv3Options
  | UUIDv4Options
  | UUIDv5Options
  | UUIDv6Options
  | UUIDv7Options
  | UUIDv8Options
  | NilUUIDFieldOptions
  | MaxUUIDFieldOptions;

// Low-level parsed structures for each UUID version (RFC 9562)
export interface UUIDv1Parsed {
  ver: 1;
  time_low: number; // 32 bits
  time_mid: number; // 16 bits
  time_high: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  clock_seq: number; // 13-15 bits
  node: number; // 48 bits
}

export interface UUIDv2Parsed {
  ver: 2;
  local_id: number; // 32 bits (actually local_id)
  time_mid: number; // 16 bits
  time_high: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  clock_seq_high: number; // 5-7 bits
  local_domain: number; // 8 bits
  node: number; // 48 bits
}

export interface UUIDv3Parsed {
  ver: 3;
  md5_high: number; // 48 bits
  md5_mid: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  md5_low: bigint; // 61-63 bits
}

export interface UUIDv4Parsed {
  ver: 4;
  random_a: number; // 48 bits
  random_b: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  random_c: bigint; // 61-63 bits
}

export interface UUIDv5Parsed {
  ver: 5;
  sha1_high: number; // 48 bits
  sha1_mid: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  sha1_low: bigint; // 61-63 bits
}

export interface UUIDv6Parsed {
  ver: 6;
  time_high: number; // 32 bits
  time_mid: number; // 16 bits
  time_low: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  clock_seq: number; // 13-15 bits
  node: number; // 48 bits
}

export interface UUIDv7Parsed {
  ver: 7;
  unix_ts_ms: number; // 48 bits
  rand_a: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  rand_b: bigint; // 61-63 bits
}

export interface UUIDv8Parsed {
  ver: 8;
  custom_a: number; // 48 bits
  custom_b: number; // 12 bits
  var: UUIDVariant; // 1-3 bits
  custom_c: bigint; // 61-63 bits
}

export interface NilUUIDParsed {
  ver: 0;
  nil: true;
}

export interface MaxUUIDParsed {
  ver: 15;
  max: true;
}

export type ParsedUUID =
  | UUIDv1Parsed
  | UUIDv2Parsed
  | UUIDv3Parsed
  | UUIDv4Parsed
  | UUIDv5Parsed
  | UUIDv6Parsed
  | UUIDv7Parsed
  | UUIDv8Parsed
  | NilUUIDParsed
  | MaxUUIDParsed;

export type UUIDBytes = ArrayBufferView | ArrayBufferLike;
export type UUIDInput = UUID | string | UUIDBytes | UUIDOptions | null;

// =============================================================================
// Utility Functions
// =============================================================================

// Lookup table: byte value -> two-character lowercase hex string
const byteToHex: string[] = [];
for (let i = 0; i < 256; i++) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

// Lookup table: char code -> hex digit value (-1 for non-hex characters)
const hexValue = new Int8Array(256).fill(-1);
for (let i = 0; i < 10; i++) {
  hexValue[0x30 + i] = i; // '0'-'9'
}
for (let i = 0; i < 6; i++) {
  hexValue[0x41 + i] = 10 + i; // 'A'-'F'
  hexValue[0x61 + i] = 10 + i; // 'a'-'f'
}

type NativeGetRandomValues = (bytes: Uint8Array) => Uint8Array;

type GlobalWithNodeProcess = typeof globalThis & {
  process?: {
    getBuiltinModule?: (id: string) => unknown;
  };
};

let cachedGetRandomValues: NativeGetRandomValues | null | undefined;

function getNativeGetRandomValues(): NativeGetRandomValues | null {
  if (cachedGetRandomValues !== undefined) return cachedGetRandomValues;

  let getRandomValues: NativeGetRandomValues | null = null;
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    getRandomValues = crypto.getRandomValues.bind(
      crypto
    ) as NativeGetRandomValues;
  } else {
    const getBuiltinModule = (globalThis as GlobalWithNodeProcess).process
      ?.getBuiltinModule;
    if (typeof getBuiltinModule === 'function') {
      const nodeCrypto = getBuiltinModule('node:crypto') as
        | { webcrypto?: Crypto }
        | undefined;
      if (typeof nodeCrypto?.webcrypto?.getRandomValues === 'function') {
        getRandomValues = nodeCrypto.webcrypto.getRandomValues.bind(
          nodeCrypto.webcrypto
        ) as NativeGetRandomValues;
      }
    }
  }

  cachedGetRandomValues = getRandomValues;
  return getRandomValues;
}

// Converts regex-validated hex (even length, hex digits only) to bytes.
// Deliberately not Uint8Array.fromHex: for UUID-sized inputs the native
// call overhead makes it several times slower than this loop.
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] =
      (hexValue[hex.charCodeAt(i * 2)] << 4) |
      hexValue[hex.charCodeAt(i * 2 + 1)];
  }
  return bytes;
}

// Pre-filled pool of random bytes. Refilling the pool in bulk amortizes the
// per-call overhead of crypto.getRandomValues, which dominates the cost of
// generating a single UUID.
const RANDOM_POOL_SIZE = 4096;
let randomPool: Uint8Array | undefined;
let randomPoolOffset = 0;

function getRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  const getRandomValues = getNativeGetRandomValues();
  if (getRandomValues == null) {
    // Fallback for environments without crypto
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }
  if (length > RANDOM_POOL_SIZE) {
    getRandomValues(bytes);
    return bytes;
  }
  let pool = randomPool;
  if (pool === undefined || randomPoolOffset + length > RANDOM_POOL_SIZE) {
    pool = randomPool ??= new Uint8Array(RANDOM_POOL_SIZE);
    getRandomValues(pool);
    randomPoolOffset = 0;
  }
  // Plain loop instead of set(subarray(...)) to avoid the view allocation
  const offset = randomPoolOffset;
  for (let i = 0; i < length; i++) {
    bytes[i] = pool[offset + i];
  }
  randomPoolOffset = offset + length;
  return bytes;
}

function formatUUID(bytes: Uint8Array): string {
  return (
    byteToHex[bytes[0]] +
    byteToHex[bytes[1]] +
    byteToHex[bytes[2]] +
    byteToHex[bytes[3]] +
    '-' +
    byteToHex[bytes[4]] +
    byteToHex[bytes[5]] +
    '-' +
    byteToHex[bytes[6]] +
    byteToHex[bytes[7]] +
    '-' +
    byteToHex[bytes[8]] +
    byteToHex[bytes[9]] +
    '-' +
    byteToHex[bytes[10]] +
    byteToHex[bytes[11]] +
    byteToHex[bytes[12]] +
    byteToHex[bytes[13]] +
    byteToHex[bytes[14]] +
    byteToHex[bytes[15]]
  );
}

// Helper to check if value is ArrayBufferView
function uuidBytesToUint8Array(value: UUIDBytes): Uint8Array | undefined {
  if (isArrayBufferView(value)) {
    // ArrayBufferView (Uint8Array, DataView, etc.)
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  if (isArrayBufferLike(value)) {
    // ArrayBufferLike (ArrayBuffer or SharedArrayBuffer)
    return new Uint8Array(value);
  }
  return undefined;
}

// Data bit mask for byte 8 based on variant
const VARIANT_DATA_MASK: Record<UUIDVariant, number> = {
  NCS: 0x7f, // 0xxxxxxx → 7 data bits
  RFC4122: 0x3f, // 10xxxxxx → 6 data bits
  Microsoft: 0x1f, // 110xxxxx → 5 data bits
  Reserved: 0x1f, // 111xxxxx → 5 data bits
};

// 16-bit mask for bytes 8-9 (variant data bits in byte 8 + byte 9)
const VARIANT_DATA_MASK_16: Record<UUIDVariant, number> = {
  NCS: 0x7fff,
  RFC4122: 0x3fff,
  Microsoft: 0x1fff,
  Reserved: 0x1fff,
};

// 64-bit mask for bytes 8-15 (variant data bits in byte 8 + bytes 9-15)
const VARIANT_DATA_MASK_64: Record<UUIDVariant, bigint> = {
  NCS: 0x7fffffffffffffffn,
  RFC4122: 0x3fffffffffffffffn,
  Microsoft: 0x1fffffffffffffffn,
  Reserved: 0x1fffffffffffffffn,
};

// Encodes variant bits + data bits into byte 8
function encodeVariantByte(variant: UUIDVariant, dataBits: number): number {
  switch (variant) {
    case 'NCS':
      return dataBits & 0x7f;
    case 'Microsoft':
      return 0xc0 | (dataBits & 0x1f);
    case 'Reserved':
      return 0xe0 | (dataBits & 0x1f);
    case 'RFC4122':
    default:
      return 0x80 | (dataBits & 0x3f);
  }
}

// Set a 48-bit value in a Uint8Array
function set48Bits(
  bytes: Uint8Array,
  view: DataView,
  offset: number,
  value: number | bigint | UUIDBytes,
  fieldName: string
) {
  if (typeof value === 'number') {
    view.setUint16(offset, Math.trunc(value / 0x10000_0000));
    view.setUint32(offset + 2, value & 0xffff_ffff);
    return;
  }
  if (typeof value === 'bigint') {
    view.setUint16(offset, Number((value >> 32n) & 0xffffn));
    view.setUint32(offset + 2, Number(value & 0xffff_ffffn));
    return;
  }
  const valueBytes = uuidBytesToUint8Array(value);
  if (valueBytes == null) {
    throw new Error(`Invalid ${fieldName} type`);
  }
  if (valueBytes.length < 6) {
    throw new Error(`${fieldName} must be at least 6 bytes`);
  }
  bytes.set(valueBytes.subarray(0, 6), offset);
}

// Set version and 12-bit value in bytes 6-7
function setVersionAnd12Bits(
  bytes: Uint8Array,
  version: UUIDVersion,
  value: number | bigint | UUIDBytes,
  fieldName: string,
  offset = 6
) {
  if (typeof value === 'number') {
    bytes[offset] = (version << 4) | ((value >> 8) & 0x0f);
    bytes[offset + 1] = value & 0xff;
    return;
  }
  if (typeof value === 'bigint') {
    bytes[offset] = (version << 4) | Number((value >> 8n) & 0x0fn);
    bytes[offset + 1] = Number(value & 0xffn);
    return;
  }
  const valueBytes = uuidBytesToUint8Array(value);
  if (valueBytes == null) {
    throw new Error(`Invalid ${fieldName} type`);
  }
  if (valueBytes.length < 2) {
    throw new Error(`${fieldName} must be at least 2 bytes`);
  }
  bytes[offset] = (version << 4) | (valueBytes[0] & 0x0f);
  bytes[offset + 1] = valueBytes[1];
}

// Set variant and 64-bit value in bytes 8-15
function setVariantAnd64Bits(
  bytes: Uint8Array,
  view: DataView,
  variant: UUIDVariant,
  value: bigint | UUIDBytes,
  fieldName: string,
  offset = 8
) {
  if (typeof value === 'bigint') {
    view.setBigUint64(offset, value);
    bytes[offset] = encodeVariantByte(variant, bytes[offset]);
    return;
  }
  const valueBytes = uuidBytesToUint8Array(value);
  if (valueBytes == null) {
    throw new Error(`Invalid ${fieldName} type`);
  }
  if (valueBytes.length < 8) {
    throw new Error(`${fieldName} must be at least 8 bytes`);
  }
  bytes[offset] = encodeVariantByte(variant, valueBytes[0]);
  bytes.set(valueBytes.subarray(1, 8), offset + 1);
}

// =============================================================================
// Parse Functions
// =============================================================================

const UUID_REGEX =
  /^[^0-9a-z-]*([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})[^0-9a-z-]*$/i;

// Fast path for the canonical 8-4-4-4-12 form and the 32-character
// undashed form. Returns undefined for any other shape so the caller can
// fall back to the more permissive regex.
function parseUUIDStringFast(input: string): Uint8Array | undefined {
  const length = input.length;
  if (length !== 36 && length !== 32) return undefined;
  const hasDashes = length === 36;
  if (
    hasDashes &&
    (input.charCodeAt(8) !== 0x2d ||
      input.charCodeAt(13) !== 0x2d ||
      input.charCodeAt(18) !== 0x2d ||
      input.charCodeAt(23) !== 0x2d)
  ) {
    return undefined;
  }
  const bytes = new Uint8Array(16);
  let i = 0;
  for (let j = 0; j < 16; j++) {
    if (hasDashes && (i === 8 || i === 13 || i === 18 || i === 23)) i++;
    // Char codes above 255 read past the table and yield undefined,
    // which fails the >= 0 check below
    const hi = hexValue[input.charCodeAt(i)];
    const lo = hexValue[input.charCodeAt(i + 1)];
    if (!(hi >= 0 && lo >= 0)) return undefined;
    bytes[j] = (hi << 4) | lo;
    i += 2;
  }
  return bytes;
}

function parseUUIDString(input: string): Uint8Array {
  const fast = parseUUIDStringFast(input);
  if (fast) return fast;
  const match = input.match(UUID_REGEX);
  if (!match) {
    throw new Error(`Invalid UUID string: ${input}`);
  }
  const hex = match[1] + match[2] + match[3] + match[4] + match[5];
  return hexToBytes(hex);
}

function detectVersion(bytes: Uint8Array): UUIDVersion {
  return (bytes[6] >> 4) as UUIDVersion;
}

function detectVariant(bytes: Uint8Array): UUIDVariant {
  const variantByte = bytes[8];
  if ((variantByte & 0x80) === 0) return 'NCS';
  if ((variantByte & 0xc0) === 0x80) return 'RFC4122';
  if ((variantByte & 0xe0) === 0xc0) return 'Microsoft';
  return 'Reserved';
}

function parseToStructure(bytes: Uint8Array): ParsedUUID {
  const version = detectVersion(bytes);
  const variant = detectVariant(bytes);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  switch (version) {
    case 1: {
      return {
        ver: 1,
        time_low: view.getUint32(0),
        time_mid: view.getUint16(4),
        time_high: view.getUint16(6) & 0x0fff,
        var: variant,
        clock_seq: view.getUint16(8) & VARIANT_DATA_MASK_16[variant],
        node: view.getUint16(10) * 0x10000_0000 + view.getUint32(12),
      };
    }

    case 2: {
      return {
        ver: 2,
        local_id: view.getUint32(0),
        time_mid: view.getUint16(4),
        time_high: view.getUint16(6) & 0x0fff,
        var: variant,
        clock_seq_high: bytes[8] & VARIANT_DATA_MASK[variant],
        local_domain: bytes[9],
        node: view.getUint16(10) * 0x10000_0000 + view.getUint32(12),
      };
    }

    case 3: {
      return {
        ver: 3,
        md5_high: view.getUint16(0) * 0x10000_0000 + view.getUint32(2),
        md5_mid: view.getUint16(6) & 0x0fff,
        var: variant,
        md5_low: view.getBigUint64(8) & VARIANT_DATA_MASK_64[variant],
      };
    }

    case 4: {
      return {
        ver: 4,
        random_a: view.getUint16(0) * 0x10000_0000 + view.getUint32(2),
        random_b: view.getUint16(6) & 0x0fff,
        var: variant,
        random_c: view.getBigUint64(8) & VARIANT_DATA_MASK_64[variant],
      };
    }

    case 5: {
      return {
        ver: 5,
        sha1_high: view.getUint16(0) * 0x10000_0000 + view.getUint32(2),
        sha1_mid: view.getUint16(6) & 0x0fff,
        var: variant,
        sha1_low: view.getBigUint64(8) & VARIANT_DATA_MASK_64[variant],
      };
    }

    case 6: {
      return {
        ver: 6,
        time_high: view.getUint32(0),
        time_mid: view.getUint16(4),
        time_low: view.getUint16(6) & 0x0fff,
        var: variant,
        clock_seq: view.getUint16(8) & VARIANT_DATA_MASK_16[variant],
        node: view.getUint16(10) * 0x10000_0000 + view.getUint32(12),
      };
    }

    case 7: {
      return {
        ver: 7,
        unix_ts_ms: view.getUint16(0) * 0x10000_0000 + view.getUint32(2),
        rand_a: view.getUint16(6) & 0x0fff,
        var: variant,
        rand_b: view.getBigUint64(8) & VARIANT_DATA_MASK_64[variant],
      };
    }

    case 8: {
      return {
        ver: 8,
        custom_a: view.getUint16(0) * 0x10000_0000 + view.getUint32(2),
        custom_b: view.getUint16(6) & 0x0fff,
        var: variant,
        custom_c: view.getBigUint64(8) & VARIANT_DATA_MASK_64[variant],
      };
    }

    case 0:
      // Check for Nil UUID
      if (!bytes.every((b) => b === 0)) {
        throw new Error('Invalid Nil UUID: Not all bytes are zero');
      }
      return { ver: 0, nil: true };

    case 15:
      // Check for Max UUID
      if (!bytes.every((b) => b === 0xff)) {
        throw new Error('Invalid Max UUID: Not all bytes are 0xFF');
      }
      return { ver: 15, max: true };

    default:
      throw new Error(`Unknown UUID version: ${version}`);
  }
}

// =============================================================================
// Generator Functions
// =============================================================================

// UUID v1 epoch: October 15, 1582 (Gregorian calendar start)
const UUID_EPOCH_DIFF = 122192928000000000n; // 100ns intervals from 1582 to 1970

// Converts Unix timestamp in milliseconds to UUID v1 timestamp (100ns intervals since UUID epoch)
function convertUnixTimestampToUUIDv1Timestamp(unix_ts_ms: bigint): bigint {
  return unix_ts_ms * 10000n + UUID_EPOCH_DIFF;
}

// Converts UUID v1 timestamp (100ns intervals since UUID epoch) to Unix timestamp in milliseconds
function convertUUIDv1TimestampToUnixTimestamp(uuid_ts: bigint): number {
  return Number((uuid_ts - UUID_EPOCH_DIFF) / 10000n);
}

// Normalizes a unix_ts_ms option value to bigint milliseconds.
// Returns undefined for missing or unrecognized values.
function toUnixTsMs(value: unknown): bigint | undefined {
  if (value instanceof Date) return BigInt(value.getTime());
  if (typeof value === 'number') return BigInt(value);
  if (typeof value === 'bigint') return value;
  return undefined;
}

// Resolves a 60-bit Gregorian timestamp (100ns intervals since UUID epoch)
// from time/unix_ts_ms options, defaulting to the current time
function resolveGregorianTime(options: {
  time?: unknown;
  unix_ts_ms?: unknown;
}): bigint {
  if (typeof options.time === 'bigint') return options.time;
  const unix_ts_ms = toUnixTsMs(options.unix_ts_ms) ?? BigInt(Date.now());
  return convertUnixTimestampToUUIDv1Timestamp(unix_ts_ms);
}

function generateV1(options: UUIDv1Options): Uint8Array {
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);

  // Extract time_low, time_mid, time_high from timestamp or use provided values
  // timestamp = (time_high << 48) | (time_mid << 32) | time_low
  let time_high: number;
  let time_mid: number;
  let time_low: number;
  if (
    'time_low' in options &&
    'time_mid' in options &&
    'time_high' in options
  ) {
    time_high = options.time_high;
    time_mid = options.time_mid;
    time_low = options.time_low;
  } else {
    const time = resolveGregorianTime(options);
    time_high = Number((time >> 48n) & 0xfffn);
    time_mid = Number((time >> 32n) & 0xffffn);
    time_low = Number(time & 0xffffffffn);
  }

  // time_low: 32 bits (bytes 0-3)
  view.setUint32(0, time_low);

  // time_mid: 16 bits (bytes 4-5)
  view.setUint16(4, time_mid);

  // ver: 4 bits (upper 4 bits of byte 6) + time_high: 12 bits (lower 4 bits of byte 6 + 8 bits of byte 7)
  view.setUint16(6, 0x1000 | (time_high & 0x0fff));

  // var: 2 bits (upper 2 bits of byte 8) for RFC 4122, or 4 bits (upper 4 bits of byte 8) for Microsoft GUID
  // clock_seq: 14 bits (lower 6 bits of byte 8 + 8 bits of byte 9) for RFC 4122, or 13 bits (lower 4 bits of byte 8 + 8 bits of byte 9) for Microsoft GUID
  const variant = options.var ?? 'RFC4122';
  let clock_seq: number;
  if (options.clock_seq != null) {
    clock_seq = options.clock_seq;
  } else {
    const randomBytes = getRandomBytes(2);
    clock_seq = (randomBytes[0] << 8) | randomBytes[1];
  }
  bytes[8] = encodeVariantByte(variant, clock_seq >> 8);
  bytes[9] = clock_seq & 0xff;

  // node: 48 bits (bytes 10-15)
  set48Bits(bytes, view, 10, options.node, 'node');

  return bytes;
}

function generateV2(options: UUIDv2Options): Uint8Array {
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);

  // Extract time_mid, time_high (time_low is replaced by local_id in v2)
  let time_high: number;
  let time_mid: number;
  if ('time_mid' in options && 'time_high' in options) {
    time_high = options.time_high;
    time_mid = options.time_mid;
  } else {
    const time = resolveGregorianTime(options);
    time_high = Number((time >> 48n) & 0xfffn);
    time_mid = Number((time >> 32n) & 0xffffn);
  }

  // local_id: 32 bits (bytes 0-3)
  view.setUint32(0, options.local_id);

  // time_mid: 16 bits (bytes 4-5)
  view.setUint16(4, time_mid);

  // ver: 4 bits + time_high: 12 bits (bytes 6-7)
  view.setUint16(6, 0x2000 | (time_high & 0x0fff));

  // variant + clock_seq_high (byte 8)
  const variant = options.var ?? 'RFC4122';
  const clock_seq_high =
    'clock_seq_high' in options && options.clock_seq_high != null
      ? options.clock_seq_high
      : getRandomBytes(1)[0];
  bytes[8] = encodeVariantByte(variant, clock_seq_high);

  // local_domain: 8 bits (byte 9)
  bytes[9] = options.local_domain & 0xff;

  // node: 48 bits (bytes 10-15)
  set48Bits(bytes, view, 10, options.node, 'node');

  return bytes;
}

// Shared layout for v3/v5/v8 field options:
// 48-bit high (bytes 0-5) + 12-bit mid (bytes 6-7) + 61-63 bit low (bytes 8-15)
function generateFromHighMidLow(
  version: UUIDVersion,
  variant: UUIDVariant,
  high: number | bigint | UUIDBytes,
  mid: number | bigint | UUIDBytes,
  low: bigint | UUIDBytes,
  fieldNames: readonly [string, string, string]
): Uint8Array {
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);
  set48Bits(bytes, view, 0, high, fieldNames[0]);
  setVersionAnd12Bits(bytes, version, mid, fieldNames[1]);
  setVariantAnd64Bits(bytes, view, variant, low, fieldNames[2]);
  return bytes;
}

// Shared layout for v3/v4/v5/v8 raw options:
// 16 bytes of data with version/variant bits overwritten
function generateFromRaw16(
  version: UUIDVersion,
  variant: UUIDVariant,
  raw: UUIDBytes,
  fieldName: string,
  lengthError: string
): Uint8Array {
  const data = uuidBytesToUint8Array(raw);
  if (data == null) {
    throw new Error(`Invalid ${fieldName} type`);
  }
  if (data.length < 16) {
    throw new Error(lengthError);
  }
  const bytes = data.slice(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | (version << 4);
  bytes[8] = encodeVariantByte(variant, bytes[8]);
  return bytes;
}

function generateV3(options: UUIDv3Options): Uint8Array {
  const variant = options.var ?? 'RFC4122';
  if ('md5_high' in options && 'md5_mid' in options && 'md5_low' in options) {
    return generateFromHighMidLow(
      3,
      variant,
      options.md5_high,
      options.md5_mid,
      options.md5_low,
      ['md5_high', 'md5_mid', 'md5_low']
    );
  }
  if ('hash' in options) {
    return generateFromRaw16(
      3,
      variant,
      options.hash,
      'hash',
      'v3 requires a 16-byte pre-computed MD5 hash'
    );
  }
  throw new Error('v3 requires a 16-byte pre-computed MD5 hash');
}

function generateV4(options: UUIDv4Options): Uint8Array {
  const variant = options.var ?? 'RFC4122';

  if ('random' in options) {
    // RandomOptions
    return generateFromRaw16(
      4,
      variant,
      options.random,
      'random',
      'Random data must be at least 16 bytes'
    );
  }

  // FieldOptions — generate random bytes as default, then overwrite with provided values
  const opts = options as UUIDv4FieldOptions;
  const bytes =
    opts.random_a == null || opts.random_b == null || opts.random_c == null
      ? generateRandomUUID({ ver: 4, var: variant })
      : new Uint8Array(16);
  const view = new DataView(bytes.buffer);

  // random_a: 48 bits (bytes 0-5)
  if (opts.random_a != null) {
    set48Bits(bytes, view, 0, opts.random_a, 'random_a');
  }

  // ver + random_b: 12 bits (bytes 6-7)
  if (opts.random_b != null) {
    setVersionAnd12Bits(bytes, 4, opts.random_b, 'random_b');
  } else {
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
  }

  // variant + random_c: 61-63 bits (bytes 8-15)
  if (opts.random_c != null) {
    setVariantAnd64Bits(bytes, view, variant, opts.random_c, 'random_c');
  } else {
    bytes[8] = encodeVariantByte(variant, bytes[8]);
  }

  return bytes;
}

function generateV5(options: UUIDv5Options): Uint8Array {
  const variant = options.var ?? 'RFC4122';
  if (
    'sha1_high' in options &&
    'sha1_mid' in options &&
    'sha1_low' in options
  ) {
    return generateFromHighMidLow(
      5,
      variant,
      options.sha1_high,
      options.sha1_mid,
      options.sha1_low,
      ['sha1_high', 'sha1_mid', 'sha1_low']
    );
  }
  if ('hash' in options) {
    return generateFromRaw16(
      5,
      variant,
      options.hash,
      'hash',
      'v5 requires a 16-byte pre-computed SHA-1 hash (first 16 bytes)'
    );
  }
  throw new Error(
    'v5 requires a 16-byte pre-computed SHA-1 hash (first 16 bytes)'
  );
}

function generateV6(options: UUIDv6Options): Uint8Array {
  const bytes = new Uint8Array(16);
  const view = new DataView(bytes.buffer);

  // Extract time_high, time_mid, time_low
  let time_high: number;
  let time_mid: number;
  let time_low: number;
  if (
    'time_high' in options &&
    'time_mid' in options &&
    'time_low' in options
  ) {
    time_high = options.time_high;
    time_mid = options.time_mid;
    time_low = options.time_low;
  } else {
    // v6 time layout: time_high(32) | time_mid(16) | time_low(12) = 60 bits
    const time = resolveGregorianTime(options);
    time_high = Number((time >> 28n) & 0xffffffffn);
    time_mid = Number((time >> 12n) & 0xffffn);
    time_low = Number(time & 0xfffn);
  }

  // time_high: 32 bits (bytes 0-3)
  view.setUint32(0, time_high);

  // time_mid: 16 bits (bytes 4-5)
  view.setUint16(4, time_mid);

  // ver: 4 bits + time_low: 12 bits (bytes 6-7)
  view.setUint16(6, 0x6000 | (time_low & 0x0fff));

  // variant + clock_seq (bytes 8-9)
  const variant = options.var ?? 'RFC4122';
  let clock_seq: number;
  if ('clock_seq' in options && options.clock_seq != null) {
    clock_seq = options.clock_seq;
  } else {
    const randomBytes = getRandomBytes(2);
    clock_seq = (randomBytes[0] << 8) | randomBytes[1];
  }
  bytes[8] = encodeVariantByte(variant, clock_seq >> 8);
  bytes[9] = clock_seq & 0xff;

  // node: 48 bits (bytes 10-15)
  set48Bits(bytes, view, 10, options.node, 'node');

  return bytes;
}

function generateV7(options: UUIDv7Options): Uint8Array {
  let bytes: Uint8Array;
  let view: DataView;
  const variant = options.var ?? 'RFC4122';
  let setRandom = false;

  // unix_ts_ms: 48 bits (bytes 0-5)
  const unix_ts_ms =
    'unix_ts_ms' in options ? toUnixTsMs(options.unix_ts_ms) : undefined;
  if (
    unix_ts_ms === undefined &&
    !('random' in options) &&
    !('rand_a' in options)
  ) {
    bytes = generateRandomUUID({ ver: 7, var: variant });
    view = new DataView(bytes.buffer);
    setRandom = true;
  } else {
    // Use current time if unix_ts_ms is not provided
    const ts = unix_ts_ms ?? BigInt(Date.now());
    bytes = new Uint8Array(16);
    view = new DataView(bytes.buffer);
    view.setUint16(0, Number((ts >> 32n) & 0xffffn));
    view.setUint32(2, Number(ts & 0xffffffffn));
  }

  if ('random' in options) {
    // RandomOptions — random provides 10 bytes (rand_a + rand_b)
    let randBytes: Uint8Array;
    if (typeof options.random === 'bigint') {
      randBytes = new Uint8Array(10);
      let val = options.random;
      for (let i = 9; i >= 0; i--) {
        randBytes[i] = Number(val & 0xffn);
        val >>= 8n;
      }
    } else {
      const rb = uuidBytesToUint8Array(options.random);
      if (rb == null) {
        throw new Error('Invalid random type');
      }
      if (rb.length < 10) {
        throw new Error('v7 random data must be at least 10 bytes');
      }
      randBytes = rb;
    }
    bytes[6] = 0x70 | (randBytes[0] & 0x0f);
    bytes[7] = randBytes[1];
    bytes[8] = encodeVariantByte(variant, randBytes[2]);
    for (let i = 3; i < 10; i++) {
      bytes[6 + i] = randBytes[i];
    }
  } else {
    // FieldOptions
    const opts = options as UUIDv7FieldOptions;

    // rand_a: 12 bits (bytes 6-7 lower bits)
    if (opts.rand_a != null) {
      setVersionAnd12Bits(bytes, 7, opts.rand_a, 'rand_a');
    } else if (!setRandom) {
      const rb = getRandomBytes(2);
      view.setUint16(6, 0x7000 | (((rb[0] << 8) | rb[1]) & 0x0fff));
    }

    // rand_b: 61-63 bits (bytes 8-15)
    if (opts.rand_b != null) {
      setVariantAnd64Bits(bytes, view, variant, opts.rand_b, 'rand_b');
    } else if (!setRandom) {
      const rand = getRandomBytes(8);
      bytes[8] = encodeVariantByte(variant, rand[0]);
      bytes.set(rand.subarray(1), 9);
    }
  }

  return bytes;
}

function generateV8(options: UUIDv8Options): Uint8Array {
  const variant = options.var ?? 'RFC4122';
  if ('custom_a' in options && 'custom_b' in options && 'custom_c' in options) {
    return generateFromHighMidLow(
      8,
      variant,
      options.custom_a,
      options.custom_b,
      options.custom_c,
      ['custom_a', 'custom_b', 'custom_c']
    );
  }
  if ('custom' in options) {
    return generateFromRaw16(
      8,
      variant,
      options.custom,
      'custom',
      'v8 requires 16 bytes of custom data'
    );
  }
  throw new Error('v8 requires 16 bytes of custom data');
}

function generateNilUUID(): Uint8Array {
  return new Uint8Array(16); // All zeros
}

function generateMaxUUID(): Uint8Array {
  const bytes = new Uint8Array(16);
  bytes.fill(0xff);
  return bytes; // All ones
}

// Last generated state for UUID v7 (to ensure monotonicity)
const lastV7 = { unix_ts_ms: 0, rand_a: 0, perf_now: 0 };

const hasPerformanceNow =
  typeof performance !== 'undefined' && typeof performance.now === 'function';

// Generate a random UUID (default v4) with optional version and variant
function generateRandomUUID(options?: RandomUUIDOptions): Uint8Array {
  const version = options?.ver ?? 4;
  const variant = options?.var ?? 'RFC4122';
  const bytes = getRandomBytes(16);

  if (version === 7) {
    const perf_now = hasPerformanceNow ? performance.now() : 0;
    let unix_ts_ms = Date.now();
    let rand_a = ((bytes[6] << 8) | bytes[7]) & 0x0fff;
    if (unix_ts_ms <= lastV7.unix_ts_ms) {
      unix_ts_ms = lastV7.unix_ts_ms;
      const perfDelta = perf_now - lastV7.perf_now;
      const increment = Math.max(1, Math.floor(perfDelta * 4096));
      const rawRandA = lastV7.rand_a + increment;
      rand_a = rawRandA & 0x0fff;
      if (rawRandA > 0x0fff) unix_ts_ms++;
    }
    lastV7.unix_ts_ms = unix_ts_ms;
    lastV7.rand_a = rand_a;
    lastV7.perf_now = perf_now;
    // Direct byte writes (assignment truncates and wraps to uint8)
    bytes[0] = unix_ts_ms / 0x100_0000_0000;
    bytes[1] = unix_ts_ms / 0x1_0000_0000;
    bytes[2] = unix_ts_ms >>> 24;
    bytes[3] = unix_ts_ms >>> 16;
    bytes[4] = unix_ts_ms >>> 8;
    bytes[5] = unix_ts_ms;
    bytes[6] = 0x70 | (rand_a >> 8);
    bytes[7] = rand_a & 0xff;
  } else {
    // Set version
    bytes[6] = (bytes[6] & 0x0f) | (version << 4);
  }

  // Set variant
  bytes[8] = encodeVariantByte(variant, bytes[8]);

  return bytes;
}

function generateFromOptions(options: UUIDOptions): Uint8Array {
  switch (options.ver) {
    case 1:
      return generateV1(options);
    case 2:
      return generateV2(options);
    case 3:
      return generateV3(options);
    case 4:
      return generateV4(options);
    case 5:
      return generateV5(options);
    case 6:
      return generateV6(options);
    case 7:
      return generateV7(options);
    case 8:
      return generateV8(options);
    case 0:
      return generateNilUUID();
    case 15:
      return generateMaxUUID();
    default:
      throw new Error(
        `Unsupported UUID version: ${(options as UUIDOptions).ver}`
      );
  }
}

// =============================================================================
// Type Guards
// =============================================================================

function isArrayBufferView(value: unknown): value is ArrayBufferView {
  return ArrayBuffer.isView(value);
}

function isArrayBufferLike(value: unknown): value is ArrayBufferLike {
  return (
    value instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer !== 'undefined' &&
      value instanceof SharedArrayBuffer)
  );
}

// =============================================================================
// UUID Class
// =============================================================================

// When set, the next UUID construction adopts these bytes directly instead of
// interpreting its input. Set immediately before a `new UUID()` call by the
// static factory methods and consumed synchronously by the constructor.
let adoptBytes: Uint8Array | undefined;

export class UUID {
  protected readonly bytes: Uint8Array;

  constructor(input?: UUIDInput) {
    if (adoptBytes !== undefined) {
      // Internal fast path: adopt freshly generated bytes directly,
      // skipping input detection and the defensive copy
      this.bytes = adoptBytes;
      adoptBytes = undefined;
    } else if (input instanceof UUID) {
      // Copy from existing UUID
      this.bytes = input.toBytes();
    } else if (typeof input === 'string') {
      this.bytes = parseUUIDString(input);
    } else if (isArrayBufferView(input) || isArrayBufferLike(input)) {
      const bytes = uuidBytesToUint8Array(input);
      if (bytes == null) {
        throw new Error('Invalid UUID byte input');
      }
      if (bytes.length !== 16) {
        throw new Error('UUID bytes must be exactly 16 bytes');
      }
      this.bytes = bytes.slice();
    } else if (input === undefined) {
      // Generate a random UUID v4 by default
      this.bytes = generateRandomUUID();
    } else if (input === null) {
      // Nil UUID
      this.bytes = generateNilUUID();
    } else if (typeof input === 'object' && 'ver' in input) {
      // Check UUIDOptions first to handle high-level generation
      this.bytes = generateFromOptions(input as UUIDOptions);
    } else {
      throw new Error('Invalid UUID input');
    }
  }

  getVersion(): number {
    return detectVersion(this.bytes);
  }

  getVariant(): UUIDVariant {
    return detectVariant(this.bytes);
  }

  getTime(): number {
    const version = this.getVersion();
    switch (version) {
      case 7: {
        const parsed = this.parse() as UUIDv7Parsed;
        return Number(parsed.unix_ts_ms);
      }
      case 1: {
        const parsed = this.parse() as UUIDv1Parsed;
        const timeHi = BigInt(parsed.time_high);
        const timeMid = BigInt(parsed.time_mid);
        const timeLow = BigInt(parsed.time_low >>> 0);
        const timestamp = (timeHi << 48n) | (timeMid << 32n) | timeLow;
        return convertUUIDv1TimestampToUnixTimestamp(timestamp);
      }
      case 2: {
        // V2 replaces time_low with local_id; only time_mid and time_high are available.
        // This can only recover a coarse timestamp (about 429.5-second granularity).
        const parsed = this.parse() as UUIDv2Parsed;
        const timeHi = BigInt(parsed.time_high);
        const timeMid = BigInt(parsed.time_mid);
        const timestamp = (timeHi << 48n) | (timeMid << 32n);
        return convertUUIDv1TimestampToUnixTimestamp(timestamp);
      }
      case 6: {
        const parsed = this.parse() as UUIDv6Parsed;
        const timestamp =
          (BigInt(parsed.time_high) << 28n) |
          (BigInt(parsed.time_mid) << 12n) |
          BigInt(parsed.time_low);
        return convertUUIDv1TimestampToUnixTimestamp(timestamp);
      }
      default:
        throw new Error(
          `getTime() is not available for UUID version ${version}`
        );
    }
  }

  toString(): string {
    return formatUUID(this.bytes);
  }

  toBytes(): Uint8Array {
    return this.bytes.slice();
  }

  toJSON(): string {
    return this.toString();
  }

  parse(): ParsedUUID {
    return parseToStructure(this.bytes);
  }

  equals(other: UUID): boolean {
    for (let i = 0; i < 16; i++) {
      if (this.bytes[i] !== other.bytes[i]) return false;
    }
    return true;
  }

  isNil(): boolean {
    for (let i = 0; i < 16; i++) {
      if (this.bytes[i] !== 0) return false;
    }
    return true;
  }

  isMax(): boolean {
    for (let i = 0; i < 16; i++) {
      if (this.bytes[i] !== 0xff) return false;
    }
    return true;
  }

  static nil(): UUID {
    return new UUID(null);
  }

  static max(): UUID {
    return new UUID({ ver: 15 });
  }

  static random(options?: RandomUUIDOptions): UUID {
    adoptBytes = generateRandomUUID(options);
    return new UUID();
  }
}

export default UUID;
