'use babel';

export default class ActionsPerMinuteView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('actions-per-minute');

    // Create message element
    const message = document.createElement('div');
    message.textContent = JSON.stringify(this.element);
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  displayAPM(apm) {
    let current_apm = apm;
    footerLeftTiles = atom.workspace.panelContainers.footer.panels[0].item.leftTiles;
    // I don't know how to add a new panel to the footer, for now I'm just going to
    // overwrite an existing one.
    footerLeftTiles[0].item.innerText = current_apm.toString();
  }

}
