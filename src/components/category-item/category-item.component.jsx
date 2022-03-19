import React from 'react'
import './category-item.styles.scss'

const CategoryItem = ({ category }) => {
	const { title, imageUrl } = category
	return (
		<div className='category-container'>
			<div
				className='category-container-img'
				style={{ background: `url(${imageUrl})` }}></div>
			<div className='category-container-body'>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	)
}

export default CategoryItem
