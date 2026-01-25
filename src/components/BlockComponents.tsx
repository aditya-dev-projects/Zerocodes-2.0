import React from 'react';
import { 
  Box, Type, PlayCircle, Plus, Trash2, GripVertical, 
  FileCode, Braces, Calculator, Repeat, ArrowRight 
} from 'lucide-react';
import { type BlockDefinition, type BlockInstance, type BlockCategory, Language } from '../types';

// ==================================================================================
// 🧱 BLOCK DEFINITIONS
// ==================================================================================

const COLOR_THEMES: Record<string, string> = {
  'block-variables': 'text-orange-600 border-orange-500 bg-orange-50',
  'block-events': 'text-purple-600 border-purple-500 bg-purple-50',
  'block-looks': 'text-blue-600 border-blue-500 bg-blue-50',
  'block-sound': 'text-indigo-600 border-indigo-500 bg-indigo-50',
  'block-operators': 'text-pink-600 border-pink-500 bg-pink-50',
  'block-control': 'text-green-600 border-green-500 bg-green-50',
  'block-motion': 'text-cyan-600 border-cyan-500 bg-cyan-50',
  'block-sensing': 'text-teal-600 border-teal-500 bg-teal-50',
  'block-extension': 'text-gray-600 border-gray-500 bg-gray-50',
};

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  
  // ==============================================================================
  // 🟢 C LANGUAGE BLOCKS
  // ==============================================================================

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
  },

  // ==============================================================================
  // 🐍 PYTHON BLOCKS
  // ==============================================================================

  {
    id: 'py-var-declare',
    category: 'variables',
    label: 'Set Variable',
    code: { python: '{name} = {value}' },
    inputs: [
      { name: 'name', placeholder: 'x', defaultValue: 'x' },
      { name: 'value', placeholder: '5', defaultValue: '5' }
    ],
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'py-bool-declare',
    category: 'variables',
    label: 'Set Boolean',
    code: { python: '{name} = {value}' },
    inputs: [
      { name: 'name', placeholder: 'isReady', defaultValue: 'isReady' },
      { name: 'value', placeholder: 'True/False', defaultValue: 'True' }
    ],
    language: 'python',
    color: 'block-variables'
  },
  {
    id: 'py-list-declare',
    category: 'variables',
    label: 'Create List',
    code: { python: '{name} = [{items}]' },
    inputs: [
      { name: 'name', placeholder: 'myList', defaultValue: 'myList' },
      { name: 'items', placeholder: '1, 2, 3', defaultValue: '1, 2, 3' }
    ],
    language: 'python',
    color: 'block-variables'
  },

  {
    id: 'py-if',
    category: 'conditionals',
    label: 'if',
    code: { python: 'if {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 5' }],
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'py-elif',
    category: 'conditionals',
    label: 'elif',
    code: { python: 'elif {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x < 5', defaultValue: 'x < 5' }],
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'py-else',
    category: 'conditionals',
    label: 'else',
    code: { python: 'else:' },
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },

  {
    id: 'py-for-seq',
    category: 'loops',
    label: 'for item in list',
    code: { python: 'for {item} in {sequence}:' },
    inputs: [
      { name: 'item', placeholder: 'item', defaultValue: 'item' },
      { name: 'sequence', placeholder: 'myList', defaultValue: 'myList' }
    ],
    language: 'python',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'py-for-range',
    category: 'loops',
    label: 'for i in range',
    code: { python: 'for {i} in range({n}):' },
    inputs: [
      { name: 'i', placeholder: 'i', defaultValue: 'i' },
      { name: 'n', placeholder: '10', defaultValue: '10' }
    ],
    language: 'python',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'py-while',
    category: 'loops',
    label: 'while',
    code: { python: 'while {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }],
    language: 'python',
    color: 'block-motion',
    hasChildren: true
  },

  {
    id: 'py-func-def',
    category: 'functions',
    label: 'Define Function',
    code: { python: 'def {name}({params}):' },
    inputs: [
      { name: 'name', placeholder: 'myFunc', defaultValue: 'myFunc' },
      { name: 'params', placeholder: 'arg1', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-events',
    hasChildren: true
  },
  {
    id: 'py-return',
    category: 'functions',
    label: 'return',
    code: { python: 'return {value}' },
    inputs: [{ name: 'value', placeholder: '0', defaultValue: '0' }],
    language: 'python',
    color: 'block-events'
  },

  {
    id: 'py-print',
    category: 'io',
    label: 'print',
    code: { python: 'print("{text}")' },
    inputs: [{ name: 'text', placeholder: 'Hello', defaultValue: 'Hello' }],
    language: 'python',
    color: 'block-looks'
  },
  {
    id: 'py-input-str',
    category: 'io',
    label: 'input (String)',
    code: { python: '{var} = input("{prompt}")' },
    inputs: [
        { name: 'var', placeholder: 'name', defaultValue: 'name' },
        { name: 'prompt', placeholder: 'Enter Name: ', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'py-input-int',
    category: 'io',
    label: 'input (Integer)',
    code: { python: '{var} = int(input("{prompt}"))' },
    inputs: [
        { name: 'var', placeholder: 'age', defaultValue: 'age' },
        { name: 'prompt', placeholder: 'Enter Age: ', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'py-input-float',
    category: 'io',
    label: 'input (Float)',
    code: { python: '{var} = float(input("{prompt}"))' },
    inputs: [
        { name: 'var', placeholder: 'price', defaultValue: 'price' },
        { name: 'prompt', placeholder: 'Enter Price: ', defaultValue: '' }
    ],
    language: 'python',
    color: 'block-sound'
  }
];

const CATEGORIES: { id: BlockCategory; label: string; icon: any }[] = [
  { id: 'includes', label: 'Includes', icon: FileCode },
  { id: 'functions', label: 'Functions', icon: PlayCircle },
  { id: 'io', label: 'I/O', icon: Box },
  { id: 'variables', label: 'Variables', icon: Type },
  { id: 'conditionals', label: 'Conditionals', icon: ArrowRight },
  { id: 'loops', label: 'Loops', icon: Repeat },
  { id: 'operators', label: 'Operators', icon: Calculator },
  { id: 'syntax', label: 'Syntax', icon: Braces },
];

// --- Components ---

export const SidebarItem: React.FC<{ 
  def: BlockDefinition;
  isLocked: boolean;
}> = ({ def, isLocked }) => {
  const onDragStart = (e: React.DragEvent, def: BlockDefinition) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/json', JSON.stringify(def));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const themeClass = COLOR_THEMES[def.color] || 'text-gray-600 border-gray-500 bg-gray-50';

  return (
    <div 
      draggable={!isLocked}
      onDragStart={(e) => onDragStart(e, def)}
      className={`p-2 mb-2 rounded-md border-l-4 border-y border-r flex items-center shadow-sm group transition-all ${
        isLocked ? 'opacity-30 cursor-not-allowed grayscale bg-gray-800 border-gray-700' : `cursor-grab active:cursor-grabbing ${themeClass}`
      }`}
    >
      <GripVertical className={`w-4 h-4 mr-2 ${isLocked ? 'hidden' : 'opacity-50 group-hover:opacity-100'}`} />
      <span className="text-xs font-bold uppercase">{def.label}</span>
    </div>
  );
};

interface BlockSidebarProps {
  currentLang: Language;
  mode: 'beginner' | 'advanced';
  canvasBlocks: BlockInstance[];
}

export const BlockSidebar: React.FC<BlockSidebarProps> = ({ currentLang, mode, canvasBlocks }) => {
  
  const checkIsLocked = (def: BlockDefinition) => {
    if (currentLang !== Language.C || mode === 'advanced') return false;

    const hasMain = canvasBlocks.some(b => b.type === 'c-main-function');
    const hasStdio = canvasBlocks.some(b => b.type === 'c-include-stdio');

    // Rule: main() must exist before Variables, Conditionals, Loops, IO
    const requiresMain = ['variables', 'conditionals', 'loops', 'io'].includes(def.category);
    if (requiresMain && !hasMain) return true;

    // Rule: I/O blocks require stdio.h
    if (def.category === 'io' && !hasStdio) return true;

    return false;
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e1e] text-gray-300">
      {CATEGORIES.map(cat => {
        const blocks = BLOCK_DEFINITIONS.filter(b => {
          if (b.category !== cat.id) return false;
          if (b.language && b.language !== currentLang) return false;
          return true;
        });
        
        if (blocks.length === 0) return null;

        return (
          <div key={cat.id} className="mb-6">
            <div className="flex items-center mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              <cat.icon className="w-4 h-4 mr-2" />
              {cat.label}
            </div>
            {blocks.map(def => (
              <SidebarItem 
                key={def.id} 
                def={def} 
                isLocked={checkIsLocked(def)} 
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

// --- Canvas Components ---

interface BlockRendererProps {
  block: BlockInstance;
  index: number;
  onUpdate: (id: string, name: string, value: string) => void;
  onDelete: (id: string) => void;
  depth?: number;
  onDropContainer?: (e: React.DragEvent) => void; 
  moveBlock: (sourceId: string, targetId: string | null, mode: 'before' | 'append') => void;
  userMode: 'beginner' | 'advanced';
}

export const BlockItem: React.FC<BlockRendererProps> = ({ 
  block, onDelete, onUpdate, depth = 0, onDropContainer, moveBlock, userMode 
}) => {
  const def = BLOCK_DEFINITIONS.find(d => d.id === block.type);
  if (!def) return null;

  const themeClass = COLOR_THEMES[def.color] || 'text-gray-600 border-gray-500 bg-gray-50';

  const renderNestedBlocks = (children: BlockInstance[]) => {
    return children.map((child, idx) => (
       <div
        key={child.id}
        draggable
        onDragStart={(e) => {
            e.stopPropagation();
            e.dataTransfer.setData('block-id', child.id);
        }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={(e) => {
             e.preventDefault();
             e.stopPropagation();
             const draggedId = e.dataTransfer.getData('block-id');
             if (draggedId) moveBlock(draggedId, child.id, 'before');
        }}
       >
          <BlockItem 
            block={child} 
            index={idx} 
            onUpdate={onUpdate} 
            onDelete={onDelete} 
            depth={0}
            moveBlock={moveBlock}
            userMode={userMode}
            onDropContainer={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const draggedId = e.dataTransfer.getData('block-id');
                if (draggedId) {
                    moveBlock(draggedId, child.id, 'append');
                } else {
                     if (onDropContainer) onDropContainer(e);
                }
            }}
          />
       </div>
    ));
  };

  return (
    <div className="relative group mb-2" style={{ marginLeft: `${depth * 20}px` }}>
      <div className={`border-l-4 border-y border-r rounded-r-md p-2 flex flex-wrap items-center shadow-sm ${themeClass}`}>
        <GripVertical className="w-4 h-4 mr-2 opacity-50 cursor-grab active:cursor-grabbing" />
        <span className="text-xs font-bold uppercase mr-3 select-none">{def.label}</span>
        {def.inputs && def.inputs.map((input) => (
          <div key={input.name} className="flex items-center mr-2 mb-1">
             <input 
              type="text" 
              value={block.params[input.name] || ''}
              onChange={(e) => onUpdate(block.id, input.name, e.target.value)}
              className="bg-white/50 text-gray-800 text-xs px-2 py-1 rounded border border-gray-300 focus:border-blue-500 focus:outline-none min-w-[60px] placeholder-gray-500"
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <button 
          onClick={() => onDelete(block.id)}
          className="ml-auto p-1 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {def.hasChildren && (
        <div 
            className="ml-4 pl-4 border-l-2 border-gray-700 mt-1 min-h-[20px] py-1"
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 const draggedId = e.dataTransfer.getData('block-id');
                 if (draggedId) moveBlock(draggedId, block.id, 'append');
                 else if (onDropContainer) onDropContainer(e);
            }}
        >
          {block.children && renderNestedBlocks(block.children)}
          {(!block.children || block.children.length === 0) && (
             <div className="text-xs text-gray-600 italic pl-2 opacity-30 select-none py-1">
               Drop nested blocks here...
             </div>
          )}
        </div>
      )}
    </div>
  );
};

interface CanvasProps {
  blocks: BlockInstance[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockInstance[]>>;
  userMode: 'beginner' | 'advanced';
}

export const BlockCanvas: React.FC<CanvasProps> = ({ blocks, setBlocks, userMode }) => {
  
  const handleDrop = (e: React.DragEvent, targetBlockId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const draggedBlockId = e.dataTransfer.getData('block-id');
    if (draggedBlockId) return;

    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    const def: BlockDefinition = JSON.parse(data);

    // BEGINNER MODE DROP CONSTRAINTS
    if (userMode === 'beginner' && def.language === 'c') {
      // Rule: Logic blocks MUST be inside a container (main or function)
      if (!targetBlockId && !['c-include-stdio', 'c-main-function', 'c-function-declare'].includes(def.id)) {
        alert("Beginner Mode: This block must be placed inside main() or a function container.");
        return;
      }
      
      // Rule: Includes must be at root
      if (targetBlockId && def.category === 'includes') {
        alert("Beginner Mode: Include headers should be at the top level, outside main().");
        return;
      }
    }
    
    const initialParams: Record<string, string> = {};
    if (def.inputs) def.inputs.forEach(inp => initialParams[inp.name] = inp.defaultValue);

    const newBlock: BlockInstance = {
      id: Math.random().toString(36).substr(2, 9),
      type: def.id,
      params: initialParams,
      children: def.hasChildren ? [] : undefined
    };

    if (targetBlockId) {
      const addRecursive = (list: BlockInstance[]): BlockInstance[] => {
        return list.map(b => {
          if (b.id === targetBlockId) {
             const children = b.children || [];
             return { ...b, children: [...children, newBlock] };
          }
          if (b.children) return { ...b, children: addRecursive(b.children) };
          return b;
        });
      };
      setBlocks(prev => addRecursive(prev));
    } else {
      setBlocks(prev => [...prev, newBlock]);
    }
  };

  const moveBlock = (sourceId: string, targetId: string | null, mode: 'before' | 'append') => {
      setBlocks(prev => {
           let newBlocks = JSON.parse(JSON.stringify(prev));
           let sourceBlock: BlockInstance | null = null;
           const remove = (list: BlockInstance[]) => {
               const idx = list.findIndex(b => b.id === sourceId);
               if (idx !== -1) {
                   sourceBlock = list[idx];
                   list.splice(idx, 1);
                   return true;
               }
               for (const b of list) if (b.children && remove(b.children)) return true;
               return false;
           };
           remove(newBlocks);
           if (!sourceBlock) return prev; 

           if (!targetId && mode === 'append') newBlocks.push(sourceBlock);
           else if (targetId) {
               const insert = (list: BlockInstance[]) => {
                  if (mode === 'before') {
                      const idx = list.findIndex(b => b.id === targetId);
                      if (idx !== -1) { list.splice(idx, 0, sourceBlock!); return true; }
                  }
                  if (mode === 'append') {
                      const parent = list.find(b => b.id === targetId);
                      if (parent) {
                          if (!parent.children) parent.children = [];
                          parent.children.push(sourceBlock!);
                          return true;
                      }
                  }
                  for (const b of list) if (b.children && insert(b.children)) return true;
                  return false;
               };
               insert(newBlocks);
           }
           return newBlocks;
      });
  };

  const updateBlock = (id: string, paramName: string, value: string) => {
    const updateRecursive = (list: BlockInstance[]): BlockInstance[] => {
      return list.map(b => {
        if (b.id === id) return { ...b, params: { ...b.params, [paramName]: value } };
        if (b.children) return { ...b, children: updateRecursive(b.children) };
        return b;
      });
    };
    setBlocks(prev => updateRecursive(prev));
  };

  const deleteBlock = (id: string) => {
    const deleteRecursive = (list: BlockInstance[]): BlockInstance[] => {
      return list.filter(b => b.id !== id).map(b => {
        if (b.children) return { ...b, children: deleteRecursive(b.children) };
        return b;
      });
    };
    setBlocks(prev => deleteRecursive(prev));
  };

  const renderBlocks = (list: BlockInstance[], depth: number = 0) => {
    return list.map((block, index) => {
       return (
        <div 
          key={block.id} 
          draggable
          onDragStart={(e) => { e.stopPropagation(); e.dataTransfer.setData('block-id', block.id); }}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const draggedId = e.dataTransfer.getData('block-id');
              if (draggedId) moveBlock(draggedId, block.id, 'before');
          }}
        >
          <BlockItem 
            block={block} 
            index={index} 
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            depth={depth}
            moveBlock={moveBlock}
            userMode={userMode}
            onDropContainer={(e) => handleDrop(e, block.id)}
          />
        </div>
       );
    });
  };

  return (
    <div 
      onDrop={(e) => {
          const draggedId = e.dataTransfer.getData('block-id');
          if (draggedId) { e.preventDefault(); moveBlock(draggedId, null, 'append'); }
          else handleDrop(e);
      }}
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
      className="flex-1 h-full bg-[#1e1e1e] overflow-y-auto p-8 relative"
      style={{ backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    >
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 pointer-events-none">
          <div className="text-center">
            <Plus className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>Drag blocks here to build your program</p>
          </div>
        </div>
      )}
      {renderBlocks(blocks)}
    </div>
  );
};