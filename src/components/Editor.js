import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
// import { json } from "react-router-dom";
// codemirror will import themes from the following node module address
// use codemirror version 5 or higher to use all the latest features
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';
import { act } from "@testing-library/react";


const Editor = ({socketRef,roomID}) => {
    // to detect changes in the textarea
    const editorRef = useRef(null);

    // using code mirror features
    useEffect(() => {
        async function init() {
            // defining all the features of the code-space
            editorRef.current = Codemirror.fromTextArea(document.getElementById("realtime-editor"), {
                // mode is used specify which language you want to use
                // dropdown menu needs to be added to select from a wide variety of languages
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                // enables autoclosing tag features
                autoCloseTags: true,
                // enables autoclosing bracket features
                autoCloseBrackets: true,
                // to show the line number
                lineNumbers: true,
            });

            editorRef.current.on('change', (instance,changes) => {
                // to specify what kind of event is happening
                const {origin} = changes;
                // to access the content from the editor
                const code = instance.getValue();
                if(origin !== 'setValue'){
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomID,
                        code,
                    });
                }
            })
        }

        // calling the function
        init();
    }, []);

    useEffect(() => {
        if(socketRef.current){
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
            if(code !== null){
                editorRef.current.setValue(code);
            }
        });
    }
    return() => {
        socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
    },[socketRef.current])

    return <textarea id="realtime-editor"> </textarea>
}

export default Editor;