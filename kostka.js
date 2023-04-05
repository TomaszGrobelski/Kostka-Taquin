let table = document.querySelector(".box");
let body = document.querySelector("body");
let tr = [...document.querySelectorAll("tr")];
let td = [...document.querySelectorAll("td")];

td.forEach((przy) => {
  przy.addEventListener("click", () => {
    let table = document.querySelector(".box");
    let pusty = document.querySelector(".pusty");
    if (przy.classList.contains("cyfra") && przy.classList.contains("sasiad")) {
      //::::::::
      for (const el of td) {
        el.classList.remove("sasiad");
      }
      let wiersz = przy.parentNode.rowIndex;
      let kolumna = przy.cellIndex;
      //Prawa
      if (przy.nextElementSibling) {
        table.rows[wiersz].cells[kolumna + 1].classList.add("sasiad");
      }
      //Lewa
      if (przy.previousElementSibling) {
        table.rows[wiersz].cells[kolumna - 1].classList.add("sasiad");
      }
      //Gora
      if (wiersz > 0 && przy.previousSibling) {
        table.rows[wiersz - 1].cells[kolumna].classList.add("sasiad");
      }
      //Dol
      if (wiersz < table.rows.length - 1) {
        table.rows[wiersz + 1].cells[kolumna].classList.add("sasiad");
      }

      //--
      const aktualnaLiczba = przy.textContent; // przepisz zawartość klikniętej komórki do zmiennej
      przy.textContent = pusty.textContent; // przepisz zawartość komórki o klasie "pusty" do klikniętej komórki
      przy.classList.add("pusty");
      przy.classList.remove("cyfra");
      pusty.textContent = aktualnaLiczba;
      pusty.classList.add("cyfra");
      pusty.classList.remove("pusty");
      sprawdz();
    }
  });
});
//------------------------Sprawdzenie wyniku
let sprawdz = function () {
  const tabelaG = [];
  const rows = document.querySelectorAll("table.box tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowData = [];
    cells.forEach((cell) => {
      rowData.push(parseInt(cell.innerText));
    });
    tabelaG.push(rowData);
  });

  //tworzenie tabeli 5x5 z liczbamki od 1-25 po kolei
  let tabela = [];

  const wiersze = 5;
  const kolumny = 5;

  for (let i = 0; i < wiersze; i++) {
    tabela[i] = [];
    for (let j = 0; j < kolumny; j++) {
      tabela[i][j] = i * kolumny + j + 1;
    }
  }

  let tabela1 = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 0],
  ];
  porownajTablice(tabelaG, tabela1);

  function porownajTablice(tabelaG, tabela1) {
    if (tabelaG.length !== tabela1.length) {
      return false; // jeśli tablice mają różną długość, nie są takie same
    }

    for (let i = 0; i < tabelaG.length; i++) {
      if (tabelaG[i].length !== tabela1[i].length) {
        return false; // jeśli wewnętrzne tablice mają różną długość, nie są takie same
      }

      for (let j = 0; j < tabelaG[i].length; j++) {
        if (tabelaG[i][j] !== tabela1[i][j]) {
          return false; // jeśli elementy nie są takie same, tablice nie są takie same
        }
      }
    }

    setTimeout(wygrana, 200);
    function wygrana() {
      alert("Brawo!! wygrana");
    }
    return true;
  }
};

//-----------------------------------------------------------------------

//------------------Reset gry z losowaniem:
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let nowy = [];
  const rows = 5;
  const cols = 5;
  let usedNumbers = []; //pomocnicza do losowania niepowtarzalnych liczb

  for (let i = 0; i < rows; i++) {
    let row = []; // dodawane liczby z pętli j w wierszu:

    for (let j = 0; j < cols; j++) {
      // losuj liczbę, dopóki nie znajdziesz unikalnej:
      let randomNumber = Math.floor(Math.random() * 25) + 1;
      while (usedNumbers.indexOf(randomNumber) !== -1) {
        randomNumber = Math.floor(Math.random() * 25) + 1;
      }

      // dodaj liczbę do tablicy pomocniczej i do wiersza:
      usedNumbers.push(randomNumber);
      row.push(randomNumber);
    }

    nowy.push(row);
  }
  // tworzenie nowej tabeli
  let newTable = document.createElement("table");
  newTable.classList.add("box");
  for (let i = 0; i < nowy.length; i++) {
    let newRow = document.createElement("tr");
    for (let j = 0; j < nowy[i].length; j++) {
      let newCell = document.createElement("td");
      newCell.innerHTML = nowy[i][j];
      newRow.appendChild(newCell);
    }
    newTable.appendChild(newRow);
  }

  // zamiana starej tabeli na nową
  table.replaceWith(newTable);

  const cells = document.querySelectorAll("td");
  // przejdź przez każdą komórkę
  cells.forEach((cell) => {
    // sprawdź, czy wartość komórki wynosi 25
    if (cell.innerHTML == 25) {
      // jeśli tak, zmień jej klasę
      cell.classList.add("pusty");
      cell.innerHTML = 0;
    } else {
      cell.classList.add("cyfra");
    }
  });
  //-------------
  let td = [...document.querySelectorAll("td")];
  //------Zawsze definiuje nam nowo stworzoną plansze jaką aktywną teraz:
  table = newTable;
  //---------------------------:::::::::::::::::::::::::::::::::
  //----dodanie sąsiadów obok pustej komórki:

  let pusty = document.querySelector(".pusty");
  let kolumna = pusty.cellIndex;
  let wiersz = pusty.parentNode.rowIndex;
  //Po prawo
  if (pusty.nextElementSibling) {
    pusty.nextElementSibling.classList.add("sasiad");
  }
  //Po lewo
  if (pusty.previousElementSibling) {
    pusty.previousElementSibling.classList.add("sasiad");
  }

  //Góra
  if (wiersz > 0) {
    pusty.parentElement.previousSibling.childNodes[kolumna].classList.add(
      "sasiad"
    );
  }

  //Dol
  if (wiersz < table.rows.length - 1) {
    pusty.parentElement.nextSibling.childNodes[kolumna].classList.add("sasiad");
  }
  //--------------------------:::::::::::::::::::::::::::::::
  //:::::::::::::::::::::::::::::::::::::::
  td.forEach((przy) => {
    przy.addEventListener("click", () => {
      let table = document.querySelector(".box");
      let pusty = document.querySelector(".pusty");
      if (
        przy.classList.contains("cyfra") &&
        przy.classList.contains("sasiad")
      ) {
        //::::::::
        for (const el of td) {
          el.classList.remove("sasiad");
        }
        let wiersz = przy.parentNode.rowIndex;
        let kolumna = przy.cellIndex;
        //Prawa
        if (przy.nextElementSibling) {
          table.rows[wiersz].cells[kolumna + 1].classList.add("sasiad");
        }
        //Lewa
        if (przy.previousElementSibling) {
          table.rows[wiersz].cells[kolumna - 1].classList.add("sasiad");
        }
        //Gora
        if (wiersz > 0) {
          table.rows[wiersz - 1].cells[kolumna].classList.add("sasiad");
        }
        //Dol
        if (wiersz < table.rows.length - 1) {
          table.rows[wiersz + 1].cells[kolumna].classList.add("sasiad");
        }

        //--
        const aktualnaLiczba = przy.textContent; // przepisz zawartość klikniętej komórki do zmiennej
        przy.textContent = pusty.textContent; // przepisz zawartość komórki o klasie "pusty" do klikniętej komórki
        przy.classList.add("pusty");
        przy.classList.remove("cyfra");
        pusty.textContent = aktualnaLiczba;
        pusty.classList.add("cyfra");
        pusty.classList.remove("pusty");
        sprawdz();
      }
    });
  });
});
