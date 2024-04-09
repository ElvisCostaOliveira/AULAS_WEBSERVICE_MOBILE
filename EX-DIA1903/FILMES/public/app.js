fetch('http://localhost:8080/filmes')
    .then(response => response.json())
    .then(data => {
        const filmesList = document.getElementById('filmes-list');
        data.forEach(filme => {
            const filmeDiv = document.createElement('div');
            filmeDiv.innerHTML = `
                <h2>${filme.nome}</h2>
                <img src="${filme.foto}" alt="${filme.nome}">
                <p><strong>Descrição:</strong> ${filme.descricao}</p>
                <p><strong>Elenco:</strong> ${filme.elenco}</p>
            `;
            filmesList.appendChild(filmeDiv);
        });
    })
    .catch(error => console.error('Erro ao carregar os filmes:', error));

    