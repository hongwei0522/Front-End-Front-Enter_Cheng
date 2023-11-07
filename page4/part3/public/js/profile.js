import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { checkUserLoggedIn } from './firebase.js';

checkUserLoggedIn().then(user => {
    fetchAndDisplayUserProfile(user.uid);
}).catch(() => { window.location.href = 'index.html'; });

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

app.get('.profile').addEventListener('click',function() {
    app.get('.profile-display').style.display = 'flex';
    app.get('.profile-collection').style.display = 'none';
});

app.get('.collection').addEventListener('click',function() {
    app.get('.profile-display').style.display = 'none';
    app.get('.profile-collection').style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', function() {
    function renderBookmarks(bookmarks) {
        const container = app.get('.profile-collection');
        bookmarks.forEach(bookmark => {
            const collectionDiv = app.create('div');
            collectionDiv.classList.add('collection-div');
            container.appendChild(collectionDiv);

            const collectionImg = app.create('img');
            collectionImg.classList.add('collection-img');
            collectionDiv.appendChild(collectionImg);
            collectionImg.src = bookmark.squareUrl;
            collectionImg.setAttribute('id', bookmark.creatTime);

            const collectionTitle = app.create('div');
            collectionTitle.classList.add('collection-title');
            collectionDiv.appendChild(collectionTitle);
            collectionTitle.textContent = bookmark.name;

            const collectionDelete = app.create('div');
            collectionDelete.classList.add('collection-delete');
            collectionDiv.appendChild(collectionDelete);
            collectionDelete.setAttribute('data-article-id', bookmark.creatTime);
        });
    }

    const bookmarkedIds = Object.keys(localStorage)
        .filter((key) => key.startsWith('bookmarkedArticleId_'))
        .map((key) => localStorage.getItem(key));

    fetch('front-enter-export.json')
        .then(response => response.json())
        .then(data => {
            const articles = Object.values(data.article);
            const bookmarkedArticles = articles.filter(article => bookmarkedIds.includes(article.creatTime.toString()));
            renderBookmarks(bookmarkedArticles);
        })
        .catch(error => {
            console.error('Error fetching the JSON data: ', error);
        });

    //處理動態添加的元素
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('collection-delete')) {
            const articleId = event.target.getAttribute('data-article-id');

            localStorage.removeItem('bookmarkedArticleId_' + articleId);
            localStorage.setItem('clickCount_' + articleId, '0');

            const collectionDiv = event.target.closest('.collection-div');
            if (collectionDiv) {
                collectionDiv.remove();
            }
        }
        if (event.target.classList.contains('collection-img')) {
            const collectionId = event.target.getAttribute('id');
            const url = 'content.html?id=' + encodeURIComponent(collectionId);
            window.location.href = url;
        }
    })
});
