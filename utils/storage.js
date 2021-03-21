async function setToken (token, expiresIn) {
  await setStorage({ token, expiresIn });
}
async function getToken () {
  const tokeninfo = await getStorage({ token: null, expiresIn: 0 });
  if (tokeninfo.token && tokeninfo.expiresIn > +new Date()) {
    return tokeninfo.token;
  } else {
    return null;
  }
}

function setStorage (obj) {
  return new Promise((a) => {
    chrome.storage.sync.set(obj, function () {
      a();
    });
  });
}
function getStorage (obj) {
  return new Promise((a) => {
    chrome.storage.sync.get(obj, function (items) {
      a(items);
    });
  });
}
function clearStorage (key) {
  return new Promise((a) => {
    chrome.storage.sync.set({ key: null }, function (items) {
      a();
    });
  });
}

async function getPlay () {
  const play = await getStorage({ play: true });
  return play.play;
}
async function setPlay (play) {
  await setStorage({ play });
}
async function getAudio () {
  const audio = await getStorage({ audio: false });
  return audio.audio;
}
async function setAudio (audio) {
  await setStorage({ audio });
}

 async function getCaihong () {
  const caihong = await getStorage({ caihong: false });
  return caihong.caihong;
}
 async function setCaihong (caihong) {
  await setStorage({ caihong });
}
