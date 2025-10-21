// "use client";
// import React, { useState } from "react";
// import dynamic from "next/dynamic";

// // Monaco must be dynamically imported for Next.js SSR
// const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// // List of languages and their Judge0 IDs & Monaco IDs
// const LANGUAGES = [
//   { name: "C", judge0: 50, monaco: "c", defaultCode: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}' },
//   { name: "C++", judge0: 54, monaco: "cpp", defaultCode: '#include <iostream>\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}' },
//   { name: "Java", judge0: 62, monaco: "java", defaultCode: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}' },
//   { name: "Python", judge0: 71, monaco: "python", defaultCode: 'print("Hello, World!")' },
//   { name: "JavaScript", judge0: 63, monaco: "javascript", defaultCode: 'console.log("Hello, World!");' },
//   { name: "TypeScript", judge0: 74, monaco: "typescript", defaultCode: 'console.log("Hello, World!");' },
//   { name: "C#", judge0: 51, monaco: "csharp", defaultCode: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}' },
//   { name: "Go", judge0: 60, monaco: "go", defaultCode: 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}' },
//   { name: "PHP", judge0: 68, monaco: "php", defaultCode: '<?php\necho "Hello, World!\\n";' },
//   { name: "Ruby", judge0: 72, monaco: "ruby", defaultCode: 'puts "Hello, World!"' },
// ];

// // Get your own API key from https://rapidapi.com/judge0-official/api/judge0-ce/
// const JUDGE0_KEY = process.env.NEXT_PUBLIC_COMPILER_API_KEY; // <-- Place your API key as NEXT_PUBLIC_COMPILER_API_KEY in .env

// export default function OnlineCompiler() {
//   const [selected, setSelected] = useState(LANGUAGES[0]);
//   const [code, setCode] = useState(selected.defaultCode);
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   function onLangChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const lang = LANGUAGES.find(l => l.name === e.target.value)!;
//     setSelected(lang);
//     setCode(lang.defaultCode);
//     setOutput("");
//     setInput("");
//   }

//   async function handleRun() {
//     setLoading(true);
//     setOutput("Compiling...");
//     try {
//       // Submit code
//       const submission = await fetch(
//         "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-RapidAPI-Key": JUDGE0_KEY!,
//             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           },
//           body: JSON.stringify({
//             source_code: code,
//             language_id: selected.judge0,
//             stdin: input,
//           }),
//         }
//       );
//       const result = await submission.json();

//       let outputText = "";
//       if (result.stderr) outputText = result.stderr;
//       else if (result.compile_output) outputText = result.compile_output;
//       else if (result.stdout) outputText = result.stdout;
//       else outputText = "No output.";

//       setOutput(outputText);
//     } catch {
//       setOutput("Error: Could not connect to Judge0 API.");
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="py-10 pb-20">
//     <div className="max-w-4xl mx-auto bg-[#101828] rounded-lg p-6 shadow-lg text-white">
//       <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
//         <label className="font-bold">Language:</label>
//         <select
//           className="rounded px-3 py-2 bg-[#18223a] border border-cyan-700 text-cyan-200"
//           value={selected.name}
//           onChange={onLangChange}
//         >
//           {LANGUAGES.map(l => (
//             <option key={l.name} value={l.name}>{l.name}</option>
//           ))}
//         </select>
//         <button
//           className="ml-auto bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded text-white font-semibold transition"
//           onClick={handleRun}
//           disabled={loading}
//         >
//           {loading ? "Compiling..." : "Run Code"}
//         </button>
//       </div>
//       <MonacoEditor
//         height="300px"
//         language={selected.monaco}
//         theme="vs-dark"
//         value={code}
//         onChange={v => setCode(v!)}
//         options={{
//           fontSize: 16,
//           minimap: { enabled: false },
//           scrollBeyondLastLine: false,
//         }}
//       />
//       <div className="mt-5">
//         <label className="font-bold text-cyan-400 mb-2 block">Standard Input (optional):</label>
//         <textarea
//           className="w-full bg-[#18223a] border border-cyan-700 rounded px-3 py-2 text-green-300 mb-4"
//           rows={2}
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           placeholder="Input for your program (if any)"
//         />

//         <h3 className="font-bold text-cyan-400 mb-2">Output:</h3>
//         <pre className="bg-[#18223a] rounded px-4 py-3 text-green-300 whitespace-pre-wrap min-h-[70px]">
//           {output}
//         </pre>
//       </div>
//       <div className="text-gray-400 text-xs mt-6">
//         Powered by <a className="underline" href="https://judge0.com/" target="_blank" rel="noopener noreferrer">Judge0</a>.
//         <br />
//         <b>Tip:</b> Enter input in "Standard Input" if your code expects it (e.g., via <code>input()</code> in Python).
//       </div>
//     </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Monaco editor dynamic import for SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGES = [
  { name: "C", judge0: 50, monaco: "c", defaultCode: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}' },
  { name: "C++", judge0: 54, monaco: "cpp", defaultCode: '#include <iostream>\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}' },
  { name: "Java", judge0: 62, monaco: "java", defaultCode: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}' },
  { name: "Python", judge0: 71, monaco: "python", defaultCode: 'print("Hello, World!")' },
  { name: "JavaScript", judge0: 63, monaco: "javascript", defaultCode: 'console.log("Hello, World!");' },
  { name: "TypeScript", judge0: 74, monaco: "typescript", defaultCode: 'console.log("Hello, World!");' },
  { name: "C#", judge0: 51, monaco: "csharp", defaultCode: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}' },
  { name: "Go", judge0: 60, monaco: "go", defaultCode: 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}' },
  { name: "PHP", judge0: 68, monaco: "php", defaultCode: '<?php\necho "Hello, World!\\n";' },
  { name: "Ruby", judge0: 72, monaco: "ruby", defaultCode: 'puts "Hello, World!"' },
];

const JUDGE0_KEY = process.env.NEXT_PUBLIC_COMPILER_API_KEY;

export default function OnlineCompiler() {
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(selected.defaultCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  function onLangChange(e) {
    const lang = LANGUAGES.find(l => l.name === e.target.value);
    setSelected(lang);
    setCode(lang.defaultCode);
    setOutput("");
    setInput("");
  }

  async function handleRun() {
    setLoading(true);
    setOutput("Compiling...");
    try {
      const submission = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": JUDGE0_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: selected.judge0,
            stdin: input,
          }),
        }
      );
      const result = await submission.json();

      let outputText = "";
      if (result.stderr) outputText = result.stderr;
      else if (result.compile_output) outputText = result.compile_output;
      else if (result.stdout) outputText = result.stdout;
      else outputText = "No output.";

      setOutput(outputText);
    } catch {
      setOutput("Error: Could not connect to Judge0 API.");
    }
    setLoading(false);
  }

  return (
    <div className="py-10 pb-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-[#101828] rounded-xl p-8 shadow-2xl">
        <div className="mb-5 flex flex-col md:flex-row md:items-center gap-3">
          <label className="font-bold text-white">Language:</label>
          <select
            className="rounded px-3 py-2 bg-[#18223a] border border-cyan-700 text-cyan-200 focus:ring-2 focus:ring-[#1EB8F3] focus:outline-none"
            value={selected.name}
            onChange={onLangChange}
          >
            {LANGUAGES.map(l => (
              <option key={l.name} value={l.name}>{l.name}</option>
            ))}
          </select>
          <button
            className="ml-auto bg-gradient-to-r from-[#1EB8F3] to-[#0059FF] hover:from-[#0059FF] hover:to-[#1EB8F3] px-7 py-2 rounded-full text-white font-bold transition shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1EB8F3]/60"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? "Compiling..." : "Run Code"}
          </button>
        </div>
        <div className="border-2 border-cyan-800 rounded-lg overflow-hidden shadow">
          <MonacoEditor
            height="305px"
            language={selected.monaco}
            theme="vs-dark"
            value={code}
            onChange={v => setCode(v || "")}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        <div className="mt-8">
          <label className="font-bold text-cyan-400 mb-2 block">Standard Input (optional):</label>
          <textarea
            className="w-full bg-[#18223a] border border-cyan-700 rounded px-3 py-2 text-green-200 mb-4 placeholder-cyan-900"
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Input for your program (if any)"
          />

          <h3 className="font-bold text-cyan-400 mb-2">Output:</h3>
          <pre className="bg-[#18223a] rounded px-4 py-3 text-green-300 whitespace-pre-wrap min-h-[70px]">{output}</pre>
        </div>
        <div className="text-gray-400 text-xs mt-6">
          Powered by{" "}
          <a
            className="underline hover:text-cyan-300"
            href="https://judge0.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Judge0
          </a>.
          <br />
          <b>Tip:</b> Enter input in "Standard Input" if your code expects it (e.g., via <code>input()</code> in Python).
        </div>
      </div>
    </div>
  );
}
