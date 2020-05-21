import React, { Component } from 'react'
import '../css/welcome.css'

class Welcome extends React.Component {
    render() {
        return (
            <div className='welcome'>
                <div className='msg'>
                    <h2 className='welcome-header'>Welcome to Brew Builder</h2>
                    <p>Access the recipe builder and create your own</p>
                    <p>Or</p>
                    <p>Access all of our database, calculators, and other references</p>
                </div>
            </div>
        )
    }
}
export default Welcome