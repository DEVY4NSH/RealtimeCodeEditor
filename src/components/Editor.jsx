import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';
import ACTIONS from '../actions';

const Editor = ({ settheme, socketRef, roomId, onCodeChange}) => {
    const editorRef = useRef(null);
    useEffect(() => {
        async function init(){
            editorRef.current = Codemirror.fromTextArea(document.getElementById('codeEditor'), {
                mode: { name: 'javascript', json: true },
                theme: settheme === 'DARK' ? 'material' : 'default',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });

            editorRef.current.on('change', (instance, changes) => {
                // console.log('changes', changes);
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        init();
        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        };
    }, [settheme]);
    // console.log(socketRef.current);
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            }
        };
    }, [socketRef.current]);
    
    

    return (
        <>
            <textarea id="codeEditor"></textarea>
        </>
    );
}

export default Editor;
