# UBIS (University Student System) Redesign Express Backend

A modern, user-friendly mobile application for my school, developed using React Native (Expo) and an Express backend powered by Puppeteer for web scraping. You can reach out to Expo app here: [Click Here](https://github.com/DenizYunus/School-Student-Platform-Mobile) 

---

## Features

### Express Backend

- **Puppeteer Integration**: Utilizes headless browsers to scrape the school's website.
- **JWT Authentication**: Securely maps users to their corresponding headless browsers.
- **HTML Parsing**: Extracts necessary information like name, image, announcements, lessons, etc.

### React Native (Expo) Frontend

- **User-Friendly UI**: Enhanced user interface for better user experience.
- **Real-Time Updates**: Fetches the latest data from the backend.
- **Announcements**: Displays the latest school announcements.
- **Lessons Schedule**: Keeps track of the lessons.

---

## How it Works

### Backend

1. **Initialization**: Upon startup, the Express backend initializes headless browsers using Puppeteer.
2. **User Authentication**: JWTs are generated for each user, mapping them to a corresponding browser session.
3. **Data Scraping**: The backend navigates to specific pages on the school's website using the headless browsers.
4. **HTML Parsing**: Extracts the necessary information (name, image, announcements, lessons, etc.) from the scraped HTML.
5. **Data Retrieval**: Sends the parsed data to the React Native frontend via an API endpoint.

### Frontend

1. **User Login**: Users authenticate through the app.
2. **Data Fetching**: Once logged in, the app fetches the data from the Express backend.
3. **Data Display**: Announcements, names, images, and lessons are displayed in a user-friendly interface.

Still Under Development. You can test it's functionality now. Some screens are working atm. Too see the result install the express backend (easy, npm i and node app.js) and run expo app (npx expo start). You can access the UI design here:
[Click Here](https://www.behance.net/gallery/179237463/School-Student-Platform-Redesign)https://www.behance.net/gallery/179237463/School-Student-Platform-Redesign
