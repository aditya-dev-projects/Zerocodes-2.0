import React from 'react';
import { 
  Book, FileText, 
  ShieldAlert, Globe, BookOpen, Bug, Sparkles,
  Layers, Cpu, Code2, Terminal, Info, 
  ChevronRight, Lightbulb, Zap, Settings, Database, MousePointer2
} from 'lucide-react';

const DocumentationPage: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans overflow-hidden">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-80 flex-shrink-0 bg-[#161b22] border-r border-gray-800 overflow-y-auto hidden lg:block">
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-[#161b22] z-10">
           <div className="flex items-center space-x-2">
             <Book className="w-6 h-6 text-blue-500" />
             <span className="font-bold text-white text-lg">Zekodes Mastery</span>
           </div>
           <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Comprehensive Learning System</p>
        </div>

        <nav className="p-4 space-y-6 text-sm">
          {/* Section: Foundation */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">01. Foundation</p>
            <div className="space-y-1">
                <NavButton label="Introduction to Zekodes" id="intro" onClick={scrollToSection} />
                <NavButton label="The Psychology of Blocks" id="psychology" onClick={scrollToSection} />
                <NavButton label="Installation & Requirements" id="getting-started" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Core Mechanics */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">02. Core Mechanics</p>
            <div className="space-y-1">
                <NavButton label="Interface Deep-Dive" id="interface" onClick={scrollToSection} />
                <NavButton label="Workspace Customization" id="customization" onClick={scrollToSection} />
                <NavButton label="Cloud Compiler Workflow" id="execution" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Visual Programming */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">03. Programming with Blocks</p>
            <div className="space-y-1">
                <NavButton label="Data Types & Variables" id="variables" onClick={scrollToSection} />
                <NavButton label="Control Flow (Logic)" id="logic" onClick={scrollToSection} />
                <NavButton label="Loops & Iteration" id="loops" onClick={scrollToSection} />
                <NavButton label="Functions & Scope" id="functions" onClick={scrollToSection} />
                <NavButton label="Nesting & Child-Logic" id="nesting" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Languages */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">04. Language Mastery</p>
            <div className="space-y-1">
                <NavButton label="C for Systems Engineering" id="lang-c" onClick={scrollToSection} />
                <NavButton label="Python for Rapid Logic" id="lang-py" onClick={scrollToSection} />
                <NavButton label="Java for Object Orientation" id="lang-java" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Advanced AI */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">05. AI Intelligence</p>
            <div className="space-y-1">
                <NavButton label="Automated Debugging" id="ai-fix" onClick={scrollToSection} />
                <NavButton label="Logic Explanation Engine" id="ai-explain" onClick={scrollToSection} />
                <NavButton label="Code Optimization Tips" id="ai-opt" onClick={scrollToSection} />
            </div>
          </div>

          {/* Section: Troubleshooting */}
          <div>
            <p className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">06. Appendices</p>
            <div className="space-y-1">
                <NavButton label="Common Error Codes" id="errors" onClick={scrollToSection} />
                <NavButton label="Support & Roadmap" id="support" onClick={scrollToSection} />
            </div>
          </div>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto scroll-smooth bg-[#0d1117]">
        <div className="max-w-5xl mx-auto px-10 py-16 space-y-32 pb-40">
          
          {/* --- FOUNDATION --- */}
          <section id="intro" className="scroll-mt-20">
            <ChapterHeader num="01" title="Introduction to Zekodes" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6 leading-relaxed">
              <p>Zekodes is a revolutionary integrated development environment (IDE) designed to bridge the gap between visual thinking and professional coding. For decades, the barrier to entry in computer science has been the steep learning curve of syntax—the specific rules about where to put semicolons, brackets, and keywords. Zekodes removes this barrier by allowing you to build logic visually while seeing the high-level professional code update in real-time.</p>
              <p>The core mission of Zekodes is "Logic First." We believe that anyone can learn to think like an engineer if they aren't bogged down by spelling errors in their code. By using a sophisticated translation engine, Zekodes converts drag-and-drop blocks into clean, industry-standard C, Python, and Java code. This approach is not just for kids; it is a rapid prototyping tool used by hobbyists and a standardized teaching platform for educators.</p>
              <p>In this guide, you will learn how to navigate the Zekodes ecosystem. We will cover the basic building blocks of programming, advanced AI-assisted debugging, and how to transition from visual blocks to writing raw code like a professional.</p>
            </div>
          </section>

          <section id="psychology" className="scroll-mt-20">
            <ChapterHeader num="02" title="The Psychology of Blocks" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Why do blocks work better for beginners than text? The answer lies in cognitive load. When you type code, your brain has to manage logic, spelling, and structural rules simultaneously. Zekodes blocks use "Physical Constraints" to guide your thinking.</p>
              <p>Think of it like LEGO bricks. A circular peg will not fit into a square hole. Similarly, a Zekodes "Value" block cannot be snapped into a "Command" slot where a decision is required. This visual feedback tells your brain exactly what is possible, allowing you to focus 100% on solving the problem. We use the "Traffic Light" color system to categorize blocks: Orange for data, Green for decisions, and Blue for interactions.</p>
            </div>
          </section>

          <section id="getting-started" className="scroll-mt-20">
            <ChapterHeader num="03" title="Installation & Requirements" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Zekodes is built to be accessible everywhere. Our primary application is a native Windows 10/11 executable that offers the fastest performance for local logic building. For users on macOS, Linux, or ChromeOS, the Zekodes Web Editor provides an identical experience directly in the browser with zero installation required.</p>
              <p>Because Zekodes uses a cloud-based compiler to ensure your code runs the same on every machine, a stable internet connection is required for execution. You do not need to install complex tools like GCC or the Java Development Kit (JDK); our cloud infrastructure handles all of that for you behind the scenes.</p>
            </div>
          </section>

          {/* --- CORE MECHANICS --- */}
          <section id="interface" className="scroll-mt-20">
            <ChapterHeader num="04" title="Interface Deep-Dive" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>The Zekodes workspace is a dual-pane environment designed for "Side-by-Side Learning." On the left is your Canvas—the infinite grid where you snap blocks together. On the right is the Code Editor, which displays the live translation of your blocks into your chosen language.</p>
              <p>The far-left vertical bar is the Activity Bar, where you can switch between the visual editor, your user profile, and global settings. The top Header Toolbar contains your most important actions: the Language Selector, the Green "Run" button, and the AI assistance tools. Finally, the bottom Terminal Panel is where you interact with your running program.</p>
            </div>
          </section>

          <section id="customization" className="scroll-mt-20">
            <ChapterHeader num="05" title="Workspace Customization" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Every developer has a different style. Zekodes allows you to customize your environment to match your workflow. Within the Settings panel, you can toggle between light and dark themes, adjust the zoom level of the block canvas, and choose your default programming language.</p>
              <p>One of the most powerful features is the "Auto-Sync" toggle. When enabled, every block movement immediately updates the code pane. For advanced users, you can also collapse either pane to focus entirely on visual building or text-based coding.</p>
            </div>
          </section>

          <section id="execution" className="scroll-mt-20">
            <ChapterHeader num="06" title="Cloud Compiler Workflow" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Zekodes removes the "it works on my machine" problem. When you press "Run," your code is serialized and sent to our secure cloud cluster. Our servers compile the code in a standardized environment and stream the output back to your terminal in real-time.</p>
              <p>If your program requires user input (like asking for a name), Zekodes will pause the execution and provide an input field within the terminal. This cloud-first approach means you can start coding on a high-end desktop and finish the same project on a low-powered school laptop without changing a single setting.</p>
            </div>
          </section>

          {/* --- PROGRAMMING WITH BLOCKS --- */}
          <section id="variables" className="scroll-mt-20">
            <ChapterHeader num="07" title="Data Types & Variables" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Variables are the "memory" of your program. In Zekodes, you use the Orange Data blocks to store information. We support three primary types: Integers (whole numbers), Floats (decimals), and Strings (text).</p>
              <p>When you create a variable, Zekodes automatically handles the declaration and initialization in your code pane. For example, in C, it will add the `int` or `char*` keyword, while in Python, it will handle the dynamic assignment automatically. This allows you to learn how different languages handle memory without getting lost in the syntax.</p>
            </div>
          </section>

          <section id="logic" className="scroll-mt-20">
            <ChapterHeader num="08" title="Control Flow (Logic)" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Logic is how your program makes decisions. The Green "Control" blocks allow you to create paths. The most common is the `If-Then-Else` block. If a condition is true (e.g., "Score  50"), the program follows one path; otherwise, it follows the "Else" path.</p>
              <p>Zekodes also supports complex logical operators. You can combine conditions using `AND`, `OR`, and `NOT` blocks. This allows you to build sophisticated rules, such as "If the user is logged in AND they have a subscription, then show the content."</p>
            </div>
          </section>

          <section id="loops" className="scroll-mt-20">
            <ChapterHeader num="09" title="Loops & Iteration" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Computers are great at doing repetitive tasks. Loops allow you to run the same block of code many times. Zekodes provides `For` loops for counting (e.g., "Do this 10 times") and `While` loops for waiting (e.g., "Do this while the user is still playing").</p>
              <p>Learning loops visually helps you understand "exit conditions." A common mistake for beginners is the "Infinite Loop," where a program never stops. Zekodes' visual structure makes it easy to see where a loop starts and ends, helping you avoid these common traps.</p>
            </div>
          </section>

          <section id="functions" className="scroll-mt-20">
            <ChapterHeader num="10" title="Functions & Scope" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>As your projects grow, you'll want to reuse logic. Functions allow you to group blocks together under a single name. You can define a function like "Calculate Grade" once and then call it from many different places in your program.</p>
              <p>This also introduces the concept of "Scope." Variables created inside a function block are only known to that function. This prevents "Variable Pollution," where different parts of your program accidentally change each other's data. Zekodes makes scope visible by color-coding local vs. global variables.</p>
            </div>
          </section>

          <section id="nesting" className="scroll-mt-20">
            <ChapterHeader num="11" title="Nesting & Child-Logic" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Nesting is the act of putting one block inside another. For example, you might put an `If` block inside a `For` loop to check every item in a list. Zekodes handles the complex "Indentation" required by languages like Python automatically when you nest blocks.</p>
              <p>Correct nesting is vital for logical flow. The visual canvas shows these relationships as parent-child hierarchies. If you move a parent block, all the "child" blocks nested inside it move with it, keeping your logic unified and portable.</p>
            </div>
          </section>

          {/* --- LANGUAGE MASTERY --- */}
          <section id="lang-c" className="scroll-mt-20">
            <ChapterHeader num="12" title="C for Systems Engineering" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>C is a powerful, low-level language used to build operating systems and hardware drivers. In Zekodes, choosing C allows you to see the "Strict" nature of programming. You'll see explicit type definitions (`int`, `char`) and the required `main()` function structure.</p>
              <p>Zekodes' C generator follows the C99/C11 standards, ensuring your visual logic translates into professional-grade source code. This is the best language to learn if you want to understand how computers actually work at a memory level.</p>
            </div>
          </section>

          <section id="lang-py" className="scroll-mt-20">
            <ChapterHeader num="13" title="Python for Rapid Logic" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Python is known for its readability and simplicity. When you switch Zekodes to Python mode, you'll notice how much "boilerplate" code disappears. Python doesn't require semicolons or explicit types, making the transition from blocks feel very natural.</p>
              <p>Zekodes uses Python 3.10+ syntax. This is the perfect choice for data science, artificial intelligence, and rapid prototyping. Because Python uses indentation to define blocks, Zekodes' nesting system is particularly helpful in teaching this concept.</p>
            </div>
          </section>

          <section id="lang-java" className="scroll-mt-20">
            <ChapterHeader num="14" title="Java for Object Orientation" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Java is the industry standard for large-scale enterprise applications and Android development. Choosing Java in Zekodes introduces you to "Object-Oriented Programming" (OOP). You'll see your logic wrapped inside classes and methods.</p>
              <p>Zekodes handles the complex Java setup, including the `public static void main` entry point and standard libraries like `Scanner` for input. This is the best path if you are preparing for a professional career in software engineering or computer science degrees.</p>
            </div>
          </section>

          {/* --- AI INTELLIGENCE --- */}
          <section id="ai-fix" className="scroll-mt-20">
            <ChapterHeader num="15" title="Automated Debugging" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Everyone makes mistakes. In traditional coding, a single typo can stop your program for hours. Zekodes includes an "AI Fix" agent that scans your program for logical and syntax flaws.</p>
              <p>If your code fails to compile, simply click "Fix Code." The AI will analyze your block structure, identify the error, and propose a corrected version. This doesn't just fix the problem; it explains *why* the change was made, helping you learn from the mistake so you don't repeat it.</p>
            </div>
          </section>

          <section id="ai-explain" className="scroll-mt-20">
            <ChapterHeader num="16" title="Logic Explanation Engine" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Sometimes you build a complex algorithm but forget how it works a week later. Or maybe you're looking at a project from another user. The "AI Explain" tool acts as a personal tutor.</p>
              <p>By clicking "Explain," our AI breaks down your logic into plain English. It will say things like, "First, this program creates a list of numbers. Then, it goes through each number and adds it to a total if the number is even." This converts abstract code back into human concepts, reinforcing your understanding.</p>
            </div>
          </section>

          <section id="ai-opt" className="scroll-mt-20">
            <ChapterHeader num="17" title="Code Optimization Tips" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Working code isn't always good code. As you become a better developer, you'll want your programs to be faster and cleaner. The AI Optimization agent reviews your working logic and suggests improvements.</p>
              <p>It might suggest replacing a long chain of `If` blocks with a `Switch` statement, or show you how to combine multiple loops into one. These tips help you transition from "getting it to work" to "writing professional-grade software."</p>
            </div>
          </section>

          {/* --- APPENDICES --- */}
          <section id="errors" className="scroll-mt-20">
            <ChapterHeader num="18" title="Common Error Codes" />
            <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
              <p>Even with blocks, logic errors can occur. Here are the most common messages you might see in the terminal:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Segmentation Fault (C):</strong> Your program tried to access memory it doesn't own. Usually happens with incorrect array indices.</li>
                <li><strong>IndexError (Python):</strong> You tried to look at an item in a list that doesn't exist.</li>
                <li><strong>NullPointerException (Java):</strong> You tried to use a variable that hasn't been given a value yet.</li>
              </ul>
              <p>When these occur, use the "AI Fix" tool to quickly identify the specific block causing the issue.</p>
            </div>
          </section>

          <section id="support" className="scroll-mt-20">
            <ChapterHeader num="19" title="Support & Roadmap" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#161b22] rounded-2xl border border-gray-800">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldAlert size={20} className="text-red-500" /> Reporting Issues</h3>
                <p className="text-sm text-gray-400 mb-6">If you encounter a technical bug or compiler error, please email our engineering team.</p>
                <a href="mailto:issues.zekodes@gmail.com" className="text-blue-500 font-mono font-bold underline">issues.zekodes@gmail.com</a>
              </div>
              <div className="p-8 bg-[#161b22] rounded-2xl border border-gray-800">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Globe size={20} className="text-green-500" /> Community</h3>
                <p className="text-sm text-gray-400 mb-6">Follow us for updates on new block categories and mobile features.</p>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Instagram: @zekodes_official</p>
                  <p>X / Twitter: @ZekodesApp</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Branding */}
          <div className="mt-32 pt-10 border-t border-gray-800 flex flex-col items-center opacity-50">
            <div className="flex items-center space-x-2 mb-2">
                <Code2 size={24}/>
                <span className="font-black text-xl tracking-tighter uppercase">Zekodes</span>
            </div>
            <p className="text-xs">© 2025 Zekodes Inc. All Rights Reserved.</p>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- Helpers ---

const NavButton: React.FC<{ label: string; id: string; onClick: (id: string) => void }> = ({ label, id, onClick }) => (
    <button 
        onClick={() => onClick(id)}
        className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1f242c] hover:text-blue-400 transition-all flex items-center gap-2 group"
    >
        <div className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors"></div>
        {label}
    </button>
);

const ChapterHeader: React.FC<{ num: string; title: string; id?: string }> = ({ num, title, id }) => (
    <div className="mb-12" id={id}>
        <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-mono text-blue-500 border border-blue-500/30 px-2 py-0.5 rounded uppercase tracking-widest">Chapter {num}</span>
            <div className="h-[1px] flex-1 bg-gray-800"></div>
        </div>
        <h2 className="text-4xl font-black text-white">{title}</h2>
    </div>
);

export default DocumentationPage;