var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

function run(event) {
  event.preventDefault()
  var zipCode = zipCodeField.value

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  axios
    .get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(function (response) {
      if (response.data.erro) {
        throw new Error('CEP inválido')
      }
      content.innerHTML = ''
      createLine(response.data.logradouro)
      createLine(response.data.bairro)
      createLine(response.data.localidade + '/' + response.data.uf)
    })
    .catch(function () {
      content.innerHTML = ''
      createLine('Ops!')
      createLine('CEP Inexistente')
    })
}

function createLine(text) {
  var line = document.createElement('p')
  var text = document.createTextNode(text)

  line.appendChild(text)
  content.appendChild(line)
}

submitButton.addEventListener('click', run)

