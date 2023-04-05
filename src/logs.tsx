const logoText =
	"   ____ _           " +
	"_     ____          " +
	"   _     __  __\r\n" +
	"  / ___| |__   __ _|" +
	" |_  |  _ \\  ___   " +
	"___| | __ \\ \\/ /\r" +
	"\n" +
	" | |   | '_ \\ / _`" +
	" | __| | | | |/ _ \\" +
	" / __| |/ /  \\  / " +
	"\r\n" +
	" | |___| | | | (_| |" +
	" |_  | |_| | (_) | (" +
	"__|   <   /  \\ \r\n" +
	"  \\____|_| |_|\\__," +
	"_|\\__| |____/ \\___" +
	"/ \\___|_|\\_\\ /_/" +
	"\\_\\\r\n" +
	"                    " +
	"                    " +
	"               ";

const msgText = (msg: string) => `\n${" ".repeat(27 - msg.length / 2)}[${msg}]`;

export const contentScriptLog = () => {
	console.log(logoText, msgText("Content Script Loaded"));
};

export const backgroundLog = () => {
	console.log(logoText, msgText("Background Loaded"));
};
