async function extractUserData(page) {
    try {
        const nameElement = await page.$x('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div/table/tbody/tr[1]/td[2]/b');
        const name = await page.evaluate(element => element.textContent.trim(), nameElement[0]);

        const studentNumberElement = await page.$x('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div/table/tbody/tr[1]/td[2]');
        const studentNumberText = await page.evaluate(element => element.textContent.trim(), studentNumberElement[0]);
        const studentNumber = studentNumberText.replace(name, "").trim();

        const emailElement = await page.$x('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div/table/tbody/tr[2]/td');
        const email = await page.evaluate(element => element.textContent.trim(), emailElement[0]);

        const profilePicElement = await page.$x('/html/body/div[2]/div/div/div[1]/div/div[1]/div/div/table/tbody/tr[1]/td[1]/img');
        
        // Take a screenshot of the profile picture
        const profilePicBuffer = await profilePicElement[0].screenshot();
        const base64Image = profilePicBuffer.toString('base64');
        
        return { name, studentNumber, email, base64Image };
    } catch (error) {
        console.error("Extraction error:", error);
        throw error;
    }
}

async function extractTopAnnouncements(page) {
    try {
        let announcements = [];

        const types = ['General', 'Department', 'Course'];
        for (let i = 2; i <= 4; i++) {
            const type = types[i - 2];
            const announcementXPath = `/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div[2]/table/tbody/tr[${i}]/td[2]/a`;
            const dateXPath = `/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div[2]/table/tbody/tr[${i}]/td[3]/time`;

            const announcementElement = await page.$x(announcementXPath);
            const announcement = await page.evaluate(element => element.textContent.trim(), announcementElement[0]);

            const dateElement = await page.$x(dateXPath);
            const date = await page.evaluate(element => element.textContent.trim(), dateElement[0]);

            announcements.push({ announcement, date, type });
        }

        return announcements;
    } catch (error) {
        console.error("Extraction error:", error);
        throw error;
    }
}


// async function extractTopAnnouncements(page) {
//     try {
//       let announcements = [];
  
//       for (let i = 2; i <= 4; i++) {
//         const announcementXPath = `/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div[2]/table/tbody/tr[${i}]/td[2]/a`;
//         const dateXPath = `/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div[2]/div[2]/table/tbody/tr[${i}]/td[3]/time`;
  
//         const announcementElement = await page.$x(announcementXPath);
//         const announcement = await page.evaluate(element => element.textContent.trim(), announcementElement[0]);
  
//         const dateElement = await page.$x(dateXPath);
//         const date = await page.evaluate(element => element.textContent.trim(), dateElement[0]);
  
//         announcements.push({ announcement, date });
//       }
  
//       return announcements;
//     } catch (error) {
//       console.error("Extraction error:", error);
//       throw error;
//     }
// }
  
module.exports = { extractUserData, extractTopAnnouncements };