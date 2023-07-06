   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js"; 
  import 
  { getDatabase
, set 
, ref 
,push ,
remove,
update} 
  from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
 
   // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   const firebaseConfig = {
     apiKey: "AIzaSyA41SUAHlaj2IhELlNTCsqvlYgv6KyLvOg",
     authDomain: "todoapp-with-fb-and-db.firebaseapp.com",
     projectId: "todoapp-with-fb-and-db",
     storageBucket: "todoapp-with-fb-and-db.appspot.com",
     messagingSenderId: "954504297997",
     appId: "1:954504297997:web:340fdd9ba3019832cedf44",
     measurementId: "G-SRGXWD4HYJ"
   };
 
   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
  var db = getDatabase()



var inp = document.getElementById("input")

var array = []

window.addTask = function(){
    var inpvalue = inp.value
    var obj = {
        name: inpvalue
    }
    array.push(obj)
    rendervalInUL()
    console.log(array);
    // inp.value = ""




    var reference = push(ref(db , "todos/"))
    set(reference,{
        inp : inp.value ,
    })

  inp.value = ""

}


var ul = document.getElementById("ul")

function rendervalInUL() {
    ul.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      ul.innerHTML = `<li>${array[i].name} 
      <button type="button" onclick="delbtn(${i})" class="btn btn-outline-danger m-3">Delete</button>
      <button type="button" onclick="editbtn(${i})" class="btn btn-outline-success m-3">edit</button>
       </li>`

    }
  }

  

  window.delbtn = function(i) {
    array.splice(i , 1)
   remove(ref(db,`todos/`)) 
    rendervalInUL()
  }
  delbtn()





window.editbtn = function(i) {
  var task = prompt("Enter new task");
  if (task) {
    array[i].name = task;
    rendervalInUL();
    updateDataInFirebase(i, task);
  }
}

function updateDataInFirebase(i, task) {
  var updates = {};
  updates['todos/' + i + 'task/'] = task;
  update(ref(db), updates);
}


  
  
  
  
  
  