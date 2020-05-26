import React from 'react'

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
export default HopDetails