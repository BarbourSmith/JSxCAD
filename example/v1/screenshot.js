import puppeteer from 'puppeteer';
import fs from 'fs';

export const screenshot = async (html, { width, height }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 2048 });
  page.on('console', (msg) => console.log(msg.text()));
  page.on('error', (msg) => console.log(msg.text()));
  await page.setContent(html);
  await page.waitForSelector('.notebook.loaded');
  const png = await page.screenshot();
  await browser.close();
  return png;
};
