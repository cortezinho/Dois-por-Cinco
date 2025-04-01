function toggleInfo(element) {
    var moreInfo = element.closest('.bg-gray-800').querySelector('.more-info');
    
    // Alterna a visibilidade da div com a classe 'more-info'
    moreInfo.classList.toggle('hidden');
    
    // Altera o texto do link "Leia mais" para "Leia menos" e vice-versa
    if (moreInfo.classList.contains('hidden')) {
      element.textContent = "Leia mais";
    } else {
      element.textContent = "Leia menos";
    }
  }