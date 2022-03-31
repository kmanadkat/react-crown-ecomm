import React from 'react'
import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'

const Login = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()
		console.log(user)
		createUserDocumentFromAuth(user)
	}

	return (
		<div>
			<h1>Login Page</h1>
			<button onClick={logGoogleUser}>Login with Google Pop up</button>
		</div>
	)
}

export default Login
