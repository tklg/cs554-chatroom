import React from 'react'

import './scss/errorboundary.scss'

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return {
      error: error
    }
  }

  componentDidCatch (error, info) {
    // console.error(error)
    // You can also log the error to an error reporting service
  }

  render () {
    if (this.state.error !== null && process.env.NODE_ENV === 'development') {
      // You can render any custom fallback UI
      const str = this.state.error.stack.replace(/webpack:\/\/\//g, '').replace(/\/([^/]+?\.js)\?:(\d+):(\d+)/g, `/<span class='file'>$1</span> on <span class='line'>line $2</span> ($2:$3)`)
      return (
        <div className='_errorboundary flex flex-container flex-vertical'>
          <header>
            <h1>{this.state.error.message}</h1>
          </header>
          <main className='flex flex-container'>
            <pre className='flex' dangerouslySetInnerHTML={{ __html: str }} />
          </main>
        </div>
      )
    }

    return this.props.children
  }
}
