import * as ReactDOM from "react-dom"

import { ClientApp } from './App'

ReactDOM.hydrate(
    ClientApp,
    document.getElementById("root")
)