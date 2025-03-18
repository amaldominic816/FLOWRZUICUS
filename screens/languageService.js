import i18n from 'i18next';

const setLanguage = (lang) => {
  fetch('http://192.168.0.102:8000/api/set-language/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ language: lang }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'language.changed_successfully') {
        i18n.changeLanguage(lang);
      }
    })
    .catch((error) => console.error('Error changing language:', error));
};

setLanguage('ar');
