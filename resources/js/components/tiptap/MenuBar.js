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

            <button type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_align_left</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_align_center</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_align_justify</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_align_right</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_bold</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_italic</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">
                    format_underlined
                </i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_strikethrough</i>
            </button>

            <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} className='btnEditor'>
                clear marks
            </button>

            <button type="button" onClick={() => editor.chain().focus().clearNodes().run()} className='btnEditor'>
                <i className="material-icons">format_clear</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_textdirection_r_to_l</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_one</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_two</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_3</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_4</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_5</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">looks_6</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_list_bulleted</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_list_numbered</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">code</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">settings_ethernet</i>
            </button>

            <button type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active btnEditor' : 'btnEditor'}
            >
                <i className="material-icons">format_quote</i>
            </button>

            <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className='btnEditor' >
                <i className="material-icons">remove</i>
            </button>

            <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()} className='btnEditor'>
                <i className="material-icons">
                    wrap_text
                </i>
            </button>

            <button type="button" onClick={() => editor.chain().focus().undo().run()} className='btnEditor'>
                <i className="material-icons">undo</i>

            </button>

            <button type="button" onClick={() => editor.chain().focus().redo().run()} className='btnEditor'>
                <i className="material-icons">redo</i>
            </button>

            <button type="button"
                onClick={() => editor.commands.clearContent()}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                clear
            </button>

            <button type="button"
                onClick={() => editor.commands.focus("end")}
                className={editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor'}
            >
                end line
            </button>

            <div className="dropdown btnEditor dropdownTable">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="material-icons">grid_on</i>
                </button>
                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                    <div className="dropdownTableDiv">
                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>insert table</li>

                                <li onClick={() => editor.chain().focus().deleteTable().run()}>delete table</li>
                            </ul>
                        </div>

                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().toggleHeaderRow().run()}>toggleHeaderRow </li>
                                <li onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>toggleHeaderColumn </li>
                                <li onClick={() => editor.chain().focus().toggleHeaderCell().run()}>toggleHeaderCell </li>
                            </ul>
                        </div>

                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().addRowBefore().run()}> addRowBefore </li>
                                <li onClick={() => editor.chain().focus().addRowAfter().run()}> addRowAfter </li>
                                <li onClick={() => editor.chain().focus().deleteRow().run()}>deleteRow </li>
                            </ul>
                        </div>

                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().addColumnBefore().run()}>addColumnBefore </li>
                                <li onClick={() => editor.chain().focus().addColumnAfter().run()}>addColumnAfter </li>
                                <li onClick={() => editor.chain().focus().deleteColumn().run()}> deleteColumn </li>
                            </ul>
                        </div>

                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().mergeCells().run()}>mergeCells </li>
                                <li onClick={() => editor.chain().focus().splitCell().run()}>splitCell </li>
                                <li onClick={() => editor.chain().focus().mergeOrSplit().run()}> mergeOrSplit</li>
                            </ul>
                        </div>

                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().goToNextCell().run()}>goToNextCell </li>
                                <li onClick={() => editor.chain().focus().goToPreviousCell().run()}>goToPreviousCell</li>
                            </ul>
                        </div>

                        <div>
                            <ul>
                                <li onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}> colspan2 </li>
                            </ul>
                        </div>

                    </div>

                </div>

                {/* <ul className="" >

                    

                    <div>
                        
                    </div>

                    <div>
                       
                    </div>

                    <div>
                        
                    </div>

                </ul> */}
            </div>

        </div>
    )
}

export default MenuBar;