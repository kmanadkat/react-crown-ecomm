import React from 'react'
import {
	createUserDocumentFromAuth,
	signInAuthUserWithEmailPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'

const defaultFormFields = {
	emailField: '',
	passwordField: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = React.useState(defaultFormFields)
	const { emailField, passwordField } = formFields

	const resetFormFields = () => setFormFields(defaultFormFields)

	const handleChange = event => {
		const { value, id } = event.target
		setFormFields(data => ({ ...data, [id]: value }))
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if (!emailField || !passwordField) {
			alert('Sign in field(s) cannot be empty')
			return
		}
		try {
			const response = await signInAuthUserWithEmailPassword(
				emailField,
				passwordField
			)
			console.log(response)
			resetFormFields()
		} catch (error) {
			if (
				error.code === 'auth/wrong-password' ||
				error.code === 'auth/user-not-found'
			) {
				alert('Incorrect Credentials')
			}
			console.warn(error.message)
		}
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()
		createUserDocumentFromAuth(user)
	}

	return (
		<div className='sign-in-container'>
			<h2>I already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					id='emailField'
					value={emailField}
					onChange={handleChange}
					type='email'
					required
				/>

				<FormInput
					label='Password'
					id='passwordField'
					value={passwordField}
					onChange={handleChange}
					type='password'
					required
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button buttonType='google' type='button' onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
