import { describe, expect, test } from '@jest/globals';
import packageJson from '../package.json';

describe('Test package.json entry points.', () => {
  test('test react-native entry point', () => {
    expect(packageJson['react-native']).toBe('lib/src/index');
  });

  test('test main entry point', () => {
    expect(packageJson.main).toBe('lib/commonjs/index');
  });

  test('test module entry point', () => {
    expect(packageJson.module).toBe('lib/module/index');
  });

  test('test types entry point', () => {
    expect(packageJson.types).toBe('lib/typescript/index.d.ts');
  });
});
