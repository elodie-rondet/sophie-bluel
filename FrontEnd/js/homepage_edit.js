
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
  
  

  
  
 

function openModal ()  {
  const body = document.querySelector("body#body");
  body.setAttribute ("style","background: rgba(0, 0, 0, 0.3);");
    const reponse = fetch("http://localhost:5678/api/works", {
  method: "GET",
  headers:{
    'Authorization': `Bearer ` + sessionStorage.getItem('token'),
  },
}).then((resp) => resp.json()).then(function (response) {{ 
  let test = document.querySelector("#modal_modifier_1");
  if (test != null) test.remove();
  let test2 = document.querySelector("#modal_modifier_2");
  if (test2 != null) test2.remove();
  let fenetreModal = document.querySelector("#fenetre_modal");
  let asideGallery = document.createElement("aside");
  asideGallery.id = "modal_modifier_1";
  asideGallery.className = "modal";
  fenetreModal.appendChild(asideGallery);
  let divWrapperGallery = document.createElement("div");
  divWrapperGallery.id = "wrapper_modal_1";
  asideGallery.appendChild(divWrapperGallery);
  let closeButtonGallery = document.createElement("p");
  closeButtonGallery.id = "close";
  closeButtonGallery.setAttribute("onclick","deleteModal()");
  closeButtonGallery.innerHTML ="X";
  divWrapperGallery.appendChild(closeButtonGallery);
  let titreGallery = document.createElement("p");
  titreGallery.id = "titre_modal_modifier";
  titreGallery.innerHTML ="Galerie photo";
  divWrapperGallery.appendChild(titreGallery);
  const gallery = document.createElement("div");
  gallery.id = "gallery_modal_1";
  divWrapperGallery.appendChild(gallery);
  const buttonModal = document.createElement("button-modal");
  buttonModal.className = "button-modal";
  buttonModal.innerHTML ="Ajouter une photo";
  buttonModal.style.textAlign ="center";
  buttonModal.style.paddingTop ="15px";
  buttonModal.setAttribute("onclick","openModalAjout()")
  divWrapperGallery.appendChild(buttonModal);
  if (gallery.childElementCount == 0) {
  for (let i = 0; i < response.length; i++) {
    // Création d’une balise dédiée à l'image
    const figure = document.createElement("figure");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On crée l’élément div.
    const divElement = document.createElement("div");
    const divContent = document.createElement("div");
    const icone = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = response[i].imageUrl;
    icone.src = "./assets/images/supprimer.png";
    icone.style.width="17px";
    icone.style.height="17px";
    icone.style.top="25px";
    icone.style.left="55px";
    icone.style.zIndex="9999";
    icone.style.position="relative";
    icone.style.cursor="pointer";
    imageElement.alt = response[i].title;
    figcaption.innerText = "éditer";
    figure.className = "figure-button-modal";
    // On rattache la balise divElement à la div gallery
    gallery.appendChild(divElement);
    divElement.appendChild(divContent);
    divContent.appendChild(figure);
    // On rattache l’image à la balise figure
    figure.appendChild(icone);
    figure.appendChild(imageElement);
    figure.appendChild(figcaption);
    }
  }}});
  const button = document.createElement("button");
  const parent =  document.querySelector("#wrapper_modal_1");
  button.className = "button-modal";
  button.setAttribute("onclick","openModalAjout()");
  button.innerHTML ="Ajouter une photo";
  button.style.textAlign="center";
  if (parent != null)
  parent.appendChild(button);
}

function openModalAjout ()  {
  let test = document.querySelector("#modal_modifier_2");
  if (test != null) test.remove();
  const body = document.querySelector("body#body");
  body.setAttribute ("style","background: rgba(0, 0, 0, 0.3);");
  let fenetreModal = document.querySelector("#fenetre_modal");
  let asideGallery = document.createElement("aside");
  asideGallery.id = "modal_modifier_2";
  asideGallery.className = "modal";
  document.querySelector('#modal_modifier_1').remove();
  fenetreModal.appendChild(asideGallery);
  let divWrapperGallery = document.createElement("div");
  divWrapperGallery.id = "wrapper_modal_1";
  asideGallery.appendChild(divWrapperGallery);
  let closeButtonGallery = document.createElement("p");
  closeButtonGallery.id = "close";
  closeButtonGallery.innerHTML ="X";
  closeButtonGallery.setAttribute("onclick","deleteModal()")
  closeButtonGallery.style.top="6%";
  divWrapperGallery.appendChild(closeButtonGallery);
  let returnButtonGallery = document.createElement("img");
  returnButtonGallery.id = "return";
  returnButtonGallery.src = "./assets/images/return.png";
  returnButtonGallery.setAttribute("onclick","openModal()")
  divWrapperGallery.appendChild(returnButtonGallery);
  let titreGallery = document.createElement("p");
  titreGallery.id = "titre_modal_modifier";
  titreGallery.innerHTML ="Ajouter une photo";
  titreGallery.style.width ="75%";
  titreGallery.style.left ="10%";
  divWrapperGallery.appendChild(titreGallery);
  const gallery = document.createElement("div");
  gallery.id = "gallery_modal_1";
  const imgAjout = document.createElement("img");
  const buttonAjout = document.createElement("button");
  const ajoutImageText = document.createElement("p");
  ajoutImageText.innerHTML = "jpeg, png, 4mo max";
  ajoutImageText.style.top ="300px";
  ajoutImageText.style.left ="225px";
  ajoutImageText.style.position ="absolute";
  const parentAjout = document.querySelector('#wrapper_modal_1');
  let asideModal = document.querySelector(".modal");
  asideModal.height = "670px";
  imgAjout.src = "./assets/images/ajout_image.png";
  imgAjout.id="imgAjout";
  buttonAjout.id="buttonAjout";
  buttonAjout.innerHTML="+ Ajouter photos";
  parentAjout.appendChild(imgAjout);
  parentAjout.appendChild(buttonAjout);
  parentAjout.appendChild(ajoutImageText);
}

function deleteModal ()  {
  if (document.querySelector("#modal_modifier_1") != null)
    document.querySelector("#modal_modifier_1").style.display="none";
  if (document.querySelector("#modal_modifier_2") != null)
    document.querySelector("#modal_modifier_2").style.display="none";
    const body = document.querySelector("body#body");
    body.setAttribute ("style","background: white");
}

