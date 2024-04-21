const html = document.querySelector("html");
const focuBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const imgIniciarOuPausarBt = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const startTemporizador = new Audio("/sons/play.wav");
const pauseTemporizador = new Audio("/sons/pause.mp3");
const finalizarTemporizador = new Audio("/sons/beep.mp3");

musica.loop = true;

let tempoDecorrido = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focuBt.addEventListener("click", () => {
  tempoDecorrido = 1500;
  alteraContexto("foco");
  focuBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorrido = 300;

  alteraContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorrido = 900;
  alteraContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alteraContexto(contexto) {
  mostrarTempo();
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada,<br>
        <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar a superficie,<br>
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorrido <= 0) {
    finalizarTemporizador.play();
    alert("acabou o tempo");
    zerar();
    return;
  }
  tempoDecorrido -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    pauseTemporizador.play();
    zerar();
    return;
  }
  startTemporizador.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  imgIniciarOuPausarBt.setAttribute("src", "./imagens/pause.png");
  iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloId);
  imgIniciarOuPausarBt.setAttribute("src", "./imagens/play_arrow.png");
  iniciarOuPausarBt.textContent = "Começar";
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorrido * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
