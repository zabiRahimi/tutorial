import {
    
    
     useParams,
     useLocation
  } from "react-router-dom";
// 

const RouteLessonsDeveloper=()=>{
    let params = useParams();
    const {state} = useLocation()
    console.log(state);
//   const { lesson_id } = location.state
    return (
        <div>{params.book} & {params.lesson} & {state.lesson_id} </div>
    )
    // <Routes>
    //     <Route path="/" element={<DashboardGraphs />} />
    //     <Route path="invoices" element={<InvoiceList />} />
    //   </Routes>
}
 export default RouteLessonsDeveloper;



// import { Route  } from "react-router-dom";
// import StartLaravel from "./lessonsDeveloper/laravel/StartLaravel";
// import Api from "./lessonsDeveloper/laravel/Api";
// import Vscode from "./lessonsDeveloper/universal/Vscode";
// import AddLesson from "./lessonsDeveloper/AddLesson";
// import Factory from "./lessonsDeveloper/laravel/Factory";
// import Seeder from "./lessonsDeveloper/laravel/seeder";
// import AddReactInLaravel from "./lessonsDeveloper/react/AddinLaravel";
// import Router from "./lessonsDeveloper/react/Router";
// let url='lessonsDeveloper';

// //create route with snippet -> RouteDeveloper
// export default [
//     //add lesson
//     <Route path={`/${url}/addLesson`} component={AddLesson}  key="addLesson"></Route>,

//     //laravel
//     // <Route path={`/${url}/startLaravel`} component={StartLaravel}  key="laravel1"></Route>,
//     <Route path={`/${url}/startLaravel`} element={StartLaravel}  key="laravel1" />,
//     <Route path={`/${url}/api`} component={Api}  key="laravel2"></Route>,
//     <Route path={`/${url}/factory`} component={Factory}  key='laravel3'></Route>,
//     <Route path={`/${url}/seeder`} component={Seeder}  key='laravel4'></Route>,
//     // universal
//     <Route path={`/${url}/vscode`} component={Vscode}  key="universal1"></Route>,
//     //react
//     <Route path={`/${url}/addinLaravel`} component={AddReactInLaravel}  key="react1"></Route>,
//     <Route path={`/${url}/router`} component={Router}  key='react2'></Route>,
// ] ;
// // {`${url}/startLavravel`}

// import StartLaravel from "./lessonsDeveloper/laravel/StartLaravel";
// import Api from "./lessonsDeveloper/laravel/Api";
// import Vscode from "./lessonsDeveloper/universal/Vscode";
// import AddLesson from "./lessonsDeveloper/AddLesson";
// import Factory from "./lessonsDeveloper/laravel/Factory";
// import Seeder from "./lessonsDeveloper/laravel/seeder";
// import AddReactInLaravel from "./lessonsDeveloper/react/AddinLaravel";
// import Router from "./lessonsDeveloper/react/Router";
// let url='lessonsDeveloper';