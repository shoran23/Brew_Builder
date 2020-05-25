import React from 'react'
import Select from 'react-select'

class Hop extends React.Component {
    state = {
        hopAmount: 1,
        hopTime: 60
    }
    handleSelectChange = e => {
        this.props.handleRecipeState(this.props.recipeHopList,e,this.props.index)
    }
    handleChangeAmount = (event) => {
        this.setState({[event.target.id]: event.target.value})
        let tempValue = Number(event.target.value)
        this.props.handleRecipeState(this.props.recipeHopAmounts,tempValue,this.props.index)
    } 
    handleChangeTime = (event) => {
        this.setState({[event.target.id]: event.target.value})
        let tempValue = Number(event.target.value)
        this.props.handleRecipeState(this.props.recipeHopTimes,tempValue,this.props.index)
    }
    render() {
        return (
            <div className='recipe-form-data-row'>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Boil Time(min)</div>
                    <input 
                        type="number"
                        name='hopTime'
                        id='hopTime'
                        value={this.props.recipeHopTimes[this.props.index]}
                        onChange={this.handleChangeTime}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Amount(oz)</div>
                    <input 
                        type="number"
                        name='hopAmount'
                        id='hopAmount'
                        value={this.props.recipeHopAmounts[this.props.index]}
                        onChange={this.handleChangeAmount}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Select Hop</div>
                    <Select
                        value={this.props.recipeHopList[this.props.index]}
                        onChange={this.handleSelectChange}
                        options={this.props.hopList}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <button>View</button>
                    <button onClick={() => this.props.changeHopArraySize('delete',this.props.index)}>Delete</button>
                </div>
            </div>
        )
    }
}
export default Hop