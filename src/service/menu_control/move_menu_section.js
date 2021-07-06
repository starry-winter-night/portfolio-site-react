export default class MoveMenuSection {
  start(targetId, sections, portfolio) {
    sections.forEach((item, index) => {
      if (item.id === targetId) {
        index === 0
          ? this._moveScrollHome(portfolio)
          : this._moveScrollMenu(portfolio, item);
      }
    });
  }

  _moveScrollMenu(portfolio, item) {
    portfolio.scrollTo({
      top: item.getBoundingClientRect().top + portfolio.scrollTop,
      behavior: 'smooth',
    });
  }

  _moveScrollHome(portfolio) {
    portfolio.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
