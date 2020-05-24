import React from 'react'
import '../css/view-db.css'
import '../css/list-db.css'
import '../css/form-db.css'

class Hop extends React.Component {
    render() {
        return (
            <div className='list-db-list-item' id={`malt-${this.props.hop.id}`}>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.hop.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn' onClick={() => this.props.getHopDetails(this.props.hop.id)}>View</button>
                        <button className='list-db-item-btn' >Edit</button>
                        <button className='list-db-item-btn' onClick={() => this.props.deleteHop(this.props.hop.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
class HopDetails extends React.Component {
    render() {
        return (
            <div className='view-background'>
                <div className='view'>
                    <h2>{this.props.hop.name}</h2>
                    <div className='view-data'>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Origin</div>
                            <div className='view-data-content'>{this.props.hop.origin}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Type</div>
                            <div className='view-data-content'>{this.props.hop.hop_type}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Alpha</div>
                            <div className='view-data-content'>{this.props.hop.alpha}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Beta</div>
                            <div className='view-data-content'>{this.props.hop.beta}</div>
                        </div>

                        <div className='view-data-column'>
                            <div className='view-data-label'>Notes</div>
                            <div className='view-data-content'>{this.props.hop.notes}</div>
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
class HopForm extends React.Component {
    render() {
        return (
            <div className='form-background'>
                <div className='form'>
                    <div className='form-data'>
                        <div className='form-data-title'>Add Hop</div>
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
                            <div className='form-data-label'>Type</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="hop_type"
                                id="hop_type"
                                value={this.props.hop_type}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Alpha</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="alpha"
                                id="alpha"
                                value={this.props.alpha}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Beta</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="beta"
                                id="beta"
                                value={this.props.beta}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-column'>
                            <div className='form-data-label'>Notes</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="notes"
                                id="notes"
                                value={this.props.notes}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-option'>
                            <button className='form-data-option-save' onClick={() => {this.props.addHop()}}>Save</button>
                            <button className='form-data-option-cancel' onClick={() => {this.props.handleFormView(false)}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class HopDb extends React.Component {
    state = {
        hops: [],
        currentHop: {},
        showDetail: false,
        showForm: false,
        name: '',
        hop_type: '',
        origin: '',
        alpha: 0,
        beta: 0,
        notes: ''
    }
    getHopList = () => {
        fetch('http://localhost:3000/hops')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({hops: parsedData})
            })
    }
    handleDetailView = state => {
        this.setState({showDetail: state})
    }
    handleFormView = state => {
        this.setState({showForm: state})    
    }
    getHopDetails = id => {
        fetch(`http://localhost:3000/hops/${id}`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({currentHop: parsedData})
            })
        setTimeout(this.handleDetailView(true),300)
    }
    deleteHop = id => {
        fetch(`http://localhost:3000/hops/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }})
            setTimeout(this.getHopList,100)
    }
    clearFormStates = () => {
        this.setState({name: ""})
        this.setState({origin: ""})
        this.setState({hop_type: false})
        this.setState({alpha: 0})
        this.setState({beta: 0})
        this.setState({notes: ""})
    }
    addHop = () => {
        fetch('http://localhost:3000/hops', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                origin: this.state.origin,
                hop_type: this.state.hop_type,
                alpha: this.state.alpha,
                beta: this.state.beta,
                notes: this.state.notes
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('add hop response: ',resJson)
        })
        setTimeout(this.getHopList,300)
        setTimeout(() => this.handleFormView(false),400)
        setTimeout(this.clearFormStates,500)
    }
    handleChange = event => {
        console.log('handle change')
        this.setState({
          [event.target.id]: event.target.value
        })
    }
    render() {
        return (
            <div className='list'>
                <div className='list-db'>
                    <div className='list-db-header'>
                        <div className='list-db-title'>Hop Database</div>
                        <button className='list-db-add' onClick={() => this.handleFormView(true)}>Add Hop</button>
                    </div>
                    { this.state.hops.length > 0 ? 
                        <div className='list-db-list'>
                            {this.state.hops.map(hop => (
                                <Hop 
                                    key={hop.id}
                                    hop={hop}
                                    getHopDetails={this.getHopDetails}
                                    deleteHop={this.deleteHop}
                                />
                            ))}
                        </div>
                    :
                        <h2 className=''>Not Available</h2>
                    }  
                    { this.state.showDetail ?
                        <HopDetails 
                            hop={this.state.currentHop}
                            handleDetailView={this.handleDetailView}
                        />
                    :
                        <div></div>
                    }
                    { this.state.showForm ?
                        <HopForm
                            hop={this.state.currentHop}
                            handleFormView={this.handleFormView}
                            handleChange={this.handleChange}
                            addHop={this.addHop}
                            name={this.state.name}
                            origin={this.state.origin}
                            alpha={this.state.alpha}
                            beta={this.state.beta}
                            notes={this.state.notes}
                        />
                    :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getHopList();
    }
}
export default HopDb