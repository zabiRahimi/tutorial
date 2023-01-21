import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ShowOldLinks from "./ShowOldLinks";
import ShowBooks from "./ShowBooks";
import ShowLessons from "./ShowLessons";
import ShowLessonSecs from "./ShowLessonSecs";
import ShowLinksNew from "./ShowLinksNew";

const AddLink = () => {

    // در این فایل ، اضافه کردن لینک به بخش، ویرایش، خذف و نمایش آنها انجام می شود

    const navigate = useNavigate();

    /**
     * دریافت آی دی کتاب، آی دی درس، آی دی بخش به صورت زیر
     * index.book_id  from components/addLessonDeveloper/index.js
     * index.lesson_id from ... 
     * index.lessonlessonSec_id from ... 
     * lessonSec.id from components/addLessonDeveloper/lessonSection/lessonSection.js 
     * 
     * همچنین دریافت اطلاعات بخش های این درس از دیتابیس که در ثابت زیر ذخیره شده است
     * valLessonSecs from components/addLessonDeveloper/lessonSection/lessonSection.js  from  getLessonSecs()
     */
    const { index, lessonSec, valLessonSecs } = useOutletContext();

    /**
     * لینک های که از قبل ایجاد شده را از دیتابیس دریافت و در این هوک ذخیره می شود
     * همچنین لینک های که جدید ایجاد می شوند 
     * و پس از ذخیره در دیتابیس در این هوک ذخیره می شوند
     */
    const [oldLinks, setOldLinks] = useState([]);

    const [bookRefresh, setBookRefresh] = useState(false);

    const [runLesson, setRunLesson]= useState();

    const [lessons, setLessons] = useState([]);

    const [runLessonSec, setRunLessonSec]= useState();

    const [lessonSecs, setLessonSecs] = useState([]);

    /**
     * کنترل کردن نماد انتظار
     */
    const [loading, setLoading] = useState({
        lesson: false,
        lessonSec: false,
        linkNew: false,
    });

    /**
     * هنگامی که کاربر در قسمت انتخاب بخش درس، بخش های مورد نظر را انتخاب می کند
     * در این هوک ذخیره می شود
     * این اطلاعات هم برای نمایش در لینک های انتخاب شده، در قسمت نمایش لینک های نهایی 
     * و هم برای ارسال به دیتابیس مورد استفاده قرار می گیرد
     */
    const [links, setLinks] = useState([]);

    /**
     * هنگام ورود به این صفحه توسط این هوک 
     * متد زیر فراخوانی می شود
     * checkHasLessonSecId();
     */
    useEffect(() => {

        checkHasLessonSecId();

    }, []);

    /**
    * این متد چک می‌کند که کاربر یک بخشی را
    *  برای ویرایش و حذف انتخاب یا ایجاد کرده باشد
    */
    const checkHasLessonSecId = () => {
        if (lessonSec.id) { } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'هیچ بخشی انتخاب و یا ایجاد نشده است',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                valLessonSecs.length == 0 ?
                    //چنانچه هیچ فصلی از قبل ایجاد نشده باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/lessonSec/add`) :
                    //چنانچه فصلی وجود داشته باشد کاربر به این مسیر هدایت می‌شود
                    navigate(`/addLessonDeveloper/lessonSec/select`);
            });
        }
    } 

    return (

        <section className="SAED_content">
            <section className="allBodyLink">
                { lessonSec.id && <ShowOldLinks
                    has_link_id={lessonSec.id} 
                    oldLinks={oldLinks}
                    setOldLinks={setOldLinks}

                />}

                <section className="addLink">
                    <div className="titleShowLinks">ایجاد لینک</div>

                    <ShowBooks
                        bookRefresh={bookRefresh}
                        setBookRefresh={setBookRefresh}
                        setRunLesson={setRunLesson}
                        lessons={lessons}
                        setLessons={setLessons}
                        setLoading={setLoading}
                    />

                    <ShowLessons
                        runLesson={runLesson}
                        lessons={lessons}
                        lessonSecs={lessonSecs}
                        setLessonSecs={setLessonSecs}
                        loading={loading}
                        setLoading={setLoading}
                        setRunLessonSec={setRunLessonSec}
                    />

                    <ShowLessonSecs
                        lessonSec={lessonSec}
                        lessonSecs={lessonSecs}
                        oldLinks={oldLinks}
                        links={links}
                        setLinks={setLinks}
                        loading={loading}
                        setLoading={setLoading}
                        runLessonSec={runLessonSec}
                    />

                    <ShowLinksNew
                        oldLinks={oldLinks}
                        setOldLinks={setOldLinks}
                        setBookRefresh={setBookRefresh}
                        setLessons={setLessons}
                        setLessonSecs={setLessonSecs}
                        links={links}
                        setLinks={setLinks}
                        loading={loading}
                        setLoading={setLoading}
                    />

                </section>

            </section>

        </section>

    )
}

export default AddLink;



