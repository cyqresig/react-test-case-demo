/**
 * @since 2017-04-04 18:38
 * @author chenyiqin
 */

import React from 'react'
import { render, } from 'react-dom'
import { AppContainer, } from 'react-hot-loader'
const SELECTOR = 'main'

export default (EntryComponent) => {

    return render(
        <AppContainer>
            <EntryComponent/>
        </AppContainer>,
        document.getElementById(SELECTOR)
    )
}

