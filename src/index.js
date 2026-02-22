export default {
	async fetch(request, env, ctx) {
		const tools = [
			{ name: 'transcribe', desc: 'Extract audio from a video and transcribe it via faster-whisper (CUDA with CPU fallback); right-click any video file in Explorer', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/transcribe/icons/film.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/transcribe' },
			{ name: 'vid2md', desc: 'Convert a YouTube URL to a markdown image-link and copy it to clipboard; right-click any .url Internet Shortcut in Explorer', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/vid2md/icons/page_white_link.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/vid2md' },
			{ name: 'removebg', desc: 'Remove the background from an image using rembg / birefnet-portrait; right-click any image file in Explorer', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/removebg/icons/picture.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/removebg' },
			{ name: 'ghopen', desc: 'Open the current repo on GitHub; opens the PR page if on a PR branch; right-click any folder in Explorer', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/ghopen/icons/world_go.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/ghopen' },
			{ name: 'ctxmenu', desc: 'Manage Explorer context menu entries - toggle shell verbs and COM handlers on/off without admin rights', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/ctxmenu/icons/application_form.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/ctxmenu' },
			{ name: 'backup-phone', desc: 'Back up an iPhone over MTP (USB) to a flat folder on disk', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/backup-phone/icons/phone.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/backup-phone' },
			{ name: 'scale-monitor4', desc: 'Toggle Monitor 4 between 200% (normal) and 300% (filming) scaling', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/scale-monitor4/icons/monitor.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/scale-monitor4' },
			{ name: 'taskmon', desc: 'Real-time NET/CPU/GPU/MEM sparklines overlaid on the taskbar', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/taskmon/icons/chart_bar.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/taskmon' },
			{ name: 'voice-type', desc: 'Push-to-talk local voice transcription - hold Right Ctrl, speak, release to paste', icon: 'https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/tools/voice-type/icons/sound.png', url: 'https://github.com/mikecann/mikerosoft/tree/main/tools/voice-type' },
		];

		const toolsHtml = tools.map(t => `
            <div class="tool-card">
                <div class="tool-header">
                    <img src="${t.icon}" alt="${t.name} icon" class="tool-icon" />
                    <h2><a href="${t.url}" target="_blank" rel="noopener">${t.name}</a></h2>
                </div>
                <p>${t.desc}</p>
            </div>
        `).join('');

		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mikerosoft</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0d1117;
            color: #c9d1d9;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 2rem;
            box-sizing: border-box;
        }
        .hero {
            width: 100%;
            max-width: 800px;
            margin-bottom: 2rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            object-fit: cover;
            display: block;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            color: #58a6ff;
        }
        .subtitle {
            font-size: 1.2rem;
            color: #8b949e;
            max-width: 600px;
            text-align: center;
            line-height: 1.5;
            margin: 0 auto;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            width: 100%;
            max-width: 1000px;
        }
        .tool-card {
            background-color: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 1.5rem;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            flex-direction: column;
        }
        .tool-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border-color: #58a6ff;
        }
        .tool-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .tool-icon {
            width: 16px;
            height: 16px;
            image-rendering: pixelated; /* Perfect for 16x16 famfamfam icons */
        }
        .tool-header h2 {
            margin: 0;
            font-size: 1.25rem;
        }
        .tool-card p {
            margin: 0;
            color: #8b949e;
            line-height: 1.5;
            font-size: 0.95rem;
        }
        a {
            color: #58a6ff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <img src="https://cdn.jsdelivr.net/gh/mikecann/mikerosoft@main/website/hero.png" alt="mikerosoft.app hero" class="hero" />
    <div class="header">
        <h1>Mikerosoft</h1>
        <p class="subtitle">A collection of personalised tools for Windows users.<br/>
        <a href="https://github.com/mikecann/mikerosoft" target="_blank" rel="noopener">View the repository on GitHub</a></p>
    </div>
    
    <div class="grid">
        ${toolsHtml}
    </div>
</body>
</html>`;

		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	},
};
