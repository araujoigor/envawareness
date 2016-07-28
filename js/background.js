if(chrome.runtime.onInstalled){
  chrome.runtime.onInstalled.addListener(function(details){

    if(details.reason === "install"){
      var initialValues = {
        production: { domains: "", color: "#FF0000", fontColor: "#FFF" },
        homologation: { domains: "", color: "#F0F000", fontColor: "#000" },
        development: { domains: "localhost;127.0.0.1;", color: "#000", fontColor: "#FFF"},
        enabled: false
      };

      chrome.storage.local.set(initialValues);

      var opt = {
        path: {
          "16": "icons/icon-disabled16.png",
          "48": "icons/icon-disabled48.png",
          "128": "icons/icon-disabled.png"
        }
      };
      chrome.browserAction.setIcon(opt);
    }
  });
}

if(chrome.runtime.onStartup){
  chrome.runtime.onStartup.addListener(function(){
    chrome.storage.local.get(null, function(data) {
      if(chrome.runtime.onStartup){
        var iconName = (data.enabled) ? "icon" : "icon-disabled";
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
}
