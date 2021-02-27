const personajesGot = [];
class Personaje {
  serie = "Juego de Tronos";
  nombre;
  familia;
  edad;
  estado = "vivo";
  comunicar() { }

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

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, anyosDeReinadoPersonaje) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje);
    this.anyosDeReinado = anyosDeReinadoPersonaje;
  }
  comunicar() {
    super.comunicar();
    return "Vais a morir Todos";
  }
}

class Luchador extends Personaje {
  ArmaQueUsa;
  destrezaPropiedad; //valor del 1 al 10


  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, armaPersonaje, destrezaPersonaje) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje);
    this.ArmaQueUsa = armaPersonaje;
    this.setDestreza(destrezaPersonaje);
  }
  comunicar() {
    super.comunicar();
    return "Primero pego y luego pregunto";
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

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, personajeAQuienAsesora) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje)
    this.personajeAQuienAsesora = personajeAQuienAsesora;
  }
  comunicar() {
    super.comunicar();
    return "No sé por qué, pero creo que voy a morir pronto";
  }
}

class Escudero extends Personaje {
  personajeAQuienSirve; //tiene que ser un luchador
  gradoDePelotismo; //valor del 1 al 10
  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, personajeAQuienSirve) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje)
    this.personajeAQuienSirve = personajeAQuienSirve
  }
  comunicar() {
    super.comunicar();
    return "Soy un Loser";
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
  .map(personaje => personaje.comunicar());

console.log(personajesGot.reduce((personajesPorTipo, personaje, i) => {
  if (i === 0) {
    personajesPorTipo =
      [personaje.constructor.name,
      { tipo: personaje.constructor.name, personajes: [personaje] }];
  } else {
    !personajesPorTipo.includes(personaje.constructor.name) ?
      personajesPorTipo.push(
        personaje.constructor.name,
        { tipo: personaje.constructor.name, personajes: [personaje] }) :
      personajesPorTipo[personajesPorTipo.indexOf(personaje.constructor.name) + 1].personajes.push(personaje);
    personajesPorTipo[personajesPorTipo.indexOf(personaje.constructor.name) + 1].personajes
      .sort((a, b) => a.edad - b.edad);
  }
  return personajesPorTipo;
}, []).filter(elemento => !(typeof elemento === "string"))[1].personajes[0]);
