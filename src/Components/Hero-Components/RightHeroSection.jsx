import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
function RightHeroSection(props) {
    const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);
    const [language, setLanguage] = useState('javascript');
    const [theme, setTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(14);
    const editorRef = useRef(null);
    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
        { value: 'rust', label: 'Rust' },
        { value: 'cpp', label: 'C++' },
        // { value: 'html', label: 'HTML' },
        // { value: 'css', label: 'CSS' },
        { value: 'json', label: 'JSON' },
        { value: 'markdown', label: 'Markdown' },
    ];

    const themes = [
        { value: 'vs', label: 'Light' },
        { value: 'vs-dark', label: 'Dark' },
        { value: 'hc-black', label: 'High Contrast' },
    ];

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Add custom theme
        monaco.editor.defineTheme('myCustomTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
            ],
            colors: {
                'editor.background': '#1E1E1E',
                'editor.foreground': '#D4D4D4',
                'editorLineNumber.foreground': '#858585',
            }
        });

        // Configure auto-completion
        // this is for cpp languange
        monaco.languages.registerCompletionItemProvider('cpp' , {
            provideCompletionItems :(model, position) => {
                const suggestions = [
                    {
                        label: 'using',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'using namespace std;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Namespace standard '
                    },
                    {
                        label: 'main',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: "#include<bits/stdc++.h>\nusing namespace std; \nint main(){\n    ${1:expr}\n}",
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Output to standard stream (iostream)'
                    },
                    {
                        label: 'cout',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'cout << ${1:expr} <<endl;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Output to standard stream (iostream)'
                    },
                    {
                        label: 'fori',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\\n\t${3:// body}\\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'for loop (index-based)'
                    },
                    {
                        label: 'rangefor',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (auto& ${1:elem} : ${2:container}) {\\n\t${3:// body}\\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Range-based for loop (C++11+)'
                    },
                    {
                        label: 'func',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:void} ${2:funcName}(${3:void}) {\\n\t${4:// body}\\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Function definition'
                    },
                    {
                        label: 'vector',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'std::vector<${1:int}> ${2:v};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'std::vector declaration'
                    },
                    {
                        label: 'include',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '#include <${1:iostrean}>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: '#include header'
                    }
                ];
                return {suggestions}
            }
        })
        // this is for javascript
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'console.log',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'console.log(${1:message});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log a message to the console'
                    },
                    {
                        label: 'function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'function ${1:name}(${2:params}) {\n\t${3:// body}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Create a new function'
                    }
                ];
                return { suggestions };
            }
        });

        // Add custom keybindings
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            handleSaveCode();
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR, () => {
            handleRunCode();
        });
    };

    const handleSaveCode = () => {
        console.log('Saving code:', code);
        // Implement your save logic here
        alert('Code saved!');
    };

    const handleRunCode = () => {
        if (language === 'javascript') {
            try {
                // Note: Using eval in production is not recommended
                // This is just for demonstration purposes
                const result = eval(code);
                console.log('Code executed:', result);
                alert('Check console for output');
            } catch (error) {
                console.error('Execution error:', error);
                alert(`Error: ${error.message}`);
            }
        } else {
            alert(`Code execution not implemented for ${language}`);
        }
    };

    // this is for download the code
    const downloadCode = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code.${language === 'javascript' ? 'js' : language}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="advanced-code-editor">
            <div className="editor-header">
                <div className="flex gap-2 items-center ">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Languages</legend>
                        <select value={language} defaultValue="Pick a language" className="select" onChange={(e) => setLanguage(e.target.value)}>
                            <option disabled={true}>Pick a Theme</option>
                            {
                                languages.map(lan => (
                                    <option key={lan.value} value={lan.value}>{lan.label}</option>
                                ))
                            }
                        </select>
                        <span className="label">Optional</span>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Themes</legend>
                        <select value={theme} defaultValue="Pick a browser" className="select" onChange={(e) => setTheme(e.target.value)}>
                            <option disabled={true}>Pick a Theme</option>
                            {
                                themes.map(theme => (
                                    <option key={theme.value} value={theme.value}>{theme.label}</option>
                                ))
                            }
                        </select>
                        <span className="label">Optional</span>
                    </fieldset>

                    <input
                        type="range"
                        min="10"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        // className="font-size-slider"
                        className="range range-primary"
                    />
                    <span>{fontSize}px</span>
                    <button className="btn" onClick={handleSaveCode}>Save</button>
                    <button className="btn" onClick={downloadCode}>Download</button>
                </div>
            </div>

            <Editor
                className="h-[700px] w-screen"
                language={language}
                value={code}
                theme={theme}
                onChange={setCode}
                onMount={handleEditorDidMount}
                options={{
                    fontSize,
                    fontFamily: 'Monolisa',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    minimap: { enabled: true },
                    folding: true,
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    contextmenu: true,
                    mouseWheelZoom: true,
                }}
            />
        </div>
    );
}

export default RightHeroSection;
