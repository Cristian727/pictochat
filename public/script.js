let isDragging = false;
const elemento = $('section')
  $( function() {
    $( "section" ).draggable({
      start: function() {
        isDragging = true;
      },
  
      stop: function() {
        isDragging = false
      }
    });
  } );

function toggleChat(){
  const lista = document.querySelector("ul")
  const form = document.querySelector("form")
  lista.hidden = !lista.hidden;
  if(form.style.display === "none"){
    form.style.display = "flex";
  } else {
    form.style.display = "none"
  }
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    if(mouseIsPressed && !isDragging) {
        const datos = {
            x: mouseX,
            y: mouseY
        }
        //socket.emit("paint", datos)
      fill(0);
      //ellipse(mouseX, mouseY, 20)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }
}
const socket = io();


const form = document.getElementById('formulario');
const input = document.getElementById('inputTexto')
const messages = document.getElementById('mensajes');

form.addEventListener('submit', (e) => {
 e.preventDefault();
 if (input.value) {
   socket.emit('chat message', input.value);
   input.value = '';
 }
});

socket.on('init chat', (mensajes) => {
  console.log(mensajes)
  mensajes.forEach(mensajeObjeto => {
    const li = document.createElement("li")
    li.innerHTML = mensajeObjeto.mensaje
    messages.appendChild(li);
  })
})

socket.on('chat message', (msg) => {
  const item = document.createElement('a');
  if(esUrl(msg)){
    item.href = msg
    item.textContent = msg;
  }
  else{
    item.textContent = msg;
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

 function esURL(string) {
   return string.startsWith("http://");
