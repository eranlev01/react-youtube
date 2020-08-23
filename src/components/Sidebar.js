import React, { useState } from 'react'
import { Button, InputGroup, FormControl } from "react-bootstrap";
const Sidebar = (props) => {

    const [searchVal, setSearchVal] = useState('')

    const onChange = (val) => {
        setSearchVal(val)
    }

    return (
        <div className="side-bar">
            <div className="search-div">
                <InputGroup>
                    <FormControl
                        type="text" placeholder='Search for a song'
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={e => onChange(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button className="search-btn" onClick={() => props.search(searchVal)}>Search</Button> <br />
                    </InputGroup.Append>
                </InputGroup>
                <span className="errMsg">{props.errMsg}</span>
            </div>
            <ul className="list">
                {props.songs.map(s => (
                    <li className="song-title" key={s.id} onClick={() => props.changeSong(s.youtubeId, s.id)}>{s.title}</li>
                ))}
            </ul>

        </div>
    )
}

export default Sidebar
