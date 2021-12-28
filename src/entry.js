import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  let Page1 = null
  let Page2 = null
  let Page3 = null

  import(/* webpackChunkName: "page1" */'./routes/page1').then(comp => {
    Page1 = comp
  })

  import(/* webpackChunkName: "page2" */'./routes/page2').then(comp => {
    Page2 = comp
  })

  import(/* webpackChunkName: "page3" */'./routes/page3').then(comp => {
    Page3 = comp
  })

  return (
    <div>
      <div>App</div>
      <Page1 />
      <Page2 />
      <Page3 />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))