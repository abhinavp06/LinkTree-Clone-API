import React, {Component} from 'react'
import './Navbar_css.css'

export default class Navbar extends Component {
    copyCodeToClipboard = () => {
      const el = this.textArea
      el.select()
      document.execCommand("copy")
    }
  
    render() {
      return (
        <div>
            <h1>Hello</h1>

            
            {/* COPY TO CLIPBOARD FUNCTIONALITY*/}
            {/*<section>
                <div>
                    <textarea
                    ref={(textarea) => this.textArea = textarea}
                    value="Example copy for the textarea."
                    />
                </div>
                <div>
                    <button onClick={() => this.copyCodeToClipboard()}>
                    Copy to Clipboard
                    </button>
                </div>
            </section> */}

        </div>
      )
    }
  }
