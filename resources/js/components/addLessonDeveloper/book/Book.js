import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useOutletContext } from "react-router";
import Swal from 'sweetalert2';

const Book = () => {

    const [valBooks, setValBooks] = useState([]);
    console.log(typeof valBooks);
    console.log( valBooks);
    const [check, setCheck] = useState('');

    let navigate = useNavigate();

    let { state } = useLocation();

    const [element, setElement] = useOutletContext();

    async function getBooks() {
        await axios.get('/getBooks', { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
            .then( response => {
                console.log(check);
                 response.data.books.length != 0 ? (setValBooks(response.data.books), check =='add' || check==2?setCheck(2):setCheck(1)) : ( setCheck(2));
            })
            .catch(error => {
                alert('مشکلی پیش آمده! چک کنید که دیتابیس فعال باشه.')
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            await getBooks();
            checkHasBook();
            
        }
        fetchData()
    }, [ check]);
    // state.link2, state.re_book,

    const checkHasBook = () => {
        console.log(check);
        switch (check) {
            case '': ''
                break;
            case 2 : navigate("add"); 
                break;
                case 3: navigate("add"); 
                break;
            default: 
                navigate(`select`);

                // navigate(`${state.link2}`, { state: { re_index: 1, link: 'book', link2: state.link2 } });
        }
        // valBooks == 'is not' ?
        //     (navigate("add", { state: {re_index: 1, link: 'book', link2: 'add' } }),console.log('nabu'))
        //     : state.link2 == 'edit' && !element.book_id ?
        //         alertSelectBook()
        //         :
        //         navigate(`${state.link2}`, { state: { re_index: 1, link: 'book', link2: state.link2 } });
    }

    const alertSelectBook = () => {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'برای ویرایش و یا حذف کتاب، ابتدا لازم است کتاب مودر نظر را انتخاب کنید',
            showConfirmButton: false,
            timer: 4500,

        }).then((result) => {
            navigate(`select`, { state: { re_index: 1, link: 'book', link2: 'select' } })

        })

    }
    const alertNotBook=()=>{
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'تا کنون هیچ کتابی ایجاد نشده است. کتاب مورد نظر را ایجاد کنید.',
            showConfirmButton: false,
            timer: 4500,

        });
    }
  const add='add';
    return (
        <section className="sectionAED">
            {valBooks ?
                <>
                    <nav className="navAED">
                        <NavLink to={'select'} onClick={!valBooks?alertNotBook:''}  className={({ isActive }) =>
                            isActive  ? 'SAED_active' : 'SAED_passive'}
                            >انتخاب کتاب</NavLink>
                        <NavLink to={add} className={({ isActive }) =>
                            isActive ? 'SAED_active' : 'SAED_passive'}
                            >ایجاد کتاب</NavLink>
                        <NavLink to={'edit'} onClick={!valBooks?alertNotBook:''}  className={({ isActive }) =>
                            isActive  ? 'SAED_active' : 'SAED_passive'}
                            >ویرایش و حذف کتاب</NavLink>
                    </nav>
                    <Outlet context={{ valBooks,setValBooks, element, setElement }} />
                </>
                :
                <div className="d-flex justify-content-center select_spinner">
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

        </section>
    );
}

export default Book;