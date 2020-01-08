import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCk53CdRs1UAOFWi2SyilLrXyPtFGPK10k',
	authDomain: 'vacation-budget-tracker.firebaseapp.com',
	databaseURL: 'https://vacation-budget-tracker.firebaseio.com',
	projectId: 'vacation-budget-tracker',
	storageBucket: 'vacation-budget-tracker.appspot.com',
	messagingSenderId: '731780327006',
	appId: '1:731780327006:web:fba006ee8750cad81f36cf',
	measurementId: 'G-P1XHF5C878',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
