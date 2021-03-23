let token = "";
let audio = false;
let play = false;
let caihong = false;
async function initData() {
  token = (getToken && (await getToken())) || "";
  audio = (getAudio && (await getAudio())) || false;
  play = (getPlay && (await getPlay())) || false;
  caihong = (getCaihong && (await getCaihong())) || false;
}
let datainfo = {};
const height = $(window).height();
const width = $(window).width();
let isClick = false;

function close() {
  $("._sentence-content").hide();
  speechSynthesis && speechSynthesis.cancel();
}
function setSentenceVal(data, status) {
  const { content, source, author } = data;
  const { isLike: like, isCollce: collce } = status;
  changeLikeIcon(like);
  changeCollceIcon(collce);
  $("._sentence-body").text(content);
  const authors = author ? `${author} · ${source}` : source;
  if (audio) {
    speck(content + ((authors && " 来自：" + authors) || ""));
  }
  $("._sentence-author").text(authors || "");
}
function speck(val) {
  const list = speechSynthesis.getVoices();
  speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance(val);
  // list[64] && (msg.voice=list[65]);
  isClick && speechSynthesis.speak(msg);
}
function refresh() {
  $.get(getUrl()).then((data) => {
    datainfo = data.body;
    setSentenceVal(data.body, {});
  });
}
function changeLikeIcon(isLike) {
  let src = `<svg t="1616322853834" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8877" width="24" height="24"><path d="M511.786667 896a70.976 70.976 0 0 1-50.56-20.8L166.4 582.250667a266.666667 266.666667 0 0 1-8.96-374.229334 265.728 265.728 0 0 1 354.346667-22.912 265.450667 265.450667 0 0 1 354.133333 22.912 266.666667 266.666667 0 0 1-8.96 374.229334L562.133333 875.2a70.848 70.848 0 0 1-50.346666 20.8zM347.306667 191.232h-1.92a200.149333 200.149333 0 0 0-142.293334 60.693333 203.925333 203.925333 0 0 0 8.106667 285.696l294.826667 292.949334a6.997333 6.997333 0 0 0 11.306666 0l294.826667-292.949334a203.733333 203.733333 0 0 0 8.106667-285.696 199.402667 199.402667 0 0 0-142.293334-60.693333 201.877333 201.877333 0 0 0-143.36 58.026667 32.96 32.96 0 0 1-45.653333 0 200.149333 200.149333 0 0 0-141.653333-58.048z" fill="#333333" p-id="8878"></path><path d="M257.28 469.333333a31.402667 31.402667 0 0 1-31.146667-29.504 177.749333 177.749333 0 0 1 36.906667-135.082666 144.341333 144.341333 0 0 1 97.066667-48.277334 32 32 0 0 1 2.986666 63.786667 84.693333 84.693333 0 0 0-53.76 27.434667 116.501333 116.501333 0 0 0-20.906666 87.274666 31.701333 31.701333 0 0 1-28.8 34.261334c-0.853333 0.106667-1.706667 0.106667-2.346667 0.106666z" fill="#FF9C00" p-id="8879"></path></svg>`;
  if (isLike) {
    src = `<svg t="1616322675435"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4539" width="24" height="24"><path d="M897.8944 206.6432c-99.072-99.072-259.6352-99.072-358.7072 0l-25.1392 25.1392-25.1392-25.1392c-99.072-99.072-259.6352-99.072-358.7072 0s-99.072 259.6352 0 358.7072l342.5792 342.5792c22.784 22.784 59.7504 22.784 82.5856 0l317.44-317.44 25.1392-25.1392c98.9696-99.0208 98.9696-259.6352-0.0512-358.7072z m-70.3488 259.9936c-5.0176 5.0176-11.5712 7.4752-18.1248 7.4752s-13.1072-2.5088-18.1248-7.4752a25.61536 25.61536 0 0 1 0-36.1984 77.4144 77.4144 0 0 0 22.8352-55.0912c0-20.7872-8.0896-40.3456-22.8352-55.0912-14.6944-14.7456-34.304-22.8352-55.0912-22.8352s-40.3968 8.0896-55.0912 22.8352a25.61536 25.61536 0 0 1-36.1984 0 25.61536 25.61536 0 0 1 0-36.1984c24.3712-24.3712 56.7808-37.8368 91.2896-37.8368 34.5088 0 66.9184 13.4144 91.2896 37.8368 24.3712 24.3712 37.8368 56.7808 37.8368 91.2896 0.0512 34.4576-13.4144 66.8672-37.7856 91.2896z" fill="#FF623E" p-id="4540"></path></svg>`;
  }
  const dom = $("#_sentenceIconLike");
  dom.html(src);
  dom.attr("data-val", isLike ? 1 : "");
  $("#_sentenceIconLikeLength").text(datainfo.likes || 0);
}

function changeCollceIcon(isCollce) {
  let src = `<svg t="1616322745133" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5329" width="24" height="24"><path d="M453.973333 164.096c23.722667-48.128 92.330667-48.128 116.053334 0l83.84 170.112 186.922666 27.904c52.736 7.850667 73.813333 72.533333 35.925334 109.952l-135.253334 133.546667 31.445334 187.946666c8.874667 52.778667-46.549333 92.842667-93.866667 67.925334L512 773.546667l-167.04 87.893333c-47.317333 24.917333-102.741333-15.146667-93.866667-67.925333l31.445334-187.904-135.253334-133.546667c-37.930667-37.461333-16.810667-102.144 35.925334-109.994667l186.88-27.904 83.882666-170.112z m58.026667 28.586667L413.141333 393.173333l-220.416 32.853334 159.146667 157.226666-36.992 221.013334L512 700.416l197.12 103.765333-36.992-221.013333 159.146667-157.141333-220.416-32.896L512 192.64z" fill="#000000" p-id="5330"></path></svg>`;
  if (isCollce) {
    src = `<svg t="1616322776238" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8086" width="24" height="24"><path d="M427.631 150.163c-58.267 95.022-141.511 155.612-249.73 181.765-108.217 26.155-126.224 81.673-54.019 166.554 72.204 84.883 103.998 182.918 95.387 294.104s38.533 145.499 141.43 102.936c102.893-42.562 205.788-42.562 308.684 0 102.891 42.562 150.036 8.25 141.421-102.936-8.608-111.186 23.188-209.221 95.393-294.104 72.201-84.881 54.195-140.399-54.021-166.554-108.217-26.153-191.463-86.743-249.73-181.765-58.272-95.024-116.542-95.024-174.815 0z" fill="#FFA820" p-id="8087"></path><path d="M866.566 335.734c23.802 49.345 37.995 104.195 40.155 162.121 68.269-80.619 54.888-134.66-40.155-162.121zM92.569 453.413a406.489 406.489 0 0 1 28.373-100.714c-41.618 23.102-51.081 56.672-28.373 100.714zM355.737 897.531c-51.473-19.016-98.077-48.079-137.43-84.814-1.449 93.431 44.362 121.703 137.43 84.814zM573.729 111.044c-37.372-40.921-74.744-42.756-112.116-5.506a414.758 414.758 0 0 1 35.994-1.564c26.012 0 51.456 2.432 76.122 7.07zM656.98 890.605a462.555 462.555 0 0 1 12.403 4.917c102.891 42.562 150.036 8.25 141.421-102.936a465.55 465.55 0 0 1-0.891-14.477c-41.179 48.53-93.465 87.341-152.933 112.496z" fill="#FEAC33" p-id="8088"></path><path d="M613.07 166.677a461.698 461.698 0 0 1-10.624-16.514c-9.572-15.61-19.144-28.638-28.717-39.119-24.666-4.638-50.109-7.07-76.122-7.07-12.129 0-24.133 0.531-35.994 1.564-10.072 10.039-20.144 22.916-30.216 38.633a356.411 356.411 0 0 1 48.778-3.343c47.008-0.001 91.87 9.183 132.895 25.849zM164.416 335.479c-17.11 4.887-31.599 10.627-43.473 17.219A406.5 406.5 0 0 0 92.57 453.412c7.203 13.97 17.636 28.992 31.312 45.069a470.582 470.582 0 0 1 3.081 3.663 361.655 361.655 0 0 1-0.094-8.011c-0.001-57.054 13.529-110.947 37.547-158.654zM906.196 498.482c0.179-0.21 0.348-0.417 0.525-0.626-2.159-57.927-16.353-112.776-40.155-162.121a337.172 337.172 0 0 0-14.391-3.806c-25.257-6.104-49.135-14.109-71.671-23.964 33.581 54.058 52.977 117.848 52.977 186.17 0 195.126-158.181 353.307-353.306 353.307-102.974 0-195.654-44.058-260.231-114.346 1.116 19.394 0.895 39.223-0.675 59.491a326.777 326.777 0 0 0-0.963 20.131c39.353 36.734 85.957 65.797 137.43 84.814 1.64-0.65 3.293-1.318 4.962-2.009 98.759-40.852 197.519-42.486 296.281-4.917 59.469-25.156 111.754-63.966 152.933-112.497-4.86-105.237 27.23-198.448 96.284-279.627z" fill="#FEB133" p-id="8089"></path><path d="M480.175 847.44c195.126 0 353.306-158.181 353.306-353.307 0-68.322-19.396-132.112-52.977-186.17-68.304-29.87-124.124-76.955-167.434-141.286-41.024-16.666-85.887-25.85-132.895-25.85a356.4 356.4 0 0 0-48.778 3.343 363.085 363.085 0 0 0-3.766 5.992 451.062 451.062 0 0 1-22.343 33.089 298.622 298.622 0 0 1 57.456-5.57c164.143 0 297.207 133.064 297.207 297.207S626.887 772.096 462.744 772.096 165.536 639.032 165.536 474.889c0-55.099 15.012-106.684 41.141-150.922a454.734 454.734 0 0 1-28.776 7.961 337.634 337.634 0 0 0-13.485 3.552c-24.017 47.707-37.547 101.599-37.547 158.654 0 2.678 0.035 5.347 0.094 8.011 57.074 68.495 88.064 145.479 92.981 230.949 64.577 70.289 157.257 114.346 260.231 114.346z" fill="#FEB633" p-id="8090"></path><path d="M462.744 772.096c164.143 0 297.207-133.064 297.207-297.207S626.887 177.681 462.744 177.681a298.622 298.622 0 0 0-57.456 5.57c-11.787 15.877-24.419 30.59-37.883 44.155 24.44-8.34 50.644-12.872 77.908-12.872 133.16 0 241.108 107.948 241.108 241.108s-107.948 241.11-241.109 241.11-241.108-107.948-241.108-241.109c0-57.298 20-109.917 53.382-151.287-16.245 7.536-33.208 14.082-50.909 19.611-26.13 44.238-41.141 95.823-41.141 150.922 0 164.143 133.065 297.207 297.208 297.207z" fill="#FFBC34" p-id="8091"></path><path d="M445.312 696.752c133.16 0 241.108-107.948 241.108-241.108S578.473 214.535 445.312 214.535c-27.264 0-53.468 4.531-77.908 12.872-31.899 32.14-68.507 57.787-109.819 76.95-33.382 41.37-53.382 93.989-53.382 151.287 0.001 133.16 107.949 241.108 241.109 241.108z m-17.431-445.363c102.178 0 185.009 82.831 185.009 185.009s-82.831 185.009-185.009 185.009-185.009-82.831-185.009-185.009 82.831-185.009 185.009-185.009z" fill="#FFC134" p-id="8092"></path><path d="M427.881 621.407c102.178 0 185.009-82.831 185.009-185.009s-82.831-185.009-185.009-185.009-185.009 82.831-185.009 185.009 82.831 185.009 185.009 185.009zM410.45 288.243c71.195 0 128.91 57.715 128.91 128.91s-57.715 128.91-128.91 128.91-128.91-57.715-128.91-128.91 57.715-128.91 128.91-128.91z" fill="#FFC634" p-id="8093"></path><path d="M410.45 417.153m-128.91 0a128.91 128.91 0 1 0 257.82 0 128.91 128.91 0 1 0-257.82 0Z" fill="#FFCB34" p-id="8094"></path><path d="M515.039 96.895c10.392 0 20.967 4.503 32.329 13.768 12.927 10.54 26.295 26.996 39.733 48.91 60.575 98.786 148.336 162.661 260.846 189.852 24.94 6.028 44.683 13.674 58.679 22.726 12.312 7.962 19.864 16.651 23.086 26.56 3.226 9.921 2.224 21.407-3.063 35.114-6.01 15.58-17.504 33.411-34.163 52.995-75.056 88.236-108.576 191.578-99.628 307.157 3.317 42.811-2.285 73.386-16.199 88.42-7.971 8.612-19.303 12.799-34.643 12.799-17.473 0-39.595-5.486-65.753-16.307C622.862 856.8 568.619 845.6 515.039 845.6c-53.579 0-107.822 11.2-161.221 33.289-26.159 10.82-48.283 16.307-65.756 16.307-15.337 0-26.668-4.187-34.64-12.801-13.918-15.037-19.522-45.612-16.207-88.419 8.952-115.578-24.566-218.921-99.623-307.157-16.66-19.585-28.155-37.415-34.165-52.995-5.287-13.707-6.29-25.193-3.063-35.114 3.222-9.909 10.774-18.597 23.086-26.56 13.996-9.052 33.739-16.698 58.679-22.726 112.51-27.19 200.271-91.066 260.846-189.852 13.439-21.915 26.807-38.37 39.734-48.91 11.363-9.264 21.938-13.767 32.33-13.767m0-18c-29.136 0-58.271 23.756-87.408 71.268-58.267 95.022-141.511 155.612-249.73 181.765-108.217 26.155-126.223 81.673-54.019 166.554 72.204 84.883 103.999 182.918 95.387 294.104-6.227 80.404 16.708 120.61 68.793 120.61 19.941 0 44.149-5.89 72.637-17.674C412.145 874.241 463.592 863.6 515.04 863.6s102.895 10.641 154.343 31.922c28.48 11.781 52.696 17.674 72.633 17.674 52.092 0 75.018-40.2 68.788-120.61-8.608-111.186 23.188-209.221 95.393-294.104 72.201-84.881 54.195-140.399-54.021-166.554-108.217-26.154-191.463-86.743-249.73-181.765-29.136-47.512-58.272-71.268-87.407-71.268z" fill="#FFA820" p-id="8095"></path><path d="M473.057 349.011c-27.991 45.521-67.972 74.548-119.948 87.078-51.98 12.527-60.628 39.126-25.947 79.788 34.678 40.664 49.952 87.63 45.816 140.894-4.139 53.266 18.504 69.703 67.928 49.314 49.42-20.391 98.843-20.391 148.264 0 49.42 20.389 72.062 3.953 67.928-49.314-4.135-53.265 11.133-100.23 45.815-140.894 34.681-40.662 26.034-67.261-25.947-79.788-51.977-12.531-91.961-41.558-119.947-87.078-27.99-45.524-55.977-45.524-83.962 0z" fill="#FFE3B4" p-id="8096"></path><path d="M316.189 368.714c-6.422 0-12.636-3.445-15.882-9.502-4.695-8.763-1.397-19.672 7.365-24.367 60.839-32.598 98.424-72.405 98.796-72.804 6.792-7.26 18.181-7.641 25.442-0.85 7.26 6.791 7.641 18.182 0.85 25.442-1.687 1.803-42.069 44.572-108.086 79.944a17.923 17.923 0 0 1-8.485 2.137z" fill="#FFFFFF" p-id="8097"></path><path d="M250.695 396.852c-7.311 0-14.186-4.487-16.878-11.742-3.458-9.32 1.293-19.68 10.613-23.138l10.546-3.914c9.321-3.459 19.68 1.293 23.138 10.613 3.458 9.32-1.293 19.68-10.613 23.138l-10.546 3.914a17.963 17.963 0 0 1-6.26 1.129z" fill="#FFFFFF" p-id="8098"></path></svg>`;
  }
  $("#_sentenceIconCollce")
    .html(src)
    .attr("data-val", isCollce ? 1 : "");
  $("#_sentenceIconCollceLength").text(datainfo.collects || 0);
}

function getUrl() {
  let url = `https://www.tinker.run/api/`;
  if (caihong) {
    url += "caihong/";
  } else {
    url += "sentence/";
  }
  return url;
}

function like() {
  const id = datainfo.id;
  const isLike = $("#_sentenceIconLike").attr("data-val");
  if (isLike || !id) return;
  $.ajax(getUrl() + `${isLike ? "unlike" : "like"}/` + id, {
    type: "post",
    headers: {
      authorization: "Bearer " + token,
    },
  }).then((data) => {
    datainfo.likes += 1;
    ELEMENT.Message.success({
      message:"标记喜欢成功~ 么么哒~",}
    );
    changeLikeIcon(!isLike);
  });
}
function collce() {
  const id = datainfo.id;
  const isCollce = $("#_sentenceIconCollce").attr("data-val");
  if (!token) {
    ELEMENT.Notification({
      title:"提示",
      message:"请找到右上角插件栏句子杂货铺登录后才可以收藏哟~",}
    );
    return
  }
  if (!id) return;
  $.ajax(getUrl() + `${isCollce ? "uncollect" : "collect"}/` + id, {
    type: "post",
    headers: {
      authorization: "Bearer " + token,
    },
  }).then((data) => {
    const collects = datainfo.collects || 0;
    datainfo.collects = isCollce ? collects - 1 : collects + 1;
    ELEMENT.Message.success({
      message:`${isCollce?"取消收藏":"收藏"}成功~ 么么哒~`,}
    );
    changeCollceIcon(!isCollce);
  });
}
function changeClick() {
  isClick = true;
  $(document).off("click", changeClick);
}
function changeUi() {
  if (!play) {
    $("._sentence-content").hide();
    clearTimer();
  } else {
    $("._sentence-content").show();
    initTimer();
  }
  changeCaihongClass();
}

function initEvent() {
  $(document).on("click", changeClick);

  $("._sentence-icon").on("click", function () {
    const type = $(this).attr("data-icon-type");
    switch (type) {
      case "colse":
        close();
        break;
      case "refresh":
        refresh();
        break;
      case "like":
        like();
        break;
      case "collce":
        collce();
        break;
    }
  });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const { type, value } = request;
    if (type === "token") {
      token = value;
      sendResponse(true);
    } else if (type === "audio") {
      audio = value;
      sendResponse(true);
    } else if (type === "play") {
      play = value;
      changeUi();
      initTimer();
      sendResponse(true);
    } else if (type === "caihong") {
      caihong = value;
      changeUi();
      refresh();
      sendResponse(true);
    }
  });

  document.addEventListener("visibilitychange", async function (e) {
    //浏览器切换事件
    if (document.visibilityState !== "visible") {
      //状态判断
      await initData();
      changeUi();
      initTimer();
    } else {
      clearTimer();
    }
  });
}

let timer = null;
function clearTimer() {
  clearTimeout(timer);
}
function setTimer() {
  clearTimer();
  timer = setInterval(() => {
    refresh();
  }, 30000);
}
function initTimer() {
  if (play) {
    setTimer();
  } else {
    clearTimer();
  }
}

async function initDom() {
  const dom = $("._sentence-content");
  if (dom.length) {
    dom.remove && dom.remove();
  }
  $(`
  <div class="_sentence-content">
  <div class="_sentence-btn-icon">
    <div class="_sentence-btn-do">
      <div style="display: flex">
        <div
          class="_sentence-icon"
          style="margin-right: 15px ;"
          data-icon-type="like"
          title="喜欢"
        >
            <div class="_sentence-icon-svg" id="_sentenceIconLike" data-icon-type="like">
            </div>
            <div class="_sentence-icon-length" id="_sentenceIconLikeLength">
              12312
            </div>
        </div>
        <div
          class="_sentence-icon"
          style="margin-right: 15px ;"
          data-icon-type="collce"
          title="收藏"
        >
          <div
            class="_sentence-icon-svg"
            id="_sentenceIconCollce"
            data-icon-type="collce"
          >
          </div>
          <div  class="_sentence-icon-length" id="_sentenceIconCollceLength">
            12312
          </div>
        </div>
        <div class="_sentence-icon _sentence-icon-svg" data-icon-type="refresh" title="刷新">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M700.7 800.7c-56.9 40.5-123.6 60.5-191.8 60-8.7 0-17.9-0.5-26.7-1.5l-10.8-1.5c-7.2-1-13.8-2-20.5-3.1l-12.3-3.1c-6.7-1.5-13.3-3.1-20-5.1l-9.2-3.1c-7.7-2.6-14.9-5.1-22-8.2-1.5-0.5-3.1-1.5-4.6-2.1-8.7-3.6-16.9-7.7-25.1-12.3-0.5 0-0.5-0.5-1-0.5-27.2-15.4-52.3-34.4-74.4-56.4l-1-1c-6.7-7.2-13.3-14.4-19.5-22-1.5-1.5-2.6-3.6-4.1-5.1-44.6-56.9-71.8-128.7-71.8-206.6h75.9c2 0 4.1-1 4.6-3.1 1-1.5 1-4.1 0-5.6l-128.7-194c-1-1.5-2.6-2.6-4.6-2.6-2.1 0-3.6 1-4.6 2.6L0.8 520.2c-1 1.5-1 4.1 0 5.6s3.1 3.1 4.6 3.1h75.9c0 91.8 28.2 176.9 76.4 247.7l1.5 3.1c5.1 7.2 10.3 13.8 15.9 20.5l6.2 7.7c7.7 9.7 16.4 19 24.6 27.7l2.6 2.6c28.7 29.2 61.5 53.8 96.9 73.3l3.1 1.5c10.3 5.6 20.5 10.8 31.3 15.4 2.6 1 5.1 2.6 7.7 3.6 9.2 3.6 18.5 7.2 27.7 10.3 4.6 1.5 8.7 3.1 13.3 4.6 8.2 2.6 16.4 4.6 25.1 6.7 5.6 1.5 11.3 2.6 16.9 4.1 2.6 0.5 4.6 1 7.2 1.5 8.2 1.5 15.9 2.1 24.1 3.1 3.1 0.5 5.6 1 8.7 1 14.4 1.5 28.7 2.6 43.1 2.6 87.7 0 173.3-27.2 246.6-79 23.6-16.4 29.2-49.2 12.8-72.8-16.9-24.2-49.2-30.3-72.3-13.4M943.7 528.9c0-91.8-28.2-176.4-75.9-246.6-0.5-1-1-2.6-2-3.6-6.2-8.7-12.3-16.4-19-24.6-0.5-1-1.5-2-2-3.1-43.6-53.8-98.5-95.4-161-122.6-1.5-0.5-3.6-1.5-5.1-2.6-9.7-4.1-20-7.7-30.3-11.3-3.6-1-7.2-2.6-11.3-3.6-8.7-2.6-17.9-5.1-27.2-7.2-5.1-1-10.3-2.6-15.4-3.6-2.6-0.5-5.1-1-7.2-1.5-6.7-1-13.8-1.5-20.5-2.6-4.6-0.5-9.2-1.5-14.4-2.1-11.3-1-23.1-1.5-34.4-1.5-2.1 0-4.1-0.5-6.2-0.5h-1c-87.7 0-172.8 26.7-246.1 79-23.6 16.4-29.2 49.2-12.8 72.8 16.4 23.6 48.7 29.2 72.3 12.8 56.4-40 122.6-60.5 190.2-60 9.7 0 19.5 0.5 28.7 1.5 3.1 0.5 5.6 1 8.7 1 7.7 1 15.4 2.1 23.1 3.6 3.6 0.5 6.7 1.5 9.7 2.1 7.7 1.5 14.9 3.6 22.1 5.6 2 0.5 4.6 1.5 6.7 2.6 8.2 2.6 16.4 5.6 24.6 9.2 1 0.5 1.5 1 2.6 1 48.2 21 90.8 53.3 123.6 93.8 0 0 0.5 0.5 0.5 1 46.7 57.4 74.4 130.2 74.4 210.2h-75.9c-2.1 0-4.1 1-4.6 3.1-0.5 2-1 4.1 0 5.6L886.3 731c1 1.5 2.6 2.6 4.6 2.6 2.1 0 3.6-1 4.6-2.6l127.7-193.8c1-1.5 1-4.1 0-5.6s-3.1-3.1-4.6-3.1l-74.9 0.4z"
              fill="#1296DB"
              p-id="2744"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="_sentence-btn-colse" >
      <div class="_sentence-icon" style="margin-right:10px" data-icon-type="report" title="举报"><svg t="1616462953843"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" width="24" height="24"><path d="M362.268444 358.513778C311.296 409.372444 283.306667 477.070222 283.306667 548.977778v198.656c0 18.887111 15.246222 34.133333 34.133333 34.133333h470.584889c18.887111 0 34.133333-15.246222 34.133333-34.133333V566.613333c0-1.592889-0.113778-3.072-0.341333-4.664889 0.227556-4.323556 0.341333-8.647111 0.341333-12.970666 0-72.021333-27.989333-139.605333-78.961778-190.464-50.858667-50.858667-118.556444-78.961778-190.464-78.961778s-139.605333 28.103111-190.464 78.961778z m391.623112 190.464c0 4.892444-0.227556 10.012444-0.568889 15.018666-0.227556 3.072 0 6.144 0.568889 9.102223v140.401777H351.573333V548.977778c0-110.933333 90.225778-201.159111 201.159111-201.159111S753.891556 438.044444 753.891556 548.977778z" fill="#592B0C" p-id="2560"></path><path d="M450.104889 429.397333C367.274667 498.346667 389.12 617.358222 390.030222 622.478222c3.185778 16.384 17.408 27.648 33.450667 27.648 2.161778 0 4.323556-0.227556 6.485333-0.568889 18.545778-3.527111 30.606222-21.504 27.079111-39.936-0.113778-0.796444-14.677333-84.878222 36.636445-127.658666 14.449778-12.060444 16.384-33.564444 4.323555-48.128-11.946667-14.563556-33.450667-16.497778-47.900444-4.437334zM267.264 397.880889c11.377778 0 22.414222-5.688889 28.899556-16.042667 10.012444-15.928889 5.233778-37.091556-10.808889-47.104l-53.475556-33.564444c-15.928889-10.012444-37.091556-5.233778-47.104 10.808889-10.012444 15.928889-5.233778 37.091556 10.808889 47.104l53.475556 33.564444c5.688889 3.527111 11.946667 5.233778 18.204444 5.233778zM337.692444 248.945778c5.575111 12.970667 18.204444 20.707556 31.402667 20.707555 4.437333 0 8.988444-0.910222 13.425778-2.730666 17.294222-7.395556 25.372444-27.420444 17.976889-44.828445l-24.803556-58.026666c-7.395556-17.294222-27.420444-25.372444-44.828444-17.976889-17.294222 7.395556-25.372444 27.420444-17.976889 44.828444l24.803555 58.026667zM534.983111 243.484444h1.820445c18.090667 0 33.109333-14.108444 34.019555-32.312888l3.299556-63.032889c1.024-18.773333-13.539556-34.929778-32.312889-35.84-18.773333-1.024-34.929778 13.539556-35.84 32.312889l-3.299556 63.032888c-0.910222 18.773333 13.539556 34.816 32.312889 35.84zM854.471111 815.900444H269.653333c-18.887111 0-34.133333 15.246222-34.133333 34.133334s15.246222 34.133333 34.133333 34.133333h584.817778c18.887111 0 34.133333-15.246222 34.133333-34.133333s-15.246222-34.133333-34.133333-34.133334z" fill="#592B0C" p-id="2561"></path></svg></div>
      <div class="_sentence-icon" data-icon-type="colse" title="关闭">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M646.4 327.7c-12.8 0-25.6 4.9-35.4 14.6L342.3 611c-19.4 19.4-19.4 51.3 0 70.7 9.7 9.7 22.5 14.6 35.4 14.6s25.6-4.9 35.4-14.6L681.7 413c19.4-19.4 19.4-51.3 0-70.7-9.7-9.7-22.5-14.6-35.3-14.6z"
            fill="#7c44e2"
            p-id="2873"
          ></path>
          <path
            d="M512 162c47.3 0 93.1 9.2 136.2 27.5 41.7 17.6 79.1 42.9 111.3 75 32.2 32.2 57.4 69.6 75 111.3C852.8 418.9 862 464.7 862 512s-9.2 93.1-27.5 136.2c-17.6 41.7-42.9 79.1-75 111.3-32.2 32.2-69.6 57.4-111.3 75C605.1 852.8 559.3 862 512 862s-93.1-9.2-136.2-27.5c-41.7-17.6-79.1-42.9-111.3-75-32.2-32.2-57.4-69.6-75-111.3C171.2 605.1 162 559.3 162 512s9.2-93.1 27.5-136.2c17.6-41.7 42.9-79.1 75-111.3 32.2-32.2 69.6-57.4 111.3-75C418.9 171.2 464.7 162 512 162m0-80C274.5 82 82 274.5 82 512s192.5 430 430 430 430-192.5 430-430S749.5 82 512 82z"
            fill="#4a5fe2"
            p-id="2874"
          ></path>
          <path
            d="M377.6 327.7c-12.8 0-25.6 4.9-35.4 14.6-19.4 19.4-19.4 51.3 0 70.7L611 681.7c9.7 9.7 22.5 14.6 35.4 14.6s25.6-4.9 35.4-14.6c19.4-19.4 19.4-51.3 0-70.7L413 342.3c-9.7-9.7-22.5-14.6-35.4-14.6z"
            fill="#7c44e2"
            p-id="2875"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  <div class="_sentence-body has-hidden"></div>
  <div class="_sentence-author" style="text-align: center;font-size:13px; color: #888"></div>
</div>

  `).appendTo($("body"));
  const main = await getStorage({
    mainX: width / 2 - 200,
    mainY: height - 180,
  });
  let { mainX: x, mainY: y } = main;
  if (x > width - 420) {
    x = width - 420;
  } else if (x < 0) {
    x = 0;
  }
  if (y > height - 200) {
    y = height - 200;
  } else if (y < 0) {
    y = 0;
  }
  let move = $("._sentence-content")
    .draggabilly({
      handle: "._sentence-btn-icon",
    })
    .draggabilly("setPosition", x, y);
  move.on("dragEnd", function () {
    const { x, y } = $("._sentence-content").data("draggabilly").position;
    setStorage({ mainX: x, mainY: y });
  });
}
function changeCaihongClass() {
  const dom = $("._sentence-body");
  if (caihong) {
    dom.removeClass("has-hidden");
  } else {
    dom.addClass("has-hidden");
  }
}

async function init() {
  await initData();
  await initDom();
  changeUi();
  refresh();
  initTimer();
  initEvent();
}
init();
