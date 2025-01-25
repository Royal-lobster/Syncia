const logoText =
  " ____                   _\n/ ___| _   _ _ __   ___(_) __ _\n\\___ \\| | | | '_ \\ / __| |/ _` |\n ___) | |_| | | | | (__| | (_| |\n|____/ \\__, |_| |_|\\___|_|\\__,_|\n       |___/";

const msgText = (msg: string) => `\n${' '.repeat(14 - msg.length / 2)}[${msg}]`;

export const contentScriptLog = (item: string) => {
  console.log(logoText, msgText(`${item} Script Loaded`));
};

export const backgroundLog = () => {
  console.log(logoText, msgText('Background Loaded'));
};
