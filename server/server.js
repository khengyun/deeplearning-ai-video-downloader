const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;
    const outputPath = 'video.mp4';
    console.log(`Received URL: ${videoUrl}`);

    // Validate URL
    if (!videoUrl || !videoUrl.endsWith('.m3u8')) {
        console.error('Invalid URL:', videoUrl);
        return res.json({ success: false, message: 'Invalid URL' });
    }

    // Ensure the output file does not already exist
    if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
    }

    // Download and convert m3u8 to mp4 using ffmpeg
    const ffmpegCommand = `ffmpeg -i "${videoUrl}" -c copy ${outputPath}`;
    console.log(`Executing command: ${ffmpegCommand}`);

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.json({ success: false, message: 'Failed to convert video' });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);

        if (fs.existsSync(outputPath)) {
            // Provide the download URL for the converted video
            res.json({ success: true, downloadUrl: `http://localhost:3000/${outputPath}` });
        } else {
            console.error('Conversion failed, output file not found');
            res.json({ success: false, message: 'Failed to convert video' });
        }
    });
});

app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
