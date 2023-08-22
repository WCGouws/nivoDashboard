

const onDownload = () => {
    const link = document.createElement("a");
    link.download = `download.pdf`;
    link.href = "./download.pdf";
    link.click();
}

export default onDownload;