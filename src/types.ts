
export const Language = {
  C: 'c',
  PYTHON: 'python',
  JAVA: 'java'
} as const;

export type Language = typeof Language[keyof typeof Language];

export const ExecutionStatus = {
  IDLE: 'idle',
  COMPILING: 'compiling',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export type ExecutionStatus = typeof ExecutionStatus[keyof typeof ExecutionStatus];

export interface ExecutionResult {
  output: string;
  status: ExecutionStatus;
  executionTime?: number;
}

export const ToolMode = {
  EXECUTE: 'execute',
  EXPLAIN: 'explain',
  DEBUG: 'debug',
  OPTIMIZE: 'optimize'
} as const;

export type ToolMode = typeof ToolMode[keyof typeof ToolMode];

// --- Visual Block Types ---

export type BlockCategory = 'io' | 'variables' | 'conditionals' | 'functions' | 'includes' | 'operators' | 'loops' | 'syntax';

export interface BlockInputDefinition {
  name: string;
  placeholder: string;
  defaultValue: string;
}

export interface BlockDefinition {
  id: string;
  label: string;
  category: BlockCategory;
  code: Record<string, string>; // Language -> Code Template (e.g. "printf("{text}");")
  inputs?: BlockInputDefinition[];
  language?: string; // 'c' | 'python' | 'java' for filtering
  color: string; // Visual identifier
  hasChildren?: boolean; // Manually flagged for nesting support
}

export interface BlockInstance {
  id: string;
  type: string; // Corresponds to BlockDefinition.id
  params: Record<string, string>; // Key-value pair for inputs
  children?: BlockInstance[]; // For nesting (loops/ifs)
}
