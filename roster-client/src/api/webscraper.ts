/**
 * Since the class roster API only allows searches if both the semester
 * and subject are included, any searches not including the subject must
 * be webscraped
 */

const pptr = require('puppeteer');

export const getClasses = async (url: string) => {
  const browser = await pptr.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const classes = await page.evaluate(() => {
    const list = document.querySelector(".class-listing");

    return list;
  });

  return classes;
}