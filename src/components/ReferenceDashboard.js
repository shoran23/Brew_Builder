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
import GrainBillCalc from '../reference_components/GrainBillCalc.js'
import IbuCalc from '../reference_components/IbuCalc.js'
import AvbCalc from '../reference_components/AvbCalc.js'
import SrmCalc from '../reference_components/SrmCalc.js'
import PrimingCalc from '../reference_components/PrimingCalc.js'
import InfusionCalc from '../reference_components/InfusionCalc.js'

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
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/grain-bill-calc'>Grain Bill Calculator</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/ibu-calc'>IBU Calculator</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/srm-calc'>SRM Calculator</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/avb-calc'>AVB Calculator</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/priming-calc'>Priming Calculator</Link></li>
                                <li className='reference-dashboard-list-item'><Link className='reference-dashboard-list-link' to='/infusion-calc'>Infusion Calculator</Link></li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path='/malt-db'><MaltDb srmColors={this.props.srmColors}/></Route>
                            <Route path='/hop-db'><HopDb/></Route>
                            <Route path='/yeast-db'><YeastDb/></Route>
                            <Route path='/style-guide'><StyleGuide srmColors={this.props.srmColors}/></Route>
                            <Route path='/grain-bill-calc'><GrainBillCalc/></Route>
                            <Route path='/ibu-calc'><IbuCalc/></Route>
                            <Route path='/srm-calc'><SrmCalc/></Route>
                            <Route path='/avb-calc'><AvbCalc/></Route>
                            <Route path='/priming-calc'><PrimingCalc/></Route>
                            <Route path='/infusion-calc'><InfusionCalc/></Route>
                        </Switch>
                    </div>
                </Router>
           </div> 
        )
    }
}
export default ReferenceDashboard