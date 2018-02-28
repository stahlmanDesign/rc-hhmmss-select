import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash.range'
import './styles.css'

class ReactHhmmssSelect extends React.Component {

  render(){
    const { valueHhmmss, onChange, tabIndex, options, unitsSeparator, style, className } = this.props
    // NOTE tabIndex
    // -1 it will be skipped
    // 0 order will be defined by document
    // A positive integer means you take control of keyboard tab order */

    // NOTE labels
    // labels.hh = 'Hours'
    // labels.mm = 'Minutes'
    // labels.ss = 'Seconds'
    const defaultOptions = {
      hh: { hidden: true, label: 'Hours' },
      mm: { hidden: true, label: 'Minutes' },
      ss: { hidden: true, label: 'Seconds' },
    }
    const opts = options && options.hh && options.hh && options.mm && options.ss
      ? options
      : defaultOptions

    if (!valueHhmmss) return <div></div>
    const valueHhmmssSplit = valueHhmmss.split(':')

    let selectSections = []

    if (!options.hh.hidden) selectSections.push(
          <select className='select-hh'
            value={ valueHhmmssSplit[0] }
            tabIndex={ tabIndex || 0 }
            onChange={ onChange({ valueHhmmss, units: 'hh' })
          }>
            <option disabled>{ opts.hh.label || defaultOptions.hh.label }</option>
            { range(24).map( i => <option key={ 'hh-' + i }>{ i < 10 ? '0' + i : i }</option> ) }
          </select>
    )
    if (!options.mm.hidden) selectSections.push(
          <select className='select-mm'
            value={ valueHhmmssSplit[1] }
            tabIndex={ tabIndex || 0 }
            onChange={ onChange({ valueHhmmss, units: 'mm' })
          }>
            <option disabled>{ opts.mm.label || defaultOptions.mm.label }</option>
            { range(60).map( i => <option key={ 'mm-' + i }>{ i < 10 ? '0' + i : i }</option> ) }
          </select>
    )
    if (!options.ss.hidden) selectSections.push(
          <select className='select select-ss'
            value={ valueHhmmssSplit[2] }
            tabIndex={ tabIndex || 0 }
            onChange={ onChange({ valueHhmmss, units: 'ss' })
          }>
            <option disabled>{ opts.ss.label || defaultOptions.ss.label }</option>
            { range(60).map( i => <option key={ 'ss-' + i }>{ i < 10 ? '0' + i : i }</option> ) }
          </select>
    )
    return (
      <div className={ 'ReactHhmmssSelect ' + className } style={ style }>
        { selectSections.map((ss, i) =>
          <div key={ i } className='time-section'>
            { ss } { ( i < selectSections.length-1
                ? <span className='dividing-character'>{ unitsSeparator || ':' }</span>
                : '' ) }

          </div>
        )}


      </div>
    )
  }
}

ReactHhmmssSelect.propTypes = {
  tabIndex: PropTypes.number,
  unitsSeparator: PropTypes.string,
  options: PropTypes.object,
  valueHhmmss: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
}
ReactHhmmssSelect.defaultProps = {
  tabIndex: 0,
  unitsSeparator: ':',
  options: {
    hh: { hidden: false, label: 'Hours' },
    mm: { hidden: false, label: 'Minutes' },
    ss: { hidden: false, label: 'Seconds' },
  },
  valueHhmmss: '00:00:00',
  style: {},
  className: '',
  onChange: ({ valueHhmmss, units })=>(e)=>{}
}
export default ReactHhmmssSelect
