import { createVue, triggerEvent, destroyVM, triggerKeyDown } from '../util';

describe('Dropdown', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue({
      template: `
        <el-dropdown ref="dropdown">
          <span class="el-dropdown-link">
            下拉菜单<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-test-creat">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);
    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.children[0];

    triggerEvent(triggerTmm, 'mouseenter');
    setTimeout(_ => {
      expect(dropdown.visible).to.be.true;

      triggerEvent(triggerTmm, 'mouseleave');
      setTimeout(_ => {
        expect(dropdown.visible).to.not.true;
        done();
      }, 300);
    }, 400);
  });
  it('menu click', done => {
    const myCommandObject = { name: 'CommandC' };
    vm = createVue({
      template: `
        <el-dropdown ref="dropdown">
          <span class="el-dropdown-link">
            下拉菜单<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item ref="commandC" :command="myCommandObject">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d">双皮奶</el-dropdown-item>
            <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `,
      data() {
        return {
          myCommandObject
        };
      }
    }, true);
    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.children[0];
    let callback = sinon.spy();

    dropdown.$on('command', callback);

    triggerEvent(triggerTmm, 'mouseenter');
    setTimeout(_ => {
      vm.$refs.commandC.$el.click();
      setTimeout(_ => {
        expect(dropdown.visible).to.not.true;
        expect(callback.calledWith(myCommandObject)).to.be.true;
        done();
      }, 300);
    }, 300);
  });
  it('trigger', done => {
    vm = createVue({
      template: `
        <el-dropdown trigger="click" ref="dropdown">
          <span class="el-dropdown-link">
            下拉菜单trigger click<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item @click.native="handleClick">狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);
    let dropdownTmm = vm.$el;
    let dropdown = vm.$refs.dropdown;
    let triggerTmm = dropdownTmm.children[0];

    triggerEvent(triggerTmm, 'mouseenter');
    dropdown.$nextTick(_ => {
      expect(dropdown.visible).to.not.true;
      triggerTmm.click();
      setTimeout(_ => {
        expect(dropdown.visible).to.be.true;
        done();
      }, 300);
    });
  });
  it('split button', done => {
    vm = createVue({
      template: `
        <el-dropdown split-button type="primary" ref="dropdown">
          更多菜单
          <el-dropdown-menu slot="dropdown" class="dropdown-test-split-button">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);

    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.querySelector('.el-dropdown__caret-button');
    var callback = sinon.spy();

    dropdown.$on('click', callback);
    dropdownTmm.querySelector('.tm-button').click();

    setTimeout(_ => {
      expect(callback.called).to.be.true;
    }, 300);

    triggerEvent(triggerTmm, 'mouseenter');
    setTimeout(_ => {
      expect(dropdown.visible).to.be.true;

      triggerEvent(triggerTmm, 'mouseleave');
      setTimeout(_ => {
        expect(dropdown.visible).to.not.true;
        done();
      }, 300);
    }, 300);
  });
  it('hide on click', done => {
    vm = createVue({
      template: `
        <el-dropdown ref="dropdown" :hide-on-click="false">
          <span class="el-dropdown-link">
            下拉菜单<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item ref="commandC" command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d">双皮奶</el-dropdown-item>
            <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);
    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.children[0];
    let callback = sinon.spy();

    dropdown.$on('command', callback);

    triggerEvent(triggerTmm, 'mouseenter');
    setTimeout(_ => {
      vm.$refs.commandC.$el.click();
      setTimeout(_ => {
        expect(dropdown.visible).to.true;
        expect(callback.calledWith('c')).to.be.true;
        done();
      }, 300);
    }, 300);
  });
  it('triggerTmm keydown', done => {
    vm = createVue({
      template: `
        <el-dropdown ref="dropdown">
          <span class="el-dropdown-link">
            下拉菜单<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-test-creat">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);
    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.children[0];
    triggerKeyDown(triggerTmm, 13); // enter
    setTimeout(() => {
      expect(dropdown.visible).to.be.true;
      triggerKeyDown(triggerTmm, 27); // esc
      setTimeout(() => {
        expect(dropdown.visible).to.be.false;
        done();
      }, 300);
    }, 400);
  });
  it('dropdown menu keydown', done => {
    vm = createVue({
      template: `
        <el-dropdown ref="dropdown">
          <span class="el-dropdown-link">
            下拉菜单<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-test-creat">
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d">双皮奶</el-dropdown-item>
            <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);
    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.children[0];
    let dropdownMenu = dropdown.dropdownTmm;

    triggerEvent(triggerTmm, 'mouseenter');

    setTimeout(() => {
      expect(dropdown.visible).to.be.true;
      triggerKeyDown(dropdownMenu, 40); // down
      setTimeout(() => {
        triggerKeyDown(dropdownMenu, 13); // enter
        setTimeout(() => {
          expect(dropdown.visible).to.be.false;
          done();
        }, 100);
      }, 100);
    }, 300);
  });
  it('updatePopper', done => {
    vm = createVue({
      template: `
        <el-dropdown ref="dropdown">
          <span class="el-dropdown-link">
            下拉菜单<i class="tm-icon-caret-bottom tm-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-test-creat">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      `
    }, true);
    let dropdown = vm.$refs.dropdown;
    let dropdownTmm = dropdown.$el;
    let triggerTmm = dropdownTmm.children[0];

    triggerEvent(triggerTmm, 'mouseenter');
    setTimeout(() => {
      const zIndex1 = document.querySelector('.el-dropdown-menu').style.zIndex;
      dropdown.broadcast('TmDropdownMenu', 'updatePopper');
      setTimeout(() => {
        const zIndex2 = document.querySelector('.el-dropdown-menu').style.zIndex;
        expect(zIndex2 > zIndex1).to.be.true;
        done();
      }, 100);
    }, 300);
  });
});
