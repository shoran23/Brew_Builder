import React from 'react'
import '../css/view-db.css'
import '../css/list-db.css'
import MaltDetails from './MaltDetails.js'

class Malt extends React.Component {
    render() {
        return (
            <div className='list-db-list-item' id={`malt-${this.props.malt.id}`}>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.malt.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn' onClick={() => this.props.getMaltDetails(this.props.malt.id)}>View</button>
                        <button className='list-db-item-btn' >Edit</button>
                        <button className='list-db-item-btn' onClick={() => this.props.deleteMalt(this.props.malt.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

class MaltForm extends React.Component {
    render() {
        return (
            <div className='form-background'>
                <div className='form'>
                    <div className='form-data'>
                        <div className='form-data-title'>Add Malt</div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Name</div>
                            <input 
                                className='form-data-input'
                                type="text" 
                                name="name" 
                                id="name"
                                value={this.props.name}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Origin</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="origin"
                                id="origin"
                                value={this.props.origin}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Mash</div>
                            {this.props.mash ?
                                <button onClick={() => this.props.toggleMash()}>Yes</button>
                            :
                                <button onClick={() => this.props.toggleMash()}>No</button>
                            }
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Color</div>
                            <input 
                                className="form-data-input"
                                type="number"
                                name="color"
                                id="color"
                                value={this.props.color}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Power</div>
                            <input 
                                className="form-data-input"
                                type="number"
                                name="power"
                                id="power"
                                value={this.props.power}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Potential</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="potential"
                                id="potential"
                                value={this.props.potential}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Max %</div>
                            <input 
                                className="form-data-input"
                                type="number"
                                name="max"
                                id="max"
                                value={this.props.max}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-column'>
                            <div className='form-data-label'>Notes</div>
                            <input
                                className='form-data-input' 
                                type="text"
                                name="notes"
                                id="notes"
                                value={this.props.notes}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-option'>
                            <button className='form-data-option-save' onClick={() => {this.props.addMalt()}}>Save</button>
                            <button className='form-data-option-cancel' onClick={() => {this.props.handleFormView(false)}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class MaltDb extends React.Component {
    state = {
        malts: [],
        currentMalt: {},
        showDetail: false,
        showForm: false,
        name: "",
        origin: "",
        mash: false,
        color: 0,
        power: 0,
        potential: 1.000,
        max: 0,
        notes: ""
    }
    getMaltList = () => {
        fetch('http://localhost:3000/grains')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({malts: parsedData}) 
            })
    }
    handleDetailView = state => {
        this.setState({showDetail: state})
    }
    handleFormView = state => {
        this.setState({showForm: state})
    }
    toggleMash = () => {
        this.setState({mash: !this.state.mash})
    }
    getMaltDetails = id => {
        fetch(`http://localhost:3000/grains/${id}`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({currentMalt: parsedData})
            })
        setTimeout(this.handleDetailView(true),300)
    }
    deleteMalt = id => {
        fetch(`http://localhost:3000/grains/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }})
            setTimeout(this.getMaltList,100)   
    }
    clearFormStates = () => {
        this.setState({name: ""})
        this.setState({origin: ""})
        this.setState({mash: false})
        this.setState({color: 0})
        this.setState({power: 0})
        this.setState({potential: 0})
        this.setState({max: 0})
        this.setState({notes: ""})
    }
    addMalt = () => {
        fetch('http://localhost:3000/grains', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                origin: this.state.origin,
                mash: this.state.mash,
                color: this.state.color,
                power: this.state.power,
                potential: this.state.potential,
                max: this.state.max,
                notes: this.state.notes
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('add malt response: ',resJson)
        })
        setTimeout(this.getMaltList,300)
        setTimeout(this.handleFormView(false),400)
        setTimeout(this.clearFormStates,500)

    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        })
    }
    render() {
        return (
            <div className='list'>
                <div className='list-db'>
                    <div className='list-db-header'>
                        <div className='list-db-title'>Malt Database</div>
                        <button className='list-db-add' onClick={() => {this.handleFormView(true)}}>Add Malt</button>
                    </div>
                    { this.state.malts.length > 0 ? 
                        <div className='list-db-list'>
                            {this.state.malts.map(malt => (
                                <Malt 
                                    key={malt.id}
                                    malt={malt}
                                    getMaltDetails={this.getMaltDetails}
                                    deleteMalt={this.deleteMalt}
                                />
                            ))}
                        </div>
                    :
                        <h2 className=''>Not Available</h2>
                    }  
                    { this.state.showDetail ?
                        <MaltDetails 
                            malt={this.state.currentMalt}
                            srmColors={this.props.srmColors}
                            handleDetailView={this.handleDetailView}
                        />
                    :
                        <div></div>
                    }
                    { this.state.showForm ?
                        <MaltForm 
                            malt={this.state.currentMalt}
                            handleChange={this.handleChange}
                            handleFormView={this.handleFormView}
                            addMalt={this.addMalt}
                            name={this.state.name}
                            origin={this.state.origin}
                            mash={this.state.mash}
                            color={this.state.color}
                            power={this.state.power}
                            potential={this.state.potential}
                            max={this.state.max}
                            notes={this.state.notes}
                            toggleMash={this.toggleMash}
                        />
                    :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getMaltList();
    }
}
export default MaltDb