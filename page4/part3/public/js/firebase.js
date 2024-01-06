import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDP61IAIXzME84SyIRj-5JIjuC9q7ybxWE",
  authDomain: "front-enter-56677.firebaseapp.com",
  projectId: "front-enter-56677",
  storageBucket: "front-enter-56677.appspot.com",
  messagingSenderId: "923414467122",
  appId: "1:923414467122:web:1cb3cf220e58987cd7622b",
  measurementId: "G-GJ2WHZZEEV",
  databaseURL: "https://front-enter-56677-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const data = initializeApp(firebaseConfig);
const db = getDatabase(data);
const auth = getAuth(data);

document.addEventListener('DOMContentLoaded', function() {
//log in
const logOutside = app.get('.login-outside');
app.get('.login').addEventListener('click',function(){
  logOutside.style.display = 'flex';
})

logOutside.addEventListener('click', function (event) {
    if (event.target === logOutside) {
        logOutside.style.display = 'none';
    }
});

function loginUI() {
  loginAlert.style.display = 'flex';
      loginKnow.addEventListener('click',() => {
        loginAlert.style.display = 'none';
        window.location.reload();
      })
};

//google login
function googleLogin() {
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      const userRef = ref(db, 'users/' + user.uid);
      set(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      loginUI();
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
    });
}
app.get('.login-button-gmail').addEventListener('click',googleLogin);

//email login
const loginAlert = app.get('.alert-outside');
const loginKnow = app.get('.alert-button');

function emailLogin() {
  const email = app.get('.login-input-mail').value;
  const password = app.get('.login-input-code').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Logged in:', user);
      loginUI();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login failed:', errorCode, errorMessage);
    });
};
app.get('.login-button-email').addEventListener('click',emailLogin);

//email register
function registerUser() {
  const email = app.get('.login-input-mail').value;
  const password = app.get('.login-input-code').value;

  if (!validateEmail(email)) {
    console.error('Invalid email format');
    alert('請輸入有效的電子郵件地址。');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(db, 'emailUsers/' + user.uid), {
        email: user.email,
      });
      console.log('User registered and data saved:', user);
      loginUI();
    })
    .catch((error) => {
      console.error('Error registering new user:', error);
    });
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

const register = app.get('.login-button-register');
register.addEventListener('click', registerUser);

//偵測用戶登入方式
checkUserLoggedIn().then(user => {
  logOutside.style.display = 'none';
  checkLoginType(user);
}).catch(error => {
  console.log('用戶未登入 '+ error);
});

const loginButtons = app.get('.login');
function checkLoginType() {
  const user = auth.currentUser;
  const provider = user.providerData[0].providerId;
  if (provider === 'password') {
    console.log('用戶是通過電子郵件和密碼登入的');
    loginButtons.innerHTML = '<a>會員</a>';
    loginButtons.addEventListener('click', () => {
      window.location.href = 'profile.html';
    })
    
  } else if (provider === 'google.com') {
    console.log('用戶是通過 Google 登入的');
    loginButtons.style.display = 'none';
    const photoURL = document.createElement('div');
    const search = app.get('.search');
    photoURL.classList.add('header-nav-div');
    photoURL.classList.add('photoURL');
    photoURL.style.background = `url("${user.photoURL}") center center / cover no-repeat`;
    app.get('.header-nav').insertBefore(photoURL,search);
    photoURL.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
  }
}

//forget password
function resetPassword() {
  const emailAddress = app.get('.login-input-mail').value;
  if(emailAddress){
    sendPasswordResetEmail(auth, emailAddress)
    .then(function() {
    console.log('Password Reset Email Sent!');
    alert('密碼重置郵件已發送，請檢查您的郵箱。');
  }).catch(function(error) {
    console.error('Error sending password reset email:', error);
    alert('錯誤：' + error.message);
  });
  } else {
    alert('請輸入有效的email');
  } 
}
const forgotPasswordButton = app.get('.login-forget');
forgotPasswordButton.addEventListener('click', resetPassword);

});

//check login
export function checkUserLoggedIn() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject('No user logged in');
      }
    });
  });
}