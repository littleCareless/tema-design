import { createTest, createVue, destroyVM, wait } from '../util';
import Link from 'packages/link';

describe('Link', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Link, {
      type: 'primary'
    }, true);
    let linkTmm = vm.$el;
    expect(linkTmm.classList.contains('el-link--primary')).to.be.true;
  });
  it('icon', () => {
    vm = createTest(Link, {
      icon: 'tm-icon-search'
    }, true);
    let linkTmm = vm.$el;
    expect(linkTmm.querySelector('.tm-icon-search')).to.be.ok;
  });
  it('href', () => {
    vm = createTest(Link, {
      href: 'https://element.eleme.io/'
    }, true);
    let linkTmm = vm.$el;
    expect(linkTmm.getAttribute('href')).to.be.equal('https://element.eleme.io/');
  });
  it('target', () => {
    vm = createVue(`
    <el-link href="https://element.eleme.io" target="_blank">
      default
    </el-link>
    `);
    let linkTmm = vm.$el;
    expect(linkTmm.getAttribute('target')).to.be.equal('_blank');
  });
  it('disabled', () => {
    vm = createTest(Link, {
      disabled: true
    }, true);
    let linkTmm = vm.$el;
    expect(linkTmm.classList.contains('is-disabled')).to.be.true;
  });

  it('click', async() => {
    let result;
    vm = createVue({
      template: `
        <el-link @click="handleClick"></el-link>
      `,
      methods: {
        handleClick(evt) {
          result = evt;
        }
      }
    }, true);
    vm.$el.click();
    await wait();
    expect(result).to.exist;
  });

});

