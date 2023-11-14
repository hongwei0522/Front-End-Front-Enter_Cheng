import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', function() {

    const submitButton = document.querySelector('.contact-submit');
    
    submitButton.addEventListener('click', function() { 
        const name = document.querySelector('.contact-input-name');
        const email = document.querySelector('.contact-input-email');
        const subject = document.querySelector('.contact-input-subject');
        const content = document.querySelector('.contact-content');
    
        const db = getDatabase();
        const contactsRef = ref(db, '/contacts');
        
        if(name.value && email.value && subject.value && content.value) {
            push(contactsRef, {
                name: name.value,
                email: email.value,
                subject: subject.value,
                content: content.value
            });
            alert('成功送出，我們會盡快回覆您！');

            name.value = '';
            email.value = '';
            subject.value = '';
            content.value = '';
        } else {
            alert('請確實輸入資料');
        }
    });
  });
  