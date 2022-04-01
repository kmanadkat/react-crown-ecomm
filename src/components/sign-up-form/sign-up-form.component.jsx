import React from 'react'
import {
	createAuthUserWithEmailPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = React.useState(defaultFormFields)

	const handleChange = event => {
		const { value, id } = event.target
		setFormFields(data => ({
			...data,
			[id]: value,
		}))
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		const { email, password, confirmPassword } = formFields
		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}
		try {
			const { user } = await createAuthUserWithEmailPassword(email, password)
			await createUserDocumentFromAuth(user, { displayName })
			resetFormFields()
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use')
			} else {
				console.warn(error.message)
			}
		}
	}

	const { displayName, email, password, confirmPassword } = formFields

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					id='displayName'
					value={displayName}
					onChange={handleChange}
					type='text'
					required
				/>

				<FormInput
					label='Email'
					id='email'
					value={email}
					onChange={handleChange}
					type='email'
					required
				/>

				<FormInput
					label='Password'
					id='password'
					value={password}
					onChange={handleChange}
					type='password'
					required
				/>

				<FormInput
					label='Confirm Password'
					id='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					type='password'
					required
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
