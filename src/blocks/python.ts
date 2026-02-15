import type{ BlockDefinition, BlockInstance } from '../types';

// ==============================================================================
// 1. BLOCK DEFINITIONS
// ==============================================================================
export const PYTHON_BLOCKS: BlockDefinition[] = [
  // --- ENTRY STRUCTURE ---
  {
    id: 'python-main',
    category: 'syntax',
    label: 'Main Script',
    code: { python: 'if __name__ == "__main__":' },
    language: 'python',
    color: 'block-events',
    hasChildren: true
  },
  // --- VARIABLES ---
  {
    id: 'python-int-declare',
    category: 'variables',
    label: 'Integer',
    code: { python: '{name} = {value}' },
    inputs: [
      { name: 'name', placeholder: 'x', defaultValue: 'x' },
      { name: 'value', placeholder: '0', defaultValue: '0' }
    ],
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'python-float-declare',
    category: 'variables',
    label: 'Float',
    code: { python: '{name} = {value}' },
    inputs: [
      { name: 'name', placeholder: 'pi', defaultValue: 'pi' },
      { name: 'value', placeholder: '3.14', defaultValue: '3.14' }
    ],
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'python-string-declare',
    category: 'variables',
    label: 'String',
    code: { python: '{name} = "{value}"' },
    inputs: [
      { name: 'name', placeholder: 'text', defaultValue: 'text' },
      { name: 'value', placeholder: 'Hello', defaultValue: 'Hello' }
    ],
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'python-bool-declare',
    category: 'variables',
    label: 'Boolean',
    code: { python: '{name} = {value}' },
    inputs: [
      { name: 'name', placeholder: 'is_valid', defaultValue: 'is_valid' },
      { name: 'value', placeholder: 'True', defaultValue: 'True' }
    ],
    language: 'python',
    color: 'block-variables'
  },
  // --- I/O ---
  {
    id: 'python-print',
    category: 'io',
    label: 'print',
    code: { python: 'print({value})' },
    inputs: [{ name: 'value', placeholder: '"Hello World"', defaultValue: '"Hello World"' }],
    language: 'python',
    color: 'block-looks'
  },
  {
    id: 'python-input',
    category: 'io',
    label: 'input',
    code: { python: '{var} = input("{message}")' },
    inputs: [
      { name: 'var', placeholder: 'name', defaultValue: 'name' },
      { name: 'message', placeholder: 'Enter value: ', defaultValue: 'Enter value: ' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'python-int-input',
    category: 'io',
    label: 'input (int)',
    code: { python: '{var} = int(input("{message}"))' },
    inputs: [
      { name: 'var', placeholder: 'age', defaultValue: 'age' },
      { name: 'message', placeholder: 'Enter age: ', defaultValue: 'Enter age: ' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'python-float-input',
    category: 'io',
    label: 'input (float)',
    code: { python: '{var} = float(input("{message}"))' },
    inputs: [
      { name: 'var', placeholder: 'price', defaultValue: 'price' },
      { name: 'message', placeholder: 'Enter price: ', defaultValue: 'Enter price: ' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  // --- CONDITIONALS ---
  {
    id: 'python-if',
    category: 'conditionals',
    label: 'if',
    code: { python: 'if {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x > 0', defaultValue: 'x > 0' }],
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'python-elif',
    category: 'conditionals',
    label: 'elif',
    code: { python: 'elif {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x < 0', defaultValue: 'x < 0' }],
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'python-else',
    category: 'conditionals',
    label: 'else',
    code: { python: 'else:' },
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  // --- LOOPS ---
  {
    id: 'python-for-range',
    category: 'loops',
    label: 'for i in range',
    code: { python: 'for {var} in range({start}, {end}):' },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    language: 'python',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'python-while',
    category: 'loops',
    label: 'while',
    code: { python: 'while {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }],
    language: 'python',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'python-break',
    category: 'loops',
    label: 'break',
    code: { python: 'break' },
    language: 'python',
    color: 'block-motion'
  },
  {
    id: 'python-continue',
    category: 'loops',
    label: 'continue',
    code: { python: 'continue' },
    language: 'python',
    color: 'block-motion'
  },
  // --- FUNCTIONS ---
  {
    id: 'python-function-define',
    category: 'functions',
    label: 'Def Function',
    code: { python: 'def {name}({params}):' },
    inputs: [
      { name: 'name', placeholder: 'my_function', defaultValue: 'my_function' },
      { name: 'params', placeholder: 'arg1', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-events',
    hasChildren: true
  },
  {
    id: 'python-function-call',
    category: 'functions',
    label: 'Call Function',
    code: { python: '{name}({args})' },
    inputs: [
      { name: 'name', placeholder: 'my_function', defaultValue: 'my_function' },
      { name: 'args', placeholder: '', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-events'
  },
  {
    id: 'python-return',
    category: 'functions',
    label: 'return',
    code: { python: 'return {value}' },
    inputs: [{ name: 'value', placeholder: '0', defaultValue: '0' }],
    language: 'python',
    color: 'block-events'
  },
  // --- OPERATORS ---
  {
    id: 'python-add',
    category: 'operators',
    label: 'Add (+)',
    code: { python: '{a} + {b}' },
    inputs: [
      { name: 'a', placeholder: 'x', defaultValue: 'x' },
      { name: 'b', placeholder: 'y', defaultValue: 'y' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-subtract',
    category: 'operators',
    label: 'Subtract (-)',
    code: { python: '{a} - {b}' },
    inputs: [
      { name: 'a', placeholder: 'x', defaultValue: 'x' },
      { name: 'b', placeholder: 'y', defaultValue: 'y' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-multiply',
    category: 'operators',
    label: 'Multiply (*)',
    code: { python: '{a} * {b}' },
    inputs: [
      { name: 'a', placeholder: 'x', defaultValue: 'x' },
      { name: 'b', placeholder: 'y', defaultValue: 'y' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-divide',
    category: 'operators',
    label: 'Divide (/)',
    code: { python: '{a} / {b}' },
    inputs: [
      { name: 'a', placeholder: 'x', defaultValue: 'x' },
      { name: 'b', placeholder: 'y', defaultValue: 'y' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-modulus',
    category: 'operators',
    label: 'Modulus (%)',
    code: { python: '{a} % {b}' },
    inputs: [
      { name: 'a', placeholder: 'x', defaultValue: 'x' },
      { name: 'b', placeholder: 'y', defaultValue: 'y' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  // --- LISTS ---
  {
    id: 'python-list-declare',
    category: 'lists',
    label: 'Create List',
    code: { python: '{name} = [{values}]' },
    inputs: [
      { name: 'name', placeholder: 'numbers', defaultValue: 'numbers' },
      { name: 'values', placeholder: '1, 2, 3', defaultValue: '1, 2, 3' }
    ],
    language: 'python',
    color: 'block-lists'
  },
  {
    id: 'python-append',
    category: 'lists',
    label: 'List Append',
    code: { python: '{name}.append({value})' },
    inputs: [
      { name: 'name', placeholder: 'numbers', defaultValue: 'numbers' },
      { name: 'value', placeholder: '4', defaultValue: '4' }
    ],
    language: 'python',
    color: 'block-lists'
  },
  {
    id: 'python-list-access',
    category: 'lists',
    label: 'Access Item',
    code: { python: '{name}[{index}]' },
    inputs: [
      { name: 'name', placeholder: 'numbers', defaultValue: 'numbers' },
      { name: 'index', placeholder: '0', defaultValue: '0' }
    ],
    language: 'python',
    color: 'block-lists'
  }
];

// ==============================================================================
// 2. CONSTRAINT LOGIC
// ==============================================================================

export const generatePython = (blocks: BlockInstance[]): string => {
  const generateBlock = (block: BlockInstance, indentLevel: number): string => {
    const indent = "    ".repeat(indentLevel);
    const def = PYTHON_BLOCKS.find(d => d.id === block.type);
    if (!def) return `${indent}# Unknown block: ${block.type}\n`;

    let template = def.code['python'] || "";
    Object.entries(block.params).forEach(([key, value]) => {
        template = template.split(`{${key}}`).join(value);
    });

    let result = indent + template + "\n";

    if (block.children && block.children.length > 0) {
        block.children.forEach(child => {
            result += generateBlock(child, indentLevel + 1);
        });
    } else if (def.hasChildren) {
        // Python requires 'pass' for empty blocks
        result += indent + "    pass\n";
    }

    return result;
  };

  return blocks.map(b => generateBlock(b, 0)).join("");
};