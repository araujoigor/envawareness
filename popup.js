/* jshint esversion: 6 */

/***
 * Necessary only because firefox does not support runtime.onInstalled
 */

chrome.storage.local.get(null, function(data) {

  if(Object.keys(data).length === 0){
    var initialValues = {
      production: { domains: "", color: "#FF0000", fontColor: "#FFF" },
      homologation: { domains: "", color: "#F0F000", fontColor: "#000" },
      development: { domains: "localhost;127.0.0.1;", color: "#000", fontColor: "#FFF"}
    };
    chrome.storage.local.set(initialValues);
  }
});

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function findSectionInput(buttonElement, _class){
  var cardAncestor = findAncestor(buttonElement, "card");

  return (cardAncestor) ?
    cardAncestor.getElementsByClassName(_class)[0] : null;
}

function savePreferences(data, prefType){
  var local = {};
  local[prefType] = data;

  chrome.storage.local.set(local, function() {
    if(chrome.runtime.lastError){
      Materialize.toast(chrome.i18n.getMessage("saveConfigError"), 2500);
    } else {
      Materialize.toast(chrome.i18n.getMessage("saveConfigSuccess"), 2500);
    }
  });
}

function loadPreferences(prefType, callback){
  var result = null;
  chrome.storage.local.get(prefType, function(data) {
    if(chrome.runtime.lastError){
      Materialize.toast(chrome.i18n.getMessage("loadConfigError"), 2500);
    } else
      result = data[prefType];

    callback(result);
  });
}

function loadLocalizedUIText(){
  document.querySelector("#helpPanel .mainText").textContent =
    chrome.i18n.getMessage("helpText");

  document.querySelector("#helpPanel .secondaryText").textContent =
    chrome.i18n.getMessage("helpTextSmall");

  document.querySelector("#dismissHelp").textContent =
    chrome.i18n.getMessage("helpCardBtn");

  document.querySelector("#prodCard .card-title").textContent =
    chrome.i18n.getMessage("prodCardTitle");

  document.querySelector("#homolCard .card-title").textContent =
    chrome.i18n.getMessage("homolCardTitle");

  document.querySelector("#devCard .card-title").textContent =
    chrome.i18n.getMessage("devCardTitle");

  var i, it;

  it = document.querySelectorAll("label.domainLabel");
  for(i = 0; i < it.length; i++)
    it[i].textContent = chrome.i18n.getMessage("domain");

  it = document.querySelectorAll("label.notificationBgColor");
  for(i = 0; i < it.length; i++)
    it[i].textContent = chrome.i18n.getMessage("notificationBgColor");

  it = document.querySelectorAll("label.notificationTextColor");
  for(i = 0; i < it.length; i++)
    it[i].textContent = chrome.i18n.getMessage("notificationTextColor");

  it = document.querySelectorAll("a.save");
  for(i = 0; i < it.length; i++)
    it[i].textContent = chrome.i18n.getMessage("saveBtnText");
}

document.addEventListener('DOMContentLoaded', function() {

  loadLocalizedUIText();

  let saveButtons = document.getElementsByClassName("btn save");
  let i;

  for(i = 0; i < saveButtons.length; i++){
    let saveBtn = saveButtons[i];

    let domainInput = findSectionInput(saveBtn, "domain");
    let colorInput = findSectionInput(saveBtn, "bgColor");
    let fontColorInput = findSectionInput(saveBtn, "fontColor");

    saveBtn.addEventListener("click", function(){
      let domains = (domainInput) ? domainInput.value : "";
      let color = (colorInput) ? colorInput.value : "";
      let fontColor = (fontColorInput) ? fontColorInput.value : "";

      savePreferences({ domains: domains, color: color, fontColor: fontColor },
        this.id);
    });

    loadPreferences(saveBtn.id, function(pref){
      if(pref && pref.domains)
        domainInput.value = pref.domains;

      if(pref && pref.color)
        colorInput.value = pref.color.toUpperCase();

      if(pref && pref.fontColor)
        fontColorInput.value = pref.fontColor.toUpperCase();

      $(colorInput).colorPicker();
      $(fontColorInput).colorPicker();
    });
  }

  document.getElementById("dismissHelp").addEventListener("click", function(){
    var helpCard = document.getElementById("helpPanel");
    helpCard.addEventListener("animationend", function(){
      this.style.display = "none";
    });
    helpCard.classList.toggle("dismissable");
  });

  chrome.storage.local.get(null, function(data){
    if(data.enabled) document.getElementById("chkEnabled").click();
  });

  document.getElementById("chkEnabled").addEventListener("change", function() {
    var status = { enabled: this.checked };
    chrome.storage.local.set(status, function() {
      if(chrome.runtime.onStartup){
        var iconName = (status.enabled) ? "icon" : "icon-disabled";
        var opt = {
          path: {
            "16": "icons/" + iconName + "16.png",
            "48": "icons/" + iconName + "48.png",
            "128": "icons/" + iconName + ".png"
          }
        };
        chrome.browserAction.setIcon(opt);
      }
    });
  });
});
