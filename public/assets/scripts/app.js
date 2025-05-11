const filmes = [
    {
      id: 1,
      titulo: "A Lenda do Hetoi",
      imagem: "https://picsum.photos/id/1015/800/400",
      sinopse: "Uma história sobre a lenda do Hetoi.",
      elenco: "Hetoi, Kat",
      fotos: [
        {
          url: "https://picsum.photos/id/1015/800/400",
          descricao: "Cena principal do filme mostrando Hetoi"
        },
        {
          url: "https://picsum.photos/id/1016/800/400",
          descricao: "Momento de ação entre Hetoi e Kat"
        },
        {
          url: "https://picsum.photos/id/1018/800/400",
          descricao: "Paisagem do vilarejo onde ocorre a história"
        }
      ]
    },
    {
      id: 2,
      titulo: "Chamas do Futuro",
      imagem: "https://picsum.photos/id/1025/800/400",
      sinopse: "O futuro em chamas, luta pela sobrevivência.",
      elenco: "Carbonara Castro, Master Yi" ,
      fotos: [
        {
          url: "https://picsum.photos/id/1015/800/400",
          descricao: "Master"
        },
        {
          url: "https://picsum.photos/id/1016/800/400",
          descricao: "yi"
        },
        {
          url: "https://picsum.photos/id/1018/800/400",
          descricao: "Carbono"
        }
      ]
    },
    {
      id: 3,
      titulo: "Hora de Aventura",
      imagem: "https://picsum.photos/id/1035/800/400",
      sinopse: "Garoto mágico e cachorro comum explorando terras mágicas.",
      elenco: "Jake o Humano, Finn o Cachorro",
      fotos: [
        {
          url: "https://picsum.photos/id/1019/800/400",
          descricao: "Foto do finn com seu humano"
        },
        {
          url: "https://picsum.photos/id/1016/800/400",
          descricao: "cenario incrivel"
        },
        {
          url: "https://picsum.photos/id/1018/800/400",
          descricao: "foto do paisem"
        }
      ]
    }
  ];
  function mostrarFotosAdicionais() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const filme = filmes.find(f => f.id == id);
    const fotosContainer = document.getElementById('fotos-container');
  
    if (filme && filme.fotos) {
      filme.fotos.forEach((foto, index) => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');
        
        const fotoContainer = document.createElement('div');
        fotoContainer.classList.add('foto-container');
        
        const img = document.createElement('img');
        img.src = typeof foto === 'string' ? foto : foto.url;
        img.alt = typeof foto === 'string' ? `Cena ${index + 1} do filme` : foto.descricao;
        img.classList.add('img-fluid', 'rounded', 'shadow');
        
        if (typeof foto === 'object' && foto.descricao) {
          const desc = document.createElement('p');
          desc.textContent = foto.descricao;
          desc.classList.add('foto-descricao', 'mt-2', 'text-center');
          fotoContainer.appendChild(desc);
        }
        
        fotoContainer.prepend(img);
        col.appendChild(fotoContainer);
        fotosContainer.appendChild(col);
      });
    }
  }
  
  function mostrarCatalogo() {
    const catalogo = document.getElementById('catalogo');
  
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
  
  function mostrarCarrossel() {
    const carouselInner = document.getElementById('carousel-inner');
  
    filmes.forEach((filme, index) => {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      if (index === 0) {
        item.classList.add('active');
      }
  
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
  
    const carousel = new bootstrap.Carousel('#carouselExample', {
      interval: 3000,
      ride: 'carousel'
    });
  }
  
  function mostrarDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const filme = filmes.find(f => f.id == id);
  
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
  
  if (document.getElementById('catalogo')) {
    mostrarCatalogo();
    mostrarCarrossel();
  }
  if (document.getElementById('detalhes-container')) {
    mostrarDetalhes();
    mostrarFotosAdicionais(); 
  }
  