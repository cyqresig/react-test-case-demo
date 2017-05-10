/**
 * @since 2017-05-05 15:37
 * @author chenyiqin
 */

import React, { PropTypes, PureComponent, } from 'react'
import noop from './util/noop'

const renderClickCountLabel = (clickCount) => {
    let clickCountLabelView = null

    if (clickCount > 0) {
        clickCountLabelView = (
            <span click-count-label>{clickCount}</span>
        )
    }

    return clickCountLabelView
}

class Bar extends PureComponent {

    static defaultProps = {
        title: 'bar',
        value: '',
        data: noop.obj,
        deepData: noop.obj,
        onClick: noop.func,
        onChange: noop.func,
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        deepData: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        const {
            value,
            data,
            deepData,
        } = props

        this.state = {
            clickCount: 0,
            value,
            data: {...data,},
            deepData: {...deepData,}
        }
    }

    handleOnClick = () => {
        const {
            onClick,
        } = this.props
        const {
            clickCount,
        } = this.state

        const newClickCount = clickCount + 1

        this.setState({
            clickCount: newClickCount,
        }, () => {
            onClick(newClickCount)
        })
    }

    handleOnChange = (e) => {
        const {
            onChange,
        } = this.props

        const {
            value,
        } = e.target

        this.setState({
            value,
        }, () => {
            onChange(value)
        })
    }

    render() {
        const {
            title,
        } = this.props
        const {
            value,
            clickCount,
        } = this.state

        return (
            <div
                title={title}
                className="bar"
                onClick={this.handleOnClick}>
                <input type="text" value={value} onChange={this.handleOnChange}/>
                {renderClickCountLabel(clickCount)}
            </div>
        )
    }
}

export default Bar
