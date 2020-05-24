import React from 'react'
import Select from 'react-select'
import '../css/recipe-form.css'


class Malt extends React.Component {
    handleSelectChange = e => {
        this.props.handleRecipeState(this.props.recipeMaltList,e,this.props.index)
    }
    // handleAmountChange = e => {
    //     this.props.handleRecipeState(this.props.recipeMaltAmounts,e,this.props.index)
    // }
    handlePercentChange = e => {
        this.props.handleRecipeState(this.props.recipeMaltPercentages,e,this.props.index)
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
                        onChange={() => this.props.handleRecipeState(this.props.recipeMaltAmounts,this.props.recipeMaltAmounts[this.props.index],this.props.index)}

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
                    <button onClick={() => this.props.changeMaltArraySize('subtract')}>Delete</button>
                </div>
            </div>
        )
    }
}

class RecipeForm extends React.Component {
    state = {
        styleList: [],
        maltList: [],
        hopList: [],
        yeastList: [],

        name: "",
        description: "",
        volume: 0,
        efficiency: 0,
        selectedStyle: {},
        og: 0,
        fg: 0,
        avb: 0,
        ibu: 0,
        srm: 1,

        recipeMaltList: [{}],
        recipeMaltAmounts: [1],
        recipeMaltPercentages: [2],
    }
    /* GET INGREDIENTS FROM THE DATABASE **************************************************************/
    getStyleList = () => {
        fetch('http://localhost:3000/styles')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                const dataArr = []
                for(let i=0;i<parsedData.length;i++){
                    let listEntry = {
                        label: parsedData[i].name,
                        value: parsedData[i]
                    }
                    dataArr.push(listEntry)
                }
                this.setState({styleList: dataArr})
            })
    }
    getMaltList = () => {
        fetch('http://localhost:3000/grains')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                const dataArr = []
                for(let i=0;i<parsedData.length;i++){
                    let listEntry = {
                        label: parsedData[i].name,
                        value: parsedData[i]
                    }
                    dataArr.push(listEntry)
                }
                this.setState({maltList: dataArr})
            })
    }
    getHopList = () => {
        fetch('http://localhost:3000/hops')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({hopList: parsedData})
            })
    }
    getYeastList = () => {
        fetch('http://localhost:3000/yeasts')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({yeastList: parsedData})
            })
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
    } 
    handleRecipeState = (state,event,index) => {
        let tempArray = state
        tempArray[index] = event
        this.setState({state: tempArray})
    }
    /* Handle Recipt Style **************************************************************************/
    handleSelectStyle = selectedOption => {
        this.setState({selectedStyle: selectedOption})
    }
    /* Handle Recipe Malt Content *******************************************************************/ 
    changeMaltArraySize = (action) => {
        let maltListArr = this.state.recipeMaltList
        let maltAmountArr = this.state.recipeMaltAmounts
        let maltPercentagesArr = this.state.recipeMaltPercentages
        if(action === 'add'){
            maltListArr.push({})
            maltAmountArr.push(0)
            maltPercentagesArr.push(0)

        } else if(action === 'subtract'){
            maltListArr.pop()
            maltAmountArr.pop()
            maltPercentagesArr.pop()
        }
        this.setState({recipeMaltList: maltListArr})
        this.setState({recipeMaltAmounts: maltAmountArr})
        this.setState({recipeMaltPercentages: maltPercentagesArr})
    }


    render() {

        console.log('Recipe Malt List: ',this.state.recipeMaltList)
        console.log('Recipe Malt Amounts: ', this.state.recipeMaltAmounts)
        console.log('Recipe Malt Percentages', this.state.recipeMaltPercentages)

        return (
            <div className='recipe-form'>
                <div className='recipe-form-data'>
                    <div className='recipe-form-data-title'>New Recipe</div>
                    {/* RECIPE FORM ROW 1 ************************************************************/}
                    <div className='recipe-form-data-row'>
                        <div className='recipe-form-data-column'>
                            <div className='recipe-form-data-label'>Name</div>
                            <input
                                className='recipe-form-data-input' 
                                type="text"
                                name='name'
                                id='name'
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='recipe-form-data-column'>
                        <div className='recipe-form-data-label'>Description</div>
                            <input 
                                className='recipe-form-data-input'
                                type="text"
                                name='description'
                                id='description'
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    {/* RECIPE FORM ROW 2 ************************************************************/}
                    <div className='recipe-form-data-column'>
                        <div className='recipe-form-data-subtitle'>Recipe Parameters</div>
                        <div className='recipe-form-data-row'> 
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>Select Style</div>
                                <Select
                                    value={this.state.selectedStyle}
                                    options={this.state.styleList}
                                    onChange={this.handleSelectStyle}
                                />
                            </div>
                            <div className='form-data-column'>
                                <div className='recipe-form-data-label'>Batch Volume</div>
                                <input 
                                    className='recipe-form-data-input'
                                    type="number"
                                    name='volume'
                                    id='volume'
                                    value={this.state.volume}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>Efficiency</div>
                                <input 
                                    className='recipe-form-data-input'
                                    type="text"
                                    name='efficiency'
                                    id='efficiency'
                                    value={this.state.efficiency}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* RECIPE FORM ROW 3 ************************************************************/}
                    <div className='recipe-form-data-column'>
                        <div className='recipe-form-data-subtitle'>Final Values</div>
                        <div className='recipe-form-data-row'>
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>O.G.</div>
                                <input 
                                    className='recipe-form-data-input'
                                    type="decimal"
                                    name='og'
                                    id='og'
                                    value={this.state.og}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>F.G.</div>
                                <input 
                                    className='recipe-form-data-input'
                                    type="text"
                                    name='fg'
                                    id='fg'
                                    value={this.state.fg}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>AVB</div>
                                <input 
                                    className='recipe-form-data-input'
                                    type="decimal"
                                    name='avb'
                                    id='avb'
                                    value={this.state.avb}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>IBU</div>
                                <input 
                                    className='recipe-form-data-input'
                                    type="decimal"
                                    name='ibu'
                                    id='ibu'
                                    value={this.state.ibu}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='recipe-form-data-column'>
                                <div className='recipe-form-data-label'>SRM</div>
                                <div
                                    style = {{
                                        width: 'auto',
                                        height: '25px',
                                        backgroundColor: this.props.srmColors[this.state.srm - 1],
                                        fontSize: '16px',
                                        color: 'white',
                                        textShadow: '1px 1px black',
                                        border: '1px solid black',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >{this.state.srm}</div>
                            </div>
                            <button>Compare To Style</button>
                        </div>
                    </div>
                    {/* ROW 4 GRAIN BILL *************************************************************/}
                    <div className='recipe-form-data-column'>
                        <div className='recipe-form-data-subtitle'>Grain Bill</div>
                        <button onClick={() => this.changeMaltArraySize('add')}>Add</button>
                        <div className='recipe-form-data-column'>
                            {this.state.recipeMaltList.map((malt,index) => (
                                <Malt 
                                    key={index}
                                    maltList={this.state.maltList}
                                    changeMaltArraySize={this.changeMaltArraySize}
                                    recipeMaltList={this.state.recipeMaltList}
                                    index={index}
                                    handleRecipeState={this.handleRecipeState}

                                    recipeMaltList={this.state.recipeMaltList}
                                    recipeMaltAmounts={this.state.recipeMaltAmounts}
                                    recipeMaltPercentages={this.state.recipeMaltPercentages}

                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getStyleList()
        this.getMaltList()
        this.getHopList()
        this.getYeastList()
    }
}
export default RecipeForm