/* jshint esversion: 6 */
window.addEventListener('load', function(){
  const countDown = 5;
  var element = document.querySelector('#clock');
  var clock = setInterval(function() {
    element.innerHTML = parseInt(element.innerHTML)-1;
  }, 1000);
  setTimeout(function stopClock() {
    clearInterval(clock);
  }, countDown*1000);
  refresh();
});

function refresh(){
    setTimeout(function(e){
        location.reload();
    }, 5000);
}
