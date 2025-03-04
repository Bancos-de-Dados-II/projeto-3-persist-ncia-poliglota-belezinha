let center = [-6.847126972470373, -38.3518660068512];

// Inicializa o mapa centrado na localização definida
var map = L.map("map").setView(center, 14);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Define o ícone personalizado
var myIcon = L.icon({
  iconUrl: "./img/placeholder.png",
  iconSize: [40, 40],
});

// Adiciona o marcador inicial com a opção de arrastar (draggable)
let marker = L.marker(center, {
  draggable: true,
  title: "Imovel",
  icon: myIcon,
}).addTo(map);

// Atualiza a posição do mapa e do marcador com base na localização do dispositivo
map.locate();
map.on('locationfound', e => {
    map.panTo(e.latlng);
    marker.setLatLng(e.latlng);
});

//load icones
async function loadLocations() {
  try {
    const response = await fetch("http://localhost:3000/api/imoveis");

    console.log(response, "Respónse");
    const locations = await response.json();
    console.log(locations, "locations")
 console.log(locations[0].localizacao.coordinates[0]
  , "location ")
    // Adiciona um marcador para cada localização
    locations.forEach((location) => {
      const {  titulo, nome, descricao, contato, valor, localizacao } =
        location;
        const[longitude , latitude] = localizacao.coordinates;
      console.log(location.id, "id no map");
      // Cria o marcador
      const marker = L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: "./img/home-address.png",
          iconSize: [40, 40],
        }),
      }).addTo(map);

      marker.bindTooltip(titulo, {
        permanent: true, // Sempre visível
        direction: "top", // Acima do marcador
        className: "custom-tooltip", // Classe CSS para estilizar
      });

      // Adiciona o popup (detalhes ao clicar)
      const popupContent = `
                <b>${titulo}</b><br>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Descrição:</strong> ${descricao}</p>
                <p><strong>Valor:</strong> R$ ${Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3,
                }).format(valor)}</p>
                <p><strong>Contato:</strong> ${contato}</p>
                <button onclick="editLocation(
                  '${location._id}'
                )"> <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Editar" style="width: 16px; height: 16px; cursor:pointer"></i></button>
                <button onclick="deleteLocation(
                  '${location._id}'
                )"><img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Excluir" style="width: 16px; height: 16px; cursor:pointer;"></button>
               
            `;
      marker.bindPopup(popupContent);
    });
  } catch (error) {
    console.error("Erro ao carregar localizações:", error);
  }
}

loadLocations();

//editar localização
// function editLocation(id) {
//     alert(`Editar localização com ID: ${id}`);
// }

// Função para editar a localização
const btnEdite = document.querySelector(".btn-submit2");
const btnSubmit = document.querySelector(".btn-submit");



async function editLocation(id) {
  try {
    // Buscar os dados do imóvel atual
    console.log(id,"id edite")
    
    btnEdite.classList.add("flex");
    btnSubmit.classList.add("none");

    // Rolando a página até o formulário
    document.querySelector(".form-container").scrollIntoView({
      behavior: "smooth", // Adiciona uma animação suave
      
    });
    console.log("editlocation");
    const response = await fetch(`http://localhost:3000/api/imoveis`);
    const locations = await response.json();

    console.log(locations,"location")
    console.log(titulo,"locationid")


    const imovel = locations.find((location) => location._id === id);
    console.log(imovel, "imovel")
    const{localizacao} = imovel
    const[longitude , latitude] = localizacao.coordinates;
    if (!imovel) {
      alert("Imóvel não encontrado!");
      return;
    }

    // Preencher o formulário com os dados do imóvel
    document.getElementById("imovelId").value = imovel.id;
    document.getElementById("titulo").value = imovel.titulo;
    document.getElementById("nome").value = imovel.nome;
    document.getElementById("descricao").value = imovel.descricao;
    document.getElementById("valor").value = imovel.valor;
    document.getElementById("contato").value = imovel.contato;

    // alert('Você pode arrastar o marcador para alterar a localização do imóvel.');

    // Adicionar marcador temporário no mapa para edição da localização

    // Atualizar os dados no backend ao enviar o formulário
    btnEdite.addEventListener("click", async function (e) {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value;
      const nome = document.getElementById("nome").value;
      const descricao = document.getElementById("descricao").value;
      const valor = parseFloat(document.getElementById("valor").value);
      const contato = document.getElementById("contato").value;

      const data = {
       
        titulo,
        nome,
        descricao,
        valor,
        contato,
      };


        console.log(data,"data")
      alert("Formulário enviado com sucesso!");
      alert("Escolha a Localizacao Do imovel no map e clique para salvar");

      const tempMarker = L.marker([latitude,longitude], {
        draggable: true,
        icon: L.icon({
          iconUrl: "./img/home-address.png",
          iconSize: [40, 40],
        }),
      }).addTo(map);

      tempMarker.bindTooltip(titulo, {
        permanent: true, // Sempre visível
        direction: "top", // Acima do marcador
        className: "custom-tooltip", // Classe CSS para estilizar
      });

      console.log(id, data, "id e data");
      let idDelete = id;

      tempMarker.on("click", async () => {
        const position = tempMarker.getLatLng(); // Obtem a posição atual do marcador
        console.log(
          `Posição do marcador: Latitude: ${position.lat}, Longitude: ${position.lng}`
        );

        let urlEdite = `http://localhost:3000/api/imoveis/${id}`;
        console.log(p1, p2, "p1 e p2");
        // const dados = {titulo,nome,descricao,valor, contato}

        alert("Deseja salvar nessa Localização?");
        const responseUpdate = await fetch(
          `http://localhost:3000/api/imoveis/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             
              titulo,
              nome,
              descricao,
              valor,
              contato,
             
              latitude: position.lat,
              longitude: position.lng,
              
            }),
          }
        );
  console.log(responseUpdate, "Response update")
        if (!responseUpdate.ok) {
          alert("Erro ao atualizar imóvel.");
          return;
        }

        alert("Imóvel atualizado com sucesso!");
        await loadLocations();
        location.reload();

      
      });

      
    });
  } catch (error) {
    console.error("Erro ao editar imóvel:", error);
    alert("Erro ao editar imóvel.");
  }
}

// Função para excluir a localização
async function deleteLocation(id) {
  const confirmDelete = confirm(
    `Tem certeza que deseja excluir a localização com ID: ${id}?`
  );
  if (confirmDelete) {
    const res = await fetch(`http://localhost:3000/api/imoveis/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res, "res no script");

    if (!res.ok) {
      alert("Erro ao excluir imovel");
      return;
    }

    alert(`Localização com ID: ${id} excluída.`);
    location.reload();

    // Adicione aqui a lógica para remover do banco e atualizar o mapa
  }
}

//Atualiza a posição do mapa e do marcador com base na localização do dispositivo

// Função para salvar as coordenadas no banco
async function saveLocation(lat, lng, dados, metodo, url) {
  try {
    console.log(url, metodo, dados, "metodo no savelocation");
    // Substitua esta URL pela sua API para salvar os dados no banco

    if (
      !dados.titulo ||
      !dados.nome ||
      !dados.contato ||
      !dados.descricao ||
      !dados.valor
    ) {
      alert("Preencha os dados do cadasdro do imovel.");
    }

    const response = await fetch("http://localhost:3000/api/imoveis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude: lat, longitude: lng, dados }),
    });

    console.log(response, "Response");

    if (response.ok) {
      alert("Localização salva com sucesso!");
      location.reload();
    } else {
      alert("Erro ao salvar localização 1.");
    }

    console.log(lat, lng, dados);
  } catch (error) {
    console.error("Erro ao salvar localização:", error);
    alert("Erro ao salvar localização.");
  }
}
// function guardarLoc(p1, p2){

// }
let p1;
let p2;

let titulo;
let nome;
let descricao;
let valor;
let contato;
let marker1;
document.getElementById("imovelForm").addEventListener("submit", (e) => {
  e.preventDefault();
  titulo = document.getElementById("titulo").value;
  nome = document.getElementById("nome").value;
  descricao = document.getElementById("descricao").value;
  valor = document.getElementById("valor").value;
  contato = document.getElementById("contato").value;

  console.log("Dados do formulário:", {
    titulo,
    nome,
    descricao,
    valor,
    contato,
  });
  alert("Formulário enviado com sucesso!");
  alert("Escolha a Localizacao Do imovel no map e clique para salvar");

  // marker1 = L.icon({
  //     iconUrl: './img/home-address.png',
  //     iconSize: [40, 40]
  // });
  //  marker1 = L.marker(center, {
  //     draggable: true,
  //     title: 'Imovel',
  //     icon: myIcon
  // }).addTo(map);

  marker.bindPopup(`Contato:${contato}, ${titulo}`).openPopup();
  e.target.reset();
});

let metodo = "POST";
let urlPost = "http://localhost:3000/api/imoveis";

// Evento para capturar a posição final do marcador após ser movido
marker.on("click", async () => {
  console.log("cliquei");
  const position = marker.getLatLng(); // Obtem a posição atual do marcador
  console.log(
    `Posição do marcador: Latitude: ${position.lat}, Longitude: ${position.lng}`
  );

  p1 = position.lat;
  p2 = position.lng;

  console.log(p1, p2, "p1 e p2");
  const dados = { titulo, nome, descricao, valor, contato };

  console.log(typeof dados);
  if (!dados.titulo) {
    alert("Preencha os dados ");
  } else {
    alert("Deseja salvar nessa Localização?");
    await saveLocation(position.lat, position.lng, dados, metodo, urlPost);
    // Recarregar a página
    location.reload();
  }
});

// Botão de busca por endereço
document.getElementById("search-btn").addEventListener("click", async () => {
  const query = document.getElementById("search").value;
  const searchbtn = document.getElementById("search");
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json`
  );
  const data = await response.json();
  console.log(data, "data");
  if (data.length > 0) {
    const { lat, lon, display_name } = await data[0];
    map.setView([lat, lon], 11); // Centralizar no resultado
    marker.setLatLng([lat, lon]); // Atualizar posição do marcador
    // marker.bindPopup(display_name).openPopup();
    //testando info
  } else {
    alert("Localização não encontrada.");
  }
  // Rolando a página até o mapa
  document.querySelector("#map").scrollIntoView({
    behavior: "smooth", // Adiciona uma animação suave
    
  });
  searchbtn.value = "";
});
