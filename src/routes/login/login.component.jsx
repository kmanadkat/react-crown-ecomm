import React from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	createAuthUserWithEmailPassword,
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
			<SignUpForm />
		</div>
	)
}

export default Login
