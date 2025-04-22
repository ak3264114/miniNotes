export function createModal(content: string) {
    const cleanedSummary = content.replace(/^\\boxed\{(.*)\}$/, "$1");
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-lg w-full p-6 max-h-[80vh] overflow-auto">
          <h3 class="text-xl font-bold mb-4">Summary</h3>
          <div class="prose mb-6">${cleanedSummary.replace(/\n/g, '<br/>')}</div>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('button');
    if (closeButton) {
        closeButton.onclick = () => document.body.removeChild(modal);
    }
}