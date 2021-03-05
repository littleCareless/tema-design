<style lang="less">
.component-preview {
  padding-right: 10px;
  &:last-of-type {
    padding-bottom: 20px;
  }
  h4 {
    font-size: 20px;
    margin: 40px 0 20px;
    color: #909399
  }
  .demo-item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .demo-line {
    margin: 15px 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-avatar:not(:last-child) {
    margin-right: 20px;
  }

  .avatar-demo {
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <div class="component-preview">
    <h4>Button</h4>
    <tm-row class="demo-line">
      <tm-button>Default</tm-button>
      <tm-button type="primary">Primary</tm-button>
      <tm-button type="success">Success</tm-button>
      <tm-button type="info">Info</tm-button>
      <tm-button type="warning">Warning</tm-button>
      <tm-button type="danger">Danger</tm-button>
    </tm-row>
    <tm-row class="demo-line">
      <tm-button plain>Plain</tm-button>
      <tm-button type="primary" plain>Primary</tm-button>
      <tm-button type="success" plain>Success</tm-button>
      <tm-button type="info" plain>Info</tm-button>
      <tm-button type="warning" plain>Warning</tm-button>
      <tm-button type="danger" plain>Danger</tm-button>
    </tm-row>
    <tm-row class="demo-line">
      <tm-button round>Round</tm-button>
      <tm-button type="primary" round>Primary</tm-button>
      <tm-button type="success" round>Success</tm-button>
      <tm-button type="info" round>Info</tm-button>
      <tm-button type="warning" round>Warning</tm-button>
      <tm-button type="danger" round>Danger</tm-button>
    </tm-row>
    <tm-row class="demo-line">
      <tm-button icon="tm-icon-search" circle></tm-button>
      <tm-button type="primary" icon="tm-icon-edit" circle></tm-button>
      <tm-button type="success" icon="tm-icon-check" circle></tm-button>
      <tm-button type="info" icon="tm-icon-message" circle></tm-button>
      <tm-button type="warning" icon="tm-icon-star-off" circle></tm-button>
      <tm-button type="danger" icon="tm-icon-delete" circle></tm-button>
    </tm-row>
    <tm-row class="demo-line">
      <tm-button>Default</tm-button>
      <tm-button size="medium">Medium</tm-button>
      <tm-button size="small">Small</tm-button>
      <tm-button size="mini">Mini</tm-button>
    </tm-row>
    <h4>Radio</h4>
    <tm-row class="demo-line">
      <el-radio v-model="radio" label="1">Option A</el-radio>
      <el-radio v-model="radio" label="2">Option B</el-radio>
    </tm-row>
    <tm-row class="demo-line">
      <el-radio-group v-model="radio1">
        <el-radio-button label="New York"></el-radio-button>
        <el-radio-button label="Washington"></el-radio-button>
        <el-radio-button label="Los Angeles"></el-radio-button>
        <el-radio-button label="Chicago"></el-radio-button>
      </el-radio-group>
    </tm-row>
    <tm-row class="demo-line">
      <el-radio v-model="radio2" label="1" border>Option A</el-radio>
      <el-radio v-model="radio2" label="2" border>Option B</el-radio>
    </tm-row>
    <h4>Checkbox</h4>
    <tm-row class="demo-line">
      <el-checkbox v-model="checked">Option</el-checkbox>
    </tm-row>
    <tm-row class="demo-line">
      <el-checkbox-group v-model="checked1">
        <el-checkbox-button v-for="city in ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </tm-row>
    <tm-row class="demo-line">
      <el-checkbox v-model="checked2" label="Option1" border></el-checkbox>
    </tm-row>
    <h4>Input</h4>
    <tm-row style="width: 180px">
      <el-input placeholder="Please input" v-model="input"></el-input>
    </tm-row>
    <h4>InputNumber</h4>
    <tm-row>
      <el-input-number v-model="inputNumber" :min="1" :max="10"></el-input-number>
    </tm-row>
    <h4>Select</h4>
    <tm-row>
      <el-select v-model="selectValue" placeholder="Select">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </tm-row>
    <h4>Cascader</h4>
    <tm-row>
      <el-cascader :options="cascadeOptions" v-model="cascaderValue"></el-cascader>
    </tm-row>
    <h4>Switch</h4>
    <tm-row>
      <el-switch v-model="switchValue"></el-switch>
      <el-switch
        style="margin-left: 40px"
        v-model="switchValue"
        active-text="Pay by month"
        inactive-text="Pay by year">
      </el-switch>
    </tm-row>
    <h4>Slider</h4>
    <tm-row style="width: 380px">
      <el-slider v-model="slider"></el-slider>
    </tm-row>
    <h4>DatePicker</h4>
    <tm-row>
      <el-date-picker v-model="datePicker" type="date"></el-date-picker>
    </tm-row>
    <h4>Rate</h4>
    <tm-row>
      <el-rate class="demo-line" v-model="rate"></el-rate>
      <el-rate
        class="demo-line"
        v-model="rate"
        show-score
        text-color="#ff9900"
        score-template="{value} points">
      </el-rate>
    </tm-row>
    <h4>Transfer</h4>
    <tm-row>
      <el-transfer v-model="transfer" filterable :data="transferData">
        <tm-button class="transfer-footer" slot="left-footer" size="small">Operation</tm-button>
        <tm-button class="transfer-footer" slot="right-footer" size="small">Operation</tm-button>
      </el-transfer>
    </tm-row>
    <h4>Table</h4>
    <tm-row>
      <el-table :data="tableData" style="width: 70%">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </tm-row>
    <h4>Tag</h4>
    <tm-row>
      <el-tag class="demo-item" closable>Tag One</el-tag>
      <el-tag class="demo-item" closable type="success">Tag Two</el-tag>
      <el-tag class="demo-item" closable type="info">Tag Three</el-tag>
      <el-tag class="demo-item" closable type="warning">Tag Four</el-tag>
      <el-tag class="demo-item" closable type="danger">Tag Five</el-tag>
    </tm-row>
    <h4>Progress</h4>
    <tm-row style="width: 380px">
      <el-progress :percentage="20"></el-progress>
      <el-progress :percentage="60" status="exception"></el-progress>
      <el-progress :percentage="100" status="success"></el-progress>
    </tm-row>
    <h4>Tree</h4>
    <tm-row style="width: 380px">
      <el-tree :data="treeData" :props="defaultTreeProps" ></el-tree>
    </tm-row>
    <h4>Pagination</h4>
    <tm-row>
      <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
    </tm-row>
    <h4>Badge</h4>
    <tm-row>
      <el-badge :value="12" class="demo-item">
        <tm-button size="small">comments</tm-button>
      </el-badge>
      <el-badge :value="3" class="demo-item">
        <tm-button size="small">replies</tm-button>
      </el-badge>
      <el-badge :value="1" class="demo-item" type="primary">
        <tm-button size="small">comments</tm-button>
      </el-badge>
      <el-badge :value="2" class="demo-item" type="warning">
        <tm-button size="small">replies</tm-button>
      </el-badge>
    </tm-row>
    <h4>Alert</h4>
    <tm-row style="width: 380px;">
      <el-alert class="demo-item" title="success alert" type="success" show-icon></el-alert>
      <el-alert class="demo-item" title="info alert" type="info" close-text="Gotcha" show-icon></el-alert>
      <el-alert class="demo-item" title="warning alert" type="warning" show-icon></el-alert>
      <el-alert
        class="demo-item"
        title="error alert"
        type="error"
        description="more text description"
        show-icon>
      </el-alert>
    </tm-row>
    <h4>Loading</h4>
    <tm-row>
      <el-table :data="tableData" style="width: 90%" v-loading="true">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </tm-row>
    <h4>Message</h4>
    <tm-row>
      <div role="alert" class="demo-item el-message el-message--success el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon tm-icon-success"></i><p class="el-message__content">Congrats, this is a success message.</p><!----></div>
      <div role="alert" class="demo-item el-message el-message--warning el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon tm-icon-warning"></i><p class="el-message__content">Warning, this is a warning message.</p><!----></div>
      <div role="alert" class="demo-item el-message el-message--info el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon tm-icon-info"></i><p class="el-message__content">This is a message.</p><!----></div>
      <div role="alert" class="demo-item el-message el-message--error is-closable el-message-fade-leave-active el-message-fade-leave-to" style="top: 0;left: 0;width: 100px; opacity: 1; position: relative;transform: none;"><i class="el-message__icon tm-icon-error"></i><p class="el-message__content">Oops, this is a error message.</p><i class="el-message__closeBtn tm-icon-close"></i></div>
    </tm-row>
    <h4>MessageBox</h4>
    <tm-row>
      <div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title"><!----><span>Warning</span></div><button type="button" aria-label="Close" class="el-message-box__headerbtn"><i class="el-message-box__close tm-icon-close"></i></button></div><div class="el-message-box__content"><div class="el-message-box__status tm-icon-warning"></div><div class="el-message-box__message"><p>This will permanently delete the file. Continue?</p></div><div class="el-message-box__input" style="display: none;"><div class="el-input"><!----><input type="text" autocomplete="off" placeholder="" class="el-input__inner"><!----><!----><!----></div><div class="el-message-box__errormsg" style="visibility: hidden;"></div></div></div><div class="el-message-box__btns"><button type="button" class="tm-button tm-button--default tm-button--small"><!----><!----><span>
          Cancel
        </span></button><button type="button" class="tm-button tm-button--default tm-button--small tm-button--primary "><!----><!----><span>
          OK
        </span></button></div></div>
    </tm-row>
    <h4>Notification</h4>
    <tm-row>
      <div role="alert" class="el-notification right" style="position: relative; left: 0;"><!----><div class="el-notification__group"><span class="el-notification__title">Notification</span><div class="el-notification__content"><div>This is a message </div></div><div class="el-notification__closeBtn tm-icon-close"></div></div></div>
    </tm-row>
    <h4>Menu</h4>
    <tm-row>
      <el-menu :default-active="menu" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">Orders</a>
        </el-menu-item>
      </el-menu>
      <el-menu
        default-active="2"
        class="demo-line"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="tm-icon-location"></i>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="tm-icon-menu"></i>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="tm-icon-document"></i>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="tm-icon-setting"></i>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </tm-row>
    <h4>Tabs</h4>
    <tm-row>
      <el-tabs v-model="tab" class="demo-item">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
      <el-tabs type="card" class="demo-item">
        <el-tab-pane label="User">User</el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </tm-row>
    <h4>Dialog</h4>
    <tm-row>
      <div role="dialog" aria-modal="true" aria-label="Tips" class="el-dialog" style="margin: 0"><div class="el-dialog__header"><span class="el-dialog__title">Tips</span><button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close tm-icon tm-icon-close"></i></button></div><div class="el-dialog__body"><span>This is a message</span> </div><div class="el-dialog__footer"><span class="dialog-footer"><button type="button" class="tm-button tm-button--default"><!----><!----><span>Cancel</span></button> <button type="button" class="tm-button tm-button--primary"><!----><!----><span>Confirm</span></button></span></div></div>
    </tm-row>
    <h4>Tooltip</h4>
    <tm-row>
      <div role="tooltip" x-placement="top" class="el-tooltip__popper is-dark" style="position: relative; width: 40px;text-align: center;">Dark<div x-arrow="" class="popper__arrow"></div>
      </div>
      <div role="tooltip" x-placement="top" class="el-tooltip__popper is-light" style="margin-top: 10px;position: relative; width: 40px;text-align: center;">Light<div x-arrow="" class="popper__arrow"></div>
      </div>
    </tm-row>
    <h4>Popover</h4>
    <tm-row>
      <div role="tooltip" x-placement="top" id="el-popover-2936" aria-hidden="true" class="el-popover el-popper el-popover--plain" tabindex="0" style="width: 200px; position: relative; "><div class="el-popover__title">Title</div>this is content, this is content, this is content<div x-arrow="" class="popper__arrow"></div></div>
    </tm-row>
    <h4>Card</h4>
    <tm-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Card name</span>
        </div>
      </el-card>
    </tm-row>
    <h4>Carousel</h4>
    <tm-row>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </tm-row>
    <h4>Collapse</h4>
    <tm-row>
      <el-collapse v-model="collapse">
        <el-collapse-item title="Consistent" name="1">
          <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
        </el-collapse-item>
        <el-collapse-item title="Feedback" name="2">
          <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        </el-collapse-item>
      </el-collapse>
    </tm-row>
    <h4>Avatar</h4>
    <tm-row class="demo-line avatar-demo">
      <el-avatar icon="tm-icon-user-solid"/>
      <el-avatar> avatar </el-avatar>
      <el-avatar shape="square" fit="contain" :src="avatarData.url"></el-avatar>
      <el-avatar size="large"> large </el-avatar>
      <el-avatar size="medium"> medium </el-avatar>
      <el-avatar size="small"> small </el-avatar>
    </tm-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
      radio1: 'Washington',
      radio2: '1',
      checked: true,
      checked1: ['Shanghai'],
      checked2: true,
      input: 'TmDesign',
      inputNumber: 1,
      selectOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      selectValue: '',
      cascadeOptions: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency'
                },
                {
                  value: 'feedback',
                  label: 'Feedback'
                }
              ]
            }
          ]
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'docs',
              label: 'Design Documentation'
            }
          ]
        }
      ],
      cascaderValue: [],
      switchValue: true,
      slider: 28,
      datePicker: '',
      rate: null,
      transferData: (() => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0
          });
        }
        return data;
      })(),
      transfer: [1, 4],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],
      menu: '1',
      tab: 'first',
      collapse: ['1'],
      treeData: [{
        label: 'Level one 1',
        children: [{
          label: 'Level two 1-1',
          children: [{
            label: 'Level three 1-1-1'
          }]
        }]
      }, {
        label: 'Level one 2',
        children: [{
          label: 'Level two 2-1',
          children: [{
            label: 'Level three 2-1-1'
          }]
        }, {
          label: 'Level two 2-2',
          children: [{
            label: 'Level three 2-2-1'
          }]
        }]
      }, {
        label: 'Level one 3',
        children: [{
          label: 'Level two 3-1',
          children: [{
            label: 'Level three 3-1-1'
          }]
        }, {
          label: 'Level two 3-2',
          children: [{
            label: 'Level three 3-2-1'
          }]
        }]
      }],
      defaultTreeProps: {
        children: 'children',
        label: 'label'
      },
      avatarData: {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    };
  }
};
</script>
