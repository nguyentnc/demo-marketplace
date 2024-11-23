export async function copyTextToClipboard(text: string) {
  try {
    await navigator?.clipboard?.writeText(text);
  } catch (err) {
    const textArea = document.createElement('textarea');
    const range = document.createRange();
    const selection = window.getSelection();
    textArea.readOnly = true;
    textArea.value = text;
    textArea.contentEditable = 'true';
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      range.selectNodeContents(textArea);
      selection?.removeAllRanges();
      selection?.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
