import React from 'react'
import Select from 'react-select'
import Malt from './Malt.js'
import Hop from './Hop.js'
import Yeast from './Yeast.js'
import '../css/recipe-form.css'
import StyleComparison from './StyleComparison.js'
import MaltDetails from '../reference_components/MaltDetails.js'
import HopDetails from '../reference_components/HopDetails.js'
import YeastDetails from '../reference_components/YeastDetails.js'


class RecipeForm extends React.Component {
    state = {
        styleList: [],
        maltList: [],
        hopList: [],
        yeastList: [],

        totalGravity: 0,

        showStyleCompare: false,

        name: this.props.currentRecipe.name,
        description: this.props.currentRecipe.description,
        volume: this.props.currentRecipe.volume,
        efficiency: this.props.currentRecipe.efficiency,
        selectedStyle: this.props.currentStyleList[0],
        og: this.props.currentRecipe.og,
        fg: this.props.currentRecipe.fg,
        avb: this.props.currentRecipe.alc_by_vol,
        ibu: this.props.currentRecipe.ibu,
        srm: this.props.currentRecipe.srm,

        currentRecipeId: this.props.currentRecipe.id,

        recipeMaltList: [{}],
        recipeMaltAmounts: [null],
        recipeMaltPercentages: [null],

        recipeHopList: [{}],
        recipeHopAmounts: [1],
        recipeHopTimes: [60],

        recipeYeastList: [{}], 
        recipeYeastAmounts: [1],

        detailMalt: {},
        maltDetailView: false,
        detailHop: {},
        hopDetailView: false,
        detailYeast: {},
        yeastDetailView: false
    }
    /* ADD RECIPE *************************************************************************************/
    addYeastLedgers = () => {
        for(let i=0;i<this.state.recipeYeastList.length;i++){
            fetch('http://localhost:3000/recipe_yeast_ledgers', {
                method: 'POST',
                body: JSON.stringify({
                    recipe_id: this.state.currentRecipeId,
                    yeast_id: this.state.recipeYeastList[i].value.id,
                    qty: this.state.recipeYeastAmounts[i]
                }),
                headers: {'Content-Type' : 'application/json'}
            }).then(res => res.json())
            .then(resJson => {
                console.log('Add Recipe Yeast Ledger Resp: ',resJson)
            })
        }
        setTimeout(this.props.getRecipeList,200)
        setTimeout(this.props.handlePage('list'),300)
    }
    addHopLedgers = () => {
        for(let i=0;i<this.state.recipeHopList.length;i++){
            fetch('http://localhost:3000/recipe_hop_ledgers', {
                method: 'POST',
                body: JSON.stringify({
                    recipe_id: this.state.currentRecipeId,
                    hop_id: this.state.recipeHopList[i].value.id,
                    qty: this.state.recipeHopAmounts[i],
                    time: this.state.recipeHopTimes[i]
                }),
                headers: {'Content-Type' : 'application/json'}
            }).then(res => res.json())
            .then(resJson => {
                console.log('Add recipe hop ledger response: ',resJson)
            })
        }
        setTimeout(this.addYeastLedgers,100)
    }
    addMaltLedgers = () => {
        for(let i=0;i<this.state.recipeMaltList.length;i++){
            fetch('http://localhost:3000/recipe_grain_ledgers', {
                method: 'POST',
                body: JSON.stringify({
                    recipe_id: this.state.currentRecipeId,
                    grain_id: this.state.recipeMaltList[i].value.id,
                    qty: this.state.recipeMaltAmounts[i],
                    percentage: this.state.recipeMaltPercentages[i]
                }),
                headers: {'Content-Type' : 'application/json'}
            }).then(res => res.json())
            .then(resJson => {
                console.log('Add recipe grain ledger response: ',resJson)
            })
        }
        setTimeout(this.addHopLedgers,100)
    }
    addStyleLedger = () => {
        fetch('http://localhost:3000/recipe_style_ledgers', {
            method: 'POST',
            body: JSON.stringify({
                recipe_id: this.state.currentRecipeId,
                style_id: this.state.selectedStyle.value.id
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('Add Recipe Style Ledger Res: ',resJson)
        })
        setTimeout(this.addMaltLedgers,100)
    }
    addRecipe = () => {
        fetch('http://localhost:3000/recipes', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                volume: this.state.volume,
                efficiency: this.state.efficiency,
                og: this.state.og,
                fg: this.state.fg,
                alc_by_vol: this.state.alc_by_vol,
                ibu: this.state.ibu,
                srm: this.state.srm
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('Add Recipe: ',resJson)
            this.setState({currentRecipeId: resJson.id})
        })
        setTimeout(this.addStyleLedger,300)
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
                const dataArr = []
                for(let i=0;i<parsedData.length;i++){
                    let listEntry = {
                        label: parsedData[i].name,
                        value: parsedData[i]
                    }
                    dataArr.push(listEntry)
                }
                this.setState({hopList: dataArr})
            })
    }
    getYeastList = () => {
        fetch('http://localhost:3000/yeasts')
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
                this.setState({yeastList: dataArr})
            })
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })

        this.determineCalculations(event.target.id)
    } 
    handleRecipeState = (state,event,index) => {
        let tempArray = state
        tempArray[index] = event
        this.setState({state: tempArray})
        this.determineCalculations(state)
    }
    /* Handle Recipt Style **************************************************************************/
    handleSelectStyle = selectedOption => {
        this.setState({selectedStyle: selectedOption})
    }
    /* Handle Recipe Content ***********************************************************************/ 
    changeMaltArraySize = (action,index) => {
        let maltListArr = this.state.recipeMaltList
        let maltAmountArr = this.state.recipeMaltAmounts
        let maltPercentagesArr = this.state.recipeMaltPercentages
        if(action === 'add'){
            maltListArr.push(this.state.maltList[0])
            maltAmountArr.push(null)
            maltPercentagesArr.push(null)

        } else if(action === 'delete'){
            if(this.state.recipeMaltList.length > 1){
                maltListArr.splice(index,1)
                maltAmountArr.splice(index,1)
                maltPercentagesArr.splice(index,1)
            }
        }
        this.setState({recipeMaltList: maltListArr})
        this.setState({recipeMaltAmounts: maltAmountArr})
        this.setState({recipeMaltPercentages: maltPercentagesArr})
    }
    changeHopArraySize = (action,index) => {
        let hopListArr = this.state.recipeHopList
        let hopAmountArr = this.state.recipeHopAmounts
        let hopTimeArr = this.state.recipeHopTimes
        if(action === 'add'){
            hopListArr.push({})
            hopAmountArr.push(0)
            hopTimeArr.push(0)
        } else if(action === 'delete'){
            if(this.state.recipeHopList.length > 1){
                hopListArr.splice(index,1)
                hopAmountArr.splice(index,1)
                hopTimeArr.splice(index,1)
            }
        }
        this.setState({recipeHopList: hopListArr})
        this.setState({recipeHopAmounts: hopAmountArr})
        this.setState({recipeHopTimes: hopTimeArr})
    }
    changeYeastArraySize = (action,index) => {
        let yeastListArr = this.state.recipeYeastList
        let yeastAmountArr = this.state.recipeHopAmounts
        if(action === 'add'){
            yeastListArr.push({})
            yeastAmountArr.push(0)
        } else if(action === 'delete'){
            if(this.state.recipeYeastList.length > 1){
                yeastListArr.splice(index,1)
                yeastAmountArr.splice(index,1)
            }
        }
        this.setState({recipeYeastList: yeastListArr})
        this.setState({recipeYeastAmounts: yeastAmountArr})
    }
    /* RECIPE CALCULATIONS ****************************************************************************/
    calculateOGWithTotalGU = (totalGU) => {
        let recipeOG = (((totalGU / this.state.volume).toFixed(0)) / 1000) + 1
        this.setState({og: recipeOG})
    }
    calculateGrainBillFromAmountChange = () => {
        // add up the total malt amount
        let totalMaltAmount = 0
        for(let i=0;i<this.state.recipeMaltAmounts.length;i++){
            if(this.state.recipeMaltAmounts[i] !== null){
                totalMaltAmount = totalMaltAmount + this.state.recipeMaltAmounts[i]
            }
        }
        // determine percetage of each malt
        let maltPercentArr = []
        for(let j=0;j<this.state.recipeMaltAmounts.length;j++){
            // determine percentages of each malt
            let maltPercent = ((this.state.recipeMaltAmounts[j] / totalMaltAmount) * 100).toFixed(1) 
            maltPercentArr.push(maltPercent)
        }
        let totalGU = 0
        this.setState({recipeMaltPercentages: maltPercentArr})
        // determine proportional amounts
        for(let k=0;k<this.state.recipeMaltAmounts.length;k++){
            let maltGU = (((this.state.recipeMaltList[k].value.potential) - 1) * 1000).toFixed(0)
            let proportionalAmount = Number((maltGU * this.state.recipeMaltAmounts[k] * (this.state.efficiency / 100)).toFixed(0))
            totalGU += proportionalAmount;
        }
        this.calculateOGWithTotalGU(totalGU)
    }
    calculateGrainBillFromOG = () => {

    }
    calculateAVB = (og,fg) => {
        let avb = ((og - fg) * 131.25).toFixed(2)
        this.setState({avb})
    }
    calculateFGFromYeastChange = () => {
        let og = ((this.state.og - 1) * 1000).toFixed(0)
        let attenuation = this.state.recipeYeastList[0].value.attenuation / 100
        let fg = (((og - (og * attenuation)).toFixed(0)) / 1000) + 1
        og = (og / 1000) + 1
        this.setState({fg})
        // calculate AVB
        this.calculateAVB(og,fg)
    }
    /* CALCULATE IBU ****************************************************************************/
    calculateIBU = () => {
        if(this.state.og !== '-'){
            // determine cgravity
            let cgravity = 1 + ((this.state.og - 1.050) / 2)
            let totalIBU = 0
            for(let i=0;i<this.state.recipeHopList.length;i++){
                let time = this.state.recipeHopTimes[i]
                let amount = this.state.recipeHopAmounts[i]
                let alpha = (this.state.recipeHopList[i].value.alpha / 100)
                let utilization = 0
                if(time > 75){
                    utilization = 34
                } else if(time < 75 && time >= 60) {
                    utilization = 30
                } else if(time < 60 && time >= 45) {
                    utilization = 27
                } else if(time < 45 && time >= 30) {
                    utilization = 24
                } else if(time < 30 && time >= 20) {
                    utilization = 19
                } else if(time < 20 && time >= 10) {
                    utilization = 15
                } else if(time < 10 && time > 0) {
                    utilization = 6
                } else if(time = 0) {
                    utilization = 0
                }
                utilization = utilization / 100
                let ibu = (amount * utilization * alpha * utilization * 7489) / (this.state.volume / cgravity)
                totalIBU += ibu
            }
            this.setState({ibu: (totalIBU).toFixed(0)})
        }
    }
    /* CALCULATE SRM ****************************************************************************/
    calculateSRM = () => {
        let mcuTotal = 0
        for(let i=0;i<this.state.recipeMaltList.length;i++){
            let mcu = (this.state.recipeMaltList[i].value.color * this.state.recipeMaltAmounts[i])
            mcuTotal += mcu
        }
        mcuTotal = mcuTotal / this.state.volume
        let srmTotal = (1.4922 * Math.pow(mcuTotal,0.6859)).toFixed(0)
        if(srmTotal > 40){
            srmTotal = 40
        }
        this.setState({srm: srmTotal})
    }
    determineCalculations = (state) => {
        if(state === this.state.recipeMaltAmounts || state === this.state.recipeMaltList){
            if(Object.keys(this.state.recipeMaltList[this.state.recipeMaltList.length - 1]).length > 0){
                this.calculateGrainBillFromAmountChange()
                this.calculateSRM()
                if(Object.keys(this.state.recipeYeastList[this.state.recipeYeastList.length - 1]).length > 0) {
                    this.calculateFGFromYeastChange()
                }
            }
            if(Object.keys(this.state.recipeHopList[this.state.recipeHopList.length - 1]).length > 0){
                this.calculateIBU()
            }
        } else if(state === this.state.recipeYeastList) {
            this.calculateFGFromYeastChange()
        } else if(state === this.state.recipeHopList || state === this.state.recipeHopAmounts || state === this.state.recipeHopTimes) {
            if(Object.keys(this.state.recipeHopList[this.state.recipeHopList.length - 1]).length > 0){
                this.calculateIBU()
            }
        } else if(state === this.state.volume){
            if(Object.keys(this.state.recipeMaltList[this.state.recipeMaltList.length - 1]).length > 0){
                this.calculateGrainBillFromAmountChange()
                this.calculateSRM()
                if(Object.keys(this.state.recipeYeastList[this.state.recipeYeastList.length - 1]).length > 0) {
                    this.calculateFGFromYeastChange()
                }
            }
        } else if(state === this.state.efficiency) {
            if(Object.keys(this.state.recipeMaltList[this.state.recipeMaltList.length - 1]).length > 0){
                this.calculateGrainBillFromAmountChange()
                this.calculateSRM()
                if(Object.keys(this.state.recipeYeastList[this.state.recipeYeastList.length - 1]).length > 0) {
                    this.calculateFGFromYeastChange()
                }
            }
        }
    }
    /* Page  *******************************************************************************************/
    handleStyleCompare = state => {
        this.setState({showStyleCompare: state})
    }
    handleDetailMalt = (malt) => {
        this.setState({detailMalt: malt})
    }
    handleMaltDetailView = state => {
        this.setState({showMaltDetail: state})
    }
    handleDetailHop = hop => {
        this.setState({detailHop: hop})
    }
    handleHopDetailView = state => {
        this.setState({showHopDetail: state})        
    }
    handleDetailYeast = yeast => {
        this.setState({detailYeast: yeast})
    }
    handleYeastDetailView = state => {
        this.setState({showYeastDetail: state})      
    }
    render() {

        console.log('Current Style List[0]: ',this.props.currentStyleList[0])
        // console.log('Selected Style: ',this.state.selectedStyle)

        return (
            <div className='recipe-form'>
                <div className='recipe-form-data'>
                    {!this.props.editRecipe ? 
                        <div className='recipe-form-data-title'>Add Recipe</div>
                    :
                        <div className='recipe-form-data-title'>Edit Recipe</div>
                    }
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
                                    type="text"
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
                                <div className='recipe-form-data-label'>A.B.V.</div>
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
                                        backgroundColor: this.props.srmColors[this.state.srm],
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
                            <button onClick={() => this.handleStyleCompare(true)}>Compare To Style</button>
                        </div>
                    </div>
                    {/* ROW 4 GRAIN BILL *************************************************************/}
                    <div className='recipe-form-data-column'>
                        <div className='recipe-form-data-subtitle'>Grain Bill</div>
                        <button onClick={() => this.changeMaltArraySize('add',0)}>Add</button>
                        <div className='recipe-form-data-column'>
                            {this.state.recipeMaltList.map((malt,index) => (
                                <Malt 
                                    key={index}
                                    maltList={this.state.maltList}
                                    changeMaltArraySize={this.changeMaltArraySize}
                                    index={index}
                                    handleRecipeState={this.handleRecipeState}
                                    handleChange={this.handleChange}

                                    recipeMaltList={this.state.recipeMaltList}
                                    recipeMaltAmounts={this.state.recipeMaltAmounts}
                                    recipeMaltPercentages={this.state.recipeMaltPercentages}

                                    handleDetailView={this.handleMaltDetailView}
                                    handleDetail={this.handleDetailMalt}
                                />
                            ))}
                        </div>
                    </div>
                    {/* ROW 5 HOP SCHEDULE ***********************************************************/}
                    <div className='recipe-form-data-column'>
                        <div className='reipce-form-data-subtitle'>Hop Schedule</div>
                        <button onClick={() => this.changeHopArraySize('add',0)}>Add</button>
                        <div className='recipe-form-data-column'>
                            {this.state.recipeHopList.map((hop,index) => (
                                <Hop
                                    key={index}
                                    hopList={this.state.hopList}
                                    changeHopArraySize={this.changeHopArraySize}
                                    index={index}
                                    handleRecipeState={this.handleRecipeState}
                                    handleChange={this.handleChange}
                                    handleIndexedChange={this.handleIndexedChange}

                                    recipeHopList={this.state.recipeHopList}
                                    recipeHopAmounts={this.state.recipeHopAmounts}
                                    recipeHopTimes={this.state.recipeHopTimes}

                                    handleDetailView={this.handleHopDetailView}
                                    handleDetail={this.handleDetailHop}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='recipe-form-data-column'>
                        <div className='recipe-form-data-subtitle'>Yeast</div>
                        <button onClick={() => this.changeYeastArraySize('add',0)}>Add</button>
                        <div className='recipe-form-data-column'>
                            {this.state.recipeYeastList.map((yeast,index) => (
                                <Yeast 
                                    key={index}
                                    yeastList={this.state.yeastList}
                                    changeYeastArraySize={this.changeYeastArraySize}
                                    index={index}
                                    handleRecipeState={this.handleRecipeState}
                                    handleChange={this.handleChange}

                                    recipeYeastList={this.state.recipeYeastList}
                                    recipeYeastAmounts={this.state.recipeYeastAmounts}
                                    
                                    handleDetailView={this.handleYeastDetailView}
                                    handleDetail={this.handleDetailYeast}
                                />
                            ))}
                        </div>

                    </div>
                </div>
                <div className='recipe-form-data-row'>
                    <button onClick={this.addRecipe}>Save</button>
                    <button onClick={() => this.props.handlePage('list')}>Cancel</button>
                </div>
                {this.state.showStyleCompare ?
                    <StyleComparison 
                        handleStyleCompare={this.handleStyleCompare}
                        selectedStyle={this.state.selectedStyle}
                        ibu={this.state.ibu}
                        srm={this.state.srm}
                        og={this.state.og}
                        fg={this.state.fg}
                        avb={this.state.avb}
                    />
                :    
                    <div></div>
                }
                { this.state.showMaltDetail ?
                    <MaltDetails 
                        malt={this.state.detailMalt}
                        handleDetailView={this.handleMaltDetailView}
                    />
                :
                        <div></div>
                }
                { this.state.showHopDetail ?
                    <HopDetails 
                        hop={this.state.detailHop}
                        handleDetailView={this.handleHopDetailView}
                    />
                :
                        <div></div>
                }
                { this.state.showYeastDetail ?
                    <YeastDetails 
                        yeast={this.state.detailYeast}
                        handleDetailView={this.handleYeastDetailView}
                    />
                :
                    <div></div>
                }
            </div>
        )
    }
    componentDidMount() {
        this.getStyleList()
        this.getMaltList()
        this.getHopList()
        this.getYeastList()

        if(this.props.recipeEdit){
            //this.props.viewRecipe(this.props.currentRecipe.id)
        }
    }
}
export default RecipeForm