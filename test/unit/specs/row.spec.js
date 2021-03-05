import { createTest, destroyVM } from '../util';
import Row from 'packages/row';

describe('Row', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Row, true);
    let rowTmm = vm.$el;
    expect(rowTmm.classList.contains('tm-row')).to.be.true;
  });
  it('gutter', () => {
    vm = createTest(Row, {
      gutter: 20
    }, true);
    let rowTmm = vm.$el;
    expect(rowTmm.style.marginLeft).to.be.equal('-10px');
    expect(rowTmm.style.marginRight).to.be.equal('-10px');
  });
  it('type', () => {
    vm = createTest(Row, {
      type: 'flex'
    }, true);
    let rowTmm = vm.$el;
    expect(rowTmm.classList.contains('tm-row--flex')).to.be.true;
  });
  it('justify', () => {
    vm = createTest(Row, {
      justify: 'end'
    }, true);
    let rowTmm = vm.$el;
    expect(rowTmm.classList.contains('is-justify-end')).to.be.true;
  });
  it('align', () => {
    vm = createTest(Row, {
      align: 'bottom'
    }, true);
    let rowTmm = vm.$el;
    expect(rowTmm.classList.contains('is-align-bottom')).to.be.true;
  });
});
