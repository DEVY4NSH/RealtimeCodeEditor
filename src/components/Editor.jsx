import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import ACTIONS from '../actions';

const Editor = ({ settheme, socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        editorRef.current = Codemirror.fromTextArea(document.getElementById('codeEditor'), {
            mode: { name: 'javascript', json: true },
            theme: settheme === 'DARK' ? 'material' : 'default',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
        });

        const handleChange = (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            onCodeChange(code);
            if (origin !== 'setValue' && socketRef.current) {
                console.log("changes in code");
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            }
        };

        editorRef.current.on('change', handleChange);

        return () => {
            if (editorRef.current) {
                editorRef.current.off('change', handleChange);
                editorRef.current.toTextArea();
            }
        };
    }, [settheme, onCodeChange, roomId, socketRef]);

    useEffect(() => {
        const handleCodeChange = ({ code }) => {
            if (code !== null && editorRef.current) {
                console.log("working here");
                editorRef.current.setValue(code);
            }
        };

        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
            }
        };
    }, [socketRef]);

    return (
        <>
            <textarea id="codeEditor"></textarea>
        </>
    );
}

export default Editor;
