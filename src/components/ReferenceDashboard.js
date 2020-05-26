import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import '../css/reference-dashboard.css'
import MaltDb from '../reference_components/MaltDb.js'
import HopDb from '../reference_components/HopDb.js'
import YeastDb from '../reference_components/YeastDb.js'
import StyleGuide from '../reference_components/StyleGuide.js'

class ReferenceDashboard extends React.Component {
    render() {
        return (
           <div className='reference-dashboard'>
               <Router>
                   <div className='reference-dashboard-container'>
                        <nav className='reference-dashboard-nav'>
                            <ul className='reference-dashboard-list'>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/malt-db'>Malt Database</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/hop-db'>Hop Database</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/yeast-db'>Yeast Database</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/style-guide'>Style Guidelines</Link></li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path='/malt-db'><MaltDb srmColors={this.props.srmColors}/></Route>
                            <Route path='/hop-db'><HopDb/></Route>
                            <Route path='/yeast-db'><YeastDb/></Route>
                            <Route path='/style-guide'><StyleGuide srmColors={this.props.srmColors}/></Route>
                        </Switch>
                    </div>
                </Router>
           </div> 
        )
    }
}
export default ReferenceDashboard