import { expect, it, describe } from 'vitest';
import { validateCreateProject } from '../service';
import type { CreateProjectInput } from '../types.js';

describe('validateCreateProject', () => {
  it('with valid input', () => {
    const input: CreateProjectInput = {
      name: 'My Project',
      key: 'MYPROJ',
      description: 'A great project',
      visibility: 'public',
    };
    const result = validateCreateProject(input);
    expect(result.isOk()).toBe(true);
  });

  it('with invalid key (lowercase)', () => {
    const input: CreateProjectInput = {
      name: 'My Project',
      key: 'myproj',
      description: 'A great project',
      visibility: 'public',
    };
    const result = validateCreateProject(input);
    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.errors.key).toBeDefined();
    }
  });

  it('with invalid key (starts with digit)', () => {
    const input: CreateProjectInput = {
      name: 'My Project',
      key: '1PROJ',
      description: 'A great project',
      visibility: 'public',
    };
    const result = validateCreateProject(input);
    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.errors.key).toBeDefined();
    }
  });

  it('with missing description', () => {
    const input: CreateProjectInput = {
      name: 'My Project',
      key: 'PROJ',
      description: '',
      visibility: 'private',
    };
    const result = validateCreateProject(input);
    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.errors.description).toBeDefined();
    }
  });

  it('with short name', () => {
    const input: CreateProjectInput = {
      name: 'P',
      key: 'PROJ',
      description: 'Description',
      visibility: 'public',
    };
    const result = validateCreateProject(input);
    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.errors.name).toBeDefined();
    }
  });
});
