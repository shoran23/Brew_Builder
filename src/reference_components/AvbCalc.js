import React from 'react'

class AvbCalc extends React.Component {
    state = {
        originalGravity: 1.050,
        finalGravity: 1.010,
        attenuationResult: 79,
        avbResult: 5.25
    }

    calculateAvb = () => {
        let result = (this.state.originalGravity - this.state.finalGravity) * 131.25
        let roundedResult = result.toFixed(2)
        this.setState({avbResult: roundedResult})
    }
    calculateAttenuation = () => {
        let result = (((this.state.originalGravity - 1) - (this.state.finalGravity - 1)) / (this.state.originalGravity -1)) * 100
        let roundedResult = result.toFixed(0)
        this.setState({attenuationResult: roundedResult})
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
        setTimeout(this.calculateAvb,1000)
        setTimeout(this.calculateAttenuation,100)
    }
    render() {
        return (
            <div className='avb-calc'>
                <h2>AVB Calculator</h2>
                <div className='avb-calc-container'>
                    <form className='avb-calc-form'>
                        <input 
                            className='avb-calc-og-input'
                            type='number'
                            name='originalGravity'
                            id='originalGravity'
                            step='0.001'
                            onChange={this.handleChange}
                            value={this.state.originalGravity}
                        />
                        <input 
                            className='avb-calc-fg-input'
                            type='number'
                            name='finalGravity'
                            id='finalGravity'
                            step='0.001'
                            onChange={this.handleChange}
                            value={this.state.finalGravity}
                        />
                    </form>
                    <div className='avb-calc-results-container'>
                        <div className='avb-calc-resuls-avb-container'>
                            <h2 className='avb-calc-results-label'>Alcohol By Volume:</h2>
                            <h3 className='avb-calc-avb-result'>{`${this.state.avbResult}%`}</h3>
                        </div>
                        <div>
                            <h2 className='avb-calc-results-label'>Apparent Attenuation:</h2>
                            <h3 className='avb-calc-attenuation-result'>{`${this.state.attenuationResult}%`}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AvbCalc