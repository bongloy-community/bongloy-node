Bongloy.setPublishableKey('pk_test_69bf785ab0e264c9b6b081040ea460eaf79833ae2219e57f1cc3379c26955c1a')

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const bongloyTokenHandler = token => {
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'bongloyToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();

    var expiry = document.querySelector('[data-name="cardExpiry"]').value.split("/");
    var cardObject = {
        number:     document.querySelector('[data-name="cardNumber"]').value,
        exp_month:  expiry[0],
        exp_year:   expiry[1],
        cvc:        document.querySelector('[data-name="cardCVC"]').value
    };

    Bongloy.createToken('card', cardObject, function(statusCode, response) {
      if (statusCode === 201) {
        bongloyTokenHandler(response)
      }else{
        errorEl.textContent = response.error.message
      }
    });
});
