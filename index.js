class Postagem {
    constructor(titulo, imagem, conteudo, data) {
      this.titulo = titulo;
      this.imagem = imagem;
      this.conteudo = conteudo;
      this.data = data;
    }
  }
  
  // Popup criação de postagens
  const popupaddpost = document.getElementById('popupcriarPost');
  const popupEditarPost = document.getElementById('popupEditarPost');
  const btNovaPublicacao = document.getElementById('btcriarPostagem');
  const btfechar = document.querySelector('.close');
  const btaddPublicacao = document.getElementById('criarPublicacao');
  
  // Função que fecha o popup criar
  function close() {
    popupaddpost.close();
  }
  
  // Função que fecha o popup criar
  const closeEditar = () => {
    document.getElementById('tituloPostagemEditar').value = '';
    document.getElementById('imgPostagemEditar').value = '';
    document.getElementById('conteudoPostagemEditar').value = '';
    popupEditarPost.close();
  }
  
  // Função que reseta os valores dos inputs
  function limparCampos() {
    document.getElementById('tituloPostagem').value = '';
    document.getElementById('imgPostagem').value = '';
    document.getElementById('conteudoPostagem').value = '';
  }
  
  // Botão que mostra o popup da publicação
  btNovaPublicacao.addEventListener('click', function() {
    popupaddpost.showModal();
  });
  
  // Botão que fecha o popup de criação
  btfechar.addEventListener('click', function() {
    close();
    limparCampos();
  });
  
  function criarPostagem() {
    const fileInput = document.getElementById('imgPostagem');
    const img = fileInput.files[0];
    const titulo = document.getElementById('tituloPostagem').value;
    const conteudo = document.getElementById('conteudoPostagem').value;
    const date = new Date();
    const data = {
      dia: date.getDay(),
      mes: date.getMonth() + 1,
      ano: date.getFullYear()
    }
  
    if (img && titulo && conteudo) {
      const reader = new FileReader();
      reader.onload = function() {
        const imagem = reader.result;
        const post = new Postagem(titulo, imagem, conteudo, data);
  
        posts.push(post);
        salvarPostagens();
        exibirPost();
        close();
        limparCampos();
      };
      reader.readAsDataURL(img);
    } else {
      window.alert('Por favor preencha todos os campos!');
    }
  }
  
  // Função para salvar as postagens na localStorage
function salvarPostagens() {
    localStorage.setItem('postagens', JSON.stringify(posts));
  }
  
  // Função para carregar as postagens da localStorage
  function carregarPostagens() {
    const postagensSalvas = localStorage.getItem('postagens');
    if (postagensSalvas) {
      posts.push(...JSON.parse(postagensSalvas));
      exibirPost();
    }
  }
  
  // Lógica do array que armazena as publicações
  const posts = [];
  
  function exibirPost() {
    const postsDiv = document.querySelector('.post');
    postsDiv.innerHTML = '';
  
    posts.reverse().forEach(post => {
      const postHTML = `
        <li class="post-item">
          <div class="button-div">
            <button class='excluirBtn'> Excluir
            </button>
            <button class='editarBtn'> Editar
            </button>
          </div>
          <h2 class='pTitle'>${post.titulo}</h2>
          <p class='pConteudo'>${post.conteudo}</p>
          <img class'pImg' src="${post.imagem}" alt="Imagem">
          <p class='pData'>Publicado em: ${post.data.dia}/${post.data.mes}/${post.data.ano}</p>
  
          <dialog class="popupEditarPost">
            <span class="close">X</span>
            <h2>Editar Publicação</h2>
            <input type="text" id="tituloPostagemEditar" placeholder="Insira um novo título" />
            <input type="text" id="conteudoPostagemEditar" placeholder="Conteúdo">
            <div class="adicionarImagem">
                <p>Insira uma imagem:</p>
                <input type="file" id="imgPostagemEditar" accept="image/*" />
            </div>
            <button class="editarPublicacao">Editar publicação</button>
          </dialog>
        </li>
      `;
      postsDiv.innerHTML += postHTML;
    });
  }
  //Cria as situações a que os eventos devem responder (excluir e editar)
const postEvents = (e) => {
    const ul = e.target.closest(".post");
    
    const li = e.target.closest(".post-item");
  
    let idLi;
  
    if(ul != null){
      const nodes = Array.from(ul.children);
      idLi = nodes.indexOf(li);
    }
  
    if(e.target.classList.contains('excluirBtn')){
      ul.removeChild(li);
      posts.splice(idLi, 1);
      salvarPostagens();
    }
  }
  
  // Carregar as postagens ao carregar a página
  carregarPostagens();
  
  btaddPublicacao.addEventListener('click', criarPostagem);
  
  console.log(posts);
  
  const postsDom = document.querySelector('.post');
  
  //Adiciona os eventos aos botões das postagens
  postsDom.addEventListener("click", (e) => {
    postEvents(e);
  });
  
  function editarPostagem() {
    const fileInput = document.getElementById('imgPostagemEditar');
    const img = fileInput.files[0];
    const titulo = document.getElementById('tituloPostagemEditar').value;
    const conteudo = document.getElementById('conteudoPostagemEditar').value;
  
    if (img && titulo && conteudo) {
      const reader = new FileReader();
      reader.onload = function() {
        const imagem = reader.result;
        const post = new Postagem(titulo, imagem, conteudo);
        posts[idLi] = post; // Atualiza a postagem no array
        salvarPostagens();
        exibirPost();
        close();
        closeEditar();
      };
      reader.readAsDataURL(img);
    } else {
      window.alert('Por favor, preencha todos os campos!');
    }
  }
  
  // Botão que mostra o popup de edição da postagem
  const editarButtons = document.getElementsByClassName('editarBtn');
  for (let i = 0; i < editarButtons.length; i++) {
    editarButtons[i].addEventListener('click', function() {
      const post = posts[i];
      document.getElementById('tituloPostagemEditar').value = post.titulo;
      document.getElementById('conteudoPostagemEditar').value = post.conteudo;
      document.getElementById('popupEditarPost').showModal();
      idLi = i;
    });
}
// Botão que fecha o popup de edição
const btfecharEditar = document.getElementById('popupEditarPost').querySelector('.close');
btfecharEditar.addEventListener('click', function() {
  closeEditar();
});

// Botão que salva as alterações da postagem
const btSalvarEditar = document.getElementById('editarPublicacao');
btSalvarEditar.addEventListener('click', editarPostagem);

// Filtro de busca
const btnBusca = document.querySelector('.btnBusca')
btnBusca.addEventListener('click', () => {
  const input = document.getElementById('txtBusca');

  if(input.value.length <= 0){
    exibirPost();
    return;
  }

  //Filtro de busca pelo nome
  const postsFilter = posts.filter(post => post.titulo.includes(input.value));
  const postsDiv = document.querySelector('.post');
  postsDiv.innerHTML = '';

  postsFilter.reverse().forEach(post => {
    const postHTML = `
      <li class="post-item">
        <div class="button-div">
          <button class='excluirBtn'> Excluir
          </button>
          <button class='editarBtn'> Editar
          </button>
        </div>
        <h2 class='pTitle'>${post.titulo}</h2>
        <p class='pConteudo'>${post.conteudo}</p>
        <img class'pImg' src="${post.imagem}" alt="Imagem">
        <p class='pData'>Publicado em: ${post.data.dia}/${post.data.mes}/${post.data.ano}</p>

        <dialog class="popupEditarPost">
          <span class="close">X</span>
          <h2>Editar Publicação</h2>
          <input type="text" id="tituloPostagemEditar" placeholder="Insira um novo título" />
          <input type="text" id="conteudoPostagemEditar" placeholder="Conteúdo">
          <div class="adicionarImagem">
              <p>Insira uma imagem:</p>
              <input type="file" id="imgPostagemEditar" accept="image/*" />
          </div>
          <button class="editarPublicacao">Editar publicação</button>
        </dialog>
      </li>
    `;
    postsDiv.innerHTML += postHTML;
  })
});

 // Adiciona os eventos aos botões de editar e excluir das postagens filtradas
 const editarButtonsFilter = document.querySelectorAll('.post-item .editarBtn');
 editarButtonsFilter.forEach((button, index) => {
   button.addEventListener('click', function() {
     const post = postsFilter[index];
     document.getElementById('tituloPostagemEditar').value = post.titulo;
     document.getElementById('conteudoPostagemEditar').value = post.conteudo;
     document.getElementById('popupEditarPost').showModal();
     idLi = posts.indexOf(post);
   });
 });

 const excluirButtonsFilter = document.querySelectorAll('.post-item .excluirBtn');
 excluirButtonsFilter.forEach((button, index) => {
   button.addEventListener('click', function() {
     const post = postsFilter[index];
     const postIndex = posts.indexOf(post);
     posts.splice(postIndex, 1);
     salvarPostagens();
     exibirPost();
   });
 });
;