import React from 'react';
import CategoryItem from "./CategoryItem";

const CategoryList = ({categories}) => {
    return (
        <div className='row'>
            {categories.map(category =>
                <CategoryItem category={category} key={category.id}/>
            )}
        </div>
    );
};

export default CategoryList;