document.querySelector("input#submit").setAttribute("onclick","connexion()");


function connexion() {
  const email = document.querySelector('#email2').value;
  const password = document.querySelector('#mot-de-passe').value;
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          email, password 
      }),
    })
      .then((response) => response.json())
      .then(function (response) {{ 
        if (response.token != undefined) {
          localStorage.setItem('token', response.token);   
          document.location.href="index.html"; 
        }
        else
        alert('login ou mot de passe erroné');
      }
        });
}

function deconnexion() {
var dialog = confirm("Souhaitez-vous vous déconnecter?");
if (dialog) {
localStorage.removeItem('token');
document.location.href="index.html"; 
}
else {
document.querySelector("body#body").setAttribute("style","margin-top:5%");
document.querySelector("li#lien-login").innerHTML="logout";
document.querySelector("li#lien-login").setAttribute("onclick","deconnexion()");
}
}








