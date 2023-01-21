import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ShowOldLinks = (props) => {

    const { has_link_id, oldLinks, setOldLinks } = props;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getHasLinks();
    }, []);

    const getHasLinks = () => {

        setLoading(true);
        axios.get(`/getHasLinks/${has_link_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(response => {
                
                setOldLinks(response.data.allLinks)
                
                setLoading(false)

            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })

    }

    const showOldLinks = () => {

        let val = oldLinks.map((oldLink, i) => {

            return <section key={i} className="rowLink">

                <div className="RL_book">{oldLink.lesson_section.lesson.book.book}</div>
                <div className="RL_lesson">{oldLink.lesson_section.lesson.lesson}</div>
                <div className="RL_lessonSec">{oldLink.lesson_section.lesson_section}</div>
                <div className="RL_del">
                    <button className="RL_delBtn" onClick={() => deleteLink(oldLink.id, oldLink.lesson_section_id, oldLink.has_link_id)} >حذف</button>
                </div>
                
            </section>

        });

        return val;
    }

    const deleteLink = (id, lesson_section_id, has_link_id) => {

        setLoading(true);

        axios.delete(`/deleteLink/${lesson_section_id}/${has_link_id}`, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then(() => {

                deleteFromOldLinks(id);

                setLoading(false);


            })
            .catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'لینک حذف نشد ',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
    }

    /**
     * لینکی که از دیتابیس حذف شد توسط این متد از هوک زیر نیز پاک می شود
     * oldLinks
     */
    const deleteFromOldLinks = (id) => {

        let index = findIndexOldLink(id);

        oldLinks.splice(index, 1);

        setOldLinks(oldLinks);

    }

    const findIndexOldLink = (id) => {
        
        let valFind = oldLinks.findIndex(item => item.id == id);
        return valFind;

    }

    return (
        <section className="showLinks">
            <div className="titleShowLinks">لینک های ایجاد شده</div>
            <section className="bodyShowLinks">

                <section className="headShowLikns">
                    <div className="HSL_book">کتاب</div>
                    <div className="HSL_lesson">درس</div>
                    <div className="HSL_lessonSec">بخش</div>
                    <div className="HSL_del">حذف لینک</div>
                </section>

                <section className="listLinks">

                    {

                        loading ?

                            <div className="d-flex justify-content-center select_spinner">
                                <div className="spinner-border  " role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>

                            :

                            oldLinks.length ?
                                showOldLinks()
                                :
                                <div className="notBooks"> تا کنون لینکی برای این بخش ایجاد نشده است </div>

                    }

                </section>

            </section>

        </section>
    )

}

export default ShowOldLinks;