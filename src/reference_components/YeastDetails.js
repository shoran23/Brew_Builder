import React from 'react'
import Yeast from '../components/Yeast'

class YeastDetails extends React.Component {
    render() {
        return (
            <div className='view-background'>
                <div className='view'>
                    <h2>{this.props.yeast.name}</h2>
                    <div className='view-data'>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Lab</div>
                            <div className='view-data-content'>{this.props.yeast.lab}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Type</div>
                            <div className='view-data-content'>{this.props.yeast.yeast_type}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Form</div>
                            <div className='view-data-content'>{this.props.yeast.form}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Temperature</div>
                            <div className='view-data-content'>{this.props.yeast.temp_low}°F - {this.props.yeast.temp_high}°F</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Attenuation</div>
                            <div className='view-data-content'>{this.props.yeast.attenuation}%</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Flocculation</div>
                            <div className='view-data-content'>{this.props.yeast.flocculation}</div>
                        </div>

                        <div className='view-data-column'>
                            <div className='view-data-label'>Notes</div>
                            <div className='view-data-content'>{this.props.yeast.notes}</div>
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
export default YeastDetails