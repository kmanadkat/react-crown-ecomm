import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
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

// Providers
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const auth = getAuth(firebaseApp)

/**####################################
 * AUTHENTICATION
 #####################################*/
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

// Create User With Email & Password
export const createAuthUserWithEmailPassword = async (email, password) => {
	if (!email || !password) {
		return
	}
	return await createUserWithEmailAndPassword(auth, email, password)
}

// Sign In User With Email & Password
export const signInAuthUserWithEmailPassword = async (email, password) => {
	if (!email || !password) {
		return
	}
	return await signInWithEmailAndPassword(auth, email, password)
}

// Sign Out User
export const signoutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = callback =>
	onAuthStateChanged(auth, callback, console.error, args =>
		console.log('Completed: ', args)
	)

/**####################################
 * FIREBASE FIRESTORE
 #####################################*/
export const db = getFirestore(firebaseApp)

// Add User in DB
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = {}
) => {
	if (!userAuth) return
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
			...additionalInfo,
		})
	} catch (error) {
		console.log('createUserDocumentFromAuth: ', error)
	}
}
