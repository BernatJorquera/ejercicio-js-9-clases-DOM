const creaPersonajes = personajes => {
  const personajeDummy = document.querySelector(".personaje-dummy");
  const listaPersonajes = document.querySelector(".personajes");
  for (const personaje of personajes) {
    if (document.querySelector(`.${personaje.nombre.replace(" ", "")}`) !== null) {
      document.querySelector(`.${personaje.nombre.replace(" ", "")}`).remove();
    }
    const nuevoPersonaje = personajeDummy.cloneNode(true);
    const clasePersonaje = personaje.nombre.replace(" ", "");
    const personajeFoto = nuevoPersonaje.querySelector(".nueva-imagen");
    let nombrePropio = personaje.nombre.split(" ")[0].toLowerCase();
    personajeFoto.src = `img/${nombrePropio}.jpg`;
    nuevoPersonaje.className = nuevoPersonaje.className
      .replace("personaje-dummy", clasePersonaje);
    listaPersonajes.append(nuevoPersonaje);
    const personajeNombre = nuevoPersonaje.querySelector(`.nombre`);
    personajeNombre.textContent = personaje.nombre;
    const personajeEdad = nuevoPersonaje.querySelector(`.edad`);
    personajeEdad.querySelector(".valor").textContent = personaje.edad;
    function pulgarArribaOAbajo() {
      if (personaje.estado === "Vivo") {
        nuevoPersonaje.querySelector(`.estado .muerto`).classList.add("d-none");
      } else if (personaje.estado === "Muerto") {
        nuevoPersonaje.querySelector(`.estado .vivo`).classList.add("d-none");
        personajeFoto.classList.add("muerto");
      }
    }
    pulgarArribaOAbajo();
    if (personaje.constructor.name === "Rey") {
      nuevoPersonaje.querySelector(`.emoji`).textContent = "👑";
    } else if (personaje.constructor.name === "Luchador") {
      nuevoPersonaje.querySelector(`.emoji`).textContent = "🗡";
    } else if (personaje.constructor.name === "Asesor") {
      nuevoPersonaje.querySelector(`.emoji`).textContent = "🎓";
    } else if (personaje.constructor.name === "Escudero") {
      nuevoPersonaje.querySelector(`.emoji`).textContent = "🛡";
    }
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

document.body.addEventListener("click", e => {
  if (e.target.classList.contains("accion-muere")) {
    for (const personaje of Personaje.personajesGot) {
      if (e.target.closest(`.${personaje.nombre.replace(" ", "")}`)) {
        personaje.meMuero();
        creaPersonajes(Personaje.personajesGot);
      }
    }
  }
});

const camelToGuiones = fraseCamelCase => {
  let fraseGuiones = "";
  for (const letra of fraseCamelCase) {
    if (letra === letra.toUpperCase()) {
      fraseGuiones += `- ${letra.toLowerCase()} `;
    } else {
      fraseGuiones += letra;
    }
  }
  return fraseGuiones;
}

creaPersonajes(Personaje.personajesGot);
