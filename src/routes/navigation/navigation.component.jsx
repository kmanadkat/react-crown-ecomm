import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './navigation.styles.scss'

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

const Navigation = () => {
	return (
		<React.Fragment>
			<div className='navigation'>
				<Link to='/' className='navigation--logo'>
					<CrownLogo />
				</Link>
				<div className='navigation--links'>
					<Link className='navigation--links__item' to='/shop'>
						SHOP
					</Link>
					<Link className='navigation--links__item' to='/auth'>
						LOGIN
					</Link>
				</div>
			</div>
			<Outlet />
		</React.Fragment>
	)
}

export default Navigation
