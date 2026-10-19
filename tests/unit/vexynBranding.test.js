import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "vitest";

const read = (relativePath) =>
  fs.readFileSync(new URL(relativePath, import.meta.url), "utf8");

test("Vexyn logo artwork is used consistently by web and native branding", () => {
  const logo = read("../../res/vexyn-logo.svg");
  const componentLogo = read("../../src/components/logo/logo.svg");
  const publicLogo = read("../../www/logo.svg");
  const launcherForeground = read("../../res/android/drawable/ic_launcher_foreground.xml");
  const legacyLauncher = read("../../res/android/mipmap-anydpi/ic_launcher.xml");
  const legacyRoundLauncher = read("../../res/android/mipmap-anydpi/ic_launcher_round.xml");
  const launcherBackground = read("../../res/android/values/ic_launcher_background.xml");
  const config = read("../../config.xml");
  const logoStyle = read("../../src/components/logo/style.scss");
  const readme = read("../../readme.md");

  for (const svg of [logo, componentLogo, publicLogo]) {
    assert.match(svg, /<svg\b/);
    assert.match(svg, /fill="#3499FE"/);
    assert.match(svg, /stroke="#451615"/);
    assert.match(svg, /viewBox="0 0 544\.37 452\.63"/);
  }

  assert.equal(componentLogo, logo);
  assert.equal(publicLogo, logo);
  assert.equal((launcherForeground.match(/android:pathData=/g) ?? []).length, 4);
  assert.equal((launcherForeground.match(/android:strokeColor="#451615"/g) ?? []).length, 4);
  assert.match(launcherForeground, /android:fillColor="#3499FE"/);
  assert.match(legacyLauncher, /<vector\\b/);
  assert.match(legacyLauncher, /android:fillColor="#FFFFFF"/);
  assert.match(legacyLauncher, /android:strokeColor="#451615"/);
  assert.equal(
    legacyLauncher.replace(
      '  <path android:fillColor="#FFFFFF" android:pathData="M0,0H544.37V452.63H0Z" />\\n',
      "",
    ),
    launcherForeground,
  );
  assert.equal(legacyRoundLauncher, legacyLauncher);

  for (const density of ["mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"]) {
    assert.equal(
      fs.existsSync(new URL(`../../res/android/mipmap-${density}/ic_launcher.webp`, import.meta.url)),
      false,
      `stale ${density} launcher fallback must not override the Vexyn vector`,
    );
    assert.equal(
      fs.existsSync(new URL(`../../res/android/mipmap-${density}/ic_launcher_round.webp`, import.meta.url)),
      false,
      `stale ${density} round launcher fallback must not override the Vexyn vector`,
    );
  }

  assert.match(launcherBackground, /ic_launcher_background">#FFFFFF/);
  assert.match(launcherBackground, /ic_splash_background">#FFFFFF/);
  assert.match(config, /<preference name="BackgroundColor" value="0xFFFFFFFF"\s*\/>/);
  assert.match(config, /name="AndroidWindowSplashScreenBackground" value="@color\/ic_splash_background"/);
  assert.match(config, /name="AndroidWindowSplashScreenAnimatedIcon"[\s\S]*?res\/android\/drawable\/ic_launcher_foreground\.xml/);

  assert.match(logoStyle, /background-image: url\(\.\/logo\.svg\)/);
  assert.match(readme, /res\/vexyn-logo\.svg/);
});
