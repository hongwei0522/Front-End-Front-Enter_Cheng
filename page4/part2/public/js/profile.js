import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// 監聽用戶是否登入
onAuthStateChanged(getAuth(), (user) => {
    if (user) {
        fetchAndDisplayUserProfile(user.uid);
    } else {
        console.log("User is not signed in.");
        window.location.href = 'index.html';
    }
});

const auth = getAuth();
const db = getDatabase();
  
async function fetchAndDisplayUserProfile(uid) {
    const userProfileRef = ref(db, `users/${uid}`);
    const emailUserProfilesRef = ref(db, `emailUsers/${uid}`);
  
    try {
        const userProfileSnapshot = await get(userProfileRef);
        const emailUserProfileSnapshot = await get(emailUserProfilesRef);
        const userProfile = userProfileSnapshot.val();
        const emailUserProfile = emailUserProfileSnapshot.val();
        const combinedProfile = {
          ...userProfile,
          ...emailUserProfile
        };
    
        displayUserProfile(combinedProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

function displayUserProfile(combinedProfile) {
    const name = app.get('.input-name');
    const email = app.get('.input-email');
    const phone = app.get('.input-phone');
    const photo = app.get('.profile-photo');
    const user = auth.currentUser;
    const provider = user.providerData[0].providerId;

    email.value = combinedProfile.email;
    if (provider === 'google.com') {
        name.value = combinedProfile.displayName;
        photo.style.background = `url("${combinedProfile.photoURL}") center center / cover no-repeat`;
    } else if (provider === 'password') {
        if(combinedProfile.name){
            name.value = combinedProfile.name;
        }
        if(combinedProfile.phone){
            phone.value = combinedProfile.phone;
        }
    };
};

let originalName = app.get('.input-name').value;
let originalPhone = app.get('.input-phone').value;

app.get('.modify').addEventListener('click', function() {
    let inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        if (!input.classList.contains('input-email')) {
            input.disabled = false;
        }
    });

    app.get('.profile-confirm-cancel').style.display = 'block';
    this.style.display = 'none';
    originalName = app.get('.input-name').value;
    originalPhone = app.get('.input-phone').value;
});

app.get('.confirm').addEventListener('click', function() {
    let name = app.get('.input-name').value;
    let phone = app.get('.input-phone').value;
    const user = auth.currentUser;
    let userId = user.uid;
    const provider = user.providerData[0].providerId;

    let userRefPath;
    if (provider === 'password') {
        userRefPath = 'emailUsers/' + userId;
    } else {
        userRefPath = 'users/' + userId;
    }

    update(ref(db, userRefPath), {
        name: name,
        phone: phone
    }).then(() => {
        console.log('User data saved successfully!');
    }).catch((error) => {
        console.error('User data could not be saved.' + error);
    });

    let inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.disabled = true;
    });
    app.get('.profile-confirm-cancel').style.display = 'none';
    app.get('.modify').style.display = 'block';
});



app.get('.cancel').addEventListener('click', function() {
    // 恢復到原始狀態，不儲存修改資料
    app.get('.input-name').value = originalName;
    app.get('.input-phone').value = originalPhone;

    let inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.disabled = true;
    });

    app.get('.profile-confirm-cancel').style.display = 'none';
    app.get('.modify').style.display = 'block';
});

function logout() {
    signOut(auth).then(() => {
      console.log('User signed out.');
      window.location.href = '/index.html';
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
}
app.get('.logout').addEventListener('click',logout);
