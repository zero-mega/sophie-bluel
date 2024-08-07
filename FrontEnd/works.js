// Fonction de recuperation des projets
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");

  const works = await response.json();

  console.log(works);

  return works;
}

// Fonction de recuperation des catégories
async function getCategories(){
    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json();
    return categories;
}

// Fonction pour afficher les projets dynamiquement
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");

  // On efface le contenu statique deja présent
  gallery.innerHTML = '';

  // On creer les éléments html pour chaque travaux selon la structure donnée
  works.forEach((work) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;
    figure.appendChild(caption);

    // On ajoute tout nos élements dans le conteneur gallery
    gallery.appendChild(figure);
  });
}

// Fonction pour filtrer par categorie
function filterWorksByCategory(categoryId, works){
    if (categoryId === 'Tous'){
        displayWorks(works);
    } else {
        const filteredWorks = works.filter(work => work.categoryId === categoryId);
        displayWorks(filteredWorks);
    }
}

// Fonction pour generer le menu de categorie
function generateCategoryMenu(categories, works){
    const menu = document.createElement('div');
    menu.classList.add('category-menu');

    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', () => filterWorksByCategory('Tous', works));
    menu.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.addEventListener('click', () => filterWorksByCategory(category.id, works));
        menu.appendChild(button);
    })

    // On insere le menu des categorie dans la balise portfolio
const portfolio = document.getElementById('portfolio');
portfolio.insertBefore(menu, portfolio.querySelector('.gallery'));

};



// Fonction gerer l'affichage
async function initializeGallery(){
    const categories = await getCategories();
    const works = await getWorks();
    generateCategoryMenu(categories, works);
    displayWorks(works);
}

initializeGallery()