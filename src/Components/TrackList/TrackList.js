import './TrackList.css'
import {SearchResults} from '../SearchResults/SearchResults'
import {Tracks} from '../Track/Track'

export function TrackList (props){
    return (
        <div className="TrackList">
            {props.tracks.map(track => {
                return (
                    <Tracks track={track} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval}/>
                );
            })}
        </div>
    )
}