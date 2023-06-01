
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
    const image = document.getElementById("img-ajout-image").src;
    const title = document.querySelector(".input-image");
    const category = document.getElementById("categories-select").value;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("titre", title);
    formData.append("categorie", category);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers:{
        'Authorization': `Bearer ` + sessionStorage.getItem('token'),
        'Content-Type': "application/json",
      },
      body: JSON.stringify(formData),
      
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
  const buttonModal = document.createElement("button");
  buttonModal.className = "button-modal";
  buttonModal.innerHTML ="Ajouter une photo";
  buttonModal.style.textAlign ="center";
  buttonModal.setAttribute("onclick","openModalAjout()")
  divWrapperGallery.appendChild(buttonModal);
  const supprimerGallery = document.createElement("p");
  supprimerGallery.className = "supprimer-galerie";
  supprimerGallery.innerHTML ="Supprimer la galerie";
  supprimerGallery.setAttribute("onclick","openModalAjout()")
  divWrapperGallery.appendChild(supprimerGallery);
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
  /* Titre galerie */
  let titreGallery = document.createElement("p");
  titreGallery.id = "titre_modal_modifier";
  titreGallery.innerHTML ="Ajouter une photo";
  titreGallery.style.width ="75%";
  titreGallery.style.left ="10%";
  divWrapperGallery.appendChild(titreGallery);
  const gallery = document.createElement("div");
  gallery.id = "gallery_modal_1";

  /* Conteneur galerie */
  const divConteneurGallerie = document.createElement("div");
  divConteneurGallerie.className = "conteneurGallerie";
  const imgAjout = document.createElement("label");
  const imgAjoutCache = document.createElement("input");
  const buttonAjout = document.createElement("button");
  const ajoutImageText = document.createElement("p");
  ajoutImageText.id = "ajoutImageText";
  ajoutImageText.innerHTML = "jpeg, png, 4mo max";
  ajoutImageText.style.top ="140px";
  ajoutImageText.style.left ="140px";
  ajoutImageText.style.position ="absolute";

  /* Titre image */
  const titreImage = document.createElement("p");
  titreImage.innerHTML = "Titre";
  titreImage.className="titre-image";

  /* input image */
  const inputImage = document.createElement("input");
  inputImage.className="input-image";


  /* Titre catégorie */
  const categorieImage = document.createElement("p");
  categorieImage.innerHTML = "Catégorie";
  categorieImage.className="categorie-image";

   /* liste déroulante catégorie */
  const listedéroulanteCategorie = document.createElement("select");
  listedéroulanteCategorie.id = "categories-select";
  const categorieObjets = document.createElement("option");
  categorieObjets.innerHTML = "Objets";
  categorieObjets.value = "1";
  const categorieAppartements = document.createElement("option");
  categorieAppartements.innerHTML = "Appartements";
  categorieAppartements.value = "2";
  const categorieHotelsRestaurants = document.createElement("option");
  categorieHotelsRestaurants.innerHTML = "Hôtels & Restaurants";
  categorieHotelsRestaurants.value = "3";
  listedéroulanteCategorie.className="listedéroulanteCategorie-image";
  const parentAjout = document.querySelector('#wrapper_modal_1');
  let asideModal = document.querySelector(".modal");
  asideModal.height = "670px";
  const imgLabel = document.createElement("img");
  imgLabel.id = "imgLabel";
  imgLabel.src = "./assets/images/ajout_image.png";
  imgAjout.setAttribute("for","file-input");
  imgAjout.style.cursor = "pointer";
  imgAjoutCache.setAttribute("type","file");
  imgAjoutCache.setAttribute("id","file-input");
  imgAjoutCache.setAttribute("style","display: none");
  imgLabel.style.cursor="pointer";
  imgLabel.id="img-ajout-image";
  imgAjout.appendChild(imgLabel);
  imgAjoutCache.setAttribute ("onchange","previewPicture(this)")

  buttonAjout.id="buttonAjout";
  buttonAjout.innerHTML="+ Ajouter photos";
  buttonAjout.type = "file";

    /* bouton valider */
    const boutonValider = document.createElement("button");
    boutonValider.innerHTML = "Valider";
    boutonValider.className="button-valider";
    boutonValider.setAttribute ("onclick","addWorks()")

  /* Ajout DOM */
  parentAjout.appendChild(divConteneurGallerie);

  divConteneurGallerie.appendChild(buttonAjout);
  divConteneurGallerie.appendChild(ajoutImageText);
  divConteneurGallerie.appendChild(titreImage);
  divConteneurGallerie.appendChild(inputImage);
  divConteneurGallerie.appendChild(categorieImage);
  divConteneurGallerie.appendChild(listedéroulanteCategorie);
  listedéroulanteCategorie.appendChild(categorieObjets);
  listedéroulanteCategorie.appendChild(categorieAppartements);
  listedéroulanteCategorie.appendChild(categorieHotelsRestaurants);
  divConteneurGallerie.appendChild(boutonValider);
  divConteneurGallerie.appendChild(imgAjout);
  divConteneurGallerie.appendChild(imgAjoutCache);
}

function deleteModal ()  {
  if (document.querySelector("#modal_modifier_1") != null)
    document.querySelector("#modal_modifier_1").style.display="none";
  if (document.querySelector("#modal_modifier_2") != null)
    document.querySelector("#modal_modifier_2").style.display="none";
    const body = document.querySelector("body#body");
    body.setAttribute ("style","background: white");
}


  function previewPicture(e) {
  const [picture] = e.files
  if (picture) {
      document.querySelector("#img-ajout-image").src = URL.createObjectURL(picture);
      document.querySelector("#img-ajout-image").setAttribute("style","margin-top:0px;margin-left:auto;margin-right:auto;height:169px;position:relative;display:flex;");
      document.querySelector("#buttonAjout").style.display = "none";
      document.querySelector("#ajoutImageText").style.display = "none";
      document.do
  }
  } 

const ball=  document.querySelector("#modal_modifier_1") != null ?  document.querySelector("#modal_modifier_1") :  document.querySelector("#modal_modifier_2");

ball.onmousedown = function(event) {
  // (1) la préparer au déplacement :  réglé en absolute et en haut par z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // déplacez-le de tout parent actuel directement dans body
  // pour le placer par rapport à body
  document.body.append(ball);

  // Centrer la balle aux coordonnées (pageX, pageY)
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // déplacer notre balle en positionnement absolu sous le pointeur
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) déplacer la balle sur le déplacement de la souris
  document.addEventListener('mousemove', onMouseMove);

  // (3) laisser tomber la balle, retirer les gestionnaires inutiles
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

