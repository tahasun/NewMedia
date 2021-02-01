/* jshint esversion: 6 */
window.onload = function() {
  // Array of JSON object of page transactions
  let history = data[0].BrowserHistory;
  // let first = JSON.parse(history[0]);

  // Our JSON object
  // "page_transition": "RELOAD",
  // "title": "",
  // "url": "",
  // "time_usec": 1608657351857033

  let first = history[0].url;
  var myDate = new Date(history[0].time_usec);
  // console.log(history.length); 19133
  let object = document.querySelector("#showHitoryButton");
  object.onclick = function(){
    document.getElementById("buttonContainer").remove();

    for (var i = 0; i < 19133; i++) {
      if (history[i].url.includes("amazon")){
        let element = document.querySelector("#canvas");
        var tDate = new Date(history[i].time_usec);
        var num;
        if (i%2==0){
          num = "even";
        } else {
          num = "odd";
        }

        element.innerHTML += `
        <div class="container">
        <div class="list${num}">
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        </div>

        <div class="list${num}">
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        <div class="item">${tDate.toUTCString()}, ${history[i].title}<span>&nbsp;</span></div>
        </div>
        </div>
        `;
      }
    }
  };

};
