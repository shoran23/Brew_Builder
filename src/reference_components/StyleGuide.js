import React from 'react'
import '../css/view-db.css'
import '../css/list-db.css'

class Style extends React.Component {
    render() {
        return (
            <div className='list-db-list-item' id={`malt-${this.props.style.id}`}>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.style.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn' onClick={() => this.props.getStyleDetails(this.props.style.id)}>View</button>
                        <button className='list-db-item-btn'>Edit</button>
                        <button className='list-db-item-btn' onClick={() => {this.props.deleteStyle(this.props.style.id)}}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
class StyleDetails extends React.Component {
    render() {
        return (
            <div className='view-background' onClick={() => this.props.handleDetailView(false)}>
                <div className='view'>
                    <h2>{this.props.style.name}</h2>
                    <div className='view-data'>

                        <div className='view-data-column'>
                            <div className='view-data-label'>Overview</div>
                            <div className='view-data-content'>{this.props.style.overview}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>IBU Range</div>
                            <div className='view-data-content'>{this.props.style.ibu_low} - {this.props.style.ibu_high}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Color Range (SRM)</div>
                            <div className='view-data-color-range' style={{display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <div
                                    style = {{
                                        backgroundColor: `${this.props.srmColors[this.props.style.srm_low]}`,
                                        width: '50px',
                                        height: '50px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textShadow: '1px 1px black',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >{this.props.style.srm_low}</div>
                                <div
                                 style = {{
                                    backgroundColor: `${this.props.srmColors[this.props.style.srm_high]}`,
                                    width: '50px',
                                    height: '50px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px black',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                    }}
                                >{this.props.style.srm_high}</div>
                            </div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Original Gravity Range</div>
                            <div className='view-data-content'>{this.props.style.og_low} - {this.props.style.og_high}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Final Gravity Range</div>
                            <div className='view-data-content'>{this.props.style.fg_low} - {this.props.style.fg_high}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Alcohol By Volume Range</div>
                            <div className='view-data-content'>{this.props.style.alc_by_vol_low} - {this.props.style.alc_by_vol_high}</div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
class StyleGuide extends React.Component {
    state = {
        styles: [],
        currentStyle: {},
        showDetail: false,
        srmColorRange: []
    }
    getStyleList = () => {
        fetch('http://localhost:3000/styles')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({styles: parsedData})
            })
    }
    handleDetailView = state => {
        this.setState({showDetail: state})
    }
    getStyleDetails = id => {
        fetch(`http://localhost:3000/styles/${id}`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({currentStyle: parsedData})
            })
        setTimeout(this.handleDetailView(true),300)
    }
    deleteStyle = id => {
        fetch(`http://localhost:3000/styles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }})
            setTimeout(this.getStyleList,100)
    }
    render() {
        return (
            <div className='list'>
                <div className='list-db'>
                    <div className='list-db-title'>Style Guide</div>
                    { this.state.styles.length > 0 ? 
                        <div className='list-db-list'>
                            {this.state.styles.map(style => (
                                <Style 
                                    key={style.id}
                                    style={style}
                                    getStyleDetails={this.getStyleDetails}
                                    deleteStyle={this.deleteStyle}
                                />
                            ))}
                        </div>
                    :
                        <h2 className=''>Not Available</h2>
                    }  
                    { this.state.showDetail ?
                        <StyleDetails 
                            style={this.state.currentStyle}
                            handleDetailView={this.handleDetailView}
                            srmColors={this.props.srmColors}
                        />
                    :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getStyleList()
    }
}
export default StyleGuide