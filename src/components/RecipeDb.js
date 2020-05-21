import React from 'react'
import '../css/view-db.css'
import '../css/list-db.css'


class Recipe extends React.Component {
    render() {
        return (
            <div className='list-db-list-item'>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.recipe.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn'>View</button>
                        <button className='list-db-item-btn'>Edit</button>
                        <button className='list-db-item-btn'>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
class RecipeDb extends React.Component {
    state = {
        recipes: []
    }
    getRecipeList = () => {
        fetch('http://localhost:3000/recipes')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({recipes: parsedData})
            })
    }
    render() {
        return (
            <div className='recipe-container'>
                <div className='list'>
                    <div className='list-db'>
                        <div className='list-db-header'>
                            <div className='list-db-title'>Recipes</div>
                            <button className='list-db-add'>Add Recipe</button>
                        </div>
                        <div className='list-db-list'>
                            {this.state.recipes.map(recipe => (
                                <Recipe 
                                    key={recipe.id}
                                    recipe={recipe}
                                />
                            ))}
                        </div>
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