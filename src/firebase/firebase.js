import { initializeApp } from 'firebase/app'
import store from '../App/store'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'

import {
	getFirestore,
	collection,
	query,
	where,
	doc,
	getDoc,
	getDocs,
	addDoc,
	deleteDoc,
	setDoc,
} from 'firebase/firestore'

import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage'

import { setLoading, setUser } from '../features/user/userSlice'
import {
	setMyQuizzes,
	setMyQuizzesLoading,
	setMyQuizzesPlaceholderLoading,
	setMyTopQuizzes,
	setPassedQuizzes,
} from '../features/myQuizzes/myQuizzes'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()
const auth = getAuth()
const storage = getStorage()

onAuthStateChanged(auth, (user) => {
	if (user) {
		store.dispatch(setLoading(true))
		store.dispatch(setUser(user))
		store.dispatch(setLoading(false))
	} else {
		store.dispatch(setUser(user))
	}
})

export const loginWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			store.dispatch(setLoading(true))
			store.dispatch(setUser(result.user))
			store.dispatch(setLoading(false))
		})
		.catch((error) => {
			console.log(error)
		})
}

export const signOutGoogle = () => {
	signOut(auth)
		.then(() => {
			store.dispatch(setUser(null))
		})
		.catch((error) => {
			console.log(error)
		})
}

export const setQuizToFirestore = async (data) => {
	const docRef = await addDoc(collection(db, 'quizzes'), data)
	return docRef.id
}

export const setQuizResult = async (data) => {
	await setDoc(doc(db, 'quizResult', data.quizId + data.userId), data)
}

export const getQuizResultAll = async (quizId) => {
	const data = []
	const q = query(collection(db, 'quizResult'), where('quizId', '==', quizId))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	return data
}

export const getMyPassedQuizzes = async (id) => {
	const data = []
	const result = []

	const q = query(collection(db, 'quizResult'), where('userId', '==', id))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	for (let item of data) {
		const docRef = doc(db, 'quizzes', item.data.quizId)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			result.push({ id: docSnap.id, data: docSnap.data() })
		} else {
			console.log('No such document!')
		}
	}

	store.dispatch(setPassedQuizzes(result))
}

export const getMyPassedQuizzesImg = async () => {
	store.dispatch(setMyQuizzesPlaceholderLoading(true))

	const data = JSON.parse(JSON.stringify([...store.getState().myQuizzes.passedQuizzes]))
	const result = []

	for (let item of data) {
		item.imgUrl = await getDownloadURL(ref(storage, `images/${item.data.img}`))
		result.push(item)
	}

	store.dispatch(setMyQuizzesPlaceholderLoading(false))
	store.dispatch(setPassedQuizzes(result))
	store.dispatch(setMyTopQuizzes())
}

export const getDataOneTime = async (uid) => {
	store.dispatch(setMyQuizzesLoading(true))
	const data = []
	const q = query(collection(db, 'quizzes'), where('creatorId', '==', uid))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	store.dispatch(setMyQuizzes(data))
	store.dispatch(setMyTopQuizzes())
	store.dispatch(setMyQuizzesPlaceholderLoading(true))
	store.dispatch(setMyQuizzesLoading(false))
}

export const getMyQuizzesImg = async () => {
	store.dispatch(setMyQuizzesPlaceholderLoading(true))

	const data = JSON.parse(JSON.stringify([...store.getState().myQuizzes.myQuizzes]))
	const result = []

	for (let item of data) {
		item.imgUrl = await getDownloadURL(ref(storage, `images/${item.data.img}`))
		result.push(item)
	}

	store.dispatch(setMyQuizzesPlaceholderLoading(false))
	store.dispatch(setMyQuizzes(result))
	store.dispatch(setMyTopQuizzes())
}

export const getOneData = async (uid) => {
	store.dispatch(setMyQuizzesLoading(true))
	store.dispatch(setMyQuizzesPlaceholderLoading(true))

	let result = {}
	const docRef = doc(db, 'quizzes', uid)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const imgSrc = await getDownloadURL(ref(storage, `images/${docSnap.data().img}`))
		result = { ...docSnap.data(), imgSrc: imgSrc }

		store.dispatch(setMyQuizzesLoading(false))
		store.dispatch(setMyQuizzesPlaceholderLoading(false))

		return result
	}
	store.dispatch(setMyQuizzesLoading(false))
	return null
}

export const getOneQuiz = async (uid) => {
	store.dispatch(setMyQuizzesLoading(true))
	store.dispatch(setMyQuizzesPlaceholderLoading(true))

	const docRef = doc(db, 'quizzes', uid)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		store.dispatch(setMyQuizzesLoading(false))
		store.dispatch(setMyQuizzesPlaceholderLoading(false))

		return docSnap.data()
	}
	store.dispatch(setMyQuizzesLoading(false))
	return null
}

export const setImageToFirestorage = (uid, message) => {
	const storageRef = ref(storage, `images/${uid}`)

	uploadString(storageRef, message, 'data_url').then((snapshot) => {
		console.log('Uploaded a data_url string!')
	})
}

export const deleteOneQuiz = async (id, imgId) => {
	await deleteDoc(doc(db, 'quizzes', id))
	deleteObject(ref(storage, `images/${imgId}`))
		.then(() => {})
		.catch((error) => console.log(error))
}

export const setDocumentToFirestorage = async (uid, document) => {
	console.log('working')
}

export default app
