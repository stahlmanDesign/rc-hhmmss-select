# react-hhmmss-select
React component to select hh:mm:ss

# Git repository
- https://github.com/stahlmanDesign/react-hhmmss-select

# Installation
- `npm install --save react-hhmmss-select`

# Usage
`import HhmmssSelect from 'react-hhmmss-select'`

### Basic
```jsx
<HhmmssSelect
  valueHhmmss={ existingString /* ex. HH:mm:ss */
    ? existingString 
    : '00:00:00' }
  onChange={ yourEventHandler }
/>

```
```js
yourEventHandler = ({ units, valueHhmmss })=>(e)=>{
 // units = 'hh', 'mm' or 'ss'
 // valueHhmmss = the existing value before the change event, or 00:00:00 if none
 
 // Intended usage: Say existing duration value is 01:30:45 and user selects 15 min
 
 // const newValue = e.target.value // ex. 15
 // const valueHhmmssSplit = valueHhmmss.split(':') // the value before the change event
 // if (units === 'hh') valueHhmmssSplit[0] = newValue
 // if (units === 'mm') valueHhmmssSplit[1] = newValue
 // if (units === 'ss') valueHhmmssSplit[2] = newValue
 
 // new value is '01:15:45'
 // update your state or DB with the new value
 
}
```
### With params
```jsx
<HhmmssSelect
  options={{
    hh: { hidden: false, label: 'Heures' /* NOTE default is Enlglish */}, 
    mm: { hidden: false, label: 'Minutes' },
    ss: { hidden: true, label: 'Secondes' /* NOTE to only choose hh:mm */ },
  }}
  valueHhmmss={ existingString
    ? existingString 
    : '00:00:00' }
  onChange={ yourEventHandler }
/>

```

### Select Props

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| tabIndex | number | 0 | -1 it will be skipped when tab pressed, 0 - order defined by document, 1+ you control tab order |
| unitsSeparator | string | ':' | The character that separates hh:mm:ss |
| options | object | hidden(bool), label(string) | use to localise the word for Hours, Minutes, Seconds, or hide hh, mm or ss |
| valueHhmmss | string | '00:00:00' | the value to be displayed |
| style | object | {} | your styles |
| className | string | '' | your additional class names |
| onChange | function | ({ valueHhmmss, units })=>(e)=>{} | event handler that comes with some props |

## Source code

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash.range' // npm i --save lodash.range
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

```
