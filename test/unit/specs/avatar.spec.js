import { createTest, createVue, destroyVM, wait } from '../util';
import Avatar from 'packages/avatar';
import { IMAGE_SUCCESS, IMAGE_FAIL } from '../mocks/uri';

describe('Avatar', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Avatar);
    expect(vm.$el).to.exist;
  });

  it('size is number', () => {
    vm = createVue({
      template: `
        <el-avatar :size="50">
        </el-avatar>
      `
    }, true);
    const avatarTmm = vm.$el;
    expect(avatarTmm.style.height).to.equal('50px');
  });

  it('size is string', () => {
    vm = createVue({
      template: `
        <el-avatar size="small">
          user
        </el-avatar>
      `
    }, true);
    const avatarTmm = vm.$el;
    expect(avatarTmm.classList.contains('el-avatar--small')).to.be.true;
  });

  it('shape', () => {
    vm = createVue({
      template: `
        <el-avatar size="small" shape="square">
          user
        </el-avatar>
      `
    }, true);
    const avatarTmm = vm.$el;
    expect(avatarTmm.classList.contains('el-avatar--square')).to.be.true;
  });

  it('icon avatar', () => {
    vm = createVue({
      template: `
        <el-avatar icon="tm-icon-user-solid">
        </el-avatar>
      `
    }, true);
    const avatarTmm = vm.$el;
    const iconELm = avatarTmm.children[0];
    expect(avatarTmm.classList.contains('el-avatar--icon')).to.be.true;
    expect(iconELm.classList.contains('tm-icon-user-solid')).to.be.true;
  });

  it('image avatar', () => {
    vm = createVue({
      template: `
        <el-avatar src="${IMAGE_SUCCESS}"></el-avatar>
      `
    }, true);
    const imgTmm = vm.$el.children[0];
    expect(imgTmm.tagName.toUpperCase()).to.equal('IMG');
    expect(imgTmm.src).to.equal(IMAGE_SUCCESS);
  });

  it('image fallback', async() => {
    vm = createVue({
      template: `
        <el-avatar src="${IMAGE_FAIL}" @error="errorHandler">
          fallback
        </el-avatar>
      `,
      methods: {
        errorHandler() {
          return true;
        }
      }
    }, true);
    await wait();
    const avatarTmm = vm.$el;
    expect(avatarTmm.textContent.trim()).to.equal('fallback');
  });

  it('image fit', async() => {
    vm = createVue({
      template: `
        <div>
          <el-avatar :src="url"></el-avatar>
          <el-avatar :src="url" v-for="fit in fits" :fit="fit" :key="fit"></el-avatar>
        </div>
        
      `,
      data() {
        return {
          fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
          url: IMAGE_SUCCESS
        };
      }
    }, true);
    await wait();
    const containerTmm = vm.$el;
    expect(containerTmm.children[0].children[0].style.objectFit).to.equal('cover');
    expect(containerTmm.children[1].children[0].style.objectFit).to.equal('fill');
    expect(containerTmm.children[2].children[0].style.objectFit).to.equal('contain');
    expect(containerTmm.children[3].children[0].style.objectFit).to.equal('cover');
    expect(containerTmm.children[4].children[0].style.objectFit).to.equal('none');
    expect(containerTmm.children[5].children[0].style.objectFit).to.equal('scale-down');
  });
});

