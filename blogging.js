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
var auth = firebase.auth();
var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user").innerText = user.email;
        console.log(user.email);
    } else {
        document.getElementById("user").innerText = "Unknown";
        window.location.href = "../index.html"
        console.log("not signed in");
    }
});

window.publishBlog = (event) => {
    event.preventDefault()
    
    let title = document.getElementById("title").value
        let blog = document.getElementById("text").value
    
        const allBlogsRef = database.ref('blogs');
        const newBlogRef = allBlogsRef.push();
    
        
        db.collection("blogs").add({
            title:title,
            blog:blog
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        document.getElementById("title").value = '';
        document.getElementById("text").value = '';
    }
    
    window.renderBlog = (event) => {
    
        event.preventDefault()
    
        let title = document.getElementById("title").value
        let blog = document.getElementById("text").value
    
        let div = document.createElement("div")
        div.setAttribute("class","blogs")
        let h3 = document.createTextNode(title)
        div.appendChild(h3)
        
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
        document.getElementById("result").innerHTML = doc 
    }

window.signOut = (event) => {
    event.preventDefault()

    firebase.auth().signOut().then(() => {
        console.log("Sign out successful");
        Swal.fire({
            title: 'Sign out successful',
            text: 'you are redirected to SignUP page',
            icon: 'success',
        });

        window.location.href = "index.html";
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'logout is not succesful:',
            text: error,
        });

        console.log("logout is not succesful:", error);

    });
}