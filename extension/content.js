console.log("Extension is running...");

function addDownloadButtons() {
    const videos = document.querySelectorAll('video');
    console.log('Videos found:', videos);

    videos.forEach(video => {
        if (video.parentElement.querySelector('.download-button')) {
            return;
        }

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.className = 'download-button';
        downloadButton.style.position = 'absolute';
        downloadButton.style.top = '10px';
        downloadButton.style.left = '10px';
        downloadButton.style.zIndex = '1000';
        downloadButton.style.backgroundColor = '#FF0000';
        downloadButton.style.color = '#FFFFFF';
        downloadButton.style.border = 'none';
        downloadButton.style.padding = '10px';
        downloadButton.style.cursor = 'pointer';

        video.parentElement.style.position = 'relative';
        video.parentElement.appendChild(downloadButton);

        downloadButton.addEventListener('click', () => {
            const source = video.querySelector('source');
            let videoUrl = '';
            if (source && source.src) {
                videoUrl = source.src;
            } else if (video.src) {
                videoUrl = video.src;
            } else {
                alert('No video source found');
                return;
            }

            // Extract filename from URL
            const urlParts = videoUrl.split('/');
            const m3u8Filename = urlParts[urlParts.length - 1];
            const mp4Filename = m3u8Filename.replace('.m3u8', '.mp4');

            // Change button text to 'Loading...' and disable the button
            downloadButton.textContent = 'Loading...';
            downloadButton.disabled = true;

            fetch('http://localhost:3000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: videoUrl })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    chrome.runtime.sendMessage({
                        action: 'downloadVideo',
                        url: data.downloadUrl,
                        filename: mp4Filename
                    }, response => {
                        if (response.success) {
                            console.log('Download started with ID:', response.downloadId);
                        } else {
                            console.error('Download failed:', response.message);
                            alert('Failed to download video. See console for details.');
                        }
                    });
                } else {
                    alert('Failed to download video');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Failed to fetch video. See console for details.');
            })
            .finally(() => {
                // Revert button text to 'Download' and enable the button
                downloadButton.textContent = 'Download';
                downloadButton.disabled = false;
            });
        });
    });
}

function checkAndAddButtons() {
    setTimeout(() => {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            addDownloadButtons();
        } else {
            document.addEventListener('DOMContentLoaded', addDownloadButtons);
        }
    }, 2000); // Wait 2 seconds
}

checkAndAddButtons();
