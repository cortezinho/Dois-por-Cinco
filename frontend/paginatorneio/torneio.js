// Troca o banner pelo caminho informado
function changeImage(imagePath) {
  const bannerImage = document.getElementById('bannerImage');
  if (bannerImage) {
    // Adiciona um parâmetro aleatório para forçar reload e evitar cache
    bannerImage.src = imagePath + '?t=' + new Date().getTime();
  }
}

// Pega o GIF do card clicado e atualiza o banner
function updateBannerWithGif(cardElement) {
  const gifImage = cardElement.querySelector('img');
  if (gifImage) {
    changeImage(gifImage.src);
  }
}

// Controle de login
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
  document.getElementById("Perfil").hidden = true;
  document.getElementById("Sair").hidden = true;
  document.getElementById("cadastro").hidden = false;
  document.getElementById("Registro").hidden = false;
} else {
  document.getElementById("cadastro").hidden = true;
  document.getElementById("Sair").hidden = false;
  document.getElementById("Registro").hidden = true;
  document.getElementById("Perfil").hidden = false;

  const perfilButton = document.getElementById("Perfil");
  perfilButton.classList.remove("text-gray-400", "hover:text-white");
  perfilButton.classList.add("bg-gray-200", "text-black", "px-4", "py-2", "rounded");
}

// Logout
document.getElementById("Sair").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
});
