import React from 'react'
import RecipeView from './RecipeView.js'
import RecipeForm from './RecipeForm.js'
import '../css/view-db.css'
import '../css/list-db.css'
import MaltDetails from '../reference_components/MaltDetails.js'


class Recipe extends React.Component {
    render() {
        return (
            <div className='list-db-list-item'>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.recipe.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn' onClick={() => this.props.viewRecipe(this.props.recipe.id)}>View</button>
                        <button className='list-db-item-btn' onClick={() => this.props.setUpEdit(this.props.recipe.id)}>Edit</button>
                        <button className='list-db-item-btn' onClick={() => this.props.deleteReceipeSequence(this.props.recipe.id)}>Delete</button>
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
        editRecipe: false,
        recipes: [],
        currentRecipe: {},
        recipeStyleLedgers: [],
        currentStyleList: [],
        currentGrainList: [],
        recipeGrainLedgers: [],
        currentHopList: [],
        recipeHopLedgers: [],
        currentYeastList: [],
        recipeYeastLedgers: []
    }
    /* Recipe DB **********************************************************************************/ 
    getRecipeList = () => {
        fetch('http://localhost:3000/recipes')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({recipes: parsedData})
            })
    } 
    /* Recipe Style *******************************************************************************/
    sortRecipeStyle = (ledgerArr,styleArr) => {
        let sortedStyles = []
        for(let ledgerIndex=0;ledgerIndex<ledgerArr.length;ledgerIndex++){
            for(let styleIndex=0;styleIndex<styleArr.length;styleIndex++){
                if(styleArr[styleIndex].id === ledgerArr[ledgerIndex].style_id){
                    sortedStyles.push(styleArr[styleIndex])
                    break;
                }
            }
        }
        this.setState({currentStyleList: sortedStyles})
        console.log('Sorted Styles: ',sortedStyles)
        console.log('Current StyleLilst: ',this.state.currentStyleList)
    }
    getRecipeStyle = arr => {
        let styleArr = []
        for(let i=0;i<arr.length;i++){
            fetch(`http://localhost:3000/styles/${arr[i].style_id}`)
                .then(data => data.json(), err => console.log(err))
                .then(parsedData => {
                    styleArr.push(parsedData)
                })
        }
        setTimeout(() => this.sortRecipeStyle(arr,styleArr),500)
    }
    getRecipeStyleLedgers = id => {
        fetch('http://localhost:3000/recipe_style_ledgers')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                console.log('Recipe Style Ledgers Fetch: ',parsedData)
                let recipeStyleLedgerArr = []
                for(let i=0;i<parsedData.length;i++){
                    if(parsedData[i].recipe_id === id){
                        recipeStyleLedgerArr.push(parsedData[i])
                        break;
                    }
                }
                this.setState({recipeStyleLedgers: recipeStyleLedgerArr})
                this.getRecipeStyle(recipeStyleLedgerArr)
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
    /* DELETE RECIPES *************************************************************************************************************/
    deleteRecipeLedgers = (id,whichLedger) => {
        fetch(`http://localhost:3000/recipe_${whichLedger}_ledgers`)
            .then(res => res.json())
            .then(resJson => {
                for(let i=0;i<resJson.length;i++){
                    if(resJson[i].recipe_id === id){
                        fetch(`http://localhost:3000/recipe_${whichLedger}_ledgers/${resJson[i].id}`, {
                            method: 'DELETE',
                            headers: {'Content-Type' : 'application/json'}
                        }).then(res => console.log(res))
                    }
                }
            })
        setTimeout(this.getRecipeList,500) 
    }
    deleteReceipe = id => {
        fetch(`http://localhost:3000/recipes/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'}
        }).then(res => console.log(res))
        setTimeout(this.getRecipeList,44)
    }
    deleteReceipeSequence = id => {
        this.deleteRecipeLedgers(id,'style')
        this.deleteRecipeLedgers(id,'grain')
        this.deleteRecipeLedgers(id,'hop')
        this.deleteRecipeLedgers(id,'yeast')
        
        setTimeout(() => this.deleteReceipe(id),800)
    }
    handlePage = state => {
        if(state === 'list'){
            this.setState({showList: true})
            this.setState({editRecipe: false})
            this.setState({currentRecipe: {}})
        } else if(state === 'view') {
            this.setState({viewItem: true})
            this.setState({showList: false})
        } else if(state === 'add' || state === 'edit'){
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
        this.getRecipeStyleLedgers(id)
        this.getRecipeGrainLedgers(id)
        this.getRecipeHopLedgers(id)   
        this.getRecipeYeastLedgers(id)
        if(this.state.editRecipe === false){
            setTimeout(() => this.handlePage('view'),1000)
        }
    }
    setUpEdit = id => {
        let editingRecipe = {}
        for(let i=0;i<this.state.recipes.length;i++){
            if(this.state.recipes[i].id === id){
                editingRecipe = this.state.recipes[i]
                break
            }
        }
        this.setState({editRecipe: true})
        setTimeout(() => this.viewRecipe(id),500)
        setTimeout(() => this.handlePage('edit'),1000)
    }
    render() {

        //console.log('Current Style List:',this.state.currentStyleList)
        // console.log('Current Recipe: ',this.state.currentRecipe)

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
                                            deleteReceipeSequence={this.deleteReceipeSequence}
                                            setUpEdit={this.setUpEdit}
                                        />
                                    ))}
                                </div>
                            :
                                <div className='list-db-item-view'>
                                    {this.state.viewItem ?
                                        <RecipeView 
                                            recipe={this.state.currentRecipe}
                                            styleList={this.state.currentStyleList}
                                            grainList={this.state.currentGrainList}
                                            hopList={this.state.currentHopList}
                                            yeastList={this.state.currentYeastList}
                                            recipeStyleLedgers={this.state.recipeStyleLedgers}
                                            recipeGrainLedgers={this.state.recipeGrainLedgers}
                                            recipeHopLedgers={this.state.recipeHopLedgers}
                                            recipeYeastLedgers={this.state.recipeYeastLedgers}
                                        />
                                    :
                                        <div className='recipe-form-container'>
                                            { !this.state.editItem ?
                                                <RecipeForm 
                                                    srmColors={this.props.srmColors}
                                                    handlePage={this.handlePage}
                                                    getRecipeList={this.getRecipeList}
                                                    handlePage={this.handlePage}
                                                    editRecipe={this.state.editRecipe}
                                                    currentRecipe={this.state.currentRecipe}
                                                    currentStyleList={this.state.currentStyleList}
                                                    viewRecipe={this.state.viewRecipe}
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