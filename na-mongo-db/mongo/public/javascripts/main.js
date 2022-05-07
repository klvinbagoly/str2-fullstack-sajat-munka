const deleteButtons = document.querySelectorAll('.delete-user-btn')

deleteButtons.forEach(btn => {
  btn.addEventListener('click', (ev) => {
    if (!confirm("Biztosan törli a bejegyzést?")) {
      ev.preventDefault()
    }
  })
})