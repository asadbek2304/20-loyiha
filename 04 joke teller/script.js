const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}


function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');

  VoiceRSS.speech({
    key: '711f69002aa14d64bb8b52e1b3d161e7',
    src: jokeString,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}


async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMe(joke);

    toggleButton();
  } catch (error) {

  }
}


button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
