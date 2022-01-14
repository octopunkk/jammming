import {TrackList} from "../TrackList/TrackList"
import './Playlist.css'

export function Playlist(props){
    let playlistName = props.name;
    let handleNameChange = event => {
        props.onNameChange(event.target.value);
    }
    return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} onChange={handleNameChange} value={playlistName}/>
            <TrackList tracks={props.tracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}