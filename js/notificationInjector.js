RegExp.escape = function(str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

setTimeout(function(){
  chrome.storage.local.get(null, function(data) {

    if(data.enabled){
      var keys = Object.keys(data);

      for(var i = 0; i < keys.length; i++){
        if(
          data[keys[i]].hasOwnProperty("domains") && data[keys[i]].hasOwnProperty("color")
        ){
          var lastChar = data[keys[i]].domains.substr(-1);
          if(lastChar !== ";" && lastChar !== "," && lastChar.length > 0)
            data[keys[i]].domains = data[keys[i]].domains + ";";

          var domains = RegExp.escape(data[keys[i]].domains).trim()
            .split(/[\s,;]+/gi).join(")|(");

          if(!domains) continue;
          else if(domains.substr(-3) === ")|("){
            domains = domains.substr(0, domains.length-2);
            domains = "(" + domains;
          }

          var regex = new RegExp(domains, "gi");
          if(window.location.href.match(regex) !== null){
            if(!document.getElementById("env-awareness-bar")){
              var newElement = document.createElement("div");
              newElement.id = "env-awareness-bar";
              newElement.textContent = keys[i] + " ENVIRONMENT";
              newElement.style.color = data[keys[i]].fontColor;
              newElement.style.textAlign = "center";
              newElement.style.textTransform = "uppercase";
              newElement.style.fontSize = "15px";
              newElement.style.fontWeight = "bold";
              newElement.style.lineHeight = "60px";
              newElement.style.height = "60px";
              newElement.style.width = "100%";
              newElement.style.position = "fixed";
              newElement.style.zIndex = "1000";
              newElement.style.backgroundColor = data[keys[i]].color;
              newElement.style.bottom = 0;

              var body = document.getElementsByTagName("body")[0];
              body.appendChild(newElement);
              body.style.marginBottom = "60px";
            }
            return;
          }
        }
      }
    }
  });
}, 1000);
