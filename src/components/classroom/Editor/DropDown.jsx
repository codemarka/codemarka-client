/** @format */

import React,{ useState } from 'react'
import './editor.css'

export default function DropDown(props) {

  const [dropDownItem, setdropDownItem] = useState({ visible: false });

  const dropDownItemSelected = (e,value,_for) => {
    setdropDownItem(v => {
        return { ...v, visible: !v.visible }
    })
    props.selected(e, value, _for);
  }
  const toogleDropDownVisibility = (e) => {
    e.preventDefault();
    setdropDownItem(v => {
     return  {...v, visible: !v.visible}
    });
  }

    const dropDownIcon = props.icon ? (
        <i
            className={ `fas fa-${ props.icon }` }
            onClick={ toogleDropDownVisibility }></i>
    ) : (
        <i
            className="fas fa-caret-down pl-2"
            onClick={ toogleDropDownVisibility }></i>
    )

    const listItems = props.list
        ? props.list.map(item => (
            <div
                  className="codemarka__dropdown__item"
                  onClick={ e => dropDownItemSelected(e, item.value, props.for) }
                  key={ item.value }>
                {item.name}
            </div>
          ))
        : ''

    return (
        <React.Fragment>
            {dropDownIcon}
            <div className="codemarka__dropdown__container" style={ { display: dropDownItem.visible === true ? 'block' : 'none' } }>{listItems}</div>
        </React.Fragment>
    )
}
