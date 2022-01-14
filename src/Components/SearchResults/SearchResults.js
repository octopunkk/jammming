import {TrackList} from '../TrackList/TrackList.js';
import './SearchResults.css';
import {searchResults} from '../App/App';

export function SearchResults(props){
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={props.tracks} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    )
}

