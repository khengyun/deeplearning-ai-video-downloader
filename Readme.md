# Video Downloader Chrome Extension

This project provides a Chrome extension that allows users to download videos from web pages and convert them to MP4 format. The extension works with m3u8 video streams and uses a Node.js server to handle the conversion process.

## DEMO

[![Screencast](images/Readme/1720594381376.png)](images/Readme/video.mp4)

## Features

- Adds a "Download" button to video elements on web pages.
- Downloads and converts m3u8 streams to MP4 format.
- Uses a Node.js server with `ffmpeg` for conversion.
- Provides a loading state while the video is being processed.
- ![1720594381376](images/Readme/1720594381376.png)

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Google Chrome browser.

## Project Structure

```bash
/project-root
  /server
    Dockerfile
    server.js
    package.json
  /extension
    manifest.json
    background.js
    content.js
  docker-compose.yml
```

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/khengyun/deeplearning-ai-video-downloader.git 
cd deeplearning-ai-video-downloader
```

### 2. Run the Node.js Server

The server is Dockerized, so you can use Docker Compose to run it.

```bash
docker-compose up --build -d
```

### 3. Load the Chrome Extension

* Open Google Chrome and go to `chrome://extensions/`.
* Enable "Developer mode" in the top right corner.
* Click on "Load unpacked" and select the `extension` directory from this repository.

### 4. Using the Extension
* Navigate to a web page with a video element.
* You should see a "Download" button added to the video player.
* Click the "Download" button. The button will display "Loading..." while the video is being processed.
* Once the processing is complete, the video will be downloaded as an MP4 file with the same name as the original m3u8 file.
