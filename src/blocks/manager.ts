import { C_BLOCKS, generateC, validateCDrop, checkCLocked } from './c';
import { PYTHON_BLOCKS, generatePython } from './python';
import { Language, type BlockDefinition, type BlockInstance } from '../types';

export const BlockManager = {
  
  // 1. Get Blocks for Sidebar
  getBlocks: (lang: Language): BlockDefinition[] => {
    switch (lang) {
      case Language.C: return C_BLOCKS;
      case Language.PYTHON: return PYTHON_BLOCKS;
      default: return [];
    }
  },

  // 2. Generate Code
  generateCode: (lang: Language, blocks: BlockInstance[], mode: 'beginner' | 'advanced'): string => {
    switch (lang) {
      case Language.C: return generateC(blocks, mode);
      case Language.PYTHON: return generatePython(blocks);
      default: return "// Language not supported";
    }
  },

  // 3. Check Drag & Drop Constraints
  validateDrop: (lang: Language, def: BlockDefinition, targetId: string | undefined, mode: 'beginner' | 'advanced'): string | null => {
    switch (lang) {
      case Language.C: return validateCDrop(def, targetId, mode);
      default: return null; // No constraints for others (e.g. Python)
    }
  },

  // 4. Check Sidebar Locking
  isLocked: (lang: Language, def: BlockDefinition, canvasBlocks: BlockInstance[], mode: 'beginner' | 'advanced'): boolean => {
    switch (lang) {
      case Language.C: return checkCLocked(def, canvasBlocks, mode);
      default: return false;
    }
  }
};