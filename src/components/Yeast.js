import React from 'react'
import Select from 'react-select'
 
class Yeast extends React.Component {
    handleSelectChange = e => {
        this.props.handleRecipeState(this.props.recipeYeastList,e,this.props.index)
    }
    render() {
        return (
            <div className='recipe-form-data-row'>
                <div className='reicpe-form-data-column'>
                    <div className='recipe-form-data-label'>Amount</div>
                    <input 
                        type="number"
                        name='recipeYeastAmount'
                        id='recipeYeastAmount'
                        value={this.props.recipeYeastAmounts[this.props.index]}
                        onChange={this.props.handleChange}
                    />
                </div>
                <div className='recipe-form-data-column'>   
                    <div className='recipe-form-data-label'>Select Yeast</div>
                    <Select 
                        value={this.props.recipeYeastList[this.props.index]}
                        onChange={this.handlSelectChange}
                        options={this.props.yeastList}
                    />
                </div>
                <div className='recipe-form-data-column'>
                    <button>View</button>
                    <button onClick={() => this.props.changeYeastArraySize('delete',this.props.index)}>Delete</button>
                </div>
            </div>
        )
    }
}
export default Yeast