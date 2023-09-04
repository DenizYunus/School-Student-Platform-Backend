const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { extractUserData, extractTopAnnouncements } = require("./globals");

const SECRET = '97D47E8524D48D8AAD8DDE5EF5D1E'; // Change this to a strong secret key

const app = express();

app.use(cors());
app.use(express.json());

puppeteer.use(StealthPlugin());

const userBrowsers = {};

app.post("/init", async (req, res) => {
  // Since init is a user-specific action, it's moved into the login
  res.status(400).send("Endpoint deprecated, please use /login");
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Request came with: " + username + ", " + password)

    const browser = await puppeteer.launch({ headless: "new" });
    let page;
    
    page = await browser.newPage();
    await page.goto("https://ubis.aydin.edu.tr/");
    await page.waitForNavigation();

    await page.goto("https://ubis.aydin.edu.tr/?Pointer=Login&");

    // Fill in the login form
    await page.type('input[name="lgnUserName"]', username);
    await page.type('input[name="lgnPassword"]', password);

    // Click the submit button
    await page.click('input[name="loginSubmit"]');

    await page.goto("https://ubis.aydin.edu.tr/?Pointer=Main&");

    const userData = await extractUserData(page);

    // Create a token and store the browser instance
    const token = jwt.sign({ username }, SECRET);
    userBrowsers[token] = { browser, page };

    res.json({ userData, token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

app.get("/get-announcements", async (req, res) => {
  try {
    const token = req.headers.authorization; // Assuming the token is sent in the Authorization header

    console.log("Request got with JWT: " + token)

    const session = userBrowsers[token];

    if (!session) {
      return res.status(401).send("Unauthorized");
    }

    const { page } = session;

    const announcements = await extractTopAnnouncements(page);

    res.json(announcements);
    console.log(announcements);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

app.post("/get-user-info", async (req, res) => {
  try {
    const token = req.headers.authorization; // Assuming the token is sent in the Authorization header

    console.log("Request got with JWT: " + token)

    const session = userBrowsers[token];

    if (!session) {
      return res.status(401).send("Unauthorized");
    }

    const { page } = session;

    const userData = await extractUserData(page);

    res.json(userData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));


// const express = require("express");
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const cors = require("cors");
// const { extractUserData } = require("./globals");

// const app = express();

// app.use(cors());
// app.use(express.json());

// puppeteer.use(StealthPlugin());

// let browser, page;

// app.post("/init", async (req, res) => {
//   const url = "https://ubis.aydin.edu.tr/";

//   browser = await puppeteer.launch({ headless: "new" });
//   browser.on("console", (msg) => console.log("BROWSER:", msg.text()));
//   page = await browser.newPage();

//   await page.goto(url);

//   await page.waitForNavigation();

//   res.send("success");
// });

// app.post("/login", async (req, res) => {
//   try {
//     console.log("enter");
//     const { username, password } = req.body;

//     await page.goto("https://ubis.aydin.edu.tr/?Pointer=Login&");

//     // Fill in the login form
//     await page.type('input[name="lgnUserName"]', username);
//     await page.type('input[name="lgnPassword"]', password);
//     console.log("entered " + username + " " + password);

//     // Click the submit button
//     await page.click('input[name="loginSubmit"]');
//     console.log("clicked submit");

//     await page.goto("https://ubis.aydin.edu.tr/?Pointer=Main&");

//     // Get the page content after login
//     const content = await page.content();

//     const userData = await extractUserData(page);
//     res.json(userData);
//     console.log(userData);

//     console.log("sent content");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Server error");
//   }
// });

// app.listen(5000, () => console.log("Server is running on port 5000"));
