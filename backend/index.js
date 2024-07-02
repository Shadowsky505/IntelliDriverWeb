const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "automotive_chatbot",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

const openai = new OpenAI({
  apiKey: "sk-proj-wvAWb5RhCQMiWUp6d9NET3BlbkFJsbzIAqurMAYpW3jKbDvj",
});

function generateToken(email) {
  return jwt.sign({ email: email }, "secret_key", { expiresIn: "1h" });
}

app.get('/logout', (req, res) => {
  return jwt.destroy(token);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const checkEmailQuery = "SELECT email FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], async (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      return res.status(400).send({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      const token = generateToken(email);
      res.send({ message: "User registered successfully!", token: token });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password); // Comparar la contraseña encriptada
      if (passwordMatch) {
        const token = generateToken(email);
        res.send({
          message: "Login successful!",
          token: token,
          username: user.username,
        });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  });
});

app.get('/dtcs', (req, res) => {
  const query = 'SELECT code FROM dtc_codes';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    const dtcs = results.map(result => result.code);
    console.log("DTCs:", dtcs);
    res.send(dtcs);
  });
});


app.post("/openai", async (req, res) => {
  const { message } = req.body;
  console.log("Message:", message);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
          Eres un asistente del sector automotríz que solo respondes en este forma:
Formato de Respuesta Estructurado para el Asistente de IA
Código DTC (si aplica):

Este campo identifica el código o la clave del problema específico.
Descripción del Problema:

Aquí se proporciona una explicación clara y concisa del problema que el usuario está enfrentando.
Posibles Soluciones:

Se enumeran las soluciones potenciales para resolver el problema identificado.
Evaluación en Base al Contexto:

Se evalúa la pertinencia y aplicabilidad de cada solución con respecto al contexto particular del usuario o del problema.

El mensaje lo envías entre etiquetas html bold, y con uso de etiquetas html para dar formato a la respuesta en saltos de linea.
          
EJEMPLO:
Formato de Respuesta Estructurado para el Asistente de IA
Es obligatoio que coloques las etiquetas de <br> para dar formato a la respuesta.

<b>Código DTC (si aplica): P0120 </b>

<b> Descripción del Problema: </b> El código de diagnóstico P0120 indica un problema con el sensor de posición del acelerador. <br>

<b>Posibles Soluciones: </b><br>
1. Reemplazar el sensor de posición del acelerador.<br>
2. Verificar y reparar cualquier cableado o conexión suelta.<br>
3. Realizar una reprogramación o calibración del sensor de posición del acelerador.<br>

<b>Evaluación en Base al Contexto:</b><br>
Es importante verificar el estado del sensor y del cableado antes de reemplazarlo. Si el sensor está defectuoso, entonces la solución más efectiva será su reemplazo. Se recomienda también contar con un escáner de diagnóstico para borrar el código de error una vez que se haya solucionado el problema.
          `,
        },
        { role: "user", content: message },
      ],
    });

    const botMessage = completion.choices[0].message.content;
    res.send({ botMessage });
  } catch (error) {
    console.error("Error in /openai:", error);
    res.status(500).send({ message: "Error in communication with the bot" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
