function toggleInfo(element) {
  var moreInfo = element.closest('.bg-gray-800').querySelector('.more-info');
  
  moreInfo.classList.toggle('hidden');
  
  if (moreInfo.classList.contains('hidden')) {
    element.textContent = "Leia mais";
  } else {
    element.textContent = "Leia menos";
  }
}
  