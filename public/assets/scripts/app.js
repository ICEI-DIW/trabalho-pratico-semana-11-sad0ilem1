const API_URL = "http://localhost:3000/filmes";

async function fetchFilmes() {
  const response = await fetch(API_URL);
  return response.json();
}

async function fetchFilmePorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

async function mostrarCatalogo() {
  const catalogo = document.getElementById('catalogo');
  const filmes = await fetchFilmes();

  filmes.forEach(filme => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-3');
    card.style.width = '18rem';
    card.style.transition = 'transform 0.3s ease';

    card.innerHTML = `
      <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
      <div class="card-body">
        <h5 class="card-title">${filme.titulo}</h5>
        <p class="card-text">${filme.sinopse}</p>
        <a href="detalhes.html?id=${filme.id}" class="btn btn-primary">Ver Detalhes</a>
      </div>
    `;

    card.addEventListener('mouseover', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseout', () => {
      card.style.transform = 'scale(1)';
    });

    catalogo.appendChild(card);
  });
}

async function mostrarCarrossel() {
  const carouselInner = document.getElementById('carousel-inner');
  const filmes = await fetchFilmes();

  filmes.forEach((filme, index) => {
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    if (index === 0) item.classList.add('active');

    item.innerHTML = `
      <a href="detalhes.html?id=${filme.id}" style="text-decoration: none; color: inherit;">
        <img src="${filme.imagem}" class="d-block w-100" alt="${filme.titulo}">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
          <h5>${filme.titulo}</h5>
          <p>${filme.sinopse}</p>
        </div>
      </a>
    `;

    carouselInner.appendChild(item);
  });

  new bootstrap.Carousel('#carouselExample', {
    interval: 3000,
    ride: 'carousel'
  });
}

async function mostrarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const filme = await fetchFilmePorId(id);

  const container = document.getElementById('detalhes-container');

  if (filme) {
    container.innerHTML = `
      <div class="card m-5">
        <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h2 class="card-title">${filme.titulo}</h2>
          <p class="card-text"><strong>Sinopse:</strong> ${filme.sinopse}</p>
          <p class="card-text"><strong>Elenco:</strong> ${filme.elenco}</p>
          <a href="index.html" class="btn btn-secondary">Voltar ao Catálogo</a>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `<p class="m-5">Filme não encontrado.</p>`;
  }
}

async function mostrarFotosAdicionais() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const filme = await fetchFilmePorId(id);
  const fotosContainer = document.getElementById('fotos-container');

  if (filme && filme.fotos) {
    filme.fotos.forEach((foto, index) => {
      const col = document.createElement('div');
      col.classList.add('col-md-4', 'mb-4');

      const fotoContainer = document.createElement('div');
      fotoContainer.classList.add('foto-container');

      const img = document.createElement('img');
      img.src = foto.url;
      img.alt = foto.descricao || `Cena ${index + 1}`;
      img.classList.add('img-fluid', 'rounded', 'shadow');

      const desc = document.createElement('p');
      desc.textContent = foto.descricao;
      desc.classList.add('foto-descricao', 'mt-2', 'text-center');

      fotoContainer.appendChild(img);
      fotoContainer.appendChild(desc);
      col.appendChild(fotoContainer);
      fotosContainer.appendChild(col);
    });
  }
}

if (document.getElementById('catalogo')) {
  mostrarCatalogo();
  mostrarCarrossel();
}
if (document.getElementById('detalhes-container')) {
  mostrarDetalhes();
  mostrarFotosAdicionais();
}
