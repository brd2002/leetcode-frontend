import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
function RightHeroSection(props) {
    const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

    const [language, setLanguage] = useState('cpp');
    const [theme, setTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(14);
    const editorRef = useRef(null);

    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
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
        // monaco.editor.defineTheme('DesiUi', {
        //     // // base: 'vs-dark',
        //     // inherit: true,
        //     // rules: [
        //     //     { token: 'comment', foreground: '6A9955' },
        //     //     { token: 'keyword', foreground: '569CD6' },
        //     //     { token: 'string', foreground: 'CE9178' },
        //     // ],
        //     // colors: {
        //     //     'editor.background': '#1E1E1E',
        //     //     'editor.foreground': '#D4D4D4',
        //     //     'editorLineNumber.foreground': '#858585',
        //     // }
        // });

        // Configure auto-completion
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
                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn m-1">Language</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {/*<li><a>Item 1</a></li>*/}
                            {/*<li><a>Item 2</a></li>*/}
                            {languages.map(lang => (
                                <li key={lang.value} value={lang.value}>
                                    <a>{lang.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*<select*/}
                    {/*    value={language}*/}
                    {/*    onChange={(e) => setLanguage(e.target.value)}*/}
                    {/*    className="control-select"*/}
                    {/*>*/}

                    {/*</select>*/}

                    <div className="dropdown dropdown-bottom">
                        <div tabIndex={0} role="button" className="btn m-1">Theme</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {/*<li><a>Item 1</a></li>*/}
                            {/*<li><a>Item 2</a></li>*/}
                            {themes.map(t => (
                                <li key={t.value} value={t.value}>
                                    <a>{t.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*<select*/}
                    {/*    value={theme}*/}
                    {/*    onChange={(e) => setTheme(e.target.value)}*/}
                    {/*    className="control-select"*/}
                    {/*>*/}

                    {/*</select>*/}

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
                className="h-screen"
                language={language}
                value={code}
                theme={theme}
                onChange={setCode}
                onMount={handleEditorDidMount}
                options={{
                    fontSize,
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
