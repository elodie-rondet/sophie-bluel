function connexion() {
    const email = document.querySelector('#email2').value;
    const password = document.querySelector('#mot-de-passe').value;
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ` + sessionStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email, password 
        }),
      })
        .then((response) => response.json())
        .then(function (response) {{ 
          if (response.token != undefined) {
                sessionStorage.setItem('token', response.token);   
                document.location.href="homepage_edit.html"; 
          }
          else
          alert('login ou mot de passe erroné');
        }
          });
  }





