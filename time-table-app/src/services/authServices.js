import firebase, {app} from "../firebaseConfig";

const auth = app.auth();

const db = app.firestore();

const register = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection('users')
        .add({
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    }catch(error) {
        console.log(error.message);
    }
}

const logout = () => {
    auth.signOut();
}

const signIn = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
    }catch(error) {
        console.log(error.message)
    }
}

const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Slaptazodzio atkurimo nuorodo issiusta el.pastu')
    } catch(error) {
        console.log(error);
    }
}

export default firebase;

export {
    auth,
    db,
    register,
    logout,
    signIn,
    resetPassword
};