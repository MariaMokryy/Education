import React, {useRef} from 'react';
import ForwardButton from "./UI/button/ForwardButton";
import ExpandCategoryCard from "./UI/dashboard/student/ExpandCategoryCard";
import './../App.css'


const CategoryItem = (props) => {

    function expandCard() {

        collapsedCardDiv.current.style.opacity = 0

        setTimeout(() => {
            collapsedCardDiv.current.style.display = 'none'
            cardBorder.current.classList.remove('col-lg-6')
            expandedCardDiv.current.style.display = 'flex'
            collapsedCardDiv.current.classList.remove("d-flex")
        }, 300)

        setTimeout(() => {
            expandedCardDiv.current.style.opacity = 1
        }, 350)

    }

    function collapseCard() {
        expandedCardDiv.current.style.opacity = 0

        setTimeout(() => {
            collapsedCardDiv.current.style.display = 'flex'
            collapsedCardDiv.current.classList.remove("d-flex")
            cardBorder.current.classList.add('col-lg-6')
            expandedCardDiv.current.style.display = 'none'
        }, 300)

        setTimeout(() => {
            collapsedCardDiv.current.style.opacity = 1
        }, 350)

    }

    const cardBorder = useRef()
    const collapsedCardDiv = useRef()
    const expandedCardDiv = useRef()


    return (
        <div ref={cardBorder} className='col-lg-6 col-sm-12 categoryItem d-flex justify-content-center align-items-center'>
            <div ref={collapsedCardDiv} className='collapsedCard d-flex flex-column justify-content-end p-3' style={{
                background: 'linear-gradient(90deg, #4F5760 0%, rgba(0, 0, 0, 0) 100%),' +
                    'url(' + props.category.image + ')',
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right"
            }}>
                <h1 className='col-6 categoryTitle m-0'>{props.category.name}</h1>
                <div className={"col-2 mt-3"}>
                    <ForwardButton onClick={expandCard} title={'Курсы'}/>
                </div>
            </div>

            <ExpandCategoryCard
                divRef={expandedCardDiv}
                collapseCard={collapseCard}
                category={props.category}
            />
            {/*<div ref={expandedCardDiv} className='expandedCard'>*/}
            {/*    <BackButton onClick={collapseCard}/>*/}
            {/*</div>*/}


        </div>
    );
};

export default CategoryItem;