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
    handleChangeAmount = (event,index) => {
        this.setState({
          [event.target.id]: event.target.value
        })

        // set recipe hop amount function here with the value above

    } 
    render() {
        return (
            <div className='recipe-form-data-row'>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Amount(oz)</div>
                    <input 
                        type="number"
                        name='hopAmount'
                        id='hopAmount'
                        value={this.state.hopAmount}
                        onChange={() => this.handleChangeLocal(this.props.index)}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Boil Time(min)</div>
                    <input 
                        type="decimal"
                        name='recipeHopTimes'
                        id='recipeHopTimes'
                        value={this.props.recipeHopTimes[this.props.index]}
                        onChange={this.props.handleChange}
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