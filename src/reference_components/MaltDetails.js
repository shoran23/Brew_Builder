import React from 'react'

class MaltDetails extends React.Component {
    render() {
        return (
            <div className='view-background'>
                <div className='view'>
                    <h2>{this.props.malt.name}</h2>
                    <div className='view-data'>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Origin</div>
                            <div className='view-data-content'>{this.props.malt.origin}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Used In Mash</div>
                            {this.props.malt.mash ?
                                <div>Yes</div>
                            :
                                <div>No</div>
                            }
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Color(°L)</div>
                            <div>{this.props.malt.color}</div>
                        </div>
     
                        <div className='view-data-row'>
                            <div className='view-data-label'>Power</div>
                            <div>{this.props.malt.power}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Potential</div>
                            <div>{this.props.malt.potential}</div>
                        </div>

                        <div className='view-data-row'>
                            <div className='view-data-label'>Max %</div>
                            <div>{this.props.malt.max}</div>
                        </div>

                        <div className='view-data-column'>
                            <div className='view-data-label'>Notes</div>
                            <div>{this.props.malt.notes}</div>
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
export default MaltDetails