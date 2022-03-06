import {Link , Outlet} from "react-router-dom";
import useChengeDocumentTitle from './hooks/useChengeDocumentTitle';


const Home = () => {
  useChengeDocumentTitle(`tutorial`);
  return (
    <div>
      <div className="indexPage notShow" id="indexPage">
        <Link className="indexA fontEn" to='/lessons'>lessons developer</Link>
        <Link className="indexA fontEn" to='/typeSpellTranslate'>type and spell and translate</Link>
        <Link className="indexA fontEn" to='/tinymce'>test editor tinymce</Link>
        <Link className="indexA fontEn" to='/tiptap'>test editor tiptap</Link>
      </div>
      <Outlet />

    </div>
  );
}
export default Home;