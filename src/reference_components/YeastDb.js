import React from 'react'
import '../css/view-db.css'
import '../css/list-db.css'
import YeastDetails from './YeastDetails.js'

class Yeast extends React.Component {
    render() {
        return (
            <div className='list-db-list-item' id={`yeast-${this.props.yeast.id}`}>
                <div className='list-db-list-content'>
                    <h3 className='list-db-item-label'>{this.props.yeast.name}</h3>
                    <div className='list-db-item-options'>
                        <button className='list-db-item-btn' onClick={() => this.props.getYeastDetails(this.props.yeast.id)}>View</button>
                        <button className='list-db-item-btn' onClick={() => this.props.setUpEdit(this.props.yeast.id)}>Edit</button>
                        <button className='list-db-item-btn' onClick={() => this.props.deleteYeast(this.props.yeast.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
class YeastForm extends React.Component {
    render() {
        return (
            <div className='form-background'>
                <div className='form'>
                    <div className='form-data'>
                        {!this.props.editYeast ?
                            <div className='form-data-title'>Add Yeast</div>
                        :
                            <div className='form-data-title'>Edit Yeast</div>
                        }
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
                            <div className='form-data-label'>Lab</div>
                            <input 
                                type="text"
                                name="lab"
                                id="lab"
                                value={this.props.lab}
                                onChange={this.props.handleChange}    
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Type</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="yeast_type"
                                id="yeast_type"
                                value={this.props.yeast_type}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Form</div>
                            <input 
                                className="form-data-input"
                                type="text"
                                name="form"
                                id="form"
                                value={this.props.form}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Temperature Range</div>
                            <div className='form-data-temps'>
                                <input 
                                    className='form-data-input'
                                    type="number"
                                    name='temp_low'
                                    id='temp_low'
                                    value={this.props.temp_low}
                                    onChange={this.props.handleChange}
                                />
                                <input 
                                    className='form-data-input'
                                    type="number"
                                    name='temp_high'
                                    id='temp_high'
                                    value={this.props.temp_high}
                                    onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Attenuation</div>
                            <input 
                                className="form-data-input"
                                type="number"
                                name="attenuation"
                                id="attenuation"
                                value={this.props.attenuation}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-row'>
                            <div className='form-data-label'>Flocculation</div>
                            <input 
                                className='form-data-input'
                                type="text"
                                name='flocculation'
                                id="flocculation"
                                value={this.props.flocculation}
                                onChange={this.props.handleChange}
                            />
                        </div>
                        <div className='form-data-column'>
                            <div className='form-data-label'>Notes</div>
                            <input
                                className='form-data-input'
                                type="text"
                                name='notes'
                                id='notes'
                                value={this.props.notes}
                                onChange={this.props.handleChange}
                            />
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
class YeastDb extends React.Component {
    state = {
        yeasts: [],
        currentYeast: {},
        showDetail: false,
        showForm: false,
        editYeast: false,
        name: "",
        lab: "",
        yeast_type: "",
        form: "",
        temp_low: 0,
        temp_high: 0,
        attenuation: 0,
        flocculation: 0,
        notes: ""
    }
    getYeastList = () => {
        fetch('http://localhost:3000/yeasts')
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({yeasts: parsedData})
            })
    }
    handleDetailView = state => {
        this.setState({showDetail: state})
    }
    handleFormView = state => {
        this.setState({showForm: state})
        if(state === false){
            this.setState({editYeast: false})
            setTimeout(this.clearFormStates,200)    
        }
    }
    getYeastDetails = id => {
        fetch(`http://localhost:3000/yeasts/${id}`)
            .then(data => data.json(), err => console.log(err))
            .then(parsedData => {
                this.setState({currentYeast: parsedData})
            })
        setTimeout(this.handleDetailView(true),300)
    }
    deleteYeast = id => {
        fetch(`http://localhost:3000/yeasts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
        }})
        setTimeout(this.getYeastList,100)
    }
    addYeast = () => {
        fetch('http://localhost:3000/yeasts', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                lab: this.state.lab,
                yeast_type: this.state.yeast_type,
                form: this.state.form,
                temp_low: this.state.temp_low,
                temp_high: this.state.temp_high,
                attenuation: this.state.attenuation,
                flocculation: this.state.flocculation,
                notes: this.state.notes
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('add yeast response: ',resJson)
        })
        setTimeout(this.getYeastList,100)
        setTimeout(this.handleFormView(false),300)
    }
    editYeast = id => {
        fetch(`http://localhost:3000/yeasts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: this.state.name,
                lab: this.state.lab,
                yeast_type: this.state.yeast_type,
                form: this.state.form,
                temp_low: this.state.temp_low,
                temp_high: this.state.temp_high,
                attenuation: this.state.attenuation,
                flocculation: this.state.flocculation,
                notes: this.state.notes
            }),
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(resJson => {
            console.log('add malt response: ',resJson)
        })
        setTimeout(this.getYeastList,300)
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
        let editingYeast = {}
        for(let i=0;i<this.state.yeasts.length;i++){
            if(this.state.yeasts[i].id === id){
                editingYeast = this.state.yeasts[i]
                break
            }
        }
        // set up states for the edit
        this.setState({name: editingYeast.name})
        this.setState({lab: editingYeast.lab})
        this.setState({yeast_type: editingYeast.yeast_type})
        this.setState({form: editingYeast.form})
        this.setState({temp_low: editingYeast.temp_low})
        this.setState({temp_high: editingYeast.temp_high})
        this.setState({attenuation: editingYeast.attenuation})
        this.setState({flocculation: editingYeast.flocculation})
        this.setState({notes: editingYeast.notes})
        this.handleFormView(true)
        this.setState({editYeast: true})
        this.setState({currentYeast: editingYeast})
    }
    handleSave = () => {
        if(this.state.editYeast === true){
            this.editYeast(this.state.currentYeast.id)
        } else {
            this.addYeast()
        }
    }
    render() {
        return (
            <div className='list'>
                <div className='list-db'>
                    <div className='list-db-header'>
                        <div className='list-db-title'>Yeast Database</div>
                        <button className='list-db-add' onClick={() => this.handleFormView(true)}>Add Yeast</button>
                    </div>
                    { this.state.yeasts.length > 0 ? 
                        <div className='list-db-list'>
                            {this.state.yeasts.map(yeast => (
                                <Yeast 
                                    key={yeast.id}
                                    yeast={yeast}
                                    getYeastDetails={this.getYeastDetails}
                                    deleteYeast={this.deleteYeast}
                                    setUpEdit={this.setUpEdit}
                                />
                            ))}
                        </div>
                    :
                        <h2 className=''>Not Available</h2>
                    }  
                    { this.state.showDetail ?
                        <YeastDetails 
                            yeast={this.state.currentYeast}
                            handleDetailView={this.handleDetailView}
                        />
                    :
                        <div></div>
                    }
                    { this.state.showForm ?
                        <YeastForm 
                            yeast={this.state.currentYeast}
                            handleFormView={this.handleFormView}
                            handleChange={this.handleChange}
                            addYeast={this.addYeast}
                            name={this.state.name}
                            lab={this.state.lab}
                            yeast_type={this.state.yeast_type}
                            form={this.state.form}
                            temp_low={this.state.temp_low}
                            temp_high={this.state.temp_high}
                            attenuation={this.state.attenuation}
                            flocculation={this.state.flocculation}
                            notes={this.state.notes}
                            handleSave={this.handleSave}
                            editYeast={this.state.editYeast}
                        />
                    :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getYeastList()
    }
}
export default YeastDb