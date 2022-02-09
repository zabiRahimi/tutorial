import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, useImperativeHandle } from 'react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

const EditorALD = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({ setContentTiny }), []);
  const { input, setInput } = props;


  const handleSetElement = (value) => {
    
    setInput(prev => ({ ...prev, ['des']: value }));
    
  }

  /**
   * مقدار ادیتور را ست می‌کند
   * از این تابع برای خالی کردن ادیتور استفاده می‌شود
   * یکی از موارد استفاده هنگامی که اطلاعات به درستی در دیتابیس  ذخیره شد 
   * فراخوانی می‌شود
   */
  const setContentTiny = () => {
    setInput(prev => ({ ...prev, ['des']: '' }));
  }
  tinymce.PluginManager.add('element', function (editor, url) {
    // با این متد بستر نوشتن متن انگلیسی در متن فارسی مهیا می‌شود
    editor.ui.registry.addButton('enInFa', {
      text: 'enInFa',
      onAction: function () {
        editor.insertContent(
          "<span class='enInPFa'>&nbsp;</span>"
        );
      }
    });
    editor.ui.registry.addButton('code', {
      text: 'code',
      onAction: function () {
        editor.insertContent(
          "<div class='code'><per>&nbsp;</per></div>"
        );
      }
    });

  });
  return (
    <div>
      {/* نمایش آنلاین محتوای تایپ شده در ادیتور */}
      <div className='editorVal' dangerouslySetInnerHTML={{ __html: input.des }} />
      <Editor
        value={input.des}
        onEditorChange={handleSetElement}
        init={{
          selector: '#des',
          directionality: 'rtl',
         
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'element '

          ],
          toolbar: ['undo redo | formatselect | ' +
            'bold italic backcolor forecolor  | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | language ' +
            'removeformat | help ' +
            'enInFa code'],
          content_style: '.enInPFa{width: max-content;max-width: 100%;height: 24px;padding: 0 10px;margin: 1px 3px 0;direction: ltr ;background-color:#FAF8F8;border-radius: 5px; display:inline-block;}'+".code{margin: 0;padding: 0;background-color: #FAF8F8 ;color: #4371A9 ;display: flex;direction: ltr;font-size: 16px;font-family: 'b yekan';}"
        }}
      />
    </div>
  )

});

export default EditorALD;