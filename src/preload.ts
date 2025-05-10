async function preloadjs(js, callback?) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = js;
    script.onload = () => {
      callback?.();
      resolve(true);
    };
    document.head.appendChild(script);
  });
}

export async function preload() {
  await preloadjs(
    'https://unpkg.luckincdn.com/base64-js@1.5.1/base64js.min.js'
  );
  await preloadjs('https://unpkg.luckincdn.com/sm-crypto@0.3.13/dist/sm2.js');
  await preloadjs('https://unpkg.luckincdn.com/dayjs@1.11.13/dayjs.min.js');
  await preloadjs(
    'https://unpkg.luckincdn.com/dayjs@1.11.13/plugin/customParseFormat.js',
    () => {
      // @ts-ignore
      window.dayjs.extend(window.dayjs_plugin_customParseFormat);
    }
  );

  await preloadjs(
    'https://unpkg.luckincdn.com/dayjs@1.11.13/plugin/isSameOrAfter.js',
    () => {
      // @ts-ignore
      window.dayjs.extend(window.dayjs_plugin_isSameOrAfter);
    }
  );

  await preloadjs(
    'https://unpkg.luckincdn.com/dayjs@1.11.13/plugin/isSameOrBefore.js',
    () => {
      // @ts-ignore
      window.dayjs.extend(window.dayjs_plugin_isSameOrBefore);
    }
  )

}
