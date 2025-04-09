function changeImage(imagePath) {
    // Achar o elemento da imagem na div
    const bannerImage = document.getElementById('bannerImage');
    
    // Atualizar o src com o caminho da nova imagem
    if (bannerImage) {
        bannerImage.src = imagePath;
    }
}

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    document.getElementById("Perfil").hidden = true;
    document.getElementById("Sair").hidden = true;
    document.getElementById("cadastro").hidden = false;
    document.getElementById("Registro").hidden = false;
} else {
    // Caso o item "usuarioLogado" esteja no localStorage
    document.getElementById("cadastro").hidden = true;
    document.getElementById("Sair").hidden = false;
    document.getElementById("Registro").hidden = true;
    document.getElementById("Perfil").hidden = false;

    // Ajustar o estilo do perfil
    const perfilButton = document.getElementById("Perfil");
    perfilButton.classList.remove("text-gray-400", "hover:text-white");
    perfilButton.classList.add("bg-gray-200", "text-black", "px-4", "py-2", "rounded");
}

// Função para fazer logout e limpar o localStorage
document.getElementById("Sair").addEventListener("click", function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link (navegação)

    // Limpar o localStorage
    localStorage.removeItem('usuarioLogado');
    
    // Atualizar a página (recarregar)
    window.location.reload();
});
