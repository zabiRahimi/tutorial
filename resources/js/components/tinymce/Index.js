/**
 * این ادیتور فقط برای نمونه ایجاد شده است
 */

import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';
import 'tinymce/plugins/spellchecker';

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';
import { useState } from 'react';

export default function Index(props) {
  const [valEditor , setValEditor]=useState('');

  const zabi=()=>{
    return'<div>zabi rahimi asdf o sdf</div>'
    
  }
  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  tinymce.PluginManager.add('example', function(editor, url) {
    var openDialog = function () {
      return editor.windowManager.open({
        title: 'Example plugin',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'title',
              label: 'Title'
            }
          ]
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Close'
          },
          {
            type: 'submit',
            text: 'Save',
            primary: true
          }
        ],
        onSubmit: function (api) {
          var data = api.getData();
          /* Insert content when the window form is submitted */
          editor.insertContent(
           "<div class='zabi' style={color:red}>zabi read <b>azar</b></div>"
          );
          api.close();
        }
      });
    };
    /* Add a button that opens a window */
    editor.ui.registry.addButton('example', {
      text: 'My button',
      onAction: function () {
        /* Open window */
        openDialog();
      }
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    editor.ui.registry.addMenuItem('example', {
      text: 'Example plugin',
      onAction: function() {
        /* Open window */
        openDialog();
      }
    });
    /* Return the metadata for the help plugin */
    return {
      getMetadata: function () {
        return  {
          name: 'Example plugin',
          url: 'http://exampleplugindocsurl.com'
        };
      }
    };
  });
  function  nabi(value, editor){
    // console.log(editor.getContent({forma:'text'}));
    console.log(value);
  }
  const handleSetValEditor=(value)=>{
    setValEditor(value);
  }
  return (
    <div>
     <div>
     {/* <xmp > */}
       <div dangerouslySetInnerHTML={{__html:valEditor}}/>
     {/* </xmp> */}
       
     </div>
     <textarea id='zabi'></textarea>
    <Editor
    value={valEditor}
    onEditorChange={handleSetValEditor}
      init={{
        selector: 'textarea#', 
        setup:function(editor){
          editor.ui.registry.addToggleButton('customStrikethrough', {
            text: 'Strikethrough',
            onAction: function (api) {
              editor.execCommand('mceToggleFormat', false, 'strikethrough');
              api.setActive(!api.isActive());
            }
          });




          const zabi2=()=>{
            return'<div>zabi rahimi</div>'
          };
          editor.ui.registry.addButton('zabibtn',{
            text:'zabibtn',
           
            onAction:function(){
              editor.insertContent(zabi());
            }
          });
          var toTimeHtml = function (date) {
            return '<time datetime="' + 'date.toString()' + '">' + date.toDateString() + '</time>';
          };
      
          editor.ui.registry.addButton('customDateButton', {
            icon: 'insert-time',
            tooltip: 'Insert Current Date',
            disabled: true,
            onAction: function (_) {
              editor.insertContent(toTimeHtml(new Date()));
            },
            onSetup: function (buttonApi) {
              var editorEventCallback = function (eventApi) {
                buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === 'time');
              };
              editor.on('NodeChange', editorEventCallback);
      
              /* onSetup should always return the unbind handlers */
              return function (buttonApi) {
                editor.off('NodeChange', editorEventCallback);
              };
            }
          });
        },

        skin: false,
        content_css: false,
        language:'fa',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'example'
          
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | language ' +
        'removeformat | help '+
        'example|zabibtn customDateButton customStrikethrough',
        content_langs: [
          { title: 'English', code: 'en' },
          { title: 'Persian', code: 'fa' }
        ],
        // content_style: ['.zabi{color:red;border:5px solid #000; height:350px}',contentCss, contentUiCss].join('\n'),
      }}
    />
    </div>
  );
}
