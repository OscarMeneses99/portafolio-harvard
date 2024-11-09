import { launch } from "puppeteer";
import path from "path";

(async () => {
  const browser = await launch({
    executablePath: path.resolve(
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    ), // Ruta a Edge
    headless: true, // Ejecutar en modo sin cabeza (sin UI)
    defaultViewport: null, // Opcional, para que se adapte al tamaño de la pantalla
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:4321", { waitUntil: "networkidle0" });
  await page.pdf({ path: "portafolio.pdf", format: "A4" });

  await browser.close();
})();
