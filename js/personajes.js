class Personaje {
  static serie = "Juego de Tronos";
  static personajesGot = [];
  nombre;
  familia;
  edad;
  estado = "Vivo";

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje) {
    this.nombre = nombrePersonaje;
    this.familia = familiaPersonaje;
    this.edad = edadPersonaje;
    this.estado = estadoPersonaje;
    Personaje.personajesGot.push(this);
  }
  comunicar() { }
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

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje, armaPersonaje,
    destrezaPersonaje) {
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

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje,
    personajeAQuienAsesoraArg) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje)
    this.personajeAQuienAsesora = personajeAQuienAsesoraArg;
  }
  comunicar() {
    super.comunicar();
    return "No sé por qué, pero creo que voy a morir pronto";
  }
}

class Escudero extends Personaje {
  personajeAQuienSirve; //tiene que ser un luchador
  gradoDePelotismo; //valor del 1 al 10

  constructor(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje,
    personajeAQuienSirveArg, pelotismoPersonaje) {
    super(nombrePersonaje, familiaPersonaje, edadPersonaje, estadoPersonaje);
    this.setPersonajeAQuienSirve(personajeAQuienSirveArg);
    this.setPelotismo(pelotismoPersonaje);
  }
  comunicar() {
    super.comunicar();
    return "Soy un Loser";
  }
  setPersonajeAQuienSirve(personajeAQuienSirveArg) {
    if (personajeAQuienSirveArg.constructor.name === "Luchador") {
      this.personajeAQuienSirve = personajeAQuienSirveArg;
    } else {
      console.log("El personaje a quien sirve un escudero debe ser Luchador");
    }
  }
  set personajeAQuienSirve(personajeAQuienSirveArg) {
    this.setPersonajeAQuienSirve(personajeAQuienSirveArg);
  }
  setPelotismo(pelotismoPersonaje) {
    if (pelotismoPersonaje < 1) {
      this.gradoDePelotismo = 1;
      console.log("El valor de grado de pelotismo debe ser entre 1 y 10");
    } else if (pelotismoPersonaje > 10) {
      this.gradoDePelotismo = 10;
      console.log("El valor de grado de pelotismo debe ser entre 1 y 10");
    } else {
      this.gradoDePelotismo = pelotismoPersonaje;
    }
  }
  set pelotismo(pelotismoPersonaje) {
    this.setPelotismo(pelotismoPersonaje);
  }
}

const joffreyBaratheon = new Rey("Joffrey Baratheon", "Baratheon", 19, "Vivo", 2);
const jaimeLannister = new Luchador("Jamie Lannister", "Lannister", 40, "Vivo", "Espada", 4);
const daenerysTargaryen = new Luchador("Daenerys Targaryen", "Targaryen", 30, "Vivo", "Dragones", 8);
const tyrionLannister = new Asesor("Tyrion Lannister", "Lannister", 40, "Vivo", daenerysTargaryen);
const bronn = new Escudero("Bronn", "Desconocido/del aguasnegras", 32, "Vivo", jaimeLannister, 5);

const mensajesLuchadores = (personajes = Personaje.personajesGot) => personajes
  .filter(personaje => personaje.constructor.name === "Luchador")
  .map(personaje => personaje.comunicar());

console.log(Personaje.serie);
for (const personaje of Personaje.personajesGot) {
  console.log(personaje);
}

jaimeLannister.meMuero();
tyrionLannister.meMuero();

console.log(Personaje.personajesGot.reduce((personajesPorTipo, personaje, i) => {
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
}, []).filter(elemento => !(typeof elemento === "string")));
