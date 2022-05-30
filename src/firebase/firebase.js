import { initializeApp } from 'firebase/app'
import store from '../App/store'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'

import {
	getFirestore,
	collection,
	query,
	where,
	doc,
	setDoc,
	getDoc,
	getDocs,
	addDoc,
	deleteDoc,
} from 'firebase/firestore'

import { getStorage, ref, uploadString, uploadBytes, getDownloadURL, deleteObject, getBlob } from 'firebase/storage'

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

export const setImageToFirestorage = async (uid, message) => {
	const storageRef = ref(storage, `images/${uid}`)
	await uploadString(storageRef, message, 'data_url')
}

export const deleteOneQuiz = async (id, imgId) => {
	await deleteDoc(doc(db, 'quizzes', id))
	deleteObject(ref(storage, `images/${imgId}`))
		.then(() => {})
		.catch((error) => console.log(error))
}

export const setCourseToFirestore = async (data) => {
	const docRef = await addDoc(collection(db, 'courses'), data)
	return docRef.id
}

export const updateCourseToFirestore = async (data) => {
	await setDoc(doc(db, 'courses', data.id), data.data)
	return data
}

export const setCourseSectionToFirestore = async (data) => {
	const docRef = await addDoc(collection(db, 'courseSections'), data)
	return docRef.id
}

export const updateCourseSectionToFirestore = async (data) => {
	await setDoc(doc(db, 'courseSections', data.id), data.data)
	return data
}

export const getAllMyCoursesFromFirestore = async (uid) => {
	const data = []
	const q = query(collection(db, 'courses'), where('creatorId', '==', uid))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	for (let course of data) {
		if (course.data.imgId) {
			course.data.img = await getDownloadURL(ref(storage, `images/${course.data.imgId}`))
		}
	}

	return data
}

export const getAllMyCoursesFromFirestoreForView = async (uid) => {
	const data = []
	const q = query(collection(db, 'courses'), where('creatorId', '==', uid), where('publish', '==', true))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	for (let course of data) {
		if (course.data.imgId) {
			course.data.img = await getDownloadURL(ref(storage, `images/${course.data.imgId}`))
		}
	}

	return data
}

export const getAllMyCoursesSectionsFromFirestore = async (id) => {
	const data = []
	const q = query(collection(db, 'courseSections'), where('courseId', '==', id))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	return data
}

export const deleteOneCourse = async (id, imgId) => {
	await deleteDoc(doc(db, 'courses', id))
	if (imgId) {
		deleteObject(ref(storage, `images/${imgId}`))
			.then(() => {})
			.catch((error) => console.log(error))
	}
}

export const deleteOneCourseSection = async (id) => {
	await deleteDoc(doc(db, 'courseSections', id))
}

export const getOneCourse = async (uid) => {
	const docRef = doc(db, 'courses', uid)
	const docSnap = await getDoc(docRef)
	let result = {}

	if (docSnap.exists()) {
		const img = await getDownloadURL(ref(storage, `images/${docSnap.data().imgId}`))
		result = { ...docSnap.data(), img }
	}

	return result
}

export const getOneCourseSection = async (id) => {
	const docRef = doc(db, 'courseSections', id)
	const docSnap = await getDoc(docRef)
	let result = {}

	if (docSnap.exists()) {
		result = { ...docSnap.data() }
	}

	return result
}

export const setDocumentToFirestore = async (data) => {
	const docRef = await addDoc(collection(db, 'documents'), data)
	return docRef.id
}

export const deleteOneDocumentFromFirestore = async (id, documentId) => {
	await deleteDoc(doc(db, 'documents', id))
	deleteObject(ref(storage, `documents/${documentId}`))
		.then(() => {})
		.catch((error) => console.log(error))
}

export const setDocumentToFirestorage = async (uid, data) => {
	const storageRef = ref(storage, `documents/${uid}`)
	await uploadBytes(storageRef, data)
}

export const getAllMyDocuments = async (sectionId) => {
	const data = []
	const q = query(collection(db, 'documents'), where('sectionId', '==', sectionId))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	for (let course of data) {
		course.data.document = await getBlob(ref(storage, `documents/${course.data.id}`))
	}

	return data
}

export const getAllQuizzesFromFirestore = async () => {
	const data = []
	const querySnapshot = await getDocs(collection(db, 'quizzes'))
	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	for (let course of data) {
		course.data.imgSrc = await getDownloadURL(ref(storage, `images/${course.data.img}`))
	}

	return data
}

export const getAllCoursesFromFirestore = async () => {
	const data = []
	const querySnapshot = await getDocs(collection(db, 'courses'), where('publish', '==', true))

	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, data: doc.data() })
	})

	for (let course of data) {
		if (course.data.imgId) {
			course.data.img = await getDownloadURL(ref(storage, `images/${course.data.imgId}`))
		}
	}

	return data
}

export default app
