import React from 'react'
import '../css/header.css'

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <h1>Brew Builder</h1>
                <div className='header-options'>
                    <button className='header-btn' onClick={() => this.props.handleWelcome(true)}>Home</button>
                    <button className='header-btn' onClick={() => this.props.handleDash(false)}>Recipes</button>
                    <button className='header-btn' onClick={() => this.props.handleDash(true)}>Ingredients</button>
                </div>
            </div>
        )
    }
}
export default Header