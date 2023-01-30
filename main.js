const addEvent = (names) => {
    let card
    for (let i = 0; i < names.length; i++) {
      card = document.getElementById(`card-${names[i]}`)
      card.addEventListener("click", function() {
          localStorage.setItem('name', names[i])
          location.href = 'detalle.html'
      })
      
    }
  };
  
  
  const printHtml = async (pokemons) => {
    const container = document.getElementById("container-pokes");
    let data
    const pokeNames = []
    for (let i = 0; i < pokemons.length; i++) {
      data = await fetch(pokemons[i].url, { method: "get"});
      const { sprites, name } = await data.json();
      const { front_shiny } = sprites.other["official-artwork"];
      container.innerHTML += `<li id="card-${name}"  class="conpoke">
                                  <div class="p-4">
                                      <img class="" src="${front_shiny}" alt="sus">
                                  </div>
                                  <div class="">
                                      <h2 >${name}</h2>
                                  </div>
                              </li>`;
      pokeNames.push(name)
    }
     addEvent(pokeNames);
  };
  
  async function search(offset = 0, limit = 9) {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        method: "get",
      }
    );
  
    const { results } = await data.json();
  
    printHtml(results);
  }
  let offset = 0
  const previous = document.getElementById('previous')
  const next = document.getElementById('next')
  
  
  previous.addEventListener("click", function(event){

      if (offset>=9) {
          offset-=9
          const container = document.getElementById("container-pokes");
          container.innerHTML=''
          search(offset)
      }
  })
  
  next.addEventListener("click", function(event){
      offset += 9
      const container = document.getElementById("container-pokes");
      container.innerHTML = ''
      search(offset)
  })
  
  search(offset);

  document.addEventListener("keyup", e=>{
    if (e.target.matches(".buscar")){
        if (e.key ==="Escape")e.target.value = ""
        document.querySelectorAll(".conpoke").forEach(conpoke =>{
            conpoke.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?conpoke.classList.remove("filtro")
              :conpoke.classList.add("filtro")
        })
    }
  })