import React, { useEffect } from "react";
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


const Editor = function () {
    // using code mirror features
    useEffect(() => {
        async function init() {
            // defining all the features of the code-space
            Codemirror.fromTextArea(document.getElementById("realtime-editor"), {
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
        }
        // calling the function
        init();
    }, [])
    return <textarea id="realtime-editor"></textarea>
}

export default Editor;