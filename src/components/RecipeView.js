import React from 'react'
import '../css/recipe-view.css'

class GrainView extends React.Component {
    render() {
        return (
            <div className='recipe-view-row-list'>
                <div className='recipe-view-row-item-start'>{this.props.grain.name}</div>
                <div className='recipe-view-row-item-center'>{this.props.percentage}</div>
                <div className='recipe-view-row-item-end'>{this.props.amount}</div>
            </div>
        )
    }
}
class HopView extends React.Component {
    render() {
        return (
            <div className='recipe-view-row-list'>
                <div className='recipe-view-row-item-start'>{this.props.hop.name}</div>
                <div className='recipe-view-row-item-center'>{this.props.time}</div>
                <div className='recipe-view-row-item-end'>{this.props.amount}</div>
            </div>
        )
    }
}
class YeastView extends React.Component {
    render() {
        return (
            <div className='recipe-view-row-list'>
                <div className='rrecipe-view-row-item-start'>{this.props.yeast.name}</div>
                <div className='recipe-view-row-item-end'>{this.props.amount}</div>
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
                <div className='recipe-view-column'>
                    <div className='recipe-view-row'>
                        <div className='recipe-view-name'>{this.state.recipe.name}</div>
                        <div className='recipe-view-description'>{this.state.recipe.description}</div>
                    </div>
                </div>
                <div className='recipe-view-column'>
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
                <div className='recipe-view-column'>
                    <div className='recipe-view-label'>Final Values</div>
                    <div className='recipe-view-column'>
                        <div className='recipe-view-row'>
                            <div className='recipe-view-item-label'>Original Gravity</div>
                            <div className='recipe-view-item-content'>{this.state.recipe.og}</div>
                        </div>
                        <div className='recipe-view-row'>
                            <div className='recipe-view-item-label'>Final Gravity</div> 
                            <div className='recipe-view-item-content'>{this.state.recipe.fg}</div>
                        </div>
                        <div className='recipe-view-row'>
                            <div className='recipe-view-item-label'>Alcohol By Volume</div> 
                            <div>{this.state.recipe.avb}</div>
                        </div>
                        <div className='recipe-view-row'>
                            <div className='recipe-view-item-label'>Bitterness(IBU)</div>
                            <div className='recipe-view-item-content'>{this.state.recipe.ibu}</div>
                        </div>   
                        <div className='recipe-view-row'> 
                            <div className='recipe-view-item-label'>Color(SRM)</div>
                            <div className='recipe-view-item-content'>{this.state.recipe.srm}</div>
                        </div>
                    </div>
                </div>
                <div className='recipe-view-column'>
                    <div className='recipe-view-label'>Grain Bill</div>
                    <div className='recipe-view-column'>
                        {this.props.grainList[0] ?
                            <div className='recipe-view-column'>
                                <div className='recipe-view-row-list'>
                                    <div className='recipe-view-row-item-start' style={{fontWeight: 'bold'}}>Grain</div>
                                    <div className='recipe-view-row-item-center' style={{fontWeight: 'bold'}}>Percentage</div>
                                    <div className='recipe-view-row-item-end' style={{fontWeight: 'bold'}}>Amount</div>
                                </div>
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
                <div className='recipe-view-column'>
                    <div className='recipe-view-label'>Hop Schedule</div>
                    <div className='recipe-view-column'>
                        {this.props.hopList[0] ?
                            <div className='recipe-view-column'>
                                <div className='recipe-view-row-list'>
                                    <div className='recipe-view-row-item-start' style={{fontWeight: 'bold'}}>Hop</div>
                                    <div className='recipe-view-row-item-center' style={{fontWeight: 'bold'}}>Time</div>
                                    <div className='recipe-view-row-item-end' style={{fontWeight: 'bold'}}>Amount</div>
                                </div>
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
                <div className='recipe-view-column'>
                    <div className='recipe-view-label'>Yeast</div>
                    <div className='recipe-view-column'>
                        {this.props.yeastList[0] ? 
                            <div className='recipe-view-column'>
                                <div className='recipe-view-row-list'>
                                    <div className='recipe-view-row-item-start' style={{fontWeight: 'bold'}}>Yeast</div>
                                    <div className='recipe-view-row-item-end' style={{fontWeight: 'bold'}}>Amount</div>
                                </div>
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