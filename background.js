chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "selectUploadMenu",
    title: "上传当前句子到句子集市",
    contexts: ["selection"],
    // onclick: uploadTextToServe
    //   onclicked: function(params){
    // 	// 注意不能使用location.href，因为location是属于background的window对象
    // 	chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    // }
  });
  chrome.contextMenus.onClicked.addListener(uploadTextToServe);
});

function uploadTextToServe(info, tab) {
  console.log(info, tab);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "upload", info, tab },
      function (response) {
        console.log("收到来自后台的回复：" + response);
      }
    );
  });
}

async function initLogoText() {
  const isLogin = await getToken();
  let text = "login";
  let color = "#aaa";
  if (isLogin) {
    text = "";
  }
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });
}

function init() {
  initLogoText();
}
init();
