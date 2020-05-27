import React, { Component } from 'react'
import '../css/welcome.css'

class Welcome extends React.Component {
    render() {
        return (
            <div className='welcome'>
                <div className='msg'>
                    <h2 className='welcome-header'>Welcome to Brew Builder</h2>
                    <p>Access the recipe builder and create your own</p>
                    <p>Access and manage the ingredient database</p>
                </div>
            </div>
        )
    }
}
export default Welcome