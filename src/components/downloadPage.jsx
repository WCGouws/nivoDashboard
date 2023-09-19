

const onDownload = () => {
    const link = document.createElement("a");
    link.download = `download.html`;
    link.href = "./download.html";
    link.click();
}

export default onDownload;