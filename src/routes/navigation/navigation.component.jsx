import { useContext, Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './navigation.styles.scss'

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { signoutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
	const { currentUser } = useContext(UserContext)

	const signOutHandler = async () => {
		try {
			await signoutUser()
		} catch (error) {
			console.log('Error Signing Out User:', error)
		}
	}

	return (
		<Fragment>
			<div className='navigation'>
				<Link to='/' className='navigation--logo'>
					<CrownLogo />
				</Link>
				<div className='navigation--links'>
					<Link className='navigation--links__item' to='/shop'>
						SHOP
					</Link>
					{currentUser ? (
						<span
							className='navigation--links__item'
							role='button'
							onClick={signOutHandler}>
							LOGOUT
						</span>
					) : (
						<Link className='navigation--links__item' to='/auth'>
							LOGIN
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</Fragment>
	)
}

export default Navigation
