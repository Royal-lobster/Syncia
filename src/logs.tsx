const logoText = `
██████╗██╗  ██╗ █████╗ ████████╗    ██████╗  ██████╗  ██████╗██╗  ██╗    ██╗  ██╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝    ██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝    ╚██╗██╔╝
██║     ███████║███████║   ██║       ██║  ██║██║   ██║██║     █████╔╝      ╚███╔╝ 
██║     ██╔══██║██╔══██║   ██║       ██║  ██║██║   ██║██║     ██╔═██╗      ██╔██╗ 
╚██████╗██║  ██║██║  ██║   ██║       ██████╔╝╚██████╔╝╚██████╗██║  ██╗    ██╔╝ ██╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝    ╚═╝  ╚═╝                                                                                                                                 
`;

const msgText = (msg: string) => `\n
${" ".repeat(42 - msg.length / 2)}[${msg}]
`;

export const contentScriptLog = () => {
  console.log(logoText, msgText("Content Script Loaded"));
};

export const backgroundLog = () => {
  console.log(logoText, msgText("Background Loaded"));
};
