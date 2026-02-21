import type { BlockDefinition, BlockInstance } from '../types';

// ==============================================================================
// 1. BLOCK DEFINITIONS
// ==============================================================================
export const C_BLOCKS: BlockDefinition[] = [
  {
    id: 'c-int-declare',
    category: 'variables',
    label: 'int (Integer)',
    code: { c: 'int {name} = {value};' },
    inputs: [
      { name: 'name', placeholder: 'varName', defaultValue: 'x' },
      { name: 'value', placeholder: '0', defaultValue: '0' }
    ],
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-float-declare',
    category: 'variables',
    label: 'float (Decimal)',
    code: { c: 'float {name} = {value};' },
    inputs: [
      { name: 'name', placeholder: 'varName', defaultValue: 'pi' },
      { name: 'value', placeholder: '3.14', defaultValue: '3.14' }
    ],
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-double-declare',
    category: 'variables',
    label: 'double (Precise Decimal)',
    code: { c: 'double {name} = {value};' },
    inputs: [
      { name: 'name', placeholder: 'varName', defaultValue: 'd' },
      { name: 'value', placeholder: '0.0', defaultValue: '0.0' }
    ],
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-char-declare',
    category: 'variables',
    label: 'char (Character)',
    code: { c: 'char {name} = \'{value}\';' },
    inputs: [
      { name: 'name', placeholder: 'varName', defaultValue: 'c' },
      { name: 'value', placeholder: 'A', defaultValue: 'A' }
    ],
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-string-declare',
    category: 'variables',
    label: 'String (char array)',
    code: { c: 'char {name}[] = "{value}";' },
    inputs: [
      { name: 'name', placeholder: 'varName', defaultValue: 'text' },
      { name: 'value', placeholder: 'Hello', defaultValue: 'Hello' }
    ],
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-bool-declare',
    category: 'variables',
    label: 'Boolean (int/ _Bool)',
    code: { c: 'int {name} = {value}; // 0=false, 1=true' },
    inputs: [
      { name: 'name', placeholder: 'isValid', defaultValue: 'isValid' },
      { name: 'value', placeholder: '1', defaultValue: '1' }
    ],
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-if',
    category: 'conditionals',
    label: 'if',
    code: { c: 'if ({condition}) {' },
    inputs: [{ name: 'condition', placeholder: 'x > 0', defaultValue: 'x > 0' }],
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-else-if',
    category: 'conditionals',
    label: 'else if',
    code: { c: '} else if ({condition}) {' },
    inputs: [{ name: 'condition', placeholder: 'x < 0', defaultValue: 'x < 0' }],
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-else',
    category: 'conditionals',
    label: 'else',
    code: { c: '} else {' },
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-switch',
    category: 'conditionals',
    label: 'switch',
    code: { c: 'switch ({variable}) {' },
    inputs: [{ name: 'variable', placeholder: 'variable', defaultValue: 'day' }],
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-case',
    category: 'conditionals',
    label: 'case',
    code: { c: 'case {value}:' },
    inputs: [{ name: 'value', placeholder: '1', defaultValue: '1' }],
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-default',
    category: 'conditionals',
    label: 'default',
    code: { c: 'default:' },
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-break',
    category: 'conditionals',
    label: 'break',
    code: { c: 'break;' },
    language: 'c',
    color: 'block-control'
  },
  {
    id: 'c-for-loop',
    category: 'loops',
    label: 'for loop',
    code: { c: 'for (int {var} = {start}; {var} < {end}; {var}++) {' },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    language: 'c',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'c-while-loop',
    category: 'loops',
    label: 'while loop',
    code: { c: 'while ({condition}) {' },
    inputs: [{ name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }],
    language: 'c',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'c-do-while',
    category: 'loops',
    label: 'do-while loop',
    code: { c: 'do {\n    // code\n} while ({condition});' },
    inputs: [{ name: 'condition', placeholder: 'x != 0', defaultValue: 'x != 0' }],
    language: 'c',
    color: 'block-motion'
  },
  {
    id: 'c-function-declare',
    category: 'functions',
    label: 'Define Function',
    code: { c: '{type} {name}({params}) {' },
    inputs: [
      { name: 'type', placeholder: 'void/int', defaultValue: 'void' },
      { name: 'name', placeholder: 'myFunc', defaultValue: 'myFunc' },
      { name: 'params', placeholder: 'int x', defaultValue: '' }
    ],
    language: 'c',
    color: 'block-events',
    hasChildren: true
  },
  {
    id: 'c-function-call',
    category: 'functions',
    label: 'Call Function',
    code: { c: '{name}({args});' },
    inputs: [
        { name: 'name', placeholder: 'myFunc', defaultValue: 'myFunc' },
        { name: 'args', placeholder: '10', defaultValue: '' }
    ],
    language: 'c',
    color: 'block-events'
  },
  {
    id: 'c-return',
    category: 'functions',
    label: 'return',
    code: { c: 'return {value};' },
    inputs: [{ name: 'value', placeholder: '0', defaultValue: '0' }],
    language: 'c',
    color: 'block-events'
  },
  {
    id: 'c-include-stdio',
    category: 'includes',
    label: '#include <stdio.h>',
    code: { c: '#include <stdio.h>' },
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-main-function',
    category: 'functions',
    label: 'main function',
    code: { c: 'int main() {' },
    language: 'c',
    color: 'block-events',
    hasChildren: true
  },
  {
    id: 'c-printf',
    category: 'io',
    label: 'print message',
    code: { c: 'printf("{text}\\n");' },
    inputs: [{ name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }],
    language: 'c',
    color: 'block-looks'
  },
  {
    id: 'c-scanf-int',
    category: 'io',
    label: 'read integer',
    code: { c: 'scanf("%d", &{var});' },
    inputs: [{ name: 'var', placeholder: 'variable name', defaultValue: 'num' }],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-scanf-float',
    category: 'io',
    label: 'read float',
    code: { c: 'scanf("%f", &{var});' },
    inputs: [{ name: 'var', placeholder: 'variable name', defaultValue: 'num' }],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-scanf-double',
    category: 'io',
    label: 'read double',
    code: { c: 'scanf("%lf", &{var});' },
    inputs: [{ name: 'var', placeholder: 'variable name', defaultValue: 'num' }],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-scanf-char',
    category: 'io',
    label: 'read char',
    code: { c: 'scanf(" %c", &{var});' },
    inputs: [{ name: 'var', placeholder: 'variable name', defaultValue: 'c' }],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-scanf-string',
    category: 'io',
    label: 'read string',
    code: { c: 'scanf("%s", {var});' },
    inputs: [{ name: 'var', placeholder: 'variable name', defaultValue: 'str' }],
    language: 'c',
    color: 'block-sound'
  }
];

// ==============================================================================
// 2. CONSTRAINT LOGIC
// ==============================================================================

export const checkCLocked = (def: BlockDefinition, canvasBlocks: BlockInstance[], mode: 'beginner' | 'advanced'): boolean => {
  if (mode === 'advanced') return false;

  const hasMain = canvasBlocks.some(b => b.type === 'c-main-function');
  const hasStdio = canvasBlocks.some(b => b.type === 'c-include-stdio');

  // Lock logic/variables/io if no Main function exists
  const requiresMain = ['variables', 'conditionals', 'loops', 'io'].includes(def.category);
  if (requiresMain && !hasMain) return true;

  // Lock I/O if no stdio included
  if (def.category === 'io' && !hasStdio) return true;

  return false;
};

export const validateCDrop = (def: BlockDefinition, targetBlockId: string | undefined, mode: 'beginner' | 'advanced'): string | null => {
  if (mode === 'advanced') return null;

  // Beginner mode: Must be inside main or function
  if (!targetBlockId && !['c-include-stdio', 'c-main-function', 'c-function-declare'].includes(def.id)) {
    return "Beginner Mode: This block must be placed inside main() or a function container.";
  }
  
  // Beginner mode: Includes must be top level
  if (targetBlockId && def.category === 'includes') {
    return "Beginner Mode: Include headers should be at the top level, outside main().";
  }

  return null;
};

// ==============================================================================
// 3. CODE GENERATOR
// ==============================================================================

export const generateC = (blocks: BlockInstance[], mode: 'beginner' | 'advanced'): string => {
  
  // A. Validation
  if (mode === 'beginner') {
    const hasStdio = blocks.some(b => b.type === 'c-include-stdio');
    const hasMain = blocks.some(b => b.type === 'c-main-function');
    
    const ioBlockTypes = ['c-printf', 'c-scanf-int', 'c-scanf-float', 'c-scanf-double', 'c-scanf-char', 'c-scanf-string'];
    const hasIO = blocks.some(b => ioBlockTypes.includes(b.type));
    
    if (hasIO && !hasStdio) {
      return "// BEGINNER MODE ERROR:\n// You are using an I/O block (like print or read).\n// You must add the '#include <stdio.h>' block at the top level first.";
    }

    const rootLogicBlocks = blocks.filter(b => 
      !['c-include-stdio', 'c-main-function', 'c-function-declare'].includes(b.type)
    );
    if (rootLogicBlocks.length > 0 && !hasMain) {
       return "// BEGINNER MODE ERROR:\n// Logic blocks (variables, loops, conditionals) must be placed INSIDE the 'main function' block.";
    }
  }

  // B. Generation Helper
  const generateBlock = (block: BlockInstance, indentLevel: number): string => {
    const indent = "    ".repeat(indentLevel);
    const def = C_BLOCKS.find(d => d.id === block.type);
    if (!def) return `${indent}// Unknown block: ${block.type}\n`;
    
    let template = def.code['c'] || "";
    Object.entries(block.params).forEach(([key, value]) => {
      template = template.split(`{${key}}`).join(value);
    });
    
    let result = indent + template + "\n";
    
    if (block.children && block.children.length > 0) {
      block.children.forEach(child => {
        result += generateBlock(child, indentLevel + 1);
      });
      if (template.trim().endsWith('{')) { result += indent + "}\n"; }
    }
    return result;
  };

  // C. Structure Assembly
  const includes: string[] = [];
  const bodyBlocks: BlockInstance[] = [];

  blocks.forEach(b => {
      const def = C_BLOCKS.find(d => d.id === b.type);
      const isInclude = def?.category === 'includes' || def?.code['c']?.trim().startsWith('#include');
      
      if (isInclude) {
          includes.push(generateBlock(b, 0).trim());
      } else {
          bodyBlocks.push(b);
      }
  });

  let includesCode = includes.join("\n");
  const bodyRaw = bodyBlocks.map(b => generateBlock(b, 0)).join("");

  // Auto-wrap in main if likely intended (Advanced mode specific helpfulness)
  if (bodyBlocks.length > 0 && !bodyRaw.includes("main(")) {
      if (!includesCode.includes("<stdio.h>")) {
          includesCode = `#include <stdio.h>\n${includesCode}`;
      }
      const bodyIndented = bodyBlocks.map(b => generateBlock(b, 1)).join("");
      const mainFunc = `int main() {\n${bodyIndented}    return 0;\n}`;
      return includesCode.trim() ? `${includesCode.trim()}\n\n${mainFunc}` : mainFunc;
  }
  
  return includesCode ? `${includesCode}\n\n${bodyRaw}` : bodyRaw;
};