# 🚀 Pan.js

PanJS is a light JS framework used at Unreal to quickly develop web applications.

Code functionality includes
* Event Emitters
* Animation Queue using RequestAnimationFrame with Auto cleanup

## Running selenium tests locally (MacOS)

1. Download ChromeDriver from this [Link]("https://chromedriver.storage.googleapis.com/index.html?path=109.0.5414.25/")
2. Open up a terminal and run `sudo nano /etc/paths` and enter the path to the webdriver folder (unzipped), on the last line.
3. Enter `npm run browser-test` in your command line.