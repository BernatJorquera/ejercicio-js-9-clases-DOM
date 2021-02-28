const creaPersonajes = personajes => {
  for (const personaje of personajes) {
    const personajeDummy = document.querySelector(".personaje-dummy");
    const listaPersonajes = document.querySelector(".personajes");
    const nuevoPersonaje = personajeDummy.cloneNode(true);
    clasePersonaje = personaje.nombre.replace(" ", "");
    const personajeFoto = nuevoPersonaje.querySelector(".nueva-imagen");
    let nombrePropio = personaje.nombre.split(" ")[0].toLowerCase();

    console.log(nombrePropio)
    personajeFoto.src = `img/${nombrePropio}.jpg`;

    nuevoPersonaje.className = nuevoPersonaje.className
      .replace("personaje-dummy", clasePersonaje);
    listaPersonajes.append(nuevoPersonaje);
    const personajeNombre = document.querySelector(`.${clasePersonaje} .nombre`);
    personajeNombre.textContent = personaje.nombre;
    const personajeEdad = document.querySelector(`.${clasePersonaje} .info .metadata`).children[0];
    personajeEdad.textContent = personajeEdad.textContent.replace("X", personaje.edad);
  }
}

creaPersonajes(Personaje.personajesGot);
