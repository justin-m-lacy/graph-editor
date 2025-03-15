let saveLink: string | null = null;

export const makeLink = (json: string, saveName: string) => {

	if (saveLink) URL.revokeObjectURL(saveLink);

	const file = new Blob([json], { type: "text/json;charset=utf-8" });

	const a = document.createElement('a');
	//targ.type = 'text/json';
	a.download = a.title = saveName + '.json';

	saveLink = URL.createObjectURL(file);
	a.href = saveLink;
	a.click();
	a.remove();

}

export const readJsonFile = (fileList: FileList) => {

	const file = fileList[0];
	if (!file) return;

	return new Promise((res, rej) => {

		const reader = new FileReader();
		reader.onload = (e) => {

			try {

				const data = JSON.parse(e.target!.result as string);
				res(data);

			} catch (err: any) {
				console.error(err.message + '\n' + err.stack);
			}

		}
		reader.onerror = (evt) => rej(evt);
		reader.readAsText(file);

	});

}
