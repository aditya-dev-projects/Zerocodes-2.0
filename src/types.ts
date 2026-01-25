export const Language = {
  C: 'c',
  PYTHON: 'python',
  // JAVA: 'java' // Temporarily disabled for future update
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
  EXECUTE: 'execute'
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
  code: Record<string, string>; 
  inputs?: BlockInputDefinition[];
  language?: string; 
  color: string; 
  hasChildren?: boolean; 
}

export interface BlockInstance {
  id: string;
  type: string; 
  params: Record<string, string>; 
  children?: BlockInstance[]; 
}

// --- NEW PROFILE TYPE ---
export interface Profile {
  id: string;
  full_name: string | null;
  experience_level: 'Beginner' | 'Intermediate' | 'Pro' | null;
  has_seen_tutorial: boolean;
  email?: string;
}