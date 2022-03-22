import React from 'react'
import CategoryItem from '../category-item/category-item.component'
import './categories-wrapper.styles.scss'

const CategoriesWrapper = ({ categories }) => {
	return (
		<div className='categories-wrapper'>
			{categories.map(category => (
				<CategoryItem category={category} key={category.id} />
			))}
		</div>
	)
}

export default CategoriesWrapper
