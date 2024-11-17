import path from "node:path"
import { launch } from "puppeteer"
;(async () => {
	const browser = await launch({
		executablePath: path.resolve(
			"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
		),
		headless: true,
		defaultViewport: null,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	})

	const page = await browser.newPage()
	await page.goto("http://localhost:4321", { waitUntil: "networkidle0" })

	// Ajustes para generar PDF en una sola página
	const dimensions = await page.evaluate(() => {
		const body = document.body
		return {
			width: `${body.scrollWidth}px`,
			height: "2525px",
		}
	})

	await page.pdf({
		path: "portafolio.pdf",
		width: dimensions.width,
		height: dimensions.height,
		printBackground: true,
	})

	await browser.close()
})()
