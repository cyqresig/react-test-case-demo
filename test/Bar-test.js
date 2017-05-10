/**
 * @since 2017-05-05 16:48
 * @author chenyiqin
 */

import test from 'ava'
import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Bar from '../src/Bar'
import noop from '../src/util/noop'

// 测试用例集标题
test.todo('Bar-test');

// 测试组件是否触发render
test('组件是否触发render', (t) => {
    sinon.spy(Bar.prototype, 'render')
    const wrapper = mount(<Bar />)
    t.true(Bar.prototype.render.calledOnce)
})

/**********************测试组件初始化，属性赋值后，组件的属性与状态是否符合预期**********************/

// 测试块标题
test.todo('测试组件初始化，属性赋值后，组件的属性与状态是否符合预期');

// 测试组件初始属性赋值后，初始状态的值是否符合预期
test('检查默认值是否生效', (t) => {
    const defaultProps = {
        title: 'bar',
        value: '',
        data: noop.obj,
        deepData: noop.obj,
        onClick: noop.func,
        onChange: noop.func
    }
    const wrapper = shallow(
        <Bar/>
    )
    const instance = wrapper.instance()

    t.deepEqual(instance.props, defaultProps)
})

test('初始props -> value赋值是否成功', (t) => {
    const wrapper = shallow(
        <Bar value={'0'}/>
    )
    const instance = wrapper.instance()

    t.is(instance.props.value, '0')
})

// 测试组件初始属性赋值后，初始状态的值是否符合预期
test('初始props -> value赋"0"，初始state -> value值应为"0"', (t) => {
    const wrapper = shallow(
        <Bar value={'0'}/>
    )

    t.is(wrapper.state().value, '0')
})

// 测试组件初始属性赋值后，初始状态的值是否符合预期
test('初始props -> data赋值，初始state -> data值与赋的值相等', (t) => {
    const data = {
        key: 'data',
        value: 8
    };
    const wrapper = shallow(
        <Bar
            data={data}/>
    )

    t.deepEqual(wrapper.state().data, data)
})

// 测试组件初始属性赋值后，初始状态的值是否符合预期
test('初始props -> deepData赋值，初始state -> deepData值与赋的值相等', (t) => {
    const deepData = {
        key: 'data',
        value: 8,
        children: [{
            key: 'child',
            value: 88
        }]
    };
    const wrapper = shallow(
        <Bar
            deepData={deepData}/>
    )

    t.deepEqual(wrapper.state().deepData, deepData)
})

/**********************测试组件初始化，属性赋值后，组件的界面渲染是否符合预期**********************/

// 测试块标题
test.todo('测试组件初始化，属性赋值后，组件的界面渲染是否符合预期');

test('组件初始化后，根节点应是一个class为"bar"的div', (t) => {
    const wrapper = shallow(
        <Bar/>
    )

    t.true(wrapper.is('div.bar'))
})

test('组件初始化后，应包含一个input', (t) => {
    const wrapper = shallow(
        <Bar/>
    )

    t.is(wrapper.find('input').length, 1)
})

test('组件初始化后，应渲染一个class为"bar"的div, 并且div内还包含一个value值为"1"的input:text', (t) => {
    const wrapper = shallow(
        <Bar value="1"/>
    )

    let flag = true
    const divWrapper = wrapper.find('div')
    if (divWrapper.length !== 1) {
        flag = false
    }
    if (flag) {
        const inputWrapper = divWrapper.find('input[type="text"]')
        if (inputWrapper.length !== 1) {
            flag = false
        } else {
            if (inputWrapper.props().value !== '1') {
                flag = false
            }
        }
    }

    if (flag) {
        t.pass()
    } else {
        t.fail()
    }

})

/**********************测试组件交互后，组件状态是否符合预期**********************/

// 测试块标题
test.todo('测试组件交互后，组件的属性与状态是否符合预期');

test('测试组件交互click点击后，组件的clickCount状态值+1（从0变更到1）', (t) => {
    let wrapper = null
    wrapper = shallow(
        <Bar />,
    )
    wrapper.find('div').simulate('click')
    t.is(wrapper.state('clickCount'), 1)
})

test('测试组件交互click点击后，回调函数onClick返回的clickCount值等于组件的clickCount状态值+1（从0变更到1）', (t) => {
    let wrapper = null
    const onClick = (clickCount) => {
        t.is(clickCount, 1)
    }
    wrapper = shallow(
        <Bar onClick={onClick}/>,
    )
    wrapper.find('div').simulate('click')
})

test('测试组件交互文本内容change改变为888后，组件的value状态值也同步变更为888', (t) => {
    let wrapper = null
    wrapper = shallow(
        <Bar />,
    )
    const fakeEvent = {
        target: {
            value: 888
        }
    }
    wrapper.find('input[type="text"]').simulate('change', fakeEvent)
    t.is(wrapper.state('value'), 888)
})

test('测试组件交互文本内容change改变为888，回调函数onChange返回的value值等于组件的value状态值888', (t) => {
    let wrapper = null
    const onChange = (value) => {
        t.is(value, 888)
    }
    wrapper = shallow(
        <Bar onChange={onChange}/>,
    )
    const fakeEvent = {
        target: {
            value: 888
        }
    }
    wrapper.find('input[type="text"]').simulate('change', fakeEvent)
})

/**********************测试组件交互后，组件的界面渲染是否符合预期**********************/

// 测试块标题
test.todo('测试组件交互后，组件的界面渲染是否符合预期');

test('测试组件交互click点击一次后，组件包含一个带click-count-label属性的span节点，并且节点内的文本为1', (t) => {
    let wrapper = null
    let divWrapper = null
    wrapper = shallow(
        <Bar />,
    )
    wrapper.find('div').simulate('click')
    const findSpan = wrapper.find('span[click-count-label]')
    if (findSpan.length === 1 && findSpan.text() === '1') {
        t.pass()
    } else {
        t.fail()
    }
    // t.true(wrapper.find('div').contains(spanView))
})

test('测试组件交互文本内容change改变为888，input的value显示888', (t) => {
    let wrapper = null
    wrapper = shallow(
        <Bar />,
    )
    const fakeEvent = {
        target: {
            value: 888
        }
    }
    wrapper.find('input[type="text"]').simulate('change', fakeEvent)
    t.is(wrapper.find('input[type="text"]').props().value, 888)
})



