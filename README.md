# PitchSearch
This project features a React+Vite frontend that displays 10 pitchers data. It includes data for each of the pitcher's pitch types including data such as pitch type, pitch count, and the average speed, spin, horizontal break, veritcal break, exit velocity, and launch angle. It uses an SQL query to obtain the data from the pitchers database and caches the necessary data into a JSON file for quick access. 

The app displays a clean summary table of all the pitchers data and also puts relevant information into a chart/graph format for visual insights. Underneath each of these displays, is a insights container which holds valuable information from the data being shown above it. 

I have also included a side-by-side analysis feature in which the user is able to select two pitchers at a time and view their data next to each other simultaneously. Just like the single player analysis, there is an insights container underneath the data displaying valuable points between the two selected pitchers. 

---HOW TO RUN---
1. Open Terminal to a folder you want the project in 

2. run "git clone https://github.com/Mgomez1023/PitchSearch.git"

3. run "cd PitchSearch"

4. run "cd frontend"

5. run "npm install"

6. run "npm run dev"

7. Project should now be accessible at localhost server
