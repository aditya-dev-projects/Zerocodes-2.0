import React, { useState } from 'react';
import { 
  Box, Type, PlayCircle, Plus, Trash2, GripVertical, 
  FileCode, Braces, Calculator, Repeat, ArrowRight, List
} from 'lucide-react';
import { type BlockDefinition, type BlockInstance, type BlockCategory, Language } from '../types';
import { BlockManager } from '../blocks/manager'; 

// ==================================================================================
// 🎨 COLOR THEMES
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
  'block-lists': 'text-red-600 border-red-500 bg-red-50',
};

// ==================================================================================
// 📂 CATEGORIES
// ==================================================================================

const CATEGORIES: { id: BlockCategory; label: string; icon: any }[] = [
  { id: 'syntax', label: 'Structure', icon: Braces },
  { id: 'includes', label: 'Includes', icon: FileCode },
  { id: 'functions', label: 'Functions', icon: PlayCircle },
  { id: 'io', label: 'I/O', icon: Box },
  { id: 'variables', label: 'Variables', icon: Type },
  { id: 'conditionals', label: 'Conditionals', icon: ArrowRight },
  { id: 'loops', label: 'Loops', icon: Repeat },
  { id: 'operators', label: 'Operators', icon: Calculator },
  { id: 'lists', label: 'Lists', icon: List },
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
  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e1e] text-gray-300">
      {CATEGORIES.map(cat => {
        // GET BLOCKS FROM MANAGER
        const allBlocks = BlockManager.getBlocks(currentLang);
        
        const blocks = allBlocks.filter(b => b.category === cat.id);
        
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
                // CHECK LOCK FROM MANAGER
                isLocked={BlockManager.isLocked(currentLang, def, canvasBlocks, mode)} 
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
  currentLang: Language; // Added prop
}

export const BlockItem: React.FC<BlockRendererProps> = ({ 
  block, onDelete, onUpdate, depth = 0, onDropContainer, moveBlock, userMode, currentLang
}) => {
  const [isOver, setIsOver] = useState(false);
  
  // FIND DEF FROM MANAGER
  const def = BlockManager.getBlocks(currentLang).find(d => d.id === block.type);
  
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
            currentLang={currentLang}
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
            className={`ml-4 pl-4 border-l-2 border-gray-700 mt-1 min-h-[40px] py-4 transition-colors rounded-r-lg ${
              isOver ? 'bg-blue-500/5 border-blue-500/50' : ''
            }`}
            onDragOver={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              setIsOver(true);
            }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 setIsOver(false);
                 const draggedId = e.dataTransfer.getData('block-id');
                 if (draggedId) moveBlock(draggedId, block.id, 'append');
                 else if (onDropContainer) onDropContainer(e);
            }}
        >
          {block.children && renderNestedBlocks(block.children)}
          {(!block.children || block.children.length === 0) && (
             <div className="text-xs text-gray-600 italic pl-2 opacity-40 select-none py-1 pointer-events-none">
               Drop blocks here...
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
  currentLang: Language;
}

export const BlockCanvas: React.FC<CanvasProps> = ({ blocks, setBlocks, userMode, currentLang }) => {
  
  const handleDrop = (e: React.DragEvent, targetBlockId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const draggedBlockId = e.dataTransfer.getData('block-id');
    if (draggedBlockId) return;

    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    const def: BlockDefinition = JSON.parse(data);

    // VALIDATE DROP VIA MANAGER
    const errorMsg = BlockManager.validateDrop(currentLang, def, targetBlockId, userMode);
    if (errorMsg) {
      alert(errorMsg);
      return;
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
            currentLang={currentLang}
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