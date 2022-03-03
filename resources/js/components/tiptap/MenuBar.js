import { useState } from "react";

const MenuBar = ({ editor }) => {

    if (!editor) {
        return null
    }
    
    const [fontSize, setFontSize] = useState('14px');

    const fontSizes = () => {
        let sizes = ['7px'];
        for (let i = 8; i < 36; i++) {
            sizes[i] = `${i}px`;
        }
        return sizes.map((size, k) => {
            return <li key={k} onClick={() => { editor.chain().focus().setMark("textStyle", { fontSize: size }).run(); setFontSize(size) }}>{size}</li>
        });

    }

    return (
        <div className='menuEditor'>
            <input className='btnEditor'
                type="color"
                onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                value={editor.getAttributes('textStyle').color}
            />
           
            <div className="dropdown btnEditor dropdownFontSize">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {fontSize}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {fontSizes()}
                </ul>
            </div>

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_bold</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_italic</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">
                    format_underlined
                </i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_strikethrough</i>
            </button>

            <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className='btnEditor'>
                clear marks
            </button>

            <button onClick={() => editor.chain().focus().clearNodes().run()} className='btnEditor'>
                <i className="material-icons">format_clear</i>
            </button>

            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_textdirection_r_to_l</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_one</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_two</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_3</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_4</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_5</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_6</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_list_bulleted</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_list_numbered</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">code</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">settings_ethernet</i>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_quote</i>
            </button>

            <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='btnEditor' >
                <i className="material-icons">remove</i>
            </button>

            <button onClick={() => editor.chain().focus().setHardBreak().run()} className='btnEditor'>
                <i className="material-icons">
                    wrap_text
                </i>
            </button>

            <button onClick={() => editor.chain().focus().undo().run()} className='btnEditor'>
                <i className="material-icons">undo</i>

            </button>

            <button onClick={() => editor.chain().focus().redo().run()} className='btnEditor'>
                <i className="material-icons">redo</i>
            </button>
        </div>
    )
}

export default MenuBar;