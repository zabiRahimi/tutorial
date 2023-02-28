import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/core';

import { Extension } from '@tiptap/core';
import '../../../sass/_tiptap.scss';

const MenuBar = ({ editor }) => {
    if (!editor) {
      return null
    }
  
    return (
      <div className='menuEditor'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={ editor.isActive('bold') ? 'is-active btnEditor' : 'btnEditor' }
        >
          <i className="material-icons">format_bold</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active btnEditor' : 'btnEditor' }
        >
         <i className="material-icons">format_italic</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active btnEditor' : 'btnEditor' }
        >
          
          <i className="material-icons">format_strikethrough</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active btnEditor' : 'btnEditor' }
        >
                    <i className="material-icons">code</i>

        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className='btnEditor'>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()} className='btnEditor'>
          <i className="material-icons">format_clear</i>
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active btnEditor' : 'btnEditor' }
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
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active btnEditor' : 'btnEditor'}
        >
    
          <i className="material-icons">code</i>

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
          hard break
          {/* <i className="material-icons"></i> */}

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

const Tiptap =()=>{
    const AutoDir = Extension.create({
        name: 'AutoDir',
        addGlobalAttributes() {
          return [   
            {
              types: [
                'heading',
                'paragraph',
                'bulletList',
                'orderedList',
                'blockquote',
              ],
              attributes: {
                autoDir: {
                  renderHTML: attributes => ({
                    dir: 'auto',
                  }),
                  parseHTML: element => element.dir || 'auto',
                },
              },
            },
          ]
        },
      })
    const editor = useEditor({
        extensions: [
          StarterKit,
          CodeBlockLowlight.configure({
            lowlight,
          }),
          AutoDir
        ],
        onUpdate({ editor }) {
            // The content has changed.
            // console.log(editor.getHTML());
          },
        // injectCSS: false,
        editorProps: {
            attributes: {
              class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
            transformPastedText(text) {
              return text.toUpperCase()
            }
          },
        content: '<p>Hello zabi!</p>',
      })
    
      return (
          <div className='containerEditor'>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        </div>
      )
}

export default Tiptap;