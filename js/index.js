const creaPersonajes = personajes => {
  const personajeDummy = document.querySelector(".personaje-dummy");
  const listaPersonajes = document.querySelector(".personajes");
  for (const personaje of personajes) {
    const nuevoPersonaje = personajeDummy.cloneNode(true);
    const clasePersonaje = personaje.nombre.replace(" ", "");
    nuevoPersonaje.className = nuevoPersonaje.className
      .replace("personaje-dummy", clasePersonaje);
    listaPersonajes.append(nuevoPersonaje);
    const personajeNombre = nuevoPersonaje.querySelector(`.nombre`);
    personajeNombre.textContent = personaje.nombre;
    const personajeEdad = nuevoPersonaje.querySelector(`.edad`);
    personajeEdad.querySelector(".valor").textContent = personaje.edad;
    for (const childNode of nuevoPersonaje.querySelector(".info-especifica").children) {
      LoopPropiedades:
      for (const nombreDePropiedad of Object.getOwnPropertyNames(personaje)
        .slice(Object.getOwnPropertyNames(new Personaje).length)) {
        if (!(childNode.className.includes(camelToGuiones(nombreDePropiedad)))) {
          childNode.classList.add("d-none");
        } else {
          childNode.classList.remove("d-none");
          childNode.querySelector(".valor").textContent = (typeof personaje[nombreDePropiedad] === "object") ?
            personaje[nombreDePropiedad].nombre :
            personaje[nombreDePropiedad];
          break LoopPropiedades;
        }
      }
      personajes.pop();
    }
  }
}

const camelToGuiones = fraseCamelCase => {
  let fraseGuiones = "";
  for (const letra of fraseCamelCase) {
    if (letra === letra.toUpperCase()) {
      fraseGuiones += `-${letra.toLowerCase()}`;
    } else {
      fraseGuiones += letra;
    }
  }
  return fraseGuiones;
}

creaPersonajes(Personaje.personajesGot);
