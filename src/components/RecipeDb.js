import React from 'react'
import RecipeView from './RecipeView.js'
import RecipeForm from './RecipeForm.js'
import '../css/view-db.css'
import '../css/list-db.css'


class Recipe extends React.Component {
    render() {
        return (
            <div className='list-db-list-item'>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.recipe.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn' onClick={() => this.props.viewRecipe(this.props.recipe.id)}>View</button>
                        <button className='list-db-item-btn' onClick={() => this.props.handlePage('edit')}>Edit</button>
                        <button className='list-db-item-btn'>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
class RecipeDb extends React.Component {
    state = {
        showList: true,
        viewItem: false,
        editItem: false,
        showForm: false,
        recipes: [],
        currentRecipe: {},
        currentGrainList: [],
        recipeGrainLedgers: [],
        currentHopList: [],
        recipeHopLedgers: [],
        currentYeastList: [],
        recipeYeastLedgers: []
    }
    /* Get Recipe List ****************************************************************************/ 
    getRecipeList = () => {
        fetch('http://localhost:3000/recipes')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({recipes: parsedData})
            })
    }
    /* Recipe Grains ******************************************************************************/
    sortRecipeGrain = (ledgerArr,grainArr) => {
        let sortedGrains = []
        for(let ledgerIndex=0;ledgerIndex<ledgerArr.length;ledgerIndex++){
            for(let grainIndex=0;grainIndex<grainArr.length;grainIndex++){
                if(grainArr[grainIndex].id === ledgerArr[ledgerIndex].grain_id){
                    sortedGrains.push(grainArr[grainIndex])
                    break;
                }
            }
        }
        this.setState({currentGrainList: sortedGrains})
    }
    getRecipeGrain = arr => {
        let grainArr = []
        for(let i=0;i<arr.length;i++){
            fetch(`http://localhost:3000/grains/${arr[i].grain_id}`)
                .then(data => data.json(), err => console.log(err))
                .then(parsedData => {
                    grainArr.push(parsedData)
                })
        }
        setTimeout(() => this.sortRecipeGrain(arr,grainArr),500)
    }
    getRecipeGrainLedgers = id => {
        fetch(`http://localhost:3000/recipe_grain_ledgers`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                let recipeGrainLedgerArr = []
                for(let i=0;i<parsedData.length;i++){
                    if(parsedData[i].recipe_id === id){
                        recipeGrainLedgerArr.push(parsedData[i])
                    }
                }
                this.setState({recipeGrainLedgers: recipeGrainLedgerArr})
                this.getRecipeGrain(recipeGrainLedgerArr)
            })
    }
    /* Recipe Hops **********************************************************************************/
    sortRecipeHop = (ledgerArr,hopArr) => {
        let sortedHops = []
        for(let ledgerIndex=0;ledgerIndex<ledgerArr.length;ledgerIndex++){
            for(let hopIndex=0;hopIndex<hopArr.length;hopIndex++){
                if(hopArr[hopIndex].id === ledgerArr[ledgerIndex].hop_id){
                    sortedHops.push(hopArr[hopIndex])
                    break;
                }
            }
        }
        this.setState({currentHopList: sortedHops})
    }
    getRecipeHop = arr => {
        let hopArr = []
        for(let i=0;i<arr.length;i++){
            fetch(`http://localhost:3000/hops/${arr[i].hop_id}`)
                .then(data => data.json(), err => console.log(err))
                .then(parsedData => {
                    hopArr.push(parsedData)
                })
        }
        setTimeout(() => this.sortRecipeHop(arr,hopArr),500)
    }
    getRecipeHopLedgers = id => {
        fetch(`http://localhost:3000/recipe_hop_ledgers`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                let recipeHopLedgerArr = []
                for(let i=0;i<parsedData.length;i++){
                    if(parsedData[i].recipe_id === id){
                        recipeHopLedgerArr.push(parsedData[i])
                    }
                }
                this.setState({recipeHopLedgers: recipeHopLedgerArr})
                this.getRecipeHop(recipeHopLedgerArr)
            })
    }
    /* Recipe Yeast *****************************************************************************************************/
    sortRecipeYeast = (ledgerArr,yeastArr) => {
        let sortedYeasts = []
        for(let ledgerIndex=0;ledgerIndex<ledgerArr.length;ledgerIndex++){
            for(let yeastIndex=0;yeastIndex<yeastArr.length;yeastIndex++){
                if(yeastArr[yeastIndex].id === ledgerArr[ledgerIndex].yeast_id){
                    sortedYeasts.push(yeastArr[yeastIndex])
                    break;
                }
            }
        }
        this.setState({currentYeastList: sortedYeasts})
    }
    getRecipeYeast = arr => {
        let yeastArr = []
        for(let i=0;i<arr.length;i++){
            fetch(`http://localhost:3000/yeasts/${arr[i].yeast_id}`)
                .then(data => data.json(), err => console.log(err))
                .then(parsedData => {
                    yeastArr.push(parsedData)
                })
        }
        setTimeout(() => this.sortRecipeYeast(arr,yeastArr),500)
    }
    getRecipeYeastLedgers = id => {
        fetch(`http://localhost:3000/recipe_yeast_ledgers`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                let recipeYeastLedgerArr = []
                for(let i=0;i<parsedData.length;i++){
                    if(parsedData[i].recipe_id === id){
                        recipeYeastLedgerArr.push(parsedData[i])
                    }
                }
                this.setState({recipeYeastLedgers: recipeYeastLedgerArr})
                this.getRecipeYeast(recipeYeastLedgerArr)
            })
    }
    handlePage = state => {
        if(state === 'list'){
            this.setState({showList: true})
        } else if(state === 'view') {
            this.setState({viewItem: true})
            this.setState({showList: false})
        } else if(state === 'edit') {
            this.setState({editItem: true})
            this.setState({viewItem: false})
            this.setState({showList: false})
        } else if(state === 'add'){
            this.setState({editItem: false})
            this.setState({viewItem: false})
            this.setState({showList: false})
        }
    }
    viewRecipe = id => {
        let currentRecipe = {}
        for(let i=0;i<this.state.recipes.length;i++){
            if(this.state.recipes[i].id === id){
                currentRecipe = this.state.recipes[i]
                break
            }
        }
        this.setState({currentRecipe: currentRecipe})
        this.getRecipeGrainLedgers(id)
        this.getRecipeHopLedgers(id)   
        this.getRecipeYeastLedgers(id)
        setTimeout(() => this.handlePage('view'),500)
    }
    render() {
        return (
            <div className='recipe-container'>
                <div className='list'>
                    <div className='list-db'>
                        <div className='list-db-header'>
                            <div className='list-db-title'>Recipes</div>
                            <button className='list-db-add' onClick={() => this.handlePage('add')}>Add Recipe</button>
                            <button className='list-db-see-all' onClick={() => this.handlePage('list')}>See All Recipes</button>
                        </div>
                            { this.state.showList ?
                                <div className='list-db-list'>
                                    {this.state.recipes.map(recipe => (
                                        <Recipe 
                                            key={recipe.id}
                                            recipe={recipe}
                                            handlePage={this.handlePage}
                                            viewRecipe={this.viewRecipe}
                                        />
                                    ))}
                                </div>
                            :
                                <div className='list-db-item-view'>
                                    {this.state.viewItem ?
                                        <RecipeView 
                                            recipe={this.state.currentRecipe}
                                            grainList={this.state.currentGrainList}
                                            hopList={this.state.currentHopList}
                                            yeastList={this.state.currentYeastList}
                                            recipeGrainLedgers={this.state.recipeGrainLedgers}
                                            recipeHopLedgers={this.state.recipeHopLedgers}
                                            recipeYeastLedgers={this.state.recipeYeastLedgers}
                                        />
                                    :
                                        <div className='recipe-form-container'>
                                            { !this.state.editItem ?
                                                <RecipeForm 
                                                    srmColors={this.props.srmColors}
                                                />
                                            :
                                                <h2>Edit Item</h2>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getRecipeList()
    }
}
export default RecipeDb