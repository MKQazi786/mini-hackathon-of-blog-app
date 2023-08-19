const firebaseConfig = {
    apiKey: "AIzaSyAsc6u0IebLl18aAAeyOijQ1bvpCITsTAs",
    authDomain: "personal-blogging-app.firebaseapp.com",
    projectId: "personal-blogging-app",
    storageBucket: "personal-blogging-app.appspot.com",
    messagingSenderId: "798023453384",
    appId: "1:798023453384:web:f4eabc64356185ccf773fd",
    measurementId: "G-CKWNGZ3MRX"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

window.signUp = (event) => {

    event.preventDefault()
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let email = document.getElementById("emailAddress").value
    let password = document.getElementById("Password").value
    let repeatPassword = document.getElementById("RepeatPassword").value;

    if (!firstName || !lastName || !email || !password || !repeatPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all required fields.',
        });
        return
    }

    if (password !== repeatPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match.',
        });
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            Swal.fire({
                title: 'succesfully signup',
                text: 'new user is registered',
                icon: 'success',
            }).then(() => {
                let user = userCredential.user;
                console.log("user: ", user)
                window.location = "login.html"
                // ...
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'signup error:',
                text: error,
            });
            console.log("firebase signup error: ", error)

            // ..
        });

}

window.logIn = (event) => {

    event.preventDefault()
    let email = document.getElementById("emailAddress").value
    let password = document.getElementById("Password").value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            Swal.fire({
                title: 'succesfully Login',
                text: 'you are redirected to blogging app',
                icon: 'success',
            });
            window.location = "dashboard.html"
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'log in error ',
                text: errorMessage,
            });
            console.log("firebase signup error: ", error)

        });

}

// window.publishBlog = (event) => {
//     event.preventDefault()
    
//     let title = document.getElementById("title").value
//         let blog = document.getElementById("text").value
    
//         const allBlogsRef = database.ref('blogs');
//         const newBlogRef = allBlogsRef.push();
    
        
//         db.collection("blogs").add({
//             title:title,
//             blog:blog
//         })
//         .then((docRef) => {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch((error) => {
//             console.error("Error adding document: ", error);
//         });
        
//         document.getElementById("title").value = '';
//         document.getElementById("text").value = '';
//     }
    
//     window.renderBlog = (event) => {
    
//         event.preventDefault()
    
//         let title = document.getElementById("title").value
//         let blog = document.getElementById("text").value
    
//         let div = document.createElement("div")
//         div.setAttribute("class","blogs")
//         let h3 = document.createTextNode(title)
//         div.appendChild(h3)
        
//         db.collection("users").get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 console.log(`${doc.id} => ${doc.data()}`);
//             });
//         });
//         document.getElementById("result").innerHTML = doc 
//     }




// // window.signOut = (event) => {
// //     event.preventDefault()

// //     firebase.auth().signOut().then(() => {
// //         console.log("Sign out successful");
// //         Swal.fire({
// //             title: 'Sign out successful',
// //             text: 'you are redirected to SignUP page',
// //             icon: 'success',
// //         });

// //         window.location.href = "index.html";
// //     }).catch((error) => {
// //         Swal.fire({
// //             icon: 'error',
// //             title: 'logout is not succesful:',
// //             text: error,
// //         });

// //         console.log("logout is not succesful:", error);

// //     });
// // }