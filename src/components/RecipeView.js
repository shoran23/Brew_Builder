import React from 'react'
import '../css/recipe-view.css'

class GrainView extends React.Component {
    render() {
        return (
            <div className='recipe-view-grain'>
                <div className='recipe-view-grain-name'>{this.props.grain.name}</div>
                <div className='recipe-view-grain-percentage'>{this.props.percentage}</div>
                <div className='recipe-view-grain-amount'>{this.props.amount}</div>
            </div>
        )
    }
}
class HopView extends React.Component {
    render() {
        return (
            <div className='recipe-view-hop'>
                <div className='recipe-view-hop-name'>{this.props.hop.name}</div>
                <div className='recipe-view-hop-time'>{this.props.time}</div>
                <div className='recipe-view-hop-amount'>{this.props.amount}</div>
            </div>
        )
    }
}
class YeastView extends React.Component {
    render() {
        return (
            <div className='recipe-view-yeast'>
                <div className='recipe-view-yeast-name'>{this.props.yeast.name}</div>
                <div className='recipe-view-yeast-amount'>{this.props.amount}</div>
            </div>
        )
    }
}

class RecipeView extends React.Component {
    state = {
        grainArr: [],
        recipe: this.props.recipe,
        grains: this.props.grainList
    }
    
    render() {
        return (
            <div className='recipe-view'>
                <div className='recipe-view-container'>
                    <div className='recipe-view-row'>
                        <div className='recipe-view-name'>{this.state.recipe.name}</div>
                        <div className='recipe-view-description'>{this.state.recipe.description}</div>
                    </div>
                </div>
                <div className='recipe-view-container'>
                    <div className='recipe-view-label'>Recipe Parameters</div>
                    <div className='recipe-view-row'>    
                        {this.props.styleList.length ?
                            <div className='recipe-view-item'>{this.props.styleList[0].name}</div>
                        :
                            <div className='recipe-view-item'>Retrieving Style</div>
                        }    
                        <div className='recipe-view-item'>Volume {this.state.recipe.volume}</div>
                        <div className='recipe-view-item'>Efficiency {this.state.recipe.efficiency}</div>
                    </div>
                </div>
                <div className='recipe-view-container'>
                    <div className='recipe-view-label'>Final Values</div>
                    <div className='recipe-view-row'>
                        <div className='recipe-view-item'>O.G. {this.state.recipe.og}</div>
                        <div className='recipe-view-item'>F.G. {this.state.recipe.fg}</div>
                        <div className='recipe-view-item'>AVB {this.state.recipe.avb}</div>
                        <div className='recipe-view-item'>IBU {this.state.recipe.ibu}</div>
                        <div className='recipe-view-item'>SRM {this.state.recipe.srm}</div>
                        <button className='recipe-style-compare'>Compare To Style</button>
                    </div>
                </div>
                <div className='recipe-view-container'>
                    <div className='recipe-view-list'>
                        <div className='recipe-view-label'>Grain Bill</div>
                        {this.props.grainList[0] ?
                            <div className='recipe-view-list-container'>
                                {this.props.grainList.map((grain,index) => (
                                    <GrainView 
                                        key={index}
                                        grain={grain}
                                        amount={this.props.recipeGrainLedgers[index].qty}
                                        percentage={this.props.recipeGrainLedgers[index].percentage}
                                    />
                                ))}
                            </div>  
                        :
                            <h2>Retrieving Grains...</h2>
                        }
                    </div>
                </div>
                <div className='recipe-view-container'>
                    <div className='recipe-view-list'>
                        <div className='recipe-view-label'>Hop Schedule</div>
                        {this.props.hopList[0] ?
                            <div className='recipe-view-list-container'>
                                {this.props.hopList.map((hop,index) => (
                                    <HopView 
                                        key={index}
                                        hop={hop}
                                        amount={this.props.recipeHopLedgers[index].qty}
                                        time={this.props.recipeHopLedgers[index].time}
                                    />
                                ))}
                            </div>
                        :
                            <h2>Retrieving Hops...</h2>
                        }
                    </div>
                </div>
                <div className='recipe-view-container'>
                    <div className='recipe-view-list'>
                        <div className='recipe-view-label'>Yeast</div>
                        {this.props.yeastList[0] ? 
                            <div className='recipe-view-list-container'>
                                {this.props.yeastList.map((yeast,index) => (
                                    <YeastView 
                                        key={index}
                                        yeast={yeast}
                                        amount={this.props.recipeYeastLedgers[index].qty}
                                    />
                                ))}
                            </div>
                        :
                            <h2>Retrieving Yeasts...</h2>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default RecipeView