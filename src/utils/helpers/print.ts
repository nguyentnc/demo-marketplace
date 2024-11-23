export function printPartOfPage({ elementId }: { elementId: string }) {
  const printContents = document.getElementById(elementId)?.innerHTML;
  const originalContents = document.body.innerHTML;
  if (printContents) {
    document.body.innerHTML = printContents;
  }
  window.print();
  document.body.innerHTML = originalContents;
}
