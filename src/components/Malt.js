import React from 'react'
import Select from 'react-select'

class Malt extends React.Component {
    handleSelectChange = e => {
        this.props.handleRecipeState(this.props.recipeMaltList,e,this.props.index)
    }
    render() {
        return (
            <div className='recipe-form-data-row'>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Amount</div>
                    <input 
                        type="decimal"
                        name='recipeMaltAmounts'
                        id='recipeMaltAmounts'
                        value={this.props.recipeMaltAmounts[this.props.index]}
                        onChange={this.props.handleChange}

                    />
                </div>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Percentage</div>
                    <input 
                        type="decimal"
                        name='recipeMaltPercentages'
                        id='recipeMaltPercentages'
                        value={this.props.recipeMaltPercentages[this.props.index]}
                        onChange={this.handlePercentChange}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <div className='recipe-form-data-label'>Select Grain</div>
                    <Select
                        value={this.props.recipeMaltList[this.props.index]}
                        onChange={this.handleSelectChange}
                        options={this.props.maltList}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <button>View</button>
                    <button onClick={() => this.props.changeMaltArraySize('delete',this.props.index)}>Delete</button>
                </div>
            </div>
        )
    }
}
export default Malt