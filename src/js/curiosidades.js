function openModal(title, description) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-description').innerText = description;
  document.getElementById('modal').style.display = 'block';
}

document.querySelector('.close-button').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function (e) {
  if (e.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});