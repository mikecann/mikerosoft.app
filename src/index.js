export default {
	async fetch(request, env, ctx) {
		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mike-rosoft</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(90deg, #0078D4, #00bcf2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p {
            font-size: 1.2rem;
            color: #a0a0a0;
            max-width: 600px;
            line-height: 1.5;
        }
        .container {
            padding: 3rem;
            border: 1px solid #333;
            border-radius: 12px;
            background-color: #222;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
        a {
            color: #00bcf2;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>mikerosoft.app</h1>
        <p>A collection of personalised tools for Windows users.</p>
        <p><a href="https://github.com/mikecann/mikerosoft" target="_blank" rel="noopener">View on GitHub</a></p>
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
