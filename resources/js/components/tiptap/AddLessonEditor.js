import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import lowlight from 'lowlight';
import { Extension } from '@tiptap/core';
import Underline from '@tiptap/extension-underline';
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color';
import Mention from '@tiptap/extension-mention';
import suggestion from './suggestion';
import '../../../sass/_tiptap.scss';
import MenuBar from './MenuBar';



const AddLessonEditor = () => {
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
    });

    const FontSize = Extension.create({
        name: 'fontSize',

        addOptions() {
            return {
                types: ['textStyle'],
            }
        },

        addGlobalAttributes() {
            return [
                {
                    types: this.options.types,
                    attributes: {
                        fontSize: {
                            default: null,
                            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
                            renderHTML: attributes => {
                                if (!attributes.fontSize) {
                                    return {}
                                }

                                return {
                                    style: `font-size: ${attributes.fontSize}`,
                                }
                            },
                        },
                    },
                },
            ]
        },

        addCommands() {
            return {
                setFontSize: fontSize => ({ chain }) => {
                    return chain()
                        .setMark('textStyle', { fontSize })
                        .run()
                },
                unsetFontSize: () => ({ chain }) => {
                    return chain()
                        .setMark('textStyle', { fontSize: null })
                        .removeEmptyTextStyle()
                        .run()
                },
            }
        },
    });


    // *************************************editro***************************

    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlockLowlight.configure({
                lowlight,
            }),
            AutoDir,
            Underline,
            Text,
            TextStyle,
            Color,
            FontSize,
            Mention.configure({
                HTMLAttributes: {
                    class: 'mention',
                },
                suggestion,
            }),

        ],
        onUpdate({ editor }) {
            // The content has changed.
            console.log(editor.getHTML());
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

export default AddLessonEditor;