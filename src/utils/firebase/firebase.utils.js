import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCfivnRHXtaTJWrEGhnG0xGveMZCeOk5xk',
	authDomain: 'crwn-clothing-learn-db.firebaseapp.com',
	projectId: 'crwn-clothing-learn-db',
	storageBucket: 'crwn-clothing-learn-db.appspot.com',
	messagingSenderId: '933948855316',
	appId: '1:933948855316:web:4e5782d2ff02d7478c0301',
}

const firebaseApp = initializeApp(firebaseConfig)

// Auth Related
const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const auth = getAuth(firebaseApp)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// Firestore Database related
export const db = getFirestore(firebaseApp)
export const createUserDocumentFromAuth = async userAuth => {
	const userDocRef = doc(db, 'users', userAuth.uid)
	const userSnapshot = await getDoc(userDocRef)

	if (userSnapshot.exists()) {
		return userDocRef
	}

	const { displayName, email } = userAuth
	const createdAt = new Date()

	try {
		await setDoc(userDocRef, {
			displayName,
			email,
			createdAt,
		})
	} catch (error) {
		console.log('createUserDocumentFromAuth: ', error)
	}
}
