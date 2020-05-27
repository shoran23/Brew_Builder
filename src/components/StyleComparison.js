import React from 'react'
import ZingChart from 'zingchart-react'

class StyleComparison extends React.Component {
    state = {
        chartLabel: "Please Select a Parameter Above",
        paramSelected: false,
        config: {
            type: 'bar',
            series: [{
              values: [0]
            }]
          }
    }
    handleChartedValue = state => {
        let valueArr = []
        let labelArr = []
        if(Object.keys(this.props.selectedStyle).length > 0){
            if(state === 'IBU'){
                valueArr.push(Number(this.props.ibu))
                valueArr.push(this.props.selectedStyle.value.ibu_low)
                valueArr.push(this.props.selectedStyle.value.ibu_high)
            } else if(state === 'SRM'){
                valueArr.push(Number(this.props.srm))
                valueArr.push(this.props.selectedStyle.value.srm_low)
                valueArr.push(this.props.selectedStyle.value.srm_high)
            } else if(state === "O.G.") {
                valueArr.push(Number(this.props.og))
                valueArr.push(Number(this.props.selectedStyle.value.og_low))
                valueArr.push(Number(this.props.selectedStyle.value.og_high))
            } else if(state === "F.G.") {
                valueArr.push(Number(this.props.fg))
                valueArr.push(Number(this.props.selectedStyle.value.fg_low))
                valueArr.push(Number(this.props.selectedStyle.value.fg_high))
            } else if (state === "A.B.V.") {
                valueArr.push(Number(this.props.avb))
                valueArr.push(Number(this.props.selectedStyle.value.alc_by_vol_low))
                valueArr.push(Number(this.props.selectedStyle.value.alc_by_vol_high))
            }
            labelArr.push(`Recipe ${state}`)
            labelArr.push(`Style Min ${state}`)
            labelArr.push(`Style Max ${state}`)
            this.setState({paramSelected: true})
            this.setState({config:
                {
                    type: 'scatter',
                    series: [
                        {values: valueArr,}
                    ],
                    "scale-x": {values: labelArr}
                }
            })
            this.setState({chartLabel: `Compare ${state}`})
        }
    }
    render() {
        return (
            <div className='view-background'>
                <div className='view'>
                    <h2>Style Comparison</h2>
                    <div className='compare-nav-container'>
                        <div className='form-data-row' style={{alignSelf: 'center'}}>
                            <button className='style-comp-parameter' onClick={() => this.handleChartedValue('IBU')}>IBU</button>
                            <button className='style-comp-parameter' onClick={() => this.handleChartedValue('SRM')}>SRM</button>
                            <button className='style-comp-parameter' onClick={() => this.handleChartedValue('O.G.')}>O.G.</button>
                            <button className='style-comp-parameter' onClick={() => this.handleChartedValue('F.G.')}>F.G.</button>
                            <button className='style-comp-parameter' onClick={() => this.handleChartedValue('A.B.V.')}>A.B.V.</button>
                        </div>
                    </div>
                    {this.state.paramSelected ?
                        <ZingChart 
                            data={this.state.config}
                        />
                    :
                        <div className='style-comp-select-msg'
                            style={{


                            }}
                        >{this.state.chartLabel}</div>
                    }
                    <button className='style-comp-close' onClick={() => this.props.handleStyleCompare(false)}>Close</button>
                </div>

            </div>
        )
    }
}
export default StyleComparison