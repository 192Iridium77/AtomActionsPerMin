'use babel';

import ActionsPerMinuteView from './actions-per-minute-view';
import { CompositeDisposable } from 'atom';

export default {

  actionsPerMinuteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.actionsPerMinuteView = new ActionsPerMinuteView(state.actionsPerMinuteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.actionsPerMinuteView.getElement(),
      visible: false,
    });

    this.count = 0;
    this.startTime = Date.now();
    this.running = true;

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'actions-per-minute:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.actionsPerMinuteView.destroy();
  },

  serialize() {
    return {
      actionsPerMinuteViewState: this.actionsPerMinuteView.serialize()
    };
  },
  toggle() {
    setInterval(() => {
      delta = (Date.now() - this.startTime) / 60000;
      this.apm = Math.round(this.count / delta);
      console.log('APM = ', this.apm);
      this.actionsPerMinuteView.displayAPM(this.apm);
    }, 1000);


    atom.workspace.element.onclick = (event) => {
      this.count += 1;
    };
    atom.workspace.element.onkeyup = (event) => {
      console.log('keyup', event)
      this.count += 1;
    };

  }

};
