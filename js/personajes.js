const personajesGot = [];
class Personaje {
  serie = "Juego de Tronos";
  nombre;
  familia;
  edad;
  estado;

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje) {
    this.nombre = nombrePersonaje;
    this.familia = familiaPersonaje;
    this.edad = edadPersonaje;
    this.estado = estadoPersonaje;
    personajesGot.push(this);
  }

  meMuero() {
    this.estado = "Muerto";
  }
}

class Rey extends Personaje {
  anyosDeReinado;
  mensaje = "Vais a morir todos";

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, anyosDeReinadoPersonaje) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje);
    this.anyosDeReinado = anyosDeReinadoPersonaje;
  }
}

class Luchador extends Personaje {
  ArmaQueUsa;
  destrezaPropiedad; //valor del 1 al 10
  mensaje = "Primero pego y luego pregunto";

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, armaPersonaje, destrezaPersonaje) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje);
    this.ArmaQueUsa = armaPersonaje;
    this.setDestreza(destrezaPersonaje);
  }

  setDestreza(destrezaPersonaje) {
    if (destrezaPersonaje < 1) {
      this.destrezaPropiedad = 1;
      console.log("El valor de destreza debe ser entre 1 y 10");
    } else if (destrezaPersonaje > 10) {
      this.destrezaPropiedad = 10;
      console.log("El valor de destreza debe ser entre 1 y 10");
    } else {
      this.destrezaPropiedad = destrezaPersonaje;
    }
  }

  set destreza(destrezaPersonaje) {
    this.setDestreza(destrezaPersonaje);
  }
}

class Asesor extends Personaje {
  personajeAQuienAsesora; // tiene que ser un luchador, rey, asesor o escudero
  mensaje = "No sé por que, pero creo que voy a morir pronto";
  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, personajeAQuienAsesora) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje)
    this.personajeAQuienAsesora = personajeAQuienAsesora;
  }
}

class Escudero extends Personaje {
  personajeAQuienSirve; //tiene que ser un luchador
  gradoDePelotismo; //valor del 1 al 10
  mensaje = "Soy un Loser";
  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, personajeAQuienSirve) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje)
    this.personajeAQuienSirve = personajeAQuienSirve
  }
}

const joffreyBaratheon = new Rey("Joffrey Baratheon", "Baratheon", 19, "Vivo", 2);
const jaimeLannister = new Luchador("Jamie Lannister", "Lannister", 40, "Vivo", "Espada", 4);
const daenerysTargaryen = new Luchador("Daenerys Targaryen", "Targaryen", 30, "Vivo", "Dragones", 8);
const tyrionLannister = new Asesor("Tyrion Lannister", "Lannister", 40, "Vivo", joffreyBaratheon)
const bronn = new Escudero("Bronn", "Desconocido/del aguasnegras", 32, "Vivo", jaimeLannister)

jaimeLannister.meMuero();
tyrionLannister.meMuero();

const mensajesLuchadores = personajes => personajes
  .filter(personaje => personaje.constructor.name === "Luchador")
  .map(personaje => personaje.mensaje);

/* console.log(personajesGot.reduce((personajesPorTipo, personaje, i) => {
  if (i === 0) {
    personajesPorTipo =
      [personaje.constructor.name,
      { tipo: personaje.constructor.name, personajes: [personaje] }];
  } else {
    !personajesPorTipo.includes(personaje.constructor.name) ?
      personajesPorTipo.push(
        personaje.constructor.name,
        { tipo: personaje.constructor.name, personajes: [personaje] }) :
      personajesPorTipo[personajesPorTipo.indexOf(personaje.constructor.name) + 1]
        .personajes.push(personaje)
  }
  return personajesPorTipo;
}, []).filter(elemento => !(typeof elemento === "string"))); */
