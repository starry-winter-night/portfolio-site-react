export default class MoveMenuSection {
  constructor(targetId, sections) {
    this.targetId = targetId;
    this.sections = sections;
  }

  start() {
    this.sections.forEach((item, index) => {
      if (item.id === this.targetId) {
        index === 0 ? this._moveScrollHome() : this._moveScrollMenu(item);
      }
    });
  }

  _moveScrollMenu(item) {
    item.scrollIntoView({ behavior: 'smooth' });
  }

  _moveScrollHome() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
