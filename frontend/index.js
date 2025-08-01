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

  document.getElementById("resetuj-btn").addEventListener("click", async () => {
    if (confirm("Na pewno chcesz zresetować bazę?")) {
      await fetch("https://backend-production-a5bd.up.railway.app/zresetuj-db", { method: "POST" });
      pobierzZgloszenia();
    }
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
  const odp = await fetch(API_URL);
  const dane = await odp.json();

  const kontener = document.getElementById("lista-zgloszen");
  kontener.innerHTML = "";

  dane.forEach(zgl => {
    const div = document.createElement("div");
    div.classList.add("zgloszenie");

    const tresc = document.createElement("span");
    tresc.innerHTML = `<strong>${zgl.tytul}</strong> – ${zgl.opis} <span class="status">${zgl.status}</span>`;
    div.appendChild(tresc);

    if (zgl.status !== "Zrobione" && zalogowany) {
      const btn = document.createElement("button");
      btn.textContent = "Zrobione";
      btn.onclick = () => oznaczWykonane(zgl.id);
      div.appendChild(btn);
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
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  // ... reszta kodu (formularz, resetuj-btn itd.)
});

function wyloguj() {
  zalogowany = false;
  document.getElementById("aplikacja").style.display = "none";
  document.getElementById("panel-logowania").style.display = "none";
  document.getElementById("ekran-startowy").style.display = "block";
}

