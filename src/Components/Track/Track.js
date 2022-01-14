import './Track.css'

export function Tracks(props){
    let addTrack = () => {
        props.onAdd(props.track);
    }
    let removeTrack = () => {
        props.onRemove(props.track);
    }
    return (
        <div className="Track">
            <div className="Track-information">
            <h3>
                {props.track.name}
            </h3>
            <p>
                {props.track.artist} | {props.track.album}
            </p>
            </div>
            {props.isRemoval ? (
                <button className="Track-action" onClick={removeTrack}> - </button>
            ) : (
                <button className="Track-action" onClick={addTrack}> + </button>
            )}
        </div>
    )
}

