import React from 'react'

class PrimingCalc extends React.Component {
    state = {
        volume: 5.0,
        co2: 2.0,
        temp: 68
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
    }
    render() {
        return (
            <div className='priming-calc'>
                <div className='priming-calc-container'>
                    <h2>Priming Calculator</h2>
                    <form>
                        <input 
                            className='priming-calc-volume-input'
                            type='number'
                            name='volume'
                            id='volume'
                            step='0.1'
                            onChange={this.handleChange}
                            value={this.state.volume}
                        />
                        <input
                            className='priming-calc-co2-input' 
                            type='number'
                            name='co2'
                            id='co2'
                            step='0.1'
                            onChange={this.handleChange}
                            value={this.state.co2}
                        />
                        <input 
                            className='priming-calc-temp-input'
                            type='number'
                            name='temp'
                            id='temp'
                            onChange={this.handleChange}
                            value={this.state.temp}
                        />
                    </form>
                </div>
                <table className='priming-calc-guiline-table'>
                    <thead >
                        <th>Style</th>
                        <th>Carbonation</th>
                    </thead>
                    <tbody>
                        <td>British Style ALes</td>
                        <td>1.5 - 2.0 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>Belgian Ales</td>
                        <td>1.9 - 2.4 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>Americam Ales and Lagers</td>
                        <td>2.2 - 2.7 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>Fruit Lambic</td>
                        <td>3.0 - 4.5 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>Porter and Stouts</td>
                        <td>1.7 - 2.3 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>European Lagers</td>
                        <td>2.2 - 2.7 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>Lambic</td>
                        <td>2.4 - 2.8 Volumes</td>
                    </tbody>
                    <tbody>
                        <td>German Wheat Beer</td>
                        <td>3.3 - 4.5 Volumes</td>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default PrimingCalc