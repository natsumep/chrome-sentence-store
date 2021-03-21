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
}

async function initLogoText() {
  const isLogin = await this.getToken();
  let text = "login";
  let color = "#aaa";
  if (isLogin) {
    text='';
  }
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setBadgeBackgroundColor({ color });
}

function init() {
  initLogoText();
}
init();
