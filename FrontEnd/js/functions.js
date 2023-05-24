const reponse = fetch("http://localhost:5678/api/works", {
  method: "GET",
  headers:{
    'Authorization': `Bearer ` + sessionStorage.getItem('token'),
  },
}).then((resp) => resp.json()).then(function (response) {{ 
  for (let i = 0; i < response.length; i++) {
    const gallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à l'image
    const figure = document.createElement("figure");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On crée l’élément div.
    const divElement = document.createElement("div");
    const divContent = document.createElement("div");
    const figcaption = document.createElement("figcaption");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = response[i].imageUrl;
    imageElement.alt = response[i].title;
    divContent.className = "content";
    if (response[i].categoryId == 1)
    divElement.className = "images objets";
    else if (response[i].categoryId == 2)
    divElement.className = "images appartements";
    else
    divElement.className = "images hotels-restaurants";
    figcaption.title = response[i].title;
    figcaption.innerText = response[i].title;
    // On rattache la balise divElement à la div gallery
    gallery.appendChild(divElement);
    divElement.appendChild(divContent);
    divContent.appendChild(figure);
    // On rattache l’image à la balise figure
    figure.appendChild(imageElement);
    figure.appendChild(figcaption);
    }
    filterSelection("all") 
  }});



function addWorks() {
    const formulaire = document.getElementById("modal-form");
    const image = document.getElementById("image").files[0];
    const title = document.getElementById("titre").value;
    const category = document.getElementById("categories-select").value;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("titre", titre);
    formData.append("categorie", categorie);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers:{
        'Authorization': `Bearer ` + sessionStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du formulaire.");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("images");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

// Show filtered elements
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
  
  

  
  
 