
document.querySelector("a#modifier_noir_2").setAttribute("onclick","openModal()");
document.querySelector("a#modifier_noir").setAttribute("onclick","openModal()");
document.querySelector("a#modifier").setAttribute("onclick","openModal()");
document.querySelector("button#all").setAttribute("onclick","filterSelection('all')");
document.querySelector("button#objets").setAttribute("onclick","filterSelection('objets')");
document.querySelector("button#appartements").setAttribute("onclick","filterSelection('appartements')");
document.querySelector("button#hotels-restaurants").setAttribute("onclick","filterSelection('hotels-restaurants')");
var token = localStorage.getItem('token');

if (token != null) {
  document.querySelector("body#body").id = "body";
  document.querySelector("li#lien-login").innerHTML="logout";
  document.querySelector("li#lien-login").setAttribute("onclick","connexion()");
  if (document.querySelector("div#bouton_modifier_deconnexion") != null)
  document.querySelector("div#bouton_modifier_deconnexion").id = "bouton_modifier";
  if (document.querySelector("div#bouton_modifier_projets_deconnexion") != null)
  document.querySelector("div#bouton_modifier_projets_deconnexion").id = "bouton_modifier_projets";
  if (document.querySelector("div#bouton_modifier_2_deconnexion") != null)
  document.querySelector("div#bouton_modifier_2_deconnexion").id = "bouton_modifier_2";
  if (document.querySelector("div#barre_edition_deconnexion") != null)
  document.querySelector("div#barre_edition_deconnexion").id = "barre_edition";
  document.querySelector("li#lien-login").setAttribute("onclick","deconnexion()");
  if (document.querySelector("div#myBtnContainer_deconnexion") != null)
  document.querySelector("div#myBtnContainer_deconnexion").id = "myBtnContainer";
}
else {
  document.querySelector("li#lien-login").setAttribute("onclick","connexion()");
  if (document.querySelector("div#bouton_modifier") != null)
  document.querySelector("div#bouton_modifier").id = "bouton_modifier_deconnexion";
  if (document.querySelector("div#bouton_modifier_projets") != null)
  document.querySelector("div#bouton_modifier_projets").id = "bouton_modifier_projets_deconnexion";
  if (document.querySelector("div#bouton_modifier_2") != null)
  document.querySelector("div#bouton_modifier_2").id = "bouton_modifier_2_deconnexion";
  if (document.querySelector("div#barre_edition") != null)
  document.querySelector("div#barre_edition").id = "barre_edition_deconnexion";
  if (document.querySelector("div#myBtnContainer") != null)
  document.querySelector("div#myBtnContainer").id = "myBtnContainer_deconnexion";
}
afficheGallery ();


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
  sessionStorage.clear();
  document.location.href="index.html"; 
}
else {
  document.querySelector("body#bodyModal").id = "body";
  document.querySelector("li#lien-login").innerHTML="logout";
  document.querySelector("li#lien-login").setAttribute("onclick","deconnexion()");
}
}

function afficheGallery () { 
  const reponse = fetch("http://localhost:5678/api/works", {
    method: "GET",
  }).then((resp) => resp.json()).then(function (response) {{ 
    let test = document.querySelector(".gallery");
    if (test != null) test.remove();
    const conteneurGallery = document.querySelector(".conteneur-gallery");
    const gallery = document.createElement("div");
    gallery.className = "gallery";
    // On rattache la balise divElement à la div gallery
    conteneurGallery.appendChild(gallery);
    for (let i = 0; i < response.length; i++) {
      // On crée l’élément div.
      const divElement = document.createElement("div");
      // Création d’une balise dédiée à l'image
      const figure = document.createElement("figure");
      // On crée l’élément img.
      const imageElement = document.createElement("img");

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
      gallery.appendChild(divElement);
      divElement.appendChild(divContent);
      divContent.appendChild(figure);
      // On rattache l’image à la balise figure
      figure.appendChild(imageElement);
      figure.appendChild(figcaption);
      }
      filterSelection("all") 
    }});
}

function afficheGalleryModal () {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers:{
      'Authorization': `Bearer ` + sessionStorage.getItem('token'),
    },
  }).then((resp) => resp.json()).then(function (response) {{ 
    let test = document.querySelector("#modal_modifier_1") != null ? document.querySelector("#modal_modifier_1") : document.querySelector("#modal_modifier_1_suppr");
    if (test != null) test.remove();
    let test2 = document.querySelector("#modal_modifier_2") != null ? document.querySelector("#modal_modifier_2") : document.querySelector("#modal_modifier_2_suppr");
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
    const traitModal = document.createElement("div");
    traitModal.className = "traitModal";
    divWrapperGallery.appendChild(traitModal);
    const buttonModal = document.createElement("button");
    buttonModal.className = "button-modal";
    buttonModal.innerHTML ="Ajouter une photo";
    buttonModal.style.textAlign ="center";
    buttonModal.setAttribute("onclick","openModalAjout()")
    divWrapperGallery.appendChild(buttonModal);
    const supprimerGallery = document.createElement("p");
    supprimerGallery.className = "supprimer-galerie";
    supprimerGallery.innerHTML ="Supprimer la galerie";
    supprimerGallery.setAttribute("onclick","supprimerGallery()")
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
      imageElement.className ="imgElement";
      icone.id = response[i].id;
      icone.className = "img_supprimer";
      icone.src = "./assets/images/supprimer.png";
      icone.setAttribute("onclick","supprimer(this)");     
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
}

  function addWorks(event) {   
    var dialog = confirm("Voulez-vous ajouter un nouveau travail ?");
    if (dialog) {
      const title = document.querySelector("input.input-image").value;
      const category = document.getElementById("categories-select").selectedOptions[0].value;
      const image = document.getElementById('file-input').files[0];
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("category", category);
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers:{
          'Authorization': `Bearer ${token}`,
        },
        body: formData,   
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error status code: ' + response.status);
          }
          else {
            alert('Travail Ajouté');
            deleteModal ();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

    }

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
if (document.getElementById("myBtnContainer_deconnexion") != null) {
var btnContainer = document.getElementById("myBtnContainer_deconnexion");
if (btnContainer.getElementsByClassName("btn") != null)
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
}
  
 

function openModal ()  {
  const body = document.querySelector("body#bodyModal") != null ? document.querySelector("body#bodyModal") : document.querySelector("body#body");
  body.id = "bodyModal";
  afficheGalleryModal ();
  const button = document.createElement("button");
  const parent =  document.querySelector("#wrapper_modal_1");
  button.className = "button-modal";
  button.setAttribute("onclick","openModalAjout()");
  button.innerHTML ="Ajouter une photo";
  if (parent != null)
  parent.appendChild(button);
}


function supprimer(event) {
var element = document.getElementsByClassName('img_supprimer');
const id = event.id;
var dialog = confirm("Souhaitez-vous supprimer cette image ?");
if (dialog) {
  fetch("http://localhost:5678/api/works/"+id, {
  method: "DELETE",
  headers:{
    'Authorization': `Bearer ` + localStorage.getItem('token'),
  },
});
afficheGalleryModal ();
}
else
 alert("suppression annulée")
}


function supprimerGallery() {
  var dialog = confirm("Souhaitez-vous supprimer la galerie ?");
  if (dialog) {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers:{
      'Authorization': `Bearer ` + sessionStorage.getItem('token'),
    },
  }).then((resp) => resp.json()).then(function (response) {{ 
  for (let i = 0; i < response.length; i++) {
  response[i].remove();
  }
  afficheGalleryModal ();
  }});
}
else
 alert("suppression annulée")
  }

function openModalAjout ()  {
  let test = document.querySelector("#modal_modifier_2");
  if (test != null) test.remove();
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
  divWrapperGallery.appendChild(titreGallery);
  const gallery = document.createElement("div");
  gallery.id = "gallery_modal_1";

  /* Conteneur galerie */
  const divConteneurGallerie = document.createElement("form");
  divConteneurGallerie.className = "conteneurGallerie";
  const imgAjout = document.createElement("label");
  const imgAjoutCache = document.createElement("input");
  const buttonAjout = document.createElement("img");
  buttonAjout.src = "./assets/images/ajout_photos.png";
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
  titreImage.name="titre-image";

  /* input image */
  const inputImage = document.createElement("input");
  inputImage.className="input-image";


  /* Titre catégorie */
  const categorieImage = document.createElement("p");
  categorieImage.innerHTML = "Catégorie";
  categorieImage.className="categorie-image";

  /* Trait Ajout Modal */
  const traitModalAjout = document.createElement("div");
  traitModalAjout.className = "traitModalAjout";

   /* liste déroulante catégorie */
  const listedéroulanteCategorie = document.createElement("select");
  listedéroulanteCategorie.id = "categories-select";
  listedéroulanteCategorie.name = "categories-select";
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

  /* image ajout aperçu */
  const imgLabel = document.createElement("img");
  imgLabel.id = "imgLabel";
  imgLabel.src = "./assets/images/ajout_image.png";
  imgAjout.setAttribute("for","file-input");
  imgAjout.style.cursor = "pointer";
  imgAjoutCache.setAttribute("type","file");
  imgAjoutCache.setAttribute("id","file-input");
  imgAjoutCache.className = "imgAjoutCache";
  imgLabel.style.cursor="pointer";
  imgLabel.id="img-ajout-image";
  imgAjout.appendChild(imgLabel);
  imgAjout.appendChild(buttonAjout);
  imgAjoutCache.setAttribute ("onchange","previewPicture(this);")

  /* bouton ajout photos */
  buttonAjout.id="buttonAjout";
  buttonAjout.innerHTML="+ Ajouter photos";
  buttonAjout.type = "file";

  /* bouton valider */
  const boutonValider = document.createElement("button");
  boutonValider.innerHTML = "Valider";
  boutonValider.className="button-valider";
  boutonValider.setAttribute ("onclick","addWorks(this)")

  /* Ajout DOM */
  parentAjout.appendChild(divConteneurGallerie);
  divConteneurGallerie.appendChild(ajoutImageText);
  divConteneurGallerie.appendChild(titreImage);
  divConteneurGallerie.appendChild(inputImage);
  divConteneurGallerie.appendChild(categorieImage);
  divConteneurGallerie.appendChild(listedéroulanteCategorie);
  divConteneurGallerie.appendChild(traitModalAjout);
  listedéroulanteCategorie.appendChild(categorieObjets);
  listedéroulanteCategorie.appendChild(categorieAppartements);
  listedéroulanteCategorie.appendChild(categorieHotelsRestaurants);
  divConteneurGallerie.appendChild(boutonValider);
  divConteneurGallerie.appendChild(imgAjout);
  divConteneurGallerie.appendChild(imgAjoutCache);
}

function deleteModal ()  {
  document.querySelector("body#bodyModal").id="body";
  if (document.querySelector("#modal_modifier_1") != null) 
    document.querySelector("#modal_modifier_1").id = "modal_modifier_1_suppr";
  if (document.querySelector("#modal_modifier_2") != null)
    document.querySelector("#modal_modifier_2").id = "modal_modifier_2_suppr";
    afficheGallery ();

}


  function previewPicture(e) {
  const [picture] = e.files
  const image= e.files[0];

  const img= document.querySelector("img#img-ajout-image") != null ? document.querySelector("img#img-ajout-image") : document.querySelector("img#imgAjoutImage");
  if ((e.files[0].size < 4000000) && (e.files[0].name.includes("png") || e.files[0].name.includes("jpg") | e.files[0].name.includes("jpeg"))) {
  if (picture) {
      img.src = URL.createObjectURL(picture);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
      };
      if (img.id == "img-ajout-image") {
      document.querySelector("#buttonAjout").className = "buttonAjout";
      document.querySelector("#ajoutImageText").className = "ajoutImageText";
      document.querySelector(".button-valider").className = "button-valider-preview-ok";
      }
      img.id = "imgAjoutImage";


  }
}
else
  alert ("l'image est supérieure à 4 mo ou ne correspond pas au format d'images accepté (png, jpg ou jpeg)");

  } 

// test déplacer avec souris fenetre modale
/*fenetre.onmousedown = function(event) {
  fenetre.style.position = 'absolute';
  fenetre.style.zIndex = 1000;
  document.body.append(fenetre);


  function moveAt(pageX, pageY) {
    fenetre.style.left = pageX - fenetre.offsetWidth / 2 + 'px';
    fenetre.style.top = pageY - fenetre.offsetHeight / 2 + 'px';
  }

  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  fenetre.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    fenetre.onmouseup = null;
  };

};
*/
