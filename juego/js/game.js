const questions = [
    { question: "¿Qué es una base de datos?", options: ["Un conjunto organizado de datos", "Un archivo de texto", "Un sistema de archivos", "Una hoja de cálculo"], answer: 0 },
    { question: "¿Qué característica clave tienen las bases de datos relacionales?", options: ["Se organizan en tablas con relaciones", "No tienen estructura", "Solo permiten texto", "Son estáticas"], answer: 0 },
    { question: "¿Qué garantiza la integridad referencial en una base de datos?", options: ["Que las relaciones entre tablas sean válidas", "Reducir el tamaño de la base de datos", "Aumentar la redundancia", "Evitar consultas complejas"], answer: 0 },
    { question: "¿Qué es un sistema gestor de bases de datos?", options: ["Un software para administrar bases de datos", "Un documento con datos", "Un tipo de tabla", "Un diagrama de red"], answer: 0 },
    { question: "¿Qué es la redundancia mínima en bases de datos?", options: ["Evitar duplicación innecesaria de datos", "Tener muchas copias de seguridad", "Borrar todos los datos", "No permitir múltiples accesos"], answer: 0 },
    { question: "¿Qué significa acceso concurrente?", options: ["Varios usuarios acceden a la base de datos al mismo tiempo", "Un solo usuario accede", "La base de datos se bloquea", "No se permite modificar datos"], answer: 0 },
    { question: "¿Qué es la seguridad en bases de datos?", options: ["Protección contra accesos no autorizados", "Un sistema de contraseñas", "Eliminar datos regularmente", "Respaldar información"], answer: 0 },
    { question: "¿Para qué sirve el respaldo y recuperación de datos?", options: ["Proteger información ante fallos", "Eliminar datos innecesarios", "Optimizar consultas", "Reducir tamaño de la base"], answer: 0 },
    { question: "¿Qué es SQL?", options: ["Un lenguaje de consulta de bases de datos", "Un sistema operativo", "Un tipo de hardware", "Una metodología de desarrollo"], answer: 0 },
    { question: "¿Qué ventaja tiene una base de datos NoSQL?", options: ["Escalabilidad y flexibilidad", "Mayor rigidez", "Menos seguridad", "Mayor redundancia"], answer: 0 }
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const messageElement = document.getElementById("message");
const gameDiv = document.getElementById("game");
const introDiv = document.getElementById("intro");
const retryDiv = document.getElementById("retry");

document.getElementById("startYes").onclick = startGame;
document.getElementById("startNo").onclick = () => window.location = '/index.html';
document.getElementById("retryYes").onclick = startGame;
document.getElementById("retryNo").onclick = () => window.location = '/index.html';

function startGame() {
    currentQuestionIndex = 0;
    introDiv.classList.add("hidden");
    retryDiv.classList.add("hidden");
    gameDiv.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        let q = questions[currentQuestionIndex];
        questionElement.textContent = q.question;
        let shuffledOptions = q.options.map((option, index) => ({ option, index })).sort(() => Math.random() - 0.5);
        optionsElement.innerHTML = "";
        shuffledOptions.forEach(({ option, index }) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => checkAnswer(index);
            optionsElement.appendChild(button);
        });
        messageElement.textContent = "";
    } else {
        questionElement.textContent = "¡Felicidades! Ahora sabes todo lo que nosotros sabemos.";
        optionsElement.innerHTML = "";
        // Crear botón para salir
        const exitButton = document.createElement("button");
        exitButton.textContent = "Salir";
        exitButton.onclick = () => window.location = '/index.html';
        optionsElement.appendChild(exitButton);
    }
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].answer) {
        currentQuestionIndex++;
        setTimeout(loadQuestion, 1000);
    } else {
        messageElement.textContent = "Incorrecto. Has perdido.";
        gameDiv.classList.add("hidden");
        retryDiv.classList.remove("hidden");
    }
}