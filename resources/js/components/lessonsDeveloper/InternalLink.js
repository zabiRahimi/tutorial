import { useEffect, useState } from "react";
import Prism from "prismjs";

const InternalLink = (props) => {

    const { links } = props;

    const [link, setLink] = useState([]);

    useEffect(() => {

        getLinks(links);

    }, []);


    const getLinks = async (arr) => {

        let array = [];

        for (const key in arr) {

            array[key] = links[key].has_link_id;

        }

        let linkss = [];

        Promise.all(array.map((endpoint) => axios.get(`/getOneLessonSection/${endpoint}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } }))).then(
            axios.spread((...allData) => {

                allData.map((data) => {

                    linkss.push(data.data.lessonSection);

                })

            })).then(() => {

                setLink([...linkss])

            });

    }

    const showLinks = () => {

        let val = link.map((linkval, i) => {

            return <section className="containerLink" key={i}>

                <div className="linkTitle" onClick={e => showDesLink(e)}
                >

                    <span>{linkval.lesson.book.book}</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>

                    <span>{linkval.lesson.lesson}</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>

                    <span>{linkval.lesson_section}</span>

                    <span className="btnShowSecLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </span>

                    <span className="btnHideSecLink notBtnShow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg>
                    </span>

                </div>

                <div className="linkDes notShowLinkDes" dangerouslySetInnerHTML={{ __html: linkval.des }}></div>

            </section>

        });

        // این دستور باعث می شود که کدها بسته به نوع زبانشان رنگ بندی شوند
        setTimeout(() => Prism.highlightAll(), 0);

        return val;

    }

    const showDesLink = (e) => {

        e.currentTarget.childNodes[5].classList.toggle("notBtnShow");
        e.currentTarget.childNodes[6].classList.toggle("notBtnShow");

        e.currentTarget.parentNode.childNodes[1].classList.toggle("notShowLinkDes");

    }



    return (

        <>

            {link.length ? showLinks() : ''}

        </>

    )


}

export default InternalLink;