import React, {useState} from 'react';



const SelectHookComponent=(props) => {
    const [sValue, sValueUpdate] = useState(props.data[0]);

    const handleSelect=(evt) => {
        sValueUpdate(evt.target.value);
        props.emitValue(evt.target.value);
    }



    return(
    <select className="form-control" value={sValue} onChange={handleSelect}>
    {
        props.data.map((d,i) => (
            <option key={i} value={d}>{d}</option>
        ))
    }
    </select>
    );
}

export default SelectHookComponent;