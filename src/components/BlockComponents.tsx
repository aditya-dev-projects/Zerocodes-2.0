
import React from 'react';
import { Box, Layers, Type, PlayCircle, Plus, X, GripVertical, FileCode, Terminal, Braces, Calculator, Repeat, ArrowRight } from 'lucide-react';
import { type BlockDefinition, type BlockInstance, type BlockCategory, Language } from '../types';

// --- Constants ---

// Mapping user color themes to Tailwind classes
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
  // --- C Blocks ---
  {
    id: 'c-include-stdio',
    category: 'includes',
    label: '#include <stdio.h>',
    code: { c: '#include <stdio.h>' },
    language: 'c',
    color: 'block-variables'
  },
  {
    id: 'c-include-stdlib',
    category: 'includes',
    label: '#include <stdlib.h>',
    code: { c: '#include <stdlib.h>' },
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
    inputs: [{ name: 'var', placeholder: 'number', defaultValue: 'num' }],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-scanf-string',
    category: 'io',
    label: 'read string',
    code: { c: 'scanf("%s", {var});' },
    inputs: [{ name: 'var', placeholder: 'text', defaultValue: 'str' }],
    language: 'c',
    color: 'block-sound'
  },
  {
    id: 'c-int-declare',
    category: 'variables',
    label: 'create integer',
    code: { c: 'int {name} = {value};' },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    language: 'c',
    color: 'block-operators'
  },
  {
    id: 'c-string-declare',
    category: 'variables',
    label: 'create string',
    code: { c: 'char {name}[100] = "{value}";' },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    language: 'c',
    color: 'block-operators'
  },
  {
    id: 'c-if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: { c: 'if ({condition}) {' },
    inputs: [{ name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }],
    language: 'c',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'c-else-statement',
    category: 'conditionals',
    label: 'else',
    code: { c: '} else {' },
    language: 'c',
    color: 'block-control',
    hasChildren: true
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
    id: 'c-return-statement',
    category: 'functions',
    label: 'return',
    code: { c: 'return {value};' },
    inputs: [{ name: 'value', placeholder: '0', defaultValue: '0' }],
    language: 'c',
    color: 'block-events'
  },
  {
    id: 'c-assign',
    category: 'operators',
    label: 'set variable',
    code: { c: '{var} = {value};' },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    language: 'c',
    color: 'block-sensing'
  },
  {
    id: 'c-increment',
    category: 'operators',
    label: 'increment',
    code: { c: '{var}++;' },
    inputs: [{ name: 'var', placeholder: 'variable', defaultValue: 'x' }],
    language: 'c',
    color: 'block-sensing'
  },

  // --- Java Blocks ---
  {
    id: 'java-scanner-import',
    category: 'includes',
    label: 'import java.util.Scanner',
    code: { java: 'import java.util.Scanner;' },
    language: 'java',
    color: 'block-variables'
  },
  {
    id: 'java-class-declaration',
    category: 'includes',
    label: 'Java Class Declaration',
    code: { java: 'public class Main {' },
    language: 'java',
    color: 'block-variables',
    hasChildren: true
  },
  {
    id: 'java-main-method',
    category: 'functions',
    label: 'Java Main Method',
    code: { java: 'public static void main(String[] args) {' },
    language: 'java',
    color: 'block-events',
    hasChildren: true
  },
  {
    id: 'java-scanner',
    category: 'io',
    label: 'Java Scanner',
    code: { java: 'Scanner scanner = new Scanner(System.in);' },
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-println',
    category: 'io',
    label: 'print message',
    code: { java: 'System.out.println("{text}");' },
    inputs: [{ name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }],
    language: 'java',
    color: 'block-looks'
  },
  {
    id: 'java-nextInt',
    category: 'io',
    label: 'read integer',
    code: { java: '{var} = scanner.nextInt();' },
    inputs: [{ name: 'var', placeholder: 'number', defaultValue: 'num' }],
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-next',
    category: 'io',
    label: 'read string',
    code: { java: '{var} = scanner.next();' },
    inputs: [{ name: 'var', placeholder: 'text', defaultValue: 'str' }],
    language: 'java',
    color: 'block-sound'
  },
  {
    id: 'java-int-declare',
    category: 'variables',
    label: 'create integer',
    code: { java: 'int {name} = {value};' },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    language: 'java',
    color: 'block-operators'
  },
  {
    id: 'java-string-declare',
    category: 'variables',
    label: 'create string',
    code: { java: 'String {name} = "{value}";' },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    language: 'java',
    color: 'block-operators'
  },
  {
    id: 'java-if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: { java: 'if ({condition}) {' },
    inputs: [{ name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }],
    language: 'java',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'java-else-statement',
    category: 'conditionals',
    label: 'else',
    code: { java: '} else {' },
    language: 'java',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'java-for-loop',
    category: 'loops',
    label: 'for loop',
    code: { java: 'for (int {var} = {start}; {var} < {end}; {var}++) {' },
    inputs: [
      { name: 'var', placeholder: 'i', defaultValue: 'i' },
      { name: 'start', placeholder: '0', defaultValue: '0' },
      { name: 'end', placeholder: '10', defaultValue: '10' }
    ],
    language: 'java',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'java-while-loop',
    category: 'loops',
    label: 'while loop',
    code: { java: 'while ({condition}) {' },
    inputs: [{ name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }],
    language: 'java',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'java-return-statement',
    category: 'functions',
    label: 'return',
    code: { java: 'return {value};' },
    inputs: [{ name: 'value', placeholder: '0', defaultValue: '0' }],
    language: 'java',
    color: 'block-events'
  },
  {
    id: 'java-assign',
    category: 'operators',
    label: 'set variable',
    code: { java: '{var} = {value};' },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    language: 'java',
    color: 'block-sensing'
  },
  {
    id: 'java-increment',
    category: 'operators',
    label: 'increment',
    code: { java: '{var}++;' },
    inputs: [{ name: 'var', placeholder: 'variable', defaultValue: 'x' }],
    language: 'java',
    color: 'block-sensing'
  },

  // --- Python Blocks ---
  {
    id: 'python-main-block',
    category: 'includes',
    label: 'Python Main Block',
    code: { python: 'if __name__ == "__main__":' },
    language: 'python',
    color: 'block-variables',
    hasChildren: true
  },
  {
    id: 'python-print',
    category: 'io',
    label: 'print message',
    code: { python: 'print("{text}")' },
    inputs: [{ name: 'text', placeholder: 'Hello World', defaultValue: 'Hello World' }],
    language: 'python',
    color: 'block-looks'
  },
  {
    id: 'python-input-int',
    category: 'io',
    label: 'read integer',
    code: { python: '{var} = int(input())' },
    inputs: [{ name: 'var', placeholder: 'number', defaultValue: 'num' }],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'python-input-string',
    category: 'io',
    label: 'read string',
    code: { python: '{var} = input()' },
    inputs: [{ name: 'var', placeholder: 'text', defaultValue: 'str' }],
    language: 'python',
    color: 'block-sound'
  },
  {
    id: 'python-int-declare',
    category: 'variables',
    label: 'create integer',
    code: { python: '{name} = {value}' },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '0' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-string-declare',
    category: 'variables',
    label: 'create string',
    code: { python: '{name} = "{value}"' },
    inputs: [
      { name: 'name', placeholder: 'variable name', defaultValue: 'text' },
      { name: 'value', placeholder: 'value', defaultValue: 'hello' }
    ],
    language: 'python',
    color: 'block-operators'
  },
  {
    id: 'python-if-statement',
    category: 'conditionals',
    label: 'if condition',
    code: { python: 'if {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x > 5', defaultValue: 'x > 0' }],
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'python-else-statement',
    category: 'conditionals',
    label: 'else',
    code: { python: 'else:' },
    language: 'python',
    color: 'block-control',
    hasChildren: true
  },
  {
    id: 'python-for-loop',
    category: 'loops',
    label: 'for loop',
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
    id: 'python-while-loop',
    category: 'loops',
    label: 'while loop',
    code: { python: 'while {condition}:' },
    inputs: [{ name: 'condition', placeholder: 'x < 10', defaultValue: 'x < 10' }],
    language: 'python',
    color: 'block-motion',
    hasChildren: true
  },
  {
    id: 'python-return-statement',
    category: 'functions',
    label: 'return',
    code: { python: 'return {value}' },
    inputs: [{ name: 'value', placeholder: '0', defaultValue: '0' }],
    language: 'python',
    color: 'block-events'
  },
  {
    id: 'python-assign',
    category: 'operators',
    label: 'set variable',
    code: { python: '{var} = {value}' },
    inputs: [
      { name: 'var', placeholder: 'variable', defaultValue: 'x' },
      { name: 'value', placeholder: 'value', defaultValue: '10' }
    ],
    language: 'python',
    color: 'block-sensing'
  },
  {
    id: 'python-increment',
    category: 'operators',
    label: 'increment',
    code: { python: '{var} += 1' },
    inputs: [{ name: 'var', placeholder: 'variable', defaultValue: 'x' }],
    language: 'python',
    color: 'block-sensing'
  },

  // --- Generic/Syntax ---
  {
    id: 'closing-brace',
    category: 'syntax',
    label: 'closing brace }',
    code: { c: '}', java: '}' },
    language: 'c',
    color: 'block-extension'
  },
  {
    id: 'closing-brace-java',
    category: 'syntax',
    label: 'closing brace }',
    code: { java: '}' },
    language: 'java',
    color: 'block-extension'
  },
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

export const SidebarItem: React.FC<{ def: BlockDefinition }> = ({ def }) => {
  const onDragStart = (e: React.DragEvent, def: BlockDefinition) => {
    e.dataTransfer.setData('application/json', JSON.stringify(def));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const themeClass = COLOR_THEMES[def.color] || 'text-gray-600 border-gray-500 bg-gray-50';

  return (
    <div 
      draggable 
      onDragStart={(e) => onDragStart(e, def)}
      className={`p-2 mb-2 rounded-md border-l-4 border-y border-r cursor-grab active:cursor-grabbing flex items-center shadow-sm group transition-all ${themeClass}`}
    >
      <GripVertical className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
      <span className="text-xs font-bold uppercase">{def.label}</span>
    </div>
  );
};

interface BlockSidebarProps {
  currentLang: Language;
}

export const BlockSidebar: React.FC<BlockSidebarProps> = ({ currentLang }) => {
  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e1e] text-gray-300">
      {CATEGORIES.map(cat => {
        const blocks = BLOCK_DEFINITIONS.filter(b => {
          // Match Category
          if (b.category !== cat.id) return false;
          // Match Language
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
              <SidebarItem key={def.id} def={def} />
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
}

export const BlockItem: React.FC<BlockRendererProps> = ({ block, onDelete, onUpdate, depth = 0 }) => {
  const def = BLOCK_DEFINITIONS.find(d => d.id === block.type);
  if (!def) return null;

  const themeClass = COLOR_THEMES[def.color] || 'text-gray-600 border-gray-500 bg-gray-50';

  return (
    <div className="relative group mb-2" style={{ marginLeft: `${depth * 20}px` }}>
      <div className={`border-l-4 border-y border-r rounded-r-md p-2 flex flex-wrap items-center shadow-sm ${themeClass}`}>
        
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
          className="ml-auto p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Render Children for Control blocks */}
      {def.hasChildren && (
        <div className="ml-4 pl-4 border-l-2 border-gray-700 mt-1 min-h-[20px] py-1">
          {block.children?.map((child, idx) => (
            <BlockItem 
              key={child.id} 
              block={child} 
              index={idx} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
              depth={0} 
            />
          ))}
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
}

export const BlockCanvas: React.FC<CanvasProps> = ({ blocks, setBlocks }) => {
  
  const handleDrop = (e: React.DragEvent, targetBlockId?: string) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    const def: BlockDefinition = JSON.parse(data);
    
    // Initialize params with defaults
    const initialParams: Record<string, string> = {};
    if (def.inputs) {
      def.inputs.forEach(inp => {
        initialParams[inp.name] = inp.defaultValue;
      });
    }

    const newBlock: BlockInstance = {
      id: Math.random().toString(36).substr(2, 9),
      type: def.id,
      params: initialParams,
      children: def.hasChildren ? [] : undefined
    };

    if (targetBlockId) {
      // Add to children of target
      const addRecursive = (list: BlockInstance[]): BlockInstance[] => {
        return list.map(b => {
          if (b.id === targetBlockId && b.children) {
            return { ...b, children: [...b.children, newBlock] };
          }
          if (b.children) {
            return { ...b, children: addRecursive(b.children) };
          }
          return b;
        });
      };
      setBlocks(prev => addRecursive(prev));
    } else {
      // Add to root
      setBlocks(prev => [...prev, newBlock]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const updateBlock = (id: string, paramName: string, value: string) => {
    const updateRecursive = (list: BlockInstance[]): BlockInstance[] => {
      return list.map(b => {
        if (b.id === id) {
           return { ...b, params: { ...b.params, [paramName]: value } };
        }
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
       const def = BLOCK_DEFINITIONS.find(d => d.id === block.type);
       const isContainer = def?.hasChildren;

       return (
        <div 
          key={block.id} 
          onDragOver={(e) => {
            if (isContainer) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onDrop={(e) => {
            if (isContainer) {
              handleDrop(e, block.id);
            }
          }}
        >
          <BlockItem 
            block={block} 
            index={index} 
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            depth={depth}
          />
        </div>
       );
    });
  };

  return (
    <div 
      onDrop={(e) => handleDrop(e)} 
      onDragOver={handleDragOver}
      className="flex-1 h-full bg-[#1e1e1e] overflow-y-auto p-8 relative"
      style={{ 
        backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)', 
        backgroundSize: '20px 20px' 
      }}
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
