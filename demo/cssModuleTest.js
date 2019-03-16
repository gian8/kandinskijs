var expect = require("chai").expect;
const kisk = require("../src/kandinski");
const cssHelper = require("../src/cssHelper");

describe("h2 css test", function () {
  let page;

  const url = "http://localhost:4000";
  const cssPath = "demo/base.css";

  before(async function () {
    await kisk.init(url, cssPath);
  });

  after(async function () {
    await kisk.destroy();
  });

  context("mobile viewport", function () {
    before(async function () {
      this.timeout(1000000);
      page = await kisk.getPage({ width: 320, height: 1 });
    });
    after(async function () {
      await page.close();
    });
  });

  context("tablet viewport", function () {
    before(async function () {
      this.timeout(1000000);
      page = await kisk.getPage({ width: 768, height: 1 });
    });
    after(async function () {
      await page.close();
    });

    it("h2 should have a display: flex", async function () {
      const display = await kisk.getCSSProperty(page, "h2", "display");

      expect(display).to.eql("flex");
    });
  });

  context("desktop viewport", function () {
    before(async function () {
      this.timeout(1000000);
      page = await kisk.getPage({ width: 1024, height: 1 });
      //await page.screenshot({ path: 'page.png' })
    });
    after(async function () {
      await page.close();
    });

    it("h2 should have a display: block", async function () {
      const display = await kisk.getCSSProperty(page, "h2", "display");

      expect(display).to.eql("block");
    });

    it("should have a heading color rgb", async function () {
      const color = await kisk.getCSSProperty(page, "h2", "color");

      expect(color).to.eql("rgb(255, 255, 255)");
    });

    it("should have a heading color hex", async function () {
      const color = await kisk.getCSSProperty(page, "h2", "color");

      expect(cssHelper.rgbToHex(color)).to.eql("#ffffff");
    });

    it("should have a margin-top: 20px", async function () {
      const marginTop = await kisk.getCSSProperty(page, "h2", "marginTop");

      expect(marginTop).to.eql("20px");
    });

    it("should have a font-size: 64px", async function () {
      const fontSize = await kisk.getCSSProperty(page, "h2", "fontSize");

      expect(fontSize).to.eql("64px");
    });
    it("should have a heading", async function () {
      const HEADING_SELECTOR = "h2";
      const headingText = await kisk.getInnerText(page, HEADING_SELECTOR);
      expect(headingText).to.eql("Schedule");
    });
  });
});