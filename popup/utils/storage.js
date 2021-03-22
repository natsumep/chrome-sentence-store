/* eslint-disable */
// 工具函数
export async function setToken (token, expiresIn) {
  await setStorage({ token, expiresIn });
}
export async function getToken () {
  const tokeninfo = await getStorage({ token: null, expiresIn: 0 });
  if (tokeninfo.token && tokeninfo.expiresIn > +new Date()) {
    return tokeninfo.token;
  } else {
    return null;
  }
}
export async function cleanToken () {
  await clearStorage({token:null,expiresIn:0});
}

export function setStorage (obj) {
  return new Promise((a) => {
    chrome.storage.sync.set(obj, function () {
      a();
    });
  });
}
export function getStorage (obj) {
  return new Promise((a) => {
    chrome.storage.sync.get(obj, function (items) {
      a(items);
    });
  });
}
export function clearStorage (obj) {
  return new Promise((a) => {
    chrome.storage.sync.set(obj, function (items) {
      a();
    });
  });
}

export async function getPlay () {
  const play = await getStorage({ play: true });
  return play.play;
}

export async function setPlay (play) {
  await setStorage({ play });
}
export async function getAudio () {
  const audio = await getStorage({ audio: false });
  return audio.audio;
}
export async function setAudio (audio) {
  await setStorage({ audio });
}
export async function getCaihong () {
  const caihong = await getStorage({ caihong: false });
  return caihong.caihong;
}
export async function setCaihong (caihong) {
  await setStorage({ caihong });
}

export function getBgView () {
  var bg = chrome.extension.getBackgroundPage();
  return bg;
}

export function sendMessageToContentScript(message, callback)
{
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
 {
  chrome.tabs.sendMessage(tabs[0].id, message, function(response)
  {
   if(callback) callback(response);
  });
 });
}