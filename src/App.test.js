/* eslint-disable no-undef */
/** @format */

import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/index'

let container = null;

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

it('renders without crashing', () => {
    render(
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        container
    )
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
})