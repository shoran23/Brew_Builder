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
                        <button className='list-db-item-btn' onClick={() => this.props.setUpEdit(this.props.style.id)}>Edit</button>
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
            <div className='view-background'>
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
                        
                        <div className='view-data-options'>
                            <button className='view-data-option-close' onClick={() => this.props.handleDetailView(false)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
class StyleForm extends React.Component {
    render() {
        return (
            <div className='form-background'>
                <div className='form'>
                    <div className='form-data'>
                        {!this.props.editStyle ?
                            <div className='form-data-title'>Add Style</div>
                        :
                            <div className='form-data-title'>Edit Style</div>
                        }
                        <div className='form-data-row'>
                            <div className='form-data-label'>Name</div>
                            <input 
                                className='form-data-input'
                                type="text"
                                name='name'
                                id='name'
                                value={this.props.name}
                                onChange={this.props.handleChange}
                            />     
                        </div>
                        <div className='form-data-column'>
                            <div className='form-data-label'>Overview</div>
                            <input
                                className='form-data-input'
                                type="text"
                                name='overview'
                                id='overview'
                                value={this.props.overview}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>IBU Range</div>
                            <div className='form-data-row'>
                                <input 
                                    className='form-data-input'
                                    type="number"
                                    name='ibu_low'
                                    id='ibu_low'
                                    value={this.props.ibu_low}
                                    onChange={this.props.handleChange}
                                />
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='ibu_high'
                                    id='ibu_high'
                                    value={this.props.ibu_high}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Color Range (SRM)</div>
                            <div className='form-data-row'>
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='srm_low'
                                    id='srm_low'
                                    value={this.props.srm_low}
                                    onChange={this.props.handleChange}
                                />
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='srm_high'
                                    id='srm_high'
                                    value={this.props.srm_high}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Original Gravity Range</div>
                            <div className='form-data-row'>
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='og_low'
                                    id='og_low'
                                    value={this.props.og_low}
                                    onChange={this.props.handleChange}
                                />
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='og_high'
                                    id='og_high'
                                    value={this.props.og_high}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                        </div>   
                        <div className='form-data-row'>
                            <div className='form-data-label'>Final Gravity Range</div>
                            <div className='form-data-row'>
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='fg_low'
                                    id='fg_low'
                                    value={this.props.fg_low}
                                    onChange={this.props.handleChange}
                                />
                                <input 
                                    className='form-data-input'
                                    type="number"
                                    name='fg_high'
                                    id='fg_high'
                                    value={this.props.fg_high}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                        </div>    
                        <div className='form-data-row'>
                            <div className='form-data-label'>Alcohol By Volume Range</div>
                            <div className='form-data-row'>
                                <input
                                    className='form-data-input' 
                                    type="number"
                                    name='alc_by_vol_low'
                                    id='alc_by_vol_low'
                                    value={this.props.alc_by_vol_low}
                                    onChange={this.props.handleChange}
                                />
                                <input 
                                    className='form-data-input'
                                    type="number"
                                    name='alc_by_vol_high'
                                    id='alc_by_vol_high'
                                    value={this.props.alc_by_vol_high}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-data-option'>
                            <button className='form-data-option-save' onClick={() => {this.props.handleSave()}}>Save</button>
                            <button className='form-data-option-cancel' onClick={() => {this.props.handleFormView(false)}}>Cancel</button>
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
        showForm: false,
        editStyle: false,
        srmColorRange: [],
        name: "",
        overview: "",
        ibu_low: 0,
        ibu_high: 0,
        srm_low: 0,
        srm_high: 0,
        og_low: 0,
        og_high: 0,
        fg_low: 0,
        fg_high: 0,
        alc_by_vol_low: 0,
        alc_by_vol_high: 0
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
    handleFormView = state => {
        this.setState({showForm: state})
        if(state === false){
            this.setState({editStyle: false})
            setTimeout(this.clearFormStates,200)    
        }
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
    clearFormStates = () => {
        this.setState({name: ""})
        this.setState({overview: ""})
        this.setState({ibu_low: 0})
        this.setState({ibu_high: 0})
        this.setState({srm_low: 0})
        this.setState({srm_high: 0})
        this.setState({og_low: 0})
        this.setState({og_high: 0})
        this.setState({fg_low: 0})
        this.setState({fg_high: 0})
        this.setState({alc_by_vol_low: 0})
        this.setState({alc_by_vol_high: 0})
    }
    addStyle = () => {
        fetch('http://localhost:3000/styles', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                overview: this.state.overview,
                ibu_low: this.state.ibu_low,
                ibu_high: this.state.ibu_high,
                srm_low: this.state.srm_low,
                srm_high: this.state.srm_high,
                og_low: this.state.og_low,
                og_high: this.state.og_high,
                fg_low: this.state.fg_low,
                fg_high: this.state.fg_high,
                alc_by_vol_low: this.state.alc_by_vol_low,
                alc_by_vol_high: this.state.alc_by_vol_high
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('add styles response: ',resJson)
        })
        setTimeout(this.getStyleList,100)
        setTimeout(this.handleFormView(false),300)
    }
    editStyle = id => {
        fetch(`http://localhost:3000/styles/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: this.state.name,
                overview: this.state.overview,
                ibu_low: this.state.ibu_low,
                ibu_high: this.state.ibu_high,
                srm_low: this.state.srm_low,
                srm_high: this.state.srm_high,
                og_low: this.state.og_low,
                og_high: this.state.og_high,
                fg_low: this.state.fg_low,
                fg_high: this.state.fg_high,
                alc_by_vol_low: this.state.alc_by_vol_low,
                alc_by_vol_high: this.state.alc_by_vol_high
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('edit style response: ',resJson)
        })
        setTimeout(this.getStyleList,300)
        setTimeout(this.handleFormView(false),400)
        setTimeout(this.clearFormStates,500)        
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    setUpEdit = id => {
        // find malt by id
        let editingStyle = {}
        for(let i=0;i<this.state.styles.length;i++){
            if(this.state.styles[i].id === id){
                editingStyle = this.state.styles[i]
                break
            }
        }
        // set up states for the edit
        this.setState({editStyle: true})
        this.setState({currentStyle: editingStyle})
        this.setState({name: editingStyle.name})
        this.setState({overview: editingStyle.overview})
        this.setState({ibu_low: editingStyle.ibu_low})
        this.setState({ibu_high: editingStyle.ibu_high})
        this.setState({srm_low: editingStyle.srm_low})
        this.setState({srm_high: editingStyle.srm_high})
        this.setState({og_low: editingStyle.og_low})
        this.setState({og_high: editingStyle.og_high})
        this.setState({fg_low: editingStyle.fg_low})
        this.setState({fg_high: editingStyle.fg_high})
        this.setState({alc_by_vol_low: editingStyle.alc_by_vol_low})
        this.setState({alc_by_vol_high: editingStyle.alc_by_vol_high})
        this.handleFormView(true)
    }
    handleSave = () => {
        if(this.state.editStyle === true){
            this.editStyle(this.state.currentStyle.id)
        } else {
            this.addStyle()
        }
    }
    render() {
        return (
            <div className='list'>
                <div className='list-db'>
                    <div className='list-db-header'>
                        <div className='list-db-title'>Style Guide</div>
                        <button className='list-db-add' onClick={() => {this.handleFormView(true)}}>Add Style</button>
                    </div>
                    { this.state.styles.length > 0 ? 
                        <div className='list-db-list'>
                            {this.state.styles.map(style => (
                                <Style 
                                    key={style.id}
                                    style={style}
                                    getStyleDetails={this.getStyleDetails}
                                    deleteStyle={this.deleteStyle}
                                    setUpEdit={this.setUpEdit}
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
                    {this.state.showForm ?
                        <StyleForm
                            style={this.state.currentStyle}
                            handleChange={this.handleChange}
                            handleFormView={this.handleFormView}
                            addStyle={this.addStyle}
                            name={this.state.name}
                            overview={this.state.overview}
                            ibu_low={this.state.ibu_low}
                            ibu_high={this.state.ibu_high}
                            srm_low={this.state.srm_low}
                            srm_high={this.state.srm_high}
                            og_low={this.state.og_low}
                            og_high={this.state.og_high}
                            fg_low={this.state.fg_low}
                            fg_high={this.state.fg_high}
                            alc_by_vol_low={this.state.alc_by_vol_low}
                            alc_by_vol_high={this.state.alc_by_vol_high}
                            handleSave={this.handleSave}
                            editStyle={this.state.editStyle}
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