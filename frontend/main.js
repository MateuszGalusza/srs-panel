let zalogowany = false;


const API_URL = "https://backend-production-a5bd.up.railway.app/zgloszenia/";


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formularz").addEventListener("submit", async (e) => {
    e.preventDefault();
    const tytul = document.getElementById("tytul").value;
    const opis = document.getElementById("opis").value;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tytul, opis })
    });

    document.getElementById("formularz").reset();
    pobierzZgloszenia();
  });
});

function wybierzGosc() {
  document.getElementById("ekran-startowy").style.display = "none";
  document.getElementById("aplikacja").style.display = "block";
  pobierzZgloszenia();
}

function pokazPanelLogowania() {
  document.getElementById("ekran-startowy").style.display = "none";
  document.getElementById("panel-logowania").style.display = "block";
}

function zalogujAdmina() {
  const haslo = document.getElementById("haslo-admina").value;
  if (haslo === "admin123") {
    zalogowany = true;
    document.getElementById("panel-logowania").style.display = "none";
    document.getElementById("aplikacja").style.display = "block";
    pobierzZgloszenia();
  } else {
    document.getElementById("blad-logowania").style.display = "block";
  }
}

async function pobierzZgloszenia() {
  const odpowiedz = await fetch(API_URL);
  const dane = await odpowiedz.json();

  const kontener = document.getElementById("lista-zgloszen");
  kontener.innerHTML = "";

  dane.forEach((zgl) => {
    const div = document.createElement("div");
    div.classList.add("zgloszenie");

    const tresc = document.createElement("span");
    tresc.innerHTML = `
      <strong>${zgl.tytul}</strong> – ${zgl.opis} 
      <span class="status ${zgl.status === 'Zrobione' ? 'zrobione' : ''}">${zgl.status}</span>
    `;
    div.appendChild(tresc);

    if (zgl.status !== "Zrobione" && zalogowany) {
      const przycisk = document.createElement("button");
      przycisk.textContent = "Oznacz jako wykonane";
      przycisk.classList.add("wykonane-btn");
      przycisk.onclick = () => oznaczWykonane(zgl.id);
      div.appendChild(przycisk);
    }

    kontener.appendChild(div);
  });
}

async function oznaczWykonane(id) {
  await fetch(`${API_URL}${id}/status?nowy_status=Zrobione`, {
    method: "PUT"
  });
  pobierzZgloszenia();
}

function wyloguj() {
  zalogowany = false;
  document.getElementById("aplikacja").style.display = "none";
  document.getElementById("panel-logowania").style.display = "none";
  document.getElementById("ekran-startowy").style.display = "block";
}
