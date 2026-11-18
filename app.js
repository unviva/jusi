import { jusi } from './jusi/jusi.js'
import * as fn from './jusi/fn.js'
import { date, string, layout } from './jusi/fn.js'
import * as elements from './jusi/elements.js'
import { el, els } from './jusi/fn.el.js'
import './jusi/components.js'

// Attach imported modules onto jusi namespace & window so ./app/*.js scripts work seamlessly
jusi.fn = { ...jusi.fn, ...fn, date, string, layout }
jusi.elements = elements
jusi.el = el
jusi.els = els

Object.assign(window, elements)
window.jusi = jusi

// Note: Because <script type="module"> is deferred by default,
// ensure jusi.init() runs after non-module ./app/*.js scripts have loaded
window.addEventListener('DOMContentLoaded', () => {
  jusi.init()
})