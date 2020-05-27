import React from 'react'
import Select from 'react-select'
 
class Yeast extends React.Component {
    handleSelectChange = e => {
        this.props.handleRecipeState(this.props.recipeYeastList,e,this.props.index)
    }
    handleDetailViewLocal = (state,hop) => {
        this.props.handleDetailView(state)
        this.props.handleDetail(hop.value)
    }
    render() {
        return (
            <div className='recipe-form-data-row'>
                <div className='recipe-form-data-column'>   
                    <div className='recipe-form-data-label'>Select Yeast</div>
                    <Select 
                        value={this.props.recipeYeastList[this.props.index]}
                        onChange={this.handleSelectChange}
                        options={this.props.yeastList}
                    />
                </div>
                <div className='recipe-form-data-row' style={{width: 'auto', alignSelf: 'flex-end'}}>
                    <button className='recipe-form-data-view' onClick={() => this.handleDetailViewLocal(true,this.props.recipeYeastList[this.props.index])}>View</button>
                    <button className='recipe-form-data-delete' onClick={() => this.props.changeYeastArraySize('delete',this.props.index)}>Delete</button>
                </div>
            </div>
        )
    }
}
export default Yeast