
const TOTAL_ROWS: number = 8;
const TOTAL_COLS: number = 10;

/**
 * 1. Inicializa una matriz de asientos (arreglo bidimensional) de 8 filas y 10 columnas.
 * Todos los asientos comienzan disponibles con el valor 0.
 */
function initializeCinemaHall(rows: number = TOTAL_ROWS, cols: number = TOTAL_COLS): number[][] {
  const hall: number[][] = [];

  for (let row: number = 0; row < rows; row++) {
    const currentRow: number[] = [];
    for (let col: number = 0; col < cols; col++) {
      currentRow.push(0);
    }
    hall.push(currentRow);
  }

  return hall;
}

/**
 * 2. Muestra el estado actual de la sala imprimiendo la matriz en la consola.
 * Usa 'L' para asientos libres (0) y 'X' para asientos ocupados (1),
 * incluyendo los números de fila y columna para identificar cada posición.
 */
function displayCinemaHall(hall: number[][]): void {
  console.log("\n==========================================");
  console.log("                S C R E E N              ");
  console.log("==========================================");

  // Construir encabezado con los números de columna (0 al 9)
  let columnHeader: string = "       ";
  for (let col: number = 0; col < hall[0].length; col++) {
    columnHeader += `${col}  `;
  }
  console.log(columnHeader);
  console.log("     -------------------------------------");

  // Recorrer cada fila y columna para mostrar 'L' (libre) o 'X' (ocupado)
  for (let row: number = 0; row < hall.length; row++) {
    let rowText: string = `Fila ${row} | `;
    for (let col: number = 0; col < hall[row].length; col++) {
      if (hall[row][col] === 1) {
        rowText += "X  ";
      } else {
        rowText += "L  ";
      }
    }
    console.log(rowText);
  }

  console.log("     -------------------------------------");
  console.log("     Leyenda: [L] Libre (0) | [X] Ocupado (1)\n");
}

/**
 * 3. Reserva un asiento dado un número de fila y un número de columna.
 * Valida que la posición exista y comprueba si el asiento ya está ocupado (1)
 * antes de cambiar su valor de 0 a 1. Devuelve un mensaje claro del resultado.
 */
function reserveSeat(hall: number[][], row: number, col: number): string {
  // Validar que la fila y columna estén dentro de los límites de la sala
  if (row < 0 || row >= hall.length || col < 0 || col >= hall[0].length) {
    const outOfBoundsMsg: string = `Error: La posición (Fila ${row}, Columna ${col}) está fuera de los límites de la sala.`;
    console.log(outOfBoundsMsg);
    return outOfBoundsMsg;
  }

  // Validar si el asiento está disponible (0) u ocupado (1)
  if (hall[row][col] === 0) {
    hall[row][col] = 1;
    const successMsg: string = `Reserva confirmada: El asiento en la Fila ${row}, Columna ${col} ha sido reservado con éxito.`;
    console.log(successMsg);
    return successMsg;
  } else {
    const occupiedMsg: string = `Operación fallida: El asiento en la Fila ${row}, Columna ${col} ya se encuentra ocupado.`;
    console.log(occupiedMsg);
    return occupiedMsg;
  }
}

/**
 * 4. Cuenta y devuelve cuántos asientos están disponibles y cuántos están ocupados
 * en toda la sala. Devuelve una tupla (arreglo) [disponibles, ocupados].
 */
function countSeats(hall: number[][]): [number, number] {
  let availableCount: number = 0;
  let occupiedCount: number = 0;

  for (let row: number = 0; row < hall.length; row++) {
    for (let col: number = 0; col < hall[row].length; col++) {
      if (hall[row][col] === 1) {
        occupiedCount++;
      } else {
        availableCount++;
      }
    }
  }

  const totalSeats: number = availableCount + occupiedCount;
  // Metadatos adicionales en texto JSON siguiendo la restricción de no usar objetos en el código
  const metadataJson: string = `{"disponibles":${availableCount},"ocupados":${occupiedCount},"total":${totalSeats}}`;

  console.log(
    `Resumen de la sala -> Disponibles (L): ${availableCount} | Ocupados (X): ${occupiedCount} | JSON: ${metadataJson}`
  );

  return [availableCount, occupiedCount];
}

/**
 * 5. Funcionalidad avanzada: Busca dos asientos libres contiguos horizontalmente
 * (en la misma fila) y devuelve sus posiciones como un arreglo bidimensional:
 * [[fila, col1], [fila, col2]].
 * Si hay varios pares, devuelve el primero. Si no hay ninguno, devuelve [] e informa.
 */
function findAdjacentSeats(hall: number[][]): number[][] {
  for (let row: number = 0; row < hall.length; row++) {
    for (let col: number = 0; col < hall[row].length - 1; col++) {
      if (hall[row][col] === 0 && hall[row][col + 1] === 0) {
        const pairPositions: number[][] = [
          [row, col],
          [row, col + 1],
        ];
        console.log(
          `¡Asientos contiguos encontrados! Primer par disponible en Fila ${row}, Columnas ${col} y ${col + 1} -> Posiciones: [${row}, ${col}] y [${row}, ${col + 1}].`
        );
        return pairPositions;
      }
    }
  }

  console.log(
    "No hay dos asientos libres contiguos disponibles en ninguna fila de la sala."
  );
  return [];
}

// ============================================================================
// FUNCIONES AUXILIARES PARA CARGAR ESCENARIOS DE PRUEBA
// ============================================================================

/**
 * Configura la matriz con un escenario de sala parcialmente ocupada
 * (basado en el mapa de ejemplo del reto).
 */
function loadPartiallyOccupiedScenario(): number[][] {
  const hall: number[][] = initializeCinemaHall();
  const occupiedCoordinates: number[][] = [
    [0, 1], [0, 4], [0, 5], [0, 8],
    [1, 0], [1, 3], [1, 6], [1, 7], [1, 9],
    [2, 2], [2, 4], [2, 8],
    [3, 1], [3, 5], [3, 6], [3, 9],
    [4, 0], [4, 3], [4, 5], [4, 7],
    [5, 2], [5, 5], [5, 6], [5, 8], [5, 9],
    [6, 1], [6, 4], [6, 6],
    [7, 0], [7, 3], [7, 7], [7, 8],
  ];

  for (let i: number = 0; i < occupiedCoordinates.length; i++) {
    const row: number = occupiedCoordinates[i][0];
    const col: number = occupiedCoordinates[i][1];
    hall[row][col] = 1;
  }

  return hall;
}

/**
 * Configura la matriz como una sala casi llena donde solo quedan asientos sueltos
 * (ningún par contiguo horizontal disponible).
 */
function loadSingleSeatsOnlyScenario(): number[][] {
  const hall: number[][] = initializeCinemaHall();

  for (let row: number = 0; row < hall.length; row++) {
    for (let col: number = 0; col < hall[row].length; col++) {
      // Dejamos libre solo cuando la columna es par y la fila coincide en paridad,
      // garantizando que jamás existan dos ceros seguidos en la misma fila.
      if ((row + col) % 2 === 0 && col % 3 === 0) {
        hall[row][col] = 0;
      } else {
        hall[row][col] = 1;
      }
    }
  }

  return hall;
}

/**
 * Configura la matriz con todos los asientos ocupados (sala completamente llena).
 */
function loadFullHallScenario(): number[][] {
  const hall: number[][] = initializeCinemaHall();

  for (let row: number = 0; row < hall.length; row++) {
    for (let col: number = 0; col < hall[row].length; col++) {
      hall[row][col] = 1;
    }
  }

  return hall;
}

// ============================================================================
// PRUEBAS Y SALIDA POR CONSOLA (LOS 4 ESCENARIOS SOLICITADOS)
// ============================================================================

/**
 * Ejecuta en la consola las pruebas de los 4 escenarios requeridos en el proyecto.
 */
function runConsoleTests(): void {
  console.log("************************************************************");
  console.log("      INICIANDO PRUEBAS DE CONSOLA - CINEMA SEAT MANAGER    ");
  console.log("************************************************************\n");

  // --------------------------------------------------------------------------
  // ESCENARIO 1: Sala vacía (todos los asientos disponibles)
  // --------------------------------------------------------------------------
  console.log("🔹 ESCENARIO 1: SALA VACÍA (Todos los asientos disponibles)");
  const emptyHall: number[][] = initializeCinemaHall();
  displayCinemaHall(emptyHall);
  countSeats(emptyHall);
  findAdjacentSeats(emptyHall);

  // --------------------------------------------------------------------------
  // ESCENARIO 2: Sala parcialmente ocupada + Pruebas de reserva y validación
  // --------------------------------------------------------------------------
  console.log("\n------------------------------------------------------------");
  console.log("🔹 ESCENARIO 2: SALA PARCIALMENTE OCUPADA");
  const partialHall: number[][] = loadPartiallyOccupiedScenario();
  displayCinemaHall(partialHall);
  countSeats(partialHall);

  console.log("\n--- Probando reservas y validaciones en la sala parcial ---");
  // Reservar un asiento libre (Fila 0, Columna 0)
  reserveSeat(partialHall, 0, 0);
  // Intentar reservar el mismo asiento ya ocupado (Fila 0, Columna 0)
  reserveSeat(partialHall, 0, 0);
  // Intentar reservar otro asiento ocupado de fábrica (Fila 0, Columna 1)
  reserveSeat(partialHall, 0, 1);
  // Intentar reservar un asiento fuera de rango (Fila 9, Columna 12)
  reserveSeat(partialHall, 9, 12);

  console.log("\n--- Estado actualizado tras las reservas y búsqueda de par contiguo ---");
  displayCinemaHall(partialHall);
  countSeats(partialHall);
  findAdjacentSeats(partialHall);

  // --------------------------------------------------------------------------
  // ESCENARIO 3: Sala casi llena con solo asientos sueltos disponibles
  // --------------------------------------------------------------------------
  console.log("\n------------------------------------------------------------");
  console.log("🔹 ESCENARIO 3: SALA CASI LLENA (Solo asientos sueltos, sin pares contiguos)");
  const singleSeatsHall: number[][] = loadSingleSeatsOnlyScenario();
  displayCinemaHall(singleSeatsHall);
  countSeats(singleSeatsHall);
  findAdjacentSeats(singleSeatsHall);

  // --------------------------------------------------------------------------
  // ESCENARIO 4: Sala completamente llena (sin asientos disponibles)
  // --------------------------------------------------------------------------
  console.log("\n------------------------------------------------------------");
  console.log("🔹 ESCENARIO 4: SALA COMPLETAMENTE LLENA (Sin asientos disponibles)");
  const fullHall: number[][] = loadFullHallScenario();
  displayCinemaHall(fullHall);
  countSeats(fullHall);
  reserveSeat(fullHall, 3, 2);
  findAdjacentSeats(fullHall);

  console.log("\n************************************************************");
  console.log("      FIN DE LAS PRUEBAS EN CONSOLA                         ");
  console.log("************************************************************\n");
}

// Ejecutar las pruebas de consola siempre (tanto en terminal como en navegador)
runConsoleTests();

// ============================================================================
// RETO EXTRA (OPCIONAL): INTERFAZ WEB INTERACTIVA CON HTML Y TAILWIND CSS
// Se ejecuta únicamente si estamos en el navegador (guarda typeof document)
// ============================================================================

/**
 * Inicializa y renderiza la interfaz gráfica en el navegador si existe el DOM.
 */
function initWebInterface(): void {
  if (typeof document === "undefined") {
    return;
  }

  const gridContainer = document.getElementById("seat-grid");
  const colHeadersContainer = document.getElementById("col-headers");
  const availableBadge = document.getElementById("available-count");
  const occupiedBadge = document.getElementById("occupied-count");
  const statusBanner = document.getElementById("status-message");

  if (!gridContainer || !colHeadersContainer || !availableBadge || !occupiedBadge || !statusBanner) {
    return;
  }

  // Estado principal de la interfaz web: matriz 8x10 y par resaltado [[r, c1], [r, c2]]
  let currentWebHall: number[][] = loadPartiallyOccupiedScenario();
  let highlightedPair: number[][] = [];

  /**
   * Comprueba si una coordenada (row, col) forma parte del par contiguo resaltado.
   */
  function isSeatHighlighted(row: number, col: number): boolean {
    for (let i: number = 0; i < highlightedPair.length; i++) {
      if (highlightedPair[i][0] === row && highlightedPair[i][1] === col) {
        return true;
      }
    }
    return false;
  }

  /**
   * Actualiza el mensaje de estado en la interfaz web.
   */
  function updateBanner(message: string, tone: string): void {
    if (!statusBanner) return;
    statusBanner.textContent = message;

    if (tone === "success") {
      statusBanner.className =
        "mb-6 p-4 rounded-xl border text-sm font-medium bg-emerald-50 border-emerald-300 text-emerald-800 transition-all";
    } else if (tone === "warning") {
      statusBanner.className =
        "mb-6 p-4 rounded-xl border text-sm font-medium bg-amber-50 border-amber-300 text-amber-900 transition-all";
    } else if (tone === "error") {
      statusBanner.className =
        "mb-6 p-4 rounded-xl border text-sm font-medium bg-rose-50 border-rose-300 text-rose-800 transition-all";
    } else {
      statusBanner.className =
        "mb-6 p-4 rounded-xl border text-sm font-medium bg-slate-100 border-slate-300 text-slate-700 transition-all";
    }
  }

  /**
   * Dibuja los encabezados de columna y la cuadrícula 8x10 de asientos en pantalla.
   */
  function renderWebHall(): void {
    if (!gridContainer || !colHeadersContainer || !availableBadge || !occupiedBadge) {
      return;
    }

    // 1. Renderizar encabezados de columna (0 a 9)
    colHeadersContainer.innerHTML = "";
    const emptyCorner = document.createElement("div");
    emptyCorner.className = "w-8 h-8 flex items-center justify-center";
    colHeadersContainer.appendChild(emptyCorner);

    for (let col: number = 0; col < TOTAL_COLS; col++) {
      const colLabel = document.createElement("div");
      colLabel.className = "w-10 h-8 flex items-center justify-center text-xs font-bold text-slate-400";
      colLabel.textContent = String(col);
      colHeadersContainer.appendChild(colLabel);
    }

    // 2. Renderizar las 8 filas con sus 10 asientos cada una
    gridContainer.innerHTML = "";

    for (let row: number = 0; row < currentWebHall.length; row++) {
      const rowWrapper = document.createElement("div");
      rowWrapper.className = "flex items-center justify-center gap-2";

      // Etiqueta del número de fila (0 a 7)
      const rowLabel = document.createElement("div");
      rowLabel.className = "w-8 h-10 flex items-center justify-center text-xs font-bold text-slate-400";
      rowLabel.textContent = String(row);
      rowWrapper.appendChild(rowLabel);

      // Botones de cada asiento en la fila
      for (let col: number = 0; col < currentWebHall[row].length; col++) {
        const seatValue: number = currentWebHall[row][col];
        const seatBtn = document.createElement("button");
        seatBtn.type = "button";
        seatBtn.title = `Fila ${row}, Columna ${col}`;

        if (seatValue === 1) {
          seatBtn.textContent = "X";
          seatBtn.className =
            "w-10 h-10 rounded-lg border-2 border-rose-300 bg-rose-50 text-rose-700 font-bold text-sm flex items-center justify-center cursor-not-allowed opacity-90 transition hover:bg-rose-100";
        } else if (isSeatHighlighted(row, col)) {
          seatBtn.textContent = "L";
          seatBtn.className =
            "w-10 h-10 rounded-lg border-2 border-amber-500 bg-amber-200 text-amber-950 font-extrabold text-sm flex items-center justify-center shadow-md ring-2 ring-amber-400 animate-pulse cursor-pointer transition transform hover:scale-105";
        } else {
          seatBtn.textContent = "L";
          seatBtn.className =
            "w-10 h-10 rounded-lg border-2 border-emerald-400 bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center cursor-pointer transition transform hover:scale-105 hover:bg-emerald-100";
        }

        // Evento clic para reservar el asiento usando la función principal reserveSeat()
        seatBtn.addEventListener("click", () => {
          highlightedPair = [];
          const wasAvailable: boolean = currentWebHall[row][col] === 0;
          const resultMessage: string = reserveSeat(currentWebHall, row, col);

          if (wasAvailable) {
            updateBanner(resultMessage, "success");
          } else {
            updateBanner(resultMessage, "error");
          }

          renderWebHall();
        });

        rowWrapper.appendChild(seatBtn);
      }

      gridContainer.appendChild(rowWrapper);
    }

    // 3. Actualizar contadores usando la función principal countSeats()
    const counts: [number, number] = countSeats(currentWebHall);
    availableBadge.textContent = String(counts[0]);
    occupiedBadge.textContent = String(counts[1]);
  }

  // Conectar botones de control de la interfaz web
  const btnFindAdjacent = document.getElementById("btn-find-adjacent");
  const btnScenarioEmpty = document.getElementById("btn-scenario-empty");
  const btnScenarioPartial = document.getElementById("btn-scenario-partial");
  const btnScenarioSingle = document.getElementById("btn-scenario-single");
  const btnScenarioFull = document.getElementById("btn-scenario-full");

  if (btnFindAdjacent) {
    btnFindAdjacent.addEventListener("click", () => {
      const pair: number[][] = findAdjacentSeats(currentWebHall);
      highlightedPair = pair;

      if (pair.length === 2) {
        updateBanner(
          `Par contiguo encontrado en la Fila ${pair[0][0]}, Columnas ${pair[0][1]} y ${pair[1][1]} (resaltados en amarillo). ¡Haz clic sobre ellos para reservarlos!`,
          "warning"
        );
      } else {
        updateBanner(
          "No hay dos asientos libres contiguos disponibles en ninguna fila de la sala.",
          "error"
        );
      }

      renderWebHall();
    });
  }

  if (btnScenarioEmpty) {
    btnScenarioEmpty.addEventListener("click", () => {
      currentWebHall = initializeCinemaHall();
      highlightedPair = [];
      updateBanner(" Escenario cargado: Sala vacía (80 asientos libres).", "info");
      renderWebHall();
    });
  }

  if (btnScenarioPartial) {
    btnScenarioPartial.addEventListener("click", () => {
      currentWebHall = loadPartiallyOccupiedScenario();
      highlightedPair = [];
      updateBanner("Escenario cargado: Sala parcialmente ocupada.", "info");
      renderWebHall();
    });
  }

  if (btnScenarioSingle) {
    btnScenarioSingle.addEventListener("click", () => {
      currentWebHall = loadSingleSeatsOnlyScenario();
      highlightedPair = [];
      updateBanner(
        "Escenario cargado: Sala casi llena (solo asientos sueltos, sin pares contiguos).",
        "warning"
      );
      renderWebHall();
    });
  }

  if (btnScenarioFull) {
    btnScenarioFull.addEventListener("click", () => {
      currentWebHall = loadFullHallScenario();
      highlightedPair = [];
      updateBanner("Escenario cargado: Sala completamente llena (0 asientos disponibles).", "error");
      renderWebHall();
    });
  }

  // Renderizado inicial al abrir la página
  renderWebHall();
}

initWebInterface();