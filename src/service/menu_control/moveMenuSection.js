export default class MoveMenuSection {
  start(targetId, sections) {
    sections.forEach((item, index) => {
      if (item.id === targetId) {
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
