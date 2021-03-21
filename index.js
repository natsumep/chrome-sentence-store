chrome.browserAction.setBadgeText({ text: "ON" });
chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "selectUploadMenu",
    title: "上传当前句子到句子集市",
    contexts: ["selection"],
  });
});