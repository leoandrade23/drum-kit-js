const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

const jSons = {
  A: "boom.wav",
  S: "clap.wav",
  D: "hihat.wav",
  F: "kick.wav",
  G: "openhat.wav",
  H: "ride.wav",
  J: "snare.wav",
  K: "tink.wav",
  L: "tom.wav",
};

const criarDiv = (texto) => {
  const div = `<div class="key" id="${texto}">${texto}</div>`;
  qS(".container").innerHTML += div;
};

const montarDiv = (jSons) => Object.keys(jSons).forEach(criarDiv);

const composer = () => {
  qS(
    ".composer"
  ).innerHTML = `<input type="text" placeholder="Faça uma composição..." />
  <button>Tocar</button>`;
};

const tocarSom = (letra) => {
  const audio = new Audio(`_assets/_media/${jSons[letra]}`);
  audio.play();
};

const active = (letra) => {
  document.getElementById(letra).classList.add("active");
  setTimeout(() => {
    document.getElementById(letra).classList.remove("active");
  }, 200);
};

const ativarDiv = (evento) => {
  const letra =
    evento.type == "click" ? evento.target.id : evento.key.toUpperCase();
  active(letra);
  tocarSom(letra);
};

montarDiv(jSons);

composer();

qSAll(".key").forEach((key) => {
  key.addEventListener("click", ativarDiv);
});

window.addEventListener("keyup", ativarDiv);

const composition = () => {
  let composition = qS("input").value.toUpperCase();
  if (composition != "") {
    let compositionArray = composition.split("");
    playComposition(compositionArray);
  }
};

const playComposition = (compositionArray) => {
  let wait = 0;
  for (let compositionItem of compositionArray) {
    setTimeout(() => {
      tocarSom(compositionItem);
    }, wait);
    wait += 250;
  }
  qS("input").value = "";
};

qS("button").addEventListener("click", composition);
